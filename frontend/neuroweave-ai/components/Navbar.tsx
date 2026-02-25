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
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="bg-white/80 backdrop-blur-2xl border border-slate-200/50 rounded-[1.5rem] px-8 py-4 shadow-[0_20px_50px_rgba(8,112,184,0.08)] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/30 group">
            <HeartIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">
            Neuro<span className="text-blue-600">Weave</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all flex items-center gap-2.5 ${pathname === link.href
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20 active:scale-95"
                  : "text-slate-400 hover:text-slate-900"
                }`}
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/screening"
            className="hidden sm:inline-flex px-8 py-3 rounded-2xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
          >
            Run Scan
          </Link>
          <button className="lg:hidden p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <Squares2X2Icon className="w-6 h-6 text-slate-600" />
          </button>
        </div>
      </div>
    </nav>
  );
}
