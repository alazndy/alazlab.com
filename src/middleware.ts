import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['tr', 'en'];
const defaultLocale = 'tr';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already starts with /tr or /en
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Bypass static assets, projects public media, api routes, extension-less
  // metadata file routes (Next's file-convention routes like opengraph-image
  // have no dot in their path), and files with extensions
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/projects') ||
    pathname.startsWith('/api') ||
    pathname === '/opengraph-image' ||
    pathname === '/twitter-image' ||
    pathname === '/apple-icon' ||
    pathname === '/icon' ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Determine locale: check cookie or header, default to 'tr'
  const savedLocale = request.cookies.get('lang')?.value;
  const locale = (savedLocale && locales.includes(savedLocale)) ? savedLocale : defaultLocale;

  // Redirect to localized URL
  const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);
  newUrl.search = request.nextUrl.search;
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
