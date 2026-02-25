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
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest mb-6 border border-blue-100">
                    <AcademicCapIcon className="w-4 h-4" />
                    Clinical Literature
                </div>
                <h1 className="text-6xl font-black text-slate-900 mb-8 leading-[1.1]">
                    Evidence-Based <br />
                    <span className="text-blue-600">Research Portfolio</span>
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl font-medium leading-relaxed">
                    Access the latest peer-reviewed studies and clinical documentation regarding Autism Spectrum Disorder, diagnostic methodologies, and multimodal AI.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Research Papers */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-black flex items-center gap-3 mb-8">
                        <BookOpenIcon className="w-7 h-7 text-blue-600" />
                        Key Publications
                    </h2>
                    {RESEARCH_PAPERS.map((paper, i) => (
                        <div key={i} className="card-premium p-8 group">
                            <div className="flex justify-between items-start mb-4">
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{paper.source}</p>
                                <a href={paper.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 transition-colors">
                                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                                </a>
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{paper.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6">{paper.desc}</p>
                            <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                                <span className="px-3 py-1 bg-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">Clinical</span>
                                <span className="px-3 py-1 bg-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">Peer Reviewed</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar Resources */}
                <div className="space-y-12">
                    <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <h3 className="text-2xl font-black mb-6 relative z-10">Diagnostic Manuals</h3>
                        <p className="text-slate-400 mb-10 leading-relaxed font-medium relative z-10">
                            NeuroWeave's algorithms are trained based on the criteria specified in these foundational medical texts.
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
                                    className="flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                                >
                                    <span className="font-bold">{res.name}</span>
                                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-slate-500 group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="p-12 rounded-[3rem] border border-blue-100 bg-blue-50/30 flex flex-col justify-between aspect-square">
                        <div>
                            <GlobeAltIcon className="w-12 h-12 text-blue-600 mb-8" />
                            <h3 className="text-2xl font-black text-slate-900 mb-4">Wikipedia Integration</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                We believe in the democratization of medical knowledge. Our assistant provides simplified insights from Wikipedia's vast clinical database.
                            </p>
                        </div>
                        <a
                            href="https://en.wikipedia.org/wiki/Autism"
                            className="mt-6 flex items-center gap-3 text-blue-600 font-black uppercase tracking-widest text-xs"
                        >
                            Explore Full Archive <NewspaperIcon className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
