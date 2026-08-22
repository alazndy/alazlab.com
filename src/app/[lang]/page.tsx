import { getAllProjects } from '@/lib/markdown';
import { HomeHero } from '@/components/home/HomeHero';
import { TrackDoors } from '@/components/home/TrackDoors';
import { ProjectGrid } from '@/components/home/ProjectGrid';

export async function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }];
}

export default async function LocalizedHome() {
  const projects = getAllProjects();

  const liveCount = projects.filter(p => p.status === 'Live' || p.status === 'Active').length;
  const categoryCount = new Set(projects.map(p => p.category)).size;

  return (
    <div className="max-w-7xl mx-auto pb-20 space-y-16 px-2 sm:px-4">
      <HomeHero
        projectCount={projects.length}
        liveCount={liveCount}
        categoryCount={categoryCount}
      />
      <TrackDoors projects={projects} />
      <ProjectGrid projects={projects} />
    </div>
  );
}
