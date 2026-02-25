"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area
} from "recharts";
import {
    ChartBarIcon,
    ClockIcon,
    BeakerIcon,
    ArrowTrendingUpIcon,
    MagnifyingGlassIcon,
    ShieldCheckIcon
} from "@heroicons/react/24/outline";

export default function Dashboard() {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await axios.get("http://localhost:8000/screening/history");
                setHistory(res.data);
            } catch (error) {
                console.error("Failed to fetch history:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const stats = [
        { label: "Total Sessions", value: history.length, icon: BeakerIcon, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "High Risk Flags", value: history.filter(s => s.risk_category === "High Risk").length, icon: ChartBarIcon, color: "text-red-500", bg: "bg-red-50" },
        { label: "Avg Risk Score", value: history.length ? (history.reduce((acc, s) => acc + s.final_risk, 0) / history.length * 100).toFixed(1) + "%" : "0%", icon: ArrowTrendingUpIcon, color: "text-green-600", bg: "bg-green-50" },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 mb-2">Clinical Insights</h1>
                    <p className="text-slate-500 font-medium">Historical analysis and real-time biometric metrics dashboard.</p>
                </div>
                <div className="flex bg-white border border-slate-100 rounded-2xl px-5 py-3 items-center gap-3 shadow-sm">
                    <MagnifyingGlassIcon className="w-5 h-5 text-slate-400" />
                    <input type="text" placeholder="Search sessions..." className="bg-transparent outline-none text-sm font-medium text-slate-900 placeholder:text-slate-400" />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`p-4 rounded-2xl ${stat.bg} transition-colors group-hover:bg-opacity-80`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest">{stat.label}</span>
                        </div>
                        <div className="text-4xl font-black text-slate-900">{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-white border border-slate-100 p-10 rounded-[40px] shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 mb-10 flex items-center gap-3">
                        <ClockIcon className="w-6 h-6 text-blue-600" />
                        Risk Distribution Trend
                    </h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={history}>
                                <defs>
                                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="id" hide />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="final_risk" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorRisk)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white border border-slate-100 p-10 rounded-[40px] shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 mb-10 flex items-center gap-3">
                        <ChartBarIcon className="w-6 h-6 text-blue-600" />
                        Categorical Volume
                    </h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { category: 'Low', count: history.filter(s => s.risk_category === "Low Risk").length, color: '#22c55e' },
                                { category: 'Moderate', count: history.filter(s => s.risk_category === "Moderate Risk").length, color: '#f59e0b' },
                                { category: 'High', count: history.filter(s => s.risk_category === "High Risk").length, color: '#ef4444' },
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="count" radius={[10, 10, 10, 10]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* History Table */}
            <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900">Recent Assessments</h3>
                    <button className="text-blue-600 font-bold text-sm hover:underline">Export CSV</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em]">
                            <tr>
                                <th className="px-10 py-5">Session ID</th>
                                <th className="px-10 py-5">Risk Category</th>
                                <th className="px-10 py-5">Engagement</th>
                                <th className="px-10 py-5">Final Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {history.slice().reverse().map((session) => (
                                <tr key={session.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-10 py-6 font-bold text-slate-900 text-sm">#NS-{session.id.toString().padStart(4, '0')}</td>
                                    <td className="px-10 py-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${session.risk_category === "High Risk" ? "bg-red-50 text-red-600" :
                                                session.risk_category === "Moderate Risk" ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600"
                                            }`}>
                                            {session.risk_category}
                                        </span>
                                    </td>
                                    <td className="px-10 py-6 text-sm font-bold text-slate-500">Multimodal</td>
                                    <td className="px-10 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="text-lg font-black text-slate-900">{(session.final_risk * 100).toFixed(1)}%</div>
                                            <ShieldCheckIcon className="w-5 h-5 text-blue-500" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {history.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={4} className="px-10 py-20 text-center">
                                        <div className="max-w-xs mx-auto">
                                            <BeakerIcon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                            <p className="text-slate-400 font-bold">No assessments have been recorded yet.</p>
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
