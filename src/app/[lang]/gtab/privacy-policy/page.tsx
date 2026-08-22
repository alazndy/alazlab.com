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
    <div className="min-h-screen py-20 px-6 max-w-4xl mx-auto animate-in fade-in duration-1000">

      <Link href={`/${lang}/gtab`} className="inline-flex items-center gap-2 text-white/50 hover:text-lcars-cyan transition-colors mb-12 text-sm font-mono tracking-widest uppercase">
        <ArrowLeft className="w-4 h-4" />
        {isEn ? 'Back to GTab' : "GTab'e Dön"}
      </Link>

      <div className="space-y-12">
        <header className="space-y-4">
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-8 h-8 text-lcars-cyan" />
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">GTab Privacy Policy</h1>
          </div>
          <p className="text-white/40 font-mono text-sm tracking-widest uppercase">Last updated: April 30, 2026</p>
        </header>

        <div className="glass p-8 md:p-12 rounded-[32px] border-white/10 space-y-10 text-white/80 leading-relaxed">

          <section className="space-y-4">
            <p className="text-lg text-white">GTab (&quot;the Extension&quot;) is a Chrome browser extension that provides a customizable new tab page. This policy explains in detail what Google user data is accessed, how it is used, and how it is protected, in compliance with the{' '}
              <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer" className="text-lcars-cyan hover:underline">Google API Services User Data Policy</a>.
            </p>
            <div className="bg-lcars-orange/10 border border-lcars-orange/30 rounded-2xl p-5 text-white/70 text-sm">
              <strong className="text-white">Summary:</strong> GTab does not operate any servers. All Google user data stays on your device and is used exclusively to display information in your new tab page. We do not share, sell, or transmit your data to any third party.
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-lcars-orange uppercase tracking-tight flex items-center gap-3">
              <span className="w-1.5 h-6 bg-lcars-orange rounded-full" />
              1. Google User Data Accessed
            </h2>
            <p>GTab accesses the following Google user data only when you explicitly enable the corresponding widget. All access is opt-in and disabled by default.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 pr-4 text-white/90 font-bold">Widget</th>
                    <th className="text-left py-3 pr-4 text-white/90 font-bold">OAuth Scope</th>
                    <th className="text-left py-3 pr-4 text-white/90 font-bold">Data Accessed</th>
                    <th className="text-left py-3 text-white/90 font-bold">Data NOT Accessed</th>
                  </tr>
                </thead>
                <tbody className="text-white/60">
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-semibold text-white/80">Gmail Widget</td>
                    <td className="py-3 pr-4"><code className="text-lcars-cyan text-xs">gmail.metadata</code></td>
                    <td className="py-3 pr-4">Sender name, sender email address, subject line, received date</td>
                    <td className="py-3">Email body, attachments, content, labels, drafts</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-semibold text-white/80">Calendar Widget</td>
                    <td className="py-3 pr-4"><code className="text-lcars-cyan text-xs">calendar.readonly</code></td>
                    <td className="py-3 pr-4">Event title, start/end time, location</td>
                    <td className="py-3">Event descriptions, attendees, guest lists, attachments</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-semibold text-white/80">Tasks Widget</td>
                    <td className="py-3 pr-4"><code className="text-lcars-cyan text-xs">tasks</code></td>
                    <td className="py-3 pr-4">Task title, due date, completion status, task list names</td>
                    <td className="py-3">Task notes, hidden metadata</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-white/80">Drive Widget</td>
                    <td className="py-3 pr-4"><code className="text-lcars-cyan text-xs">drive.metadata.readonly</code></td>
                    <td className="py-3 pr-4">File name, file type/MIME type, modified date, web link</td>
                    <td className="py-3">File contents, downloads, sharing settings, comments</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-lcars-cyan uppercase tracking-tight flex items-center gap-3">
              <span className="w-1.5 h-6 bg-lcars-cyan rounded-full" />
              2. How Google User Data is Used
            </h2>
            <p>Google user data is used exclusively to render widgets on your new tab page in real time:</p>
            <ul className="list-disc list-inside space-y-2 text-white/70 pl-2">
              <li><strong className="text-white">Gmail Widget:</strong> Displays your recent unread emails so you can quickly see new messages.</li>
              <li><strong className="text-white">Calendar Widget:</strong> Displays your upcoming events and schedule for today and tomorrow.</li>
              <li><strong className="text-white">Tasks Widget:</strong> Displays your task lists and lets you check off completed tasks.</li>
              <li><strong className="text-white">Drive Widget:</strong> Displays your recently modified files with direct links to open them.</li>
            </ul>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white/70 text-sm space-y-2">
              <p className="text-white font-bold">Explicit Restrictions:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>We do NOT use Google user data to serve advertisements.</li>
                <li>We do NOT use Google user data for market research, analytics, or profiling.</li>
                <li>We do NOT use Google user data to train machine learning models.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-lcars-gold uppercase tracking-tight flex items-center gap-3">
              <span className="w-1.5 h-6 bg-lcars-gold rounded-full" />
              3. Data Storage and Retention
            </h2>
            <p>All data retrieved from Google APIs is processed in memory and stored locally in your browser via <code className="text-lcars-cyan text-xs">chrome.storage.local</code> only when caching is enabled. We do not operate external databases or servers.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-lcars-purple uppercase tracking-tight flex items-center gap-3">
              <span className="w-1.5 h-6 bg-lcars-purple rounded-full" />
              4. Contact & Developer Information
            </h2>
            <p>For questions or requests regarding this Privacy Policy:</p>
            <div className="p-4 bg-white/5 rounded-2xl font-mono text-sm space-y-1 text-white/70">
              <p><strong className="text-white">Developer:</strong> Göktuğ Turhan</p>
              <p><strong className="text-white">Email:</strong> goktugturhan74@gmail.com</p>
              <p><strong className="text-white">GitHub:</strong> github.com/alazndy/GTab</p>
              <p><strong className="text-white">Website:</strong> alazlab.com</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
