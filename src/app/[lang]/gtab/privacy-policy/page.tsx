import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export async function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }];
}

export default async function PrivacyPolicy({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 max-w-4xl mx-auto animate-in fade-in duration-1000">

      <Link href={`/${lang}/gtab`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-lcars-cyan transition-colors mb-10 text-xs font-mono tracking-widest uppercase">
        <ArrowLeft className="w-4 h-4" />
        {isEn ? 'Back to GTab' : "GTab'e Dön"}
      </Link>

      <div className="space-y-10">
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-lcars-cyan" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground">GTab Privacy Policy</h1>
          </div>
          <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">Last updated: April 30, 2026</p>
        </header>

        <div className="glass p-6 sm:p-10 rounded-3xl border-border space-y-8 text-foreground/80 leading-relaxed bg-card shadow-lg">

          <section className="space-y-4">
            <p className="text-base text-foreground">GTab (&quot;the Extension&quot;) is a Chrome browser extension that provides a customizable new tab page. This policy explains in detail what Google user data is accessed, how it is used, and how it is protected, in compliance with the{' '}
              <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer" className="text-lcars-cyan hover:underline">Google API Services User Data Policy</a>.
            </p>
            <div className="bg-lcars-orange/10 border border-lcars-orange/30 rounded-2xl p-5 text-foreground/80 text-sm">
              <strong className="text-foreground">Summary:</strong> GTab does not operate any servers. All Google user data stays on your device and is used exclusively to display information in your new tab page. We do not share, sell, or transmit your data to any third party.
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-lcars-orange uppercase tracking-tight flex items-center gap-3">
              <span className="w-1.5 h-6 bg-lcars-orange rounded-full" />
              1. Google User Data Accessed
            </h2>
            <p className="text-sm text-foreground/70">GTab accesses the following Google user data only when you explicitly enable the corresponding widget. All access is opt-in and disabled by default.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 text-foreground font-bold">Widget</th>
                    <th className="text-left py-3 pr-4 text-foreground font-bold">OAuth Scope</th>
                    <th className="text-left py-3 pr-4 text-foreground font-bold">Data Accessed</th>
                    <th className="text-left py-3 text-foreground font-bold">Data NOT Accessed</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/70">
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-semibold text-foreground">Gmail Widget</td>
                    <td className="py-3 pr-4"><code className="text-lcars-cyan text-xs">gmail.metadata</code></td>
                    <td className="py-3 pr-4">Message headers (From, Subject, Date)</td>
                    <td className="py-3 text-muted-foreground">Message body, attachments, drafts</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-semibold text-foreground">Google Tasks Widget</td>
                    <td className="py-3 pr-4"><code className="text-lcars-cyan text-xs">tasks</code></td>
                    <td className="py-3 pr-4">Task lists, task titles, due dates, completion status</td>
                    <td className="py-3 text-muted-foreground">None (read/write access is used solely to manage your tasks)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-foreground">Google Calendar Widget</td>
                    <td className="py-3 pr-4"><code className="text-lcars-cyan text-xs">calendar.readonly</code></td>
                    <td className="py-3 pr-4">Calendar event titles, start/end times, locations</td>
                    <td className="py-3 text-muted-foreground">Event creation, deletion, modifications</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-lcars-orange uppercase tracking-tight flex items-center gap-3">
              <span className="w-1.5 h-6 bg-lcars-orange rounded-full" />
              2. How We Use Google User Data
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/75">
              <li><strong className="text-foreground">In-app display only:</strong> All retrieved data is displayed directly within your new tab page interface.</li>
              <li><strong className="text-foreground">No external transmission:</strong> Data is never sent to any server operated by GTab or third parties. All API calls are made directly from your browser to Google APIs.</li>
              <li><strong className="text-foreground">No AI training or data harvesting:</strong> We do not use Google user data to train machine learning models, build user profiles, or serve advertisements.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-lcars-orange uppercase tracking-tight flex items-center gap-3">
              <span className="w-1.5 h-6 bg-lcars-orange rounded-full" />
              3. Data Storage and Protection
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/75">
              <li><strong className="text-foreground">Local Storage Only:</strong> Tokens and settings are stored strictly in <code className="text-xs text-lcars-orange">chrome.storage.local</code> on your device.</li>
              <li><strong className="text-foreground">Revocation:</strong> You can revoke access at any time through your Google Account permissions.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-foreground uppercase">Contact & Developer</h2>
            <p className="text-sm text-muted-foreground">
              Developer: Göktuğ Turhan · Email: <a href="mailto:goktugturhan74@gmail.com" className="text-lcars-cyan hover:underline">goktugturhan74@gmail.com</a> · Website: <a href="https://alazlab.com" className="text-lcars-cyan hover:underline">alazlab.com</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
