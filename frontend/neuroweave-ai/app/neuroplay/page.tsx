"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
    VideoCameraIcon,
    PlayIcon,
    StopIcon,
    SparklesIcon,
    CheckCircleIcon,
    ShieldCheckIcon,
    ArrowPathIcon
} from "@heroicons/react/24/outline";
import BabyLeapGame from "@/components/games/BabyLeapGame";
import MilestoneExplorer from "@/components/games/MilestoneExplorer";

export default function NeuroPlay() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedVideo, setRecordedVideo] = useState<Blob | null>(null);
    const [gameSelection, setGameSelection] = useState<"babyleap" | "milestones" | null>(null);
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    // Start Webcam and Recording
    const startSession = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) videoRef.current.srcObject = stream;

            const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
            mediaRecorderRef.current = recorder;
            chunksRef.current = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "video/webm" });
                setRecordedVideo(blob);
                stream.getTracks().forEach(track => track.stop());
            };

            recorder.start();
            setIsRecording(true);
            setIsPlaying(true);
            setScore(0);
        } catch (err) {
            console.error("Failed to start webcam", err);
            alert("Camera access is required for NeuroPlay analysis.");
        }
    };

    const stopSession = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsPlaying(false);
        }
    };

    const handleAnalyze = async () => {
        if (!recordedVideo) return;
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("file", new File([recordedVideo], "play_session.webm", { type: "video/webm" }));
            formData.append("engagement_score", score.toString());

            // Increase timeout for video processing (60 seconds)
            const res = await axios.post("http://localhost:8000/screening/gamified", formData, {
                timeout: 60000,
                headers: { "Content-Type": "multipart/form-data" }
            });
            setResult(res.data);
        } catch (err: any) {
            console.error("Analysis failed", err);
            if (err.code === 'ECONNABORTED') {
                alert("The analysis is taking longer than expected. Please try again with a shorter recording.");
            } else {
                alert(`Analysis failed: ${err.response?.data?.detail || err.message}. Ensure the backend is reachable.`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 bg-[#0A0B1E]">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#20FFB0]/5 text-[#20FFB0] text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-[#20FFB0]/10">
                    <SparklesIcon className="w-4 h-4" />
                    Interactive Neural Capture
                </div>
                <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tighter">
                    NeuroPlay <span className="text-[#20FFB0]">Interface</span>
                </h1>
                <p className="text-xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">
                    Select a neural stimulation protocol. The core engine analyzes motor trajectories and engagement latency during execution.
                </p>
            </div>

            {!gameSelection ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                    {[
                        { id: "babyleap", name: "BabyLeap Neural", desc: "Interactive bubble dynamics to track ocular-motor coordination.", icon: SparklesIcon, color: "blue" },
                        { id: "milestones", name: "Star Explorer", desc: "Latency-based star mapping to monitor imitation protocols.", icon: ShieldCheckIcon, color: "indigo" },
                    ].map((g) => (
                        <button
                            key={g.id}
                            onClick={() => setGameSelection(g.id as any)}
                            className="p-12 rounded-[3.5rem] bg-white/[0.03] border border-white/10 shadow-2xl hover:border-[#20FFB0]/40 transition-all duration-700 group text-left relative overflow-hidden backdrop-blur-3xl"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#20FFB0]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                            <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:bg-[#20FFB0] transition-all duration-500 relative z-10">
                                <g.icon className="w-10 h-10 text-[#20FFB0] group-hover:text-[#0A0B1E] group-hover:rotate-12 transition-all" />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-4 relative z-10 tracking-tight">{g.name}</h3>
                            <p className="text-white/40 font-medium leading-relaxed relative z-10 text-lg">{g.desc}</p>
                            <div className="mt-10 flex items-center gap-3 text-[#20FFB0] font-black uppercase tracking-[0.3em] text-[10px] opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all">
                                Launch Sync <PlayIcon className="w-5 h-5" />
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Game Area */}
                    <div className="lg:col-span-2 bg-white/[0.02] border border-white/10 rounded-[4rem] overflow-hidden relative aspect-video shadow-2xl backdrop-blur-3xl">
                        {isPlaying ? (
                            <div className="w-full h-full">
                                {gameSelection === "babyleap" ? (
                                    <BabyLeapGame onScoreUpdate={setScore} onGameOver={stopSession} isPlaying={isPlaying} />
                                ) : (
                                    <MilestoneExplorer onScoreUpdate={setScore} onGameOver={stopSession} isPlaying={isPlaying} />
                                )}
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                {!recordedVideo ? (
                                    <div className="text-center p-12">
                                        <div className="w-24 h-24 rounded-[2.5rem] bg-[#20FFB0] text-[#0A0B1E] flex items-center justify-center mx-auto mb-10 shadow-[0_0_30px_rgba(32,255,176,0.4)] rotate-3">
                                            <PlayIcon className="w-12 h-12" />
                                        </div>
                                        <h2 className="text-4xl font-black text-white mb-6 tracking-tight">Initialize Stream</h2>
                                        <p className="text-white/40 mb-12 max-w-sm mx-auto font-medium italic text-lg leading-relaxed">Sensor access required for neural motor capture and real-time biometric analysis.</p>
                                        <button
                                            onClick={startSession}
                                            className="px-12 py-5 bg-white text-[#0A0B1E] rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-[#20FFB0] transition-all shadow-2xl active:scale-95"
                                        >
                                            Auth Camera & Sync
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center p-12">
                                        {result ? (
                                            <div className="animate-in fade-in zoom-in duration-700 max-w-md mx-auto">
                                                <div className="w-24 h-24 rounded-[2.5rem] bg-[#20FFB0] text-[#0A0B1E] flex items-center justify-center mx-auto mb-10 shadow-[0_0_30px_rgba(32,255,176,0.3)]">
                                                    <ShieldCheckIcon className="w-12 h-12" />
                                                </div>
                                                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4">Diagnostic Synthesis</p>
                                                <h3 className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tighter">{result.risk_category}</h3>
                                                <p className="text-white/40 font-medium mb-12 text-lg">Engagement Load: <span className="text-[#20FFB0] font-black">{(result.game_engagement * 100).toFixed(0)}%</span></p>
                                                <div className="flex gap-4">
                                                    <button
                                                        onClick={() => {
                                                            setResult(null);
                                                            setRecordedVideo(null);
                                                            setGameSelection(null);
                                                        }}
                                                        className="flex-1 py-5 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"
                                                    >
                                                        Flush Cache
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="max-w-md mx-auto">
                                                <div className="w-24 h-24 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-10">
                                                    <CheckCircleIcon className="w-12 h-12 text-[#20FFB0]" />
                                                </div>
                                                <h2 className="text-4xl font-black text-white mb-6 tracking-tight">Session Recorded</h2>
                                                <p className="text-white/40 mb-12 font-medium text-lg leading-relaxed">Neural capture complete. Initialize biometric synthesis for final risk profiling?</p>
                                                <button
                                                    onClick={handleAnalyze}
                                                    disabled={loading}
                                                    className="w-full py-6 bg-[#20FFB0] text-[#0A0B1E] rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all flex items-center justify-center gap-4 disabled:opacity-50 shadow-[0_0_30px_rgba(32,255,176,0.3)]"
                                                >
                                                    {loading ? (
                                                        <>
                                                            <ArrowPathIcon className="w-6 h-6 animate-spin" />
                                                            Processing Neural...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Run Neural Analysis <ShieldCheckIcon className="w-6 h-6" />
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Camera Feed & Controls */}
                    <div className="space-y-8">
                        <div className="bg-white/[0.03] p-10 rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-3xl">
                            <h3 className="font-black text-white/80 mb-8 flex items-center gap-4 text-sm uppercase tracking-widest">
                                <VideoCameraIcon className="w-6 h-6 text-[#20FFB0]" />
                                Neural Feed
                            </h3>
                            <div className="aspect-square bg-[#0A0B1E] rounded-[2.5rem] overflow-hidden mb-8 relative border-4 border-white/5 group shadow-inner">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    muted
                                    className="w-full h-full object-cover scale-x-[-1] opacity-60 transition-opacity duration-1000 group-hover:opacity-100"
                                />
                                {isRecording && (
                                    <div className="absolute top-6 left-6 flex items-center gap-3 px-4 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full animate-pulse shadow-lg">
                                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                                        STREAMING
                                    </div>
                                )}
                                {isPlaying && (
                                    <div className="absolute bottom-6 right-6 px-5 py-3 bg-[#0A0B1E]/80 backdrop-blur-xl rounded-2xl text-[10px] font-black text-[#20FFB0] shadow-xl border border-[#20FFB0]/20">
                                        ENGAGEMENT: {score}
                                    </div>
                                )}
                            </div>

                            {isRecording && (
                                <button
                                    onClick={stopSession}
                                    className="w-full py-5 bg-white text-[#0A0B1E] rounded-[2rem] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-[#20FFB0] transition-all shadow-2xl active:scale-95"
                                >
                                    <StopIcon className="w-6 h-6" />
                                    End Session
                                </button>
                            )}
                        </div>

                        <div className="bg-[#20FFB0] p-10 rounded-[3.5rem] text-[#0A0B1E] shadow-[0_0_30px_rgba(32,255,176,0.2)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                            <h4 className="font-black text-lg mb-4 tracking-tight">Clinical Guidance</h4>
                            <p className="text-sm font-bold leading-relaxed italic opacity-80">
                                "Capture baseline neural responses through naturalistic play. Minimize external interventions for high-fidelity data collection."
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                setGameSelection(null);
                                setIsPlaying(false);
                                setIsRecording(false);
                                setRecordedVideo(null);
                            }}
                            className="w-full py-6 text-white/30 font-black uppercase tracking-[0.4em] text-[10px] hover:text-[#20FFB0] transition-all"
                        >
                            ← Return to Protocols
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
