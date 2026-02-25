"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, Cell
} from "recharts";
import {
    ChartBarIcon,
    ClockIcon,
    BeakerIcon,
    ArrowTrendingUpIcon,
    MagnifyingGlassIcon,
    ShieldCheckIcon,
    DocumentArrowDownIcon,
    ArrowPathIcon
} from "@heroicons/react/24/outline";

export default function Dashboard() {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:8000/screening/history");
            setHistory(res.data);
        } catch (error) {
            console.error("Failed to fetch history:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const exportCSV = () => {
        const headers = ["ID", "Risk Category", "Risk Score", "Confidence"];
        const rows = history.map(s => [s.id, s.risk_category, s.final_risk, s.confidence]);
        const csvContent = headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `NeuroWeave_Audit_Log_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredHistory = history.filter(s =>
        s.risk_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toString().includes(searchTerm)
    );

    const stats = [
        { label: "Total Protocols", value: history.length, icon: BeakerIcon, color: "text-[#20FFB0]", bg: "bg-[#20FFB0]/10" },
        { label: "Neural Warnings", value: history.filter(s => s.risk_category === "High Risk").length, icon: ChartBarIcon, color: "text-red-500", bg: "bg-red-500/10" },
        { label: "Mean Neural Load", value: history.length ? (history.reduce((acc, s) => acc + s.final_risk, 0) / history.length * 100).toFixed(1) + "%" : "0%", icon: ArrowTrendingUpIcon, color: "text-cyan-400", bg: "bg-cyan-400/10" },
    ];

    const distributionData = [
        { category: 'Low', count: history.filter(s => s.risk_category === "Low Risk").length, color: '#20FFB0' },
        { category: 'Moderate', count: history.filter(s => s.risk_category === "Moderate Risk").length, color: '#f59e0b' },
        { category: 'High', count: history.filter(s => s.risk_category === "High Risk").length, color: '#ef4444' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 bg-[#0A0B1E] animate-in fade-in duration-1000">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
                <div className="max-w-xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#20FFB0]/5 text-[#20FFB0] text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-[#20FFB0]/10">
                        <ShieldCheckIcon className="w-4 h-4" /> Biometric Monitor v1.1.0
                    </div>
                    <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[1.05]">
                        Clinical <span className="text-[#20FFB0]">Intelligence</span>
                    </h1>
                    <p className="text-white/40 font-medium text-lg leading-relaxed">High-fidelity monitor for historical protocols, neural flux trends, and verified diagnostic categorization.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex bg-white/[0.03] border border-white/10 rounded-[2rem] px-8 py-4 items-center gap-4 transition-all min-w-[320px] backdrop-blur-3xl focus-within:border-[#20FFB0]/30 shadow-2xl">
                        <MagnifyingGlassIcon className="w-6 h-6 text-white/20" />
                        <input
                            type="text"
                            placeholder="Protocol ID or Category..."
                            className="bg-transparent border-none outline-none text-[11px] font-black uppercase tracking-widest text-white placeholder:text-white/20 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={fetchHistory}
                        className="p-5 bg-white text-[#0A0B1E] rounded-3xl hover:bg-[#20FFB0] transition-all shadow-2xl active:scale-95 group"
                    >
                        <ArrowPathIcon className={`w-6 h-6 ${loading ? 'animate-spin' : ''} group-hover:rotate-180 transition-transform duration-700`} />
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {stats.map((stat, i) => (
                    <div key={i} className="card-premium p-10 bg-white/[0.03] border-white/10 group relative overflow-hidden backdrop-blur-3xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#20FFB0]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                        <div className="flex items-center gap-5 mb-8 relative z-10">
                            <div className={`p-5 rounded-[1.5rem] ${stat.bg} border border-[#20FFB0]/10 transition-all duration-500 group-hover:bg-[#20FFB0] group-hover:rotate-6`}>
                                <stat.icon className={`w-7 h-7 ${stat.color} group-hover:text-[#0A0B1E]`} />
                            </div>
                            <span className="text-white/20 font-black text-[9px] uppercase tracking-[0.4em]">{stat.label}</span>
                        </div>
                        <div className="text-5xl font-black text-white tracking-tighter relative z-10">{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                <div className="card-premium p-10 md:p-14 bg-white/[0.03] border-white/10 overflow-hidden backdrop-blur-2xl">
                    <h3 className="text-2xl font-black text-white mb-12 flex items-center justify-between tracking-tight">
                        <span className="flex items-center gap-5">
                            <ClockIcon className="w-8 h-8 text-[#20FFB0] opacity-80" />
                            Neural Flux Log
                        </span>
                        <span className="text-[9px] font-black text-[#20FFB0]/50 uppercase tracking-[0.3em] bg-[#20FFB0]/5 px-4 py-2 rounded-full border border-[#20FFB0]/10">Time-Series</span>
                    </h3>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={history}>
                                <defs>
                                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#20FFB0" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#20FFB0" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="id" hide />
                                <YAxis hide domain={[0, 1]} />
                                <Tooltip
                                    cursor={{ stroke: '#20FFB0', strokeWidth: 2, strokeDasharray: '4 4' }}
                                    contentStyle={{ backgroundColor: '#0A0B1E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)', padding: '20px' }}
                                    labelStyle={{ display: 'none' }}
                                    itemStyle={{ fontWeight: 900, fontSize: '14px', color: '#20FFB0', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                                />
                                <Area type="monotone" dataKey="final_risk" stroke="#20FFB0" strokeWidth={4} fillOpacity={1} fill="url(#colorRisk)" animationDuration={2000} strokeLinecap="round" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card-premium p-10 md:p-14 bg-white/[0.03] border-white/10 overflow-hidden backdrop-blur-2xl">
                    <h3 className="text-2xl font-black text-white mb-12 flex items-center justify-between tracking-tight">
                        <span className="flex items-center gap-5">
                            <ChartBarIcon className="w-8 h-8 text-[#20FFB0] opacity-80" />
                            Diagnostic Load
                        </span>
                        <span className="text-[9px] font-black text-[#20FFB0]/50 uppercase tracking-[0.3em] bg-[#20FFB0]/5 px-4 py-2 rounded-full border border-[#20FFB0]/10">Aggregate</span>
                    </h3>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={distributionData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 900 }} />
                                <YAxis hide />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.02)', radius: 20 }}
                                    contentStyle={{ backgroundColor: '#0A0B1E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)' }}
                                />
                                <Bar dataKey="count" radius={[10, 10, 10, 10]} barSize={40} animationDuration={1500}>
                                    {distributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* History Grid */}
            <div className="card-premium p-10 md:p-16 bg-white/[0.02] border-white/10 backdrop-blur-3xl shadow-3xl">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-16 gap-8">
                    <div>
                        <h3 className="text-4xl font-black text-white tracking-tight">Clinical Audit Log</h3>
                        <p className="text-white/30 font-medium text-[11px] uppercase tracking-[0.3em] mt-3">Verified high-fidelity session analytics.</p>
                    </div>
                    <button
                        onClick={exportCSV}
                        className="flex items-center gap-4 px-10 py-5 bg-white text-[#0A0B1E] rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-[#20FFB0] transition-all shadow-2xl active:scale-95 group"
                    >
                        <DocumentArrowDownIcon className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                        Export Log (.CSV)
                    </button>
                </div>

                <div className="overflow-x-auto -mx-10 md:-mx-16 px-10 md:px-16">
                    <table className="w-full text-left min-w-[850px]">
                        <thead className="bg-white/5 text-white/20 text-[9px] font-black uppercase tracking-[0.4em]">
                            <tr>
                                <th className="px-8 py-8">Protocol ID</th>
                                <th className="px-8 py-8">Classification</th>
                                <th className="px-8 py-8">Neural Load</th>
                                <th className="px-8 py-8">Biometric Trace</th>
                                <th className="px-8 py-8">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredHistory.slice().reverse().map((session) => (
                                <tr key={session.id} className="hover:bg-white/[0.04] transition-all group">
                                    <td className="px-8 py-10 font-bold text-white tracking-widest text-xs">#NS-{session.id.toString().padStart(4, '0')}</td>
                                    <td className="px-8 py-10">
                                        <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border ${session.risk_category === "High Risk" ? "bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]" :
                                            session.risk_category === "Moderate Risk" ? "bg-orange-500/10 text-orange-400 border-orange-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]" : "bg-[#20FFB0]/10 text-[#20FFB0] border-[#20FFB0]/20 shadow-[0_0_15px_rgba(32,255,176,0.1)]"
                                            }`}>
                                            {session.risk_category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-10">
                                        <div className="flex items-center gap-6">
                                            <div className="text-2xl font-black text-white">{(session.final_risk * 100).toFixed(1)}%</div>
                                            <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div className={`h-full transition-all duration-1000 ${session.risk_category === "High Risk" ? "bg-red-500" : "bg-[#20FFB0]"}`} style={{ width: `${session.final_risk * 100}%` }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-10">
                                        <div className="flex -space-x-3">
                                            <div className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center backdrop-blur-xl group-hover:scale-110 transition-transform"><ShieldCheckIcon className="w-5 h-5 text-[#20FFB0]" /></div>
                                            <div className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center backdrop-blur-xl group-hover:scale-110 transition-transform delay-75"><ArrowTrendingUpIcon className="w-5 h-5 text-cyan-400" /></div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-10">
                                        <div className="flex items-center gap-3 text-[9px] font-black text-white/20 uppercase tracking-[0.2em] group-hover:text-[#20FFB0] transition-colors">
                                            <div className="w-1.5 h-1.5 bg-[#20FFB0]/50 rounded-full group-hover:bg-[#20FFB0] group-hover:shadow-[0_0_10px_#20FFB0]"></div>
                                            Encrypted & Latched
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredHistory.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={5} className="px-10 py-32 text-center">
                                        <div className="max-w-xs mx-auto">
                                            <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-white/10">
                                                <BeakerIcon className="w-10 h-10 text-white/10" />
                                            </div>
                                            <p className="text-white/20 font-black uppercase tracking-[0.4em] text-[10px]">Registry Empty: Standard Protocol Only</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
