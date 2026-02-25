"use client";

import {
    HeartIcon,
    LightBulbIcon,
    UserGroupIcon,
    ShieldCheckIcon,
    ChatBubbleLeftRightIcon,
    SunIcon
} from "@heroicons/react/24/outline";

const CARE_GUIDELINES = [
    {
        title: "Routine & Structure",
        icon: SunIcon,
        desc: "Consistency is key. Use visual schedules to help your child predict transitions and daily tasks.",
        points: ["Visual Timers", "Color-Coded Schedules", "Fixed Meal/Bedtimes"]
    },
    {
        title: "Sensory Environment",
        icon: LightBulbIcon,
        desc: "Create a safe space that minimizes overstimulation from lights, sounds, and textures.",
        points: ["Noise-Cancelling Headphones", "Dimmer Switches", "Soft Texture Corners"]
    },
    {
        title: "Communication Support",
        icon: ChatBubbleLeftRightIcon,
        desc: "Use clear, simple language and consider augmentative communication tools if needed.",
        points: ["PICS Symbols", "Sign Language Basics", "Wait for Response (5s Rule)"]
    },
    {
        title: "Social Interaction",
        icon: UserGroupIcon,
        desc: "Encourage parallel play and gradual social exposure in controlled, positive environments.",
        points: ["Interest-Based Play", "Social Stories", "Quiet Play Dates"]
    }
];

export default function CareManual() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12 bg-[#0A0B1E]">
            <div className="text-center mb-24 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#20FFB0]/5 text-[#20FFB0] text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-[#20FFB0]/10">
                    <HeartIcon className="w-4 h-4" />
                    Parent Support Protocol
                </div>
                <h1 className="text-6xl md:text-7xl font-black text-white mb-8 leading-[1.05] tracking-tighter">
                    Caring with <br /><span className="text-[#20FFB0]">Clinical Precision</span>
                </h1>
                <p className="text-xl text-white/40 font-medium leading-relaxed max-w-3xl mx-auto">
                    A high-fidelity guide for parents navigating the daily journey of neurodiversity. Systematic support architecture integrated for early intervention.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                {CARE_GUIDELINES.map((item, i) => (
                    <div key={i} className="card-premium p-10 md:p-12 bg-white/[0.03] border-white/10 group hover:border-[#20FFB0]/30 transition-all duration-700">
                        <div className="w-16 h-16 rounded-[2rem] bg-[#20FFB0]/5 flex items-center justify-center mb-8 border border-[#20FFB0]/20 group-hover:bg-[#20FFB0] transition-all duration-500">
                            <item.icon className="w-8 h-8 text-[#20FFB0] group-hover:text-[#0A0B1E]" />
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4 tracking-tight">{item.title}</h3>
                        <p className="text-white/40 font-medium leading-relaxed mb-10">{item.desc}</p>
                        <div className="space-y-4">
                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Integrated Strategies</p>
                            <div className="flex flex-wrap gap-3">
                                {item.points.map((p, idx) => (
                                    <span key={idx} className="px-5 py-2.5 rounded-xl bg-white/5 text-white/80 text-[10px] font-black uppercase tracking-widest border border-white/5 transition-colors hover:border-[#20FFB0]/40">
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Emergency / Help Section */}
            <div className="bg-white/[0.02] border border-white/10 rounded-[4rem] p-12 md:p-20 text-white grid grid-cols-1 lg:grid-cols-2 gap-16 items-center shadow-2xl relative overflow-hidden backdrop-blur-3xl">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#20FFB0]/5 rounded-full blur-[120px] -mr-48 -mt-48 transition-all duration-1000"></div>
                <div>
                    <ShieldCheckIcon className="w-16 h-16 text-[#20FFB0] mb-8" />
                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight">Clinical Consultation Interface</h2>
                    <p className="text-white/40 text-lg mb-10 font-medium leading-relaxed max-w-lg">
                        NeuroWeave provides neural insights, but formal diagnosis protocols require a verified multidisciplinary board.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <button className="px-12 py-5 bg-[#20FFB0] text-[#0A0B1E] rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all shadow-[0_0_30px_rgba(32,255,176,0.3)] active:scale-95">
                            Locate Specialist
                        </button>
                        <button className="px-12 py-5 bg-white/5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] border border-white/10 hover:bg-white/10 transition-all text-white/60">
                            Protocol Checklist
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[3.5rem] p-10 md:p-14">
                        <h4 className="font-black text-[#20FFB0] mb-8 uppercase tracking-[0.4em] text-[10px]">Registry Query Log</h4>
                        <ul className="space-y-8">
                            {[
                                "Evaluation standard protocols utilized?",
                                "Developmental milestone alignment metrics?",
                                "Regional early intervention latency?",
                                "Recurrent assessment scheduling?"
                            ].map((q, i) => (
                                <li key={i} className="flex gap-6 items-start text-white/50 font-medium leading-relaxed group">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#20FFB0]/20 border border-[#20FFB0]/40 mt-2 flex-shrink-0 group-hover:bg-[#20FFB0] transition-colors"></div>
                                    <span className="group-hover:text-white transition-colors">{q}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
