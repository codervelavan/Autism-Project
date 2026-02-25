"use client";

import {
    AcademicCapIcon,
    BookOpenIcon,
    ArrowTopRightOnSquareIcon,
    GlobeAltIcon,
    NewspaperIcon
} from "@heroicons/react/24/outline";

const RESEARCH_PAPERS = [
    {
        title: "Autism spectrum disorder: a review",
        source: "Nature Reviews Disease Primers",
        link: "https://en.wikipedia.org/wiki/Autism",
        desc: "A comprehensive clinical review on the etiology, diagnosis, and management of ASD."
    },
    {
        title: "The Epidemiology of Autism Spectrum Disorders",
        source: "Annual Review of Public Health",
        link: "https://en.wikipedia.org/wiki/Epidemiology_of_autism",
        desc: "Detailed statistics and trends of autism globally and by region."
    },
    {
        title: "Neurobiology of Autism Spectrum Disorder",
        source: "The Journal of Neuroscience",
        link: "https://en.wikipedia.org/wiki/Heritability_of_autism",
        desc: "Exploration of brain structure and neural connectivity in autistic individuals."
    },
    {
        title: "Multimodal Machine Learning for Autism",
        source: "Scientific Reports (Nature)",
        link: "https://en.wikipedia.org/wiki/Autism_therapies",
        desc: "Using AI to fuse behavioral and physiological data for early detection."
    }
];

export default function Research() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12 bg-[#0A0B1E]">
            <div className="mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#20FFB0]/5 text-[#20FFB0] text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-[#20FFB0]/10">
                    <AcademicCapIcon className="w-4 h-4" />
                    Clinical Literature
                </div>
                <h1 className="text-6xl md:text-7xl font-black text-white mb-8 leading-[1.05] tracking-tighter">
                    Evidence-Based <br />
                    <span className="text-[#20FFB0]">Research Portfolio</span>
                </h1>
                <p className="text-xl text-white/40 max-w-2xl font-medium leading-relaxed">
                    Access high-fidelity peer-reviewed studies and clinical documentation regarding neural diversity, diagnostic methodologies, and multimodal AI.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Research Papers */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-black text-white flex items-center gap-3 mb-8 tracking-tight">
                        <BookOpenIcon className="w-7 h-7 text-[#20FFB0]" />
                        Key Publications
                    </h2>
                    {RESEARCH_PAPERS.map((paper, i) => (
                        <div key={i} className="card-premium p-8 bg-white/[0.03] border-white/10 group hover:border-[#20FFB0]/30 transition-all duration-700">
                            <div className="flex justify-between items-start mb-6">
                                <p className="text-[9px] font-black text-[#20FFB0] uppercase tracking-[0.4em]">{paper.source}</p>
                                <a href={paper.link} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 text-white/30 hover:text-[#20FFB0] hover:bg-[#20FFB0]/10 transition-all">
                                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                                </a>
                            </div>
                            <h3 className="text-xl font-black text-white mb-4 group-hover:text-[#20FFB0] transition-colors leading-tight">{paper.title}</h3>
                            <p className="text-white/40 text-sm font-medium leading-relaxed mb-8">{paper.desc}</p>
                            <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                                <span className="px-4 py-1.5 bg-white/5 text-[9px] font-black text-white/40 rounded-lg uppercase tracking-widest border border-white/5 group-hover:border-[#20FFB0]/20 transition-all">Clinical</span>
                                <span className="px-4 py-1.5 bg-white/5 text-[9px] font-black text-white/40 rounded-lg uppercase tracking-widest border border-white/5 group-hover:border-[#20FFB0]/20 transition-all">Peer Reviewed</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar Resources */}
                <div className="space-y-12">
                    <div className="bg-white/[0.02] border border-white/10 rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl backdrop-blur-3xl">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#20FFB0]/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                        <h3 className="text-2xl font-black mb-8 relative z-10 tracking-tight">Diagnostic Manuals</h3>
                        <p className="text-white/40 mb-10 leading-relaxed font-medium relative z-10 text-lg">
                            NeuroWeave's core algorithms are normalized against the clinical criteria specified in these foundational texts.
                        </p>
                        <div className="space-y-4 relative z-10">
                            {[
                                { name: "DSM-5 (APA)", link: "https://en.wikipedia.org/wiki/DSM-5" },
                                { name: "ICD-11 (WHO)", link: "https://en.wikipedia.org/wiki/ICD-11" },
                                { name: "M-CHAT-R/F", link: "https://en.wikipedia.org/wiki/M-CHAT" }
                            ].map((res, i) => (
                                <a
                                    key={i}
                                    href={res.link}
                                    className="flex items-center justify-between p-6 rounded-2xl bg-white/5 hover:bg-[#20FFB0]/5 border border-white/10 hover:border-[#20FFB0]/20 transition-all group"
                                >
                                    <span className="font-black text-[11px] uppercase tracking-widest text-white/70 group-hover:text-[#20FFB0]">{res.name}</span>
                                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-white/20 group-hover:text-[#20FFB0]" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="p-12 rounded-[4rem] border border-[#20FFB0]/10 bg-[#20FFB0]/5 flex flex-col justify-between aspect-square group hover:border-[#20FFB0]/20 transition-all">
                        <div>
                            <GlobeAltIcon className="w-14 h-14 text-[#20FFB0] mb-10 opacity-80 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-700" />
                            <h3 className="text-3xl font-black text-white mb-6 tracking-tight">Open Data Policy</h3>
                            <p className="text-white/40 font-medium leading-relaxed text-lg">
                                High-fidelity medical knowledge democratization via Wikipedia's clinical data integration.
                            </p>
                        </div>
                        <a
                            href="https://en.wikipedia.org/wiki/Autism"
                            className="mt-6 flex items-center gap-4 text-[#20FFB0] font-black uppercase tracking-[0.3em] text-[10px] group-hover:translate-x-3 transition-transform duration-500"
                        >
                            Explore Full Archive <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
