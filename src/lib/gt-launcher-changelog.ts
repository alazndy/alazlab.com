import 'server-only';

const CHANGELOG_URL = 'https://api.github.com/repos/alazndy/GT-Launcher/contents/CHANGELOG.md';
const REVALIDATE_SECONDS = 60 * 60;
const MAX_CHANGELOG_LENGTH = 250_000;

export interface GtLauncherChangelogSection {
  title: string;
  entries: string[];
}

export interface GtLauncherRelease {
  version: string;
  publishedAt?: string;
  sections: GtLauncherChangelogSection[];
}

export interface GtLauncherChangelog {
  releases: GtLauncherRelease[];
  isAvailable: boolean;
}

/**
 * Fetches GT Launcher release notes on the server. The URL is intentionally fixed so this module
 * cannot become an SSRF proxy. The private-repository token is read only at runtime and never
 * reaches a client component; output is parsed into text before rendering.
 */
export async function getGtLauncherChangelog(): Promise<GtLauncherChangelog> {
  const accessToken = process.env.GT_LAUNCHER_CHANGELOG_TOKEN?.trim();
  if (!accessToken) return unavailableChangelog();

  try {
    const response = await fetch(CHANGELOG_URL, {
      cache: 'force-cache',
      headers: {
        Accept: 'application/vnd.github.raw+json',
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'alazlab.com GT Launcher changelog reader',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ['gt-launcher-changelog'],
      },
    });

    if (!response.ok) return unavailableChangelog();

    const source = await response.text();
    if (source.length === 0 || source.length > MAX_CHANGELOG_LENGTH) {
      return unavailableChangelog();
    }

    const releases = parseGtLauncherChangelog(source);
    return releases.length > 0
      ? { releases, isAvailable: true }
      : unavailableChangelog();
  } catch {
    return unavailableChangelog();
  }
}

export function parseGtLauncherChangelog(source: string): GtLauncherRelease[] {
  const releases: GtLauncherRelease[] = [];
  let currentRelease: GtLauncherRelease | undefined;
  let currentSection: GtLauncherChangelogSection | undefined;

  for (const line of source.split(/\r?\n/)) {
    const releaseMatch = line.match(/^##\s+\[?([^\]\n]+)\]?\s*(?:-\s*(.+))?\s*$/);
    if (releaseMatch) {
      currentRelease = {
        version: cleanText(releaseMatch[1]),
        publishedAt: releaseMatch[2] ? cleanText(releaseMatch[2]) : undefined,
        sections: [],
      };
      releases.push(currentRelease);
      currentSection = undefined;
      continue;
    }

    if (!currentRelease) continue;

    const sectionMatch = line.match(/^###\s+(.+)$/);
    if (sectionMatch) {
      currentSection = {
        title: cleanText(sectionMatch[1]),
        entries: [],
      };
      currentRelease.sections.push(currentSection);
      continue;
    }

    const entryMatch = line.match(/^\s*[-*]\s+(.+)$/);
    if (entryMatch) {
      const section = currentSection ?? createDefaultSection(currentRelease);
      const entry = cleanText(entryMatch[1]);
      if (entry) section.entries.push(entry);
      continue;
    }

    const continuation = cleanText(line.trim());
    if (continuation && currentSection?.entries.length) {
      const lastEntryIndex = currentSection.entries.length - 1;
      currentSection.entries[lastEntryIndex] = `${currentSection.entries[lastEntryIndex]} ${continuation}`;
    }
  }

  return releases.filter((release) => release.sections.some((section) => section.entries.length > 0));
}

function createDefaultSection(release: GtLauncherRelease): GtLauncherChangelogSection {
  const section = { title: 'Updates', entries: [] };
  release.sections.push(section);
  return section;
}

function cleanText(value: string): string {
  return value
    .replace(/!?(?:\[([^\]]*)\]\([^)]*\))/g, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/[`*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function unavailableChangelog(): GtLauncherChangelog {
  return { releases: [], isAvailable: false };
}
