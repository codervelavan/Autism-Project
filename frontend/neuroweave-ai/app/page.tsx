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
    <div className="flex flex-col items-center bg-[#0A0B1E]">
      {/* Hero Section */}
      <section className="w-full max-w-7xl px-6 pt-20 pb-32 md:pt-32 md:pb-48 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#20FFB0]/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#0EA5E9]/5 rounded-full blur-[100px] -z-10"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="glow-dot animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">NeuroWeave Neural Engine v4.0</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.95] tracking-tighter">
              The Future of <br />
              <span className="text-[#20FFB0] biotech-glow">Neural Care</span>
            </h1>

            <p className="text-xl text-white/50 font-medium leading-relaxed max-w-lg">
              NeuroWeave utilizes high-fidelity biometric analysis and computer vision to identify autism markers with unprecedented clinical accuracy.
            </p>

            <div className="flex flex-col sm:row gap-5 pt-4">
              <Link
                href="/screening"
                className="px-10 py-5 bg-[#20FFB0] text-[#0A0B1E] rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#1DE69F] transition-all shadow-[0_0_30px_rgba(32,255,176,0.3)] active:scale-95"
              >
                Start Clinical Scan <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                href="/neuroplay"
                className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-white/10 transition-all backdrop-blur-md active:scale-95"
              >
                Launch NeuroPlay <PlayIcon className="w-5 h-5 text-[#20FFB0]" />
              </Link>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#20FFB0]/20 to-[#0EA5E9]/20 rounded-[4rem] blur-2xl group-hover:scale-105 transition-transform duration-1000"></div>
            <div className="relative card-premium p-4 md:p-8 border-white/10 bg-white/[0.03]">
              <div className="aspect-[4/3] rounded-[3rem] bg-[#0A0B1E] overflow-hidden relative border border-white/5 shadow-inner">
                {/* Visual Placeholder for high-end biotech asset */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#20FFB0]/10 to-transparent flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#20FFB0] blur-[100px] opacity-20 animate-pulse"></div>
                    <ShieldCheckIcon className="w-32 h-32 text-[#20FFB0]/30 relative z-10" />
                  </div>
                </div>
                {/* Overlay Metric Display */}
                <div className="absolute top-8 left-8 p-6 bg-[#0A0B1E]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl animate-in slide-in-from-left-10 duration-1000">
                  <p className="text-[10px] font-black text-[#20FFB0] uppercase tracking-widest mb-1">Live Telemetry</p>
                  <p className="text-2xl font-black text-white">Neural Load: 94.2%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Bento Style */}
      <section className="w-full bg-[#0A0B1E] py-32 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#20FFB0]/10 text-[#20FFB0] text-[10px] font-black uppercase tracking-widest border border-[#20FFB0]/20">
              <SparklesIcon className="w-4 h-4" />
              Advanced Diagnostic Core
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">Precision Methodologies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
            <Link href="/screening" className="md:col-span-8 card-premium p-12 flex flex-col justify-between group neon-border relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#20FFB0]/10 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:scale-110 transition-transform duration-1000"></div>
              <div>
                <div className="w-16 h-16 rounded-[2rem] bg-[#0A0B1E] border border-white/10 flex items-center justify-center mb-10 group-hover:border-[#20FFB0]/50 transition-all">
                  <ShieldCheckIcon className="w-8 h-8 text-[#20FFB0]" />
                </div>
                <h3 className="text-4xl font-black text-white mb-4">Multimodal AI Scan</h3>
                <p className="text-white/50 text-lg font-medium leading-relaxed max-w-md">Fusing real-time computer vision with historical clinical data for high-accuracy spectrum analysis.</p>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-10">
                <span className="text-[10px] font-black text-[#20FFB0] uppercase tracking-widest">System Readiness: 100%</span>
                <ArrowRightIcon className="w-6 h-6 text-white group-hover:translate-x-2 transition-all" />
              </div>
            </Link>

            <Link href="/neuroplay" className="md:col-span-4 card-premium p-10 flex flex-col justify-between group border-white/5 h-full">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10">
                  <PlayIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4">NeuroPlay</h3>
                <p className="text-white/50 text-sm font-medium leading-relaxed">Behavioral capture through interactive engagement.</p>
              </div>
              <ArrowRightIcon className="w-5 h-5 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>

            <Link href="/care" className="md:col-span-4 card-premium p-10 flex flex-col justify-between group border-white/5 h-full">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10">
                  <HeartIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4">Care Hub</h3>
                <p className="text-white/50 text-sm font-medium leading-relaxed">Compassionate guidelines for family support.</p>
              </div>
              <ArrowRightIcon className="w-5 h-5 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>

            <Link href="/research" className="md:col-span-8 card-premium p-10 flex flex-col justify-between group border-white/5 relative overflow-hidden h-full">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -ml-32 -mb-32"></div>
              <div>
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                    <AcademicCapIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Scientific Archive</h3>
                </div>
                <p className="text-white/50 text-sm font-medium leading-relaxed max-w-sm">Access to peer-reviewed documentation and the latest clinical research in neural development.</p>
              </div>
              <ArrowRightIcon className="w-5 h-5 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all self-end" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-20 px-6 border-t border-white/5 bg-[#080916]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#20FFB0] flex items-center justify-center">
                <HeartIcon className="w-6 h-6 text-[#0A0B1E]" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">NeuroWeave</span>
            </div>
            <p className="text-white/40 font-medium leading-relaxed italic">
              "Redefining biological intelligence through precision AI-driven autism care."
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
            <div className="space-y-6">
              <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Core Engine</p>
              <ul className="space-y-4 text-sm font-bold text-white/60">
                <li className="hover:text-[#20FFB0] cursor-pointer transition-colors"><Link href="/screening">Clinical Scan</Link></li>
                <li className="hover:text-[#20FFB0] cursor-pointer transition-colors"><Link href="/neuroplay">NeuroPlay</Link></li>
                <li className="hover:text-[#20FFB0] cursor-pointer transition-colors"><Link href="/dashboard">Dashboard</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Legal</p>
              <ul className="space-y-4 text-sm font-bold text-white/60">
                <li className="hover:text-[#20FFB0] cursor-pointer transition-colors text-white/30">Privacy Protocol</li>
                <li className="hover:text-[#20FFB0] cursor-pointer transition-colors text-white/30">Institutional Terms</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-white/5 flex flex-col sm:row justify-between items-center gap-6">
          <p className="text-xs font-black text-white/10 uppercase tracking-widest">© 2026 NeuroWeave Biotech AI Labs</p>
          <div className="flex gap-8 text-xs font-black text-white/10 uppercase tracking-widest">
            <span className="glow-dot"></span>
            <span>Server Status: Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
