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
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-24 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest mb-6 border border-blue-100">
                    <HeartIcon className="w-4 h-4" />
                    Parent Support Manual
                </div>
                <h1 className="text-6xl font-black text-slate-900 mb-8 leading-[1.1]">
                    Caring with <span className="text-blue-600">Confidence</span>
                </h1>
                <p className="text-xl text-slate-500 font-medium leading-relaxed">
                    A compassionate, clinical guide for parents navigating the daily journey of raising a child with autism. Early support changes lives.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                {CARE_GUIDELINES.map((item, i) => (
                    <div key={i} className="card-premium p-12">
                        <div className="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center mb-8 border border-blue-100">
                            <item.icon className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-4">{item.title}</h3>
                        <p className="text-slate-500 font-medium leading-relaxed mb-10">{item.desc}</p>
                        <div className="space-y-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Key Strategies</p>
                            <div className="flex flex-wrap gap-2">
                                {item.points.map((p, idx) => (
                                    <span key={idx} className="px-4 py-2 rounded-xl bg-slate-50 text-slate-900 text-sm font-bold border border-slate-100">
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Emergency / Help Section */}
            <div className="bg-slate-900 rounded-[4rem] p-16 text-white grid grid-cols-1 lg:grid-cols-2 gap-16 items-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
                <div>
                    <ShieldCheckIcon className="w-16 h-16 text-blue-400 mb-8" />
                    <h2 className="text-4xl font-black mb-6 leading-tight">Professional Consultation Readiness</h2>
                    <p className="text-slate-400 text-lg mb-10 font-medium leading-relaxed">
                        While NeuroWeave provides insights, a formal diagnosis should always be sought through a multidisciplinary team.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <button className="px-10 py-5 bg-blue-600 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95">
                            Find a Specialist
                        </button>
                        <button className="px-10 py-5 bg-white/5 rounded-[2rem] font-black uppercase tracking-widest text-xs border border-white/10 hover:bg-white/10 transition-all">
                            Clinical Checklist
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8">
                        <h4 className="font-bold text-blue-400 mb-6 uppercase tracking-[0.2em] text-[10px]">What to ask your doctor</h4>
                        <ul className="space-y-6">
                            {[
                                "What assessment tools were used in this evaluation?",
                                "How do these results align with domestic milestones?",
                                "What localized early intervention services are available?",
                                "Do we need a follow-up assessment in 6 months?"
                            ].map((q, i) => (
                                <li key={i} className="flex gap-4 items-start text-slate-300 font-medium leading-relaxed">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                                    {q}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
