"use client";

import Link from "next/link";
import {
  SparklesIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  PlayIcon,
  HeartIcon,
  GlobeAltIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-7xl px-6 pt-20 pb-32 md:pt-32 md:pb-48 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] -z-10 opacity-60"></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[100px] -z-10 opacity-40"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-slate-100 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Clinical AI Integration v2.4</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[1.05] tracking-tighter">
              Precision <br />
              <span className="text-blue-600">Early Detection</span>
            </h1>

            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
              NeuroWeave fuses clinical behavioral metrics with computer vision to identify autism markers with 94% statistical accuracy.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link
                href="/screening"
                className="px-10 py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/30 active:scale-95"
              >
                Start Clinical Scan <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                href="/neuroplay"
                className="px-10 py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-xl shadow-slate-200/50 active:scale-95"
              >
                Launch NeuroPlay <PlayIcon className="w-5 h-5 text-blue-600" />
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-10 border-t border-slate-100">
              <div>
                <p className="text-3xl font-black text-slate-900">94.2%</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Model Accuracy</p>
              </div>
              <div className="w-px h-10 bg-slate-100"></div>
              <div>
                <p className="text-3xl font-black text-slate-900">12k+</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Sessions</p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/10 to-indigo-600/10 rounded-[4rem] blur-2xl group-hover:scale-105 transition-transform duration-1000"></div>
            <div className="relative card-premium p-4 md:p-8 bg-white/40 backdrop-blur-xl">
              <div className="aspect-[4/3] rounded-[3rem] bg-slate-200 overflow-hidden relative shadow-inner">
                {/* Placeholder for a high-quality clinical image or generated asset */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent flex items-center justify-center">
                  <ShieldCheckIcon className="w-32 h-32 text-white/50" />
                </div>
                {/* Overlay Stat */}
                <div className="absolute top-8 left-8 p-6 bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-white/50 animate-in slide-in-from-left-10 duration-1000">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Live Telemetry</p>
                  <p className="text-2xl font-black text-slate-900">Active Tracking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full bg-slate-50/50 py-32 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest">
              <SparklesIcon className="w-4 h-4" />
              Comprehensive Ecosystem
            </div>
            <h2 className="text-5xl font-black text-slate-900 tracking-tight">Clinical Grade Solutions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Multimodal Scan",
                desc: "Fusing tabular intake with real-time video biometrics.",
                icon: ShieldCheckIcon,
                link: "/screening",
                color: "blue"
              },
              {
                title: "NeuroPlay",
                desc: "Interactive games that capture behavior naturally.",
                icon: PlayIcon,
                link: "/neuroplay",
                color: "indigo"
              },
              {
                title: "Parent Portal",
                desc: "Comprehensive guidelines and care strategies.",
                icon: HeartIcon,
                link: "/care",
                color: "emerald"
              },
              {
                title: "Research Lab",
                desc: "Direct access to peer-reviewed documentation.",
                icon: AcademicCapIcon,
                link: "/research",
                color: "purple"
              }
            ].map((service, i) => (
              <Link key={i} href={service.link} className="card-premium p-10 flex flex-col justify-between group h-full">
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 group-hover:bg-blue-600 transition-all duration-500`}>
                    <service.icon className="w-7 h-7 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{service.title}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{service.desc}</p>
                </div>
                <div className="mt-10 flex items-center justify-between">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Initialize</span>
                  <ArrowRightIcon className="w-5 h-5 text-slate-200 group-hover:text-blue-600 group-hover:translate-x-2 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="w-full py-32 px-6">
        <div className="max-w-7xl mx-auto card-premium p-12 md:p-24 bg-slate-900 text-white relative overflow-hidden shadow-[0_64px_128px_-32px_rgba(15,23,42,0.5)]">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] -mr-[400px] -mt-[400px]"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <UserGroupIcon className="w-5 h-5 text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">AI Support System</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter">
                Talk to <span className="text-blue-400">NeuroAssistant.</span>
              </h2>
              <p className="text-xl text-slate-400 font-medium leading-relaxed">
                Clear your doubts with our compassion-trained AI model specialized in Autism Spectrum Disorder. Available 24/7 for emotional and clinical guidance.
              </p>
              <button onClick={() => window.scrollTo(0, document.body.scrollHeight)} className="px-10 py-5 bg-white text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-white/10 hover:bg-blue-50 transition-all active:scale-95">
                Open Assistant
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Wikipedia Insights", icon: GlobeAltIcon },
                { label: "Multilingual Support", icon: SparklesIcon },
                { label: "Privacy First", icon: ShieldCheckIcon },
                { label: "Clinical Context", icon: AcademicCapIcon }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-all">
                  <item.icon className="w-10 h-10 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-sm tracking-tight">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-20 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <HeartIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900">NeuroWeave</span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed italic">
              "Empowering parents through precision clinical intelligence and compassionate AI support."
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
            <div className="space-y-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Platform</p>
              <ul className="space-y-4 text-sm font-bold text-slate-600">
                <li className="hover:text-blue-600 cursor-pointer transition-colors"><Link href="/screening">Clinical Scan</Link></li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors"><Link href="/neuroplay">NeuroPlay Games</Link></li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors"><Link href="/dashboard">Insights Dashboard</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resources</p>
              <ul className="space-y-4 text-sm font-bold text-slate-600">
                <li className="hover:text-blue-600 cursor-pointer transition-colors"><Link href="/research">Research Archive</Link></li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors"><Link href="/care">Care Manual</Link></li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Documentation</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs font-black text-slate-300 uppercase tracking-widest">© 2026 NeuroWeave Medical AI Lab</p>
          <div className="flex gap-8 text-xs font-black text-slate-300 uppercase tracking-widest">
            <span className="cursor-pointer hover:text-blue-600">Privacy</span>
            <span className="cursor-pointer hover:text-blue-600">Terms</span>
            <span className="cursor-pointer hover:text-blue-600">Liability</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
