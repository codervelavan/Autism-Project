"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  Squares2X2Icon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  HeartIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Screening", href: "/screening", icon: ClipboardDocumentCheckIcon },
    { name: "NeuroPlay", href: "/neuroplay", icon: Squares2X2Icon },
    { name: "Dashboard", href: "/dashboard", icon: ChartBarIcon },
    { name: "Research", href: "/research", icon: AcademicCapIcon },
    { name: "Care Guide", href: "/care", icon: HeartIcon },
  ];

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] xl:w-full xl:max-w-7xl px-4 md:px-0">
      <div className="bg-[#0A0B1E]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] px-6 md:px-12 py-5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] flex items-center justify-between">
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/" className="flex items-center gap-4 active:scale-95 transition-all group">
            <div className="w-12 h-12 rounded-[1.25rem] bg-[#20FFB0] flex items-center justify-center shadow-[0_0_30px_rgba(32,255,176,0.25)] group-hover:shadow-[0_0_40px_rgba(32,255,176,0.4)] group-hover:rotate-6 transition-all duration-500">
              <HeartIcon className="w-7 h-7 text-[#0A0B1E]" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">
              Neuro<span className="text-[#20FFB0]">Weave</span>
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-1 xl:gap-2 bg-white/[0.03] p-1.5 rounded-[2rem] border border-white/5 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-6 py-3 rounded-[1.5rem] text-[9px] xl:text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${pathname === link.href
                ? "bg-[#20FFB0] text-[#0A0B1E] shadow-[0_0_20px_rgba(32,255,176,0.2)]"
                : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <Link
            href="/screening"
            className="hidden sm:inline-flex px-10 py-3.5 rounded-2xl bg-white text-[#0A0B1E] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#20FFB0] transition-all shadow-2xl active:scale-95"
          >
            Run Scan
          </Link>
          <button className="lg:hidden p-4 rounded-2xl bg-white/5 border border-white/10 active:scale-95 transition-all">
            <Squares2X2Icon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
}
