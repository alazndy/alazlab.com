import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MobileNavProvider } from "@/components/layout/mobile-nav-context";
import { getAllProjects } from "@/lib/markdown";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Göktuğ Turhan | Embedded Hardware & Software Engineer',
    template: '%s | Göktuğ Turhan',
  },
  description: 'Personal portfolio of Göktuğ Turhan. Embedded hardware, CAN-bus radar systems, Android applications, and developer tools.',
  keywords: ['Göktuğ Turhan', 'Embedded Systems', 'ESP32', 'STM32', 'CAN-bus', 'Kotlin', 'Rust', 'Next.js', 'alazlab'],
  authors: [{ name: 'Göktuğ Turhan', url: 'https://alazlab.com' }],
  creator: 'Göktuğ Turhan',
  metadataBase: new URL('https://alazlab.com'),
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: ['en_US'],
    url: 'https://alazlab.com',
    siteName: 'alazlab.com',
    title: 'Göktuğ Turhan | Embedded Hardware & Software Engineer',
    description: 'Personal portfolio of Göktuğ Turhan. Embedded hardware, CAN-bus radar systems, Android applications, and developer tools.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Göktuğ Turhan | Embedded Hardware & Software Engineer',
    description: 'Personal portfolio of Göktuğ Turhan. Embedded hardware, CAN-bus radar systems, Android applications, and developer tools.',
    creator: '@alazndy',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: 'https://alazlab.com' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://alazlab.com/#person',
      name: 'Göktuğ Turhan',
      url: 'https://alazlab.com',
      jobTitle: 'Embedded Hardware & Software Engineer',
      sameAs: [
        'https://github.com/alazndy',
        'https://play.google.com/store/apps/details?id=com.alazndy.gtlauncher',
        'https://chromewebstore.google.com/detail/gtab-ki%C5%9Fiselle%C5%9Ftirilebili/ablekgbicginadinndchdojklkojgbdb',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://alazlab.com/#website',
      url: 'https://alazlab.com',
      name: 'alazlab.com',
      publisher: { '@id': 'https://alazlab.com/#person' },
      inLanguage: ['tr-TR', 'en-US'],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const projects = getAllProjects();

  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          <MobileNavProvider>
            {/* Full-height flex container — overflow-hidden only on lg+ */}
            <div className="flex h-svh lg:h-screen w-full overflow-hidden">
              <Sidebar projects={projects} />

              <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 scroll-smooth custom-scrollbar">
                  {children}
                </main>
              </div>
            </div>
          </MobileNavProvider>
        </Providers>
      </body>
    </html>
  );
}
