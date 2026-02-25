"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  Squares2X2Icon,
  ClipboardDocumentCheckIcon
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", icon: HeartIcon },
    { name: "Screening", href: "/screening", icon: ClipboardDocumentCheckIcon },
    { name: "NeuroPlay", href: "/neuroplay", icon: Squares2X2Icon },
    { name: "Dashboard", href: "/dashboard", icon: Squares2X2Icon },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-2xl px-6 py-3 shadow-lg shadow-slate-200/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <HeartIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Neuro<span className="text-blue-600">Weave</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${pathname === link.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/screening"
            className="hidden sm:block px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/10 active:scale-95"
          >
            Get Started
          </Link>
          <button className="md:hidden p-2 rounded-xl bg-slate-50 border border-slate-200">
            <Squares2X2Icon className="w-6 h-6 text-slate-600" />
          </button>
        </div>
      </div>
    </nav>
  );
}
