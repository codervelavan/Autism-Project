import Link from "next/link";
import {
  MagnifyingGlassIcon,
  UserGroupIcon,
  BeakerIcon,
  ClockIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  StarIcon
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-7xl px-6 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
              <StarIcon className="w-4 h-4" />
              Trusted by 5,000+ Parents & Clinicians
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
              Early Detection for <br />
              <span className="text-blue-600">Autism Markers</span>
            </h1>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-xl">
              NeuroWeave provides clinical-grade AI screening that combines behavioral insights with computer vision to help parents find clarity early.
            </p>

            {/* Intake Bar (Search-like) */}
            <div className="bg-white p-2 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 flex flex-col md:flex-row items-stretch md:items-center gap-2 max-w-2xl">
              <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100">
                <MagnifyingGlassIcon className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="How old is your child?"
                  className="bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 flex-1 text-sm font-medium"
                />
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100">
                <UserGroupIcon className="w-5 h-5 text-slate-400" />
                <select className="bg-transparent border-none outline-none text-slate-900 text-sm font-medium flex-1 cursor-pointer">
                  <option>Select Concern</option>
                  <option>Speech Delay</option>
                  <option>Social Interaction</option>
                  <option>Eye Contact</option>
                  <option>Motor Skills</option>
                </select>
              </div>
              <Link
                href="/screening"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all text-center"
              >
                Scan Now
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-6 text-slate-400">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-10 h-10 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center overflow-hidden`}>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium">Join 200+ parents who scanned today</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse delay-700"></div>
            <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-50 relative aspect-square group">
              <img
                src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800"
                alt="Pediatrician and child"
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/90 backdrop-blur px-6 py-5 rounded-3xl border border-white/20 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <ShieldCheckIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold">94% Accuracy Rate</p>
                    <p className="text-slate-500 text-xs">Validated by leading specialists</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Comprehensive Support Matrix</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">We provide a full-spectrum approach to early childhood development tracking.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "AI Behavioral Scan", desc: "Automated analysis of social and repetitive markers.", icon: BeakerIcon, color: "blue" },
              { title: "NeuroPlay Mode", desc: "Gamified activities that record behavioral data.", icon: AcademicCapIcon, color: "green" },
              { title: "Clinical Reporting", desc: "PDF-ready reports for your pediatrician.", icon: ShieldCheckIcon, color: "blue" },
              { title: "24/7 AI Assistant", desc: "Clear your doubts with our expert chatbot.", icon: ClockIcon, color: "slate" },
            ].map((service, i) => (
              <div key={i} className="clinical-card p-10 group cursor-pointer hover:-translate-y-2">
                <div className={`w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                  <service.icon className={`w-7 h-7 text-blue-600 group-hover:text-white transition-colors`} />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[48px] p-12 md:p-20 grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>

            {[
              { label: "Successful Scans", val: "12,000+" },
              { label: "Clinical Partners", val: "450+" },
              { label: "AI Confidence", val: "98.2%" },
              { label: "Avg Test Time", val: "5-min" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-4xl md:text-5xl font-black mb-2 text-blue-400">{stat.val}</p>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="w-full py-12 px-6 text-center text-slate-400 border-t border-slate-100">
        <p className="text-sm">© 2026 NeuroWeave Medical Technology. Not a replacement for professional clinical diagnosis.</p>
      </footer>
    </div>
  );
}
