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
        { label: "Total Assessments", value: history.length, icon: BeakerIcon, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Clinical Warnings", value: history.filter(s => s.risk_category === "High Risk").length, icon: ChartBarIcon, color: "text-red-500", bg: "bg-red-50" },
        { label: "Avg Analysis Load", value: history.length ? (history.reduce((acc, s) => acc + s.final_risk, 0) / history.length * 100).toFixed(1) + "%" : "0%", icon: ArrowTrendingUpIcon, color: "text-emerald-600", bg: "bg-emerald-50" },
    ];

    const distributionData = [
        { category: 'Low', count: history.filter(s => s.risk_category === "Low Risk").length, color: '#10b981' },
        { category: 'Moderate', count: history.filter(s => s.risk_category === "Moderate Risk").length, color: '#f59e0b' },
        { category: 'High', count: history.filter(s => s.risk_category === "High Risk").length, color: '#ef4444' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-1000">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
                <div className="max-w-xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100">
                        <ShieldCheckIcon className="w-4 h-4" /> Biometric Monitor v1.0
                    </div>
                    <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tight">Clinical Intelligence</h1>
                    <p className="text-slate-500 font-medium text-lg leading-relaxed">Unified view of historical screening data, behavioral trends, and AI-driven diagnostic categorization.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex bg-white border border-slate-100 rounded-3xl px-6 py-4 items-center gap-4 shadow-sm focus-within:ring-4 focus-within:ring-blue-500/5 focus-within:border-blue-500/20 transition-all min-w-[300px]">
                        <MagnifyingGlassIcon className="w-6 h-6 text-slate-300" />
                        <input
                            type="text"
                            placeholder="Session ID or Category..."
                            className="bg-transparent border-none outline-none text-sm font-bold text-slate-900 placeholder:text-slate-300 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={fetchHistory}
                        className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-95"
                    >
                        <ArrowPathIcon className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
                {stats.map((stat, i) => (
                    <div key={i} className="card-premium p-10 group relative overflow-hidden">
                        <div className="flex items-center gap-5 mb-8">
                            <div className={`p-5 rounded-3xl ${stat.bg} transition-all duration-500 group-hover:scale-110 shadow-inner`}>
                                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                            </div>
                            <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">{stat.label}</span>
                        </div>
                        <div className="text-5xl font-black text-slate-900 tracking-tighter">{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                <div className="card-premium p-12 overflow-hidden">
                    <h3 className="text-2xl font-black text-slate-900 mb-12 flex items-center justify-between">
                        <span className="flex items-center gap-4">
                            <ClockIcon className="w-8 h-8 text-blue-600" />
                            Diagnostic History Flux
                        </span>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">Time-Series</span>
                    </h3>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={history}>
                                <defs>
                                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="id" hide />
                                <YAxis hide domain={[0, 1]} />
                                <Tooltip
                                    cursor={{ stroke: '#2563eb', strokeWidth: 2, strokeDasharray: '4 4' }}
                                    contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '20px' }}
                                    labelStyle={{ display: 'none' }}
                                    itemStyle={{ fontWeight: 900, fontSize: '14px', color: '#1e293b' }}
                                />
                                <Area type="monotone" dataKey="final_risk" stroke="#2563eb" strokeWidth={5} fillOpacity={1} fill="url(#colorRisk)" animationDuration={2000} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card-premium p-12">
                    <h3 className="text-2xl font-black text-slate-900 mb-12 flex items-center justify-between">
                        <span className="flex items-center gap-4">
                            <ChartBarIcon className="w-8 h-8 text-blue-600" />
                            Categorical Volume
                        </span>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">Aggregated</span>
                    </h3>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={distributionData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 900 }} />
                                <YAxis hide />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc', radius: 20 }}
                                    contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '20px', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="count" radius={[15, 15, 15, 15]} barSize={50} animationDuration={1500}>
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
            <div className="card-premium p-10 md:p-16">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
                    <div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">Recent Observations</h3>
                        <p className="text-slate-400 font-medium text-sm mt-1">Audit log of granular session analytics.</p>
                    </div>
                    <button
                        onClick={exportCSV}
                        className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-100 rounded-3xl text-slate-900 font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all shadow-sm hover:shadow-xl active:scale-95"
                    >
                        <DocumentArrowDownIcon className="w-5 h-5 text-blue-600" />
                        Export Audit Log (.CSV)
                    </button>
                </div>

                <div className="overflow-x-auto -mx-10 md:-mx-16 px-10 md:px-16">
                    <table className="w-full text-left min-w-[800px]">
                        <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.25em]">
                            <tr>
                                <th className="px-6 py-6 font-black">Clinical ID</th>
                                <th className="px-6 py-6 font-black">Classification</th>
                                <th className="px-6 py-6 font-black">Neural Load</th>
                                <th className="px-6 py-6 font-black">Biometric Trace</th>
                                <th className="px-6 py-6 font-black">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredHistory.slice().reverse().map((session) => (
                                <tr key={session.id} className="hover:bg-slate-50/40 transition-all group">
                                    <td className="px-6 py-8 font-black text-slate-900">#NS-{session.id.toString().padStart(4, '0')}</td>
                                    <td className="px-6 py-8">
                                        <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm border ${session.risk_category === "High Risk" ? "bg-red-50 text-red-600 border-red-100" :
                                            session.risk_category === "Moderate Risk" ? "bg-orange-50 text-orange-600 border-orange-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                                            }`}>
                                            {session.risk_category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="text-xl font-black text-slate-900">{(session.final_risk * 100).toFixed(1)}%</div>
                                            <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-600" style={{ width: `${session.final_risk * 100}%` }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-8">
                                        <div className="flex -space-x-2">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center"><ShieldCheckIcon className="w-4 h-4 text-blue-600" /></div>
                                            <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center"><ArrowTrendingUpIcon className="w-4 h-4 text-emerald-600" /></div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-8">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase italic opacity-40 group-hover:opacity-100 transition-opacity">
                                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                                            Locked & Verified
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredHistory.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={5} className="px-10 py-32 text-center">
                                        <div className="max-w-xs mx-auto">
                                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                                                <BeakerIcon className="w-10 h-10 text-slate-200" />
                                            </div>
                                            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No matching clinical records found.</p>
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
