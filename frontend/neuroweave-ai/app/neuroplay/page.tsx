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

            const res = await axios.post("http://localhost:8000/screening/gamified", formData);
            setResult(res.data);
        } catch (err) {
            console.error("Analysis failed", err);
            alert("Multimodal analysis failed. Check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest mb-6 border border-blue-100">
                    <SparklesIcon className="w-4 h-4" />
                    Interactive Behavioral Capture
                </div>
                <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">NeuroPlay Dashboard</h1>
                <p className="text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                    Choose a game to engage the child. Our AI will analyze motor responses and interaction patterns while they play.
                </p>
            </div>

            {!gameSelection ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                    {[
                        { id: "babyleap", name: "BabyLeap Bubbles", desc: "Interactive bubble popping to track eye-hand coordination.", icon: SparklesIcon, color: "blue" },
                        { id: "milestones", name: "Star Explorer", desc: "Reaction-based star catching to monitor imitation and focus.", icon: ShieldCheckIcon, color: "indigo" },
                    ].map((g) => (
                        <button
                            key={g.id}
                            onClick={() => setGameSelection(g.id as any)}
                            className="p-12 rounded-[48px] bg-white border border-slate-100 shadow-2xl shadow-slate-200/40 hover:-translate-y-2 transition-all group text-left relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-50 transition-colors"></div>
                            <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-blue-600 shadow-inner transition-all relative z-10">
                                <g.icon className="w-10 h-10 text-slate-300 group-hover:text-white group-hover:rotate-12 transition-all" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-3 relative z-10">{g.name}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed relative z-10">{g.desc}</p>
                            <div className="mt-8 flex items-center gap-2 text-blue-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                Launch Game <PlayIcon className="w-4 h-4" />
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Game Area */}
                    <div className="lg:col-span-2 bg-white rounded-[56px] overflow-hidden relative aspect-video shadow-2xl border border-slate-50">
                        {isPlaying ? (
                            <div className="w-full h-full">
                                {gameSelection === "babyleap" ? (
                                    <BabyLeapGame onScoreUpdate={setScore} onGameOver={stopSession} isPlaying={isPlaying} />
                                ) : (
                                    <MilestoneExplorer onScoreUpdate={setScore} onGameOver={stopSession} isPlaying={isPlaying} />
                                )}
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-50/50">
                                {!recordedVideo ? (
                                    <div className="text-center p-12">
                                        <div className="w-24 h-24 rounded-[32px] bg-blue-600 text-white flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/40 rotate-3">
                                            <PlayIcon className="w-12 h-12" />
                                        </div>
                                        <h2 className="text-3xl font-black text-slate-900 mb-4">Start Session</h2>
                                        <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium italic">We need your permission to use the camera to record the child's interactions for screening.</p>
                                        <button
                                            onClick={startSession}
                                            className="px-10 py-5 bg-blue-600 text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                                        >
                                            Enable Camera & Play
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center p-12">
                                        {result ? (
                                            <div className="animate-in fade-in zoom-in duration-700 max-w-md mx-auto">
                                                <div className="w-24 h-24 rounded-[32px] bg-green-500 text-white flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-green-500/30">
                                                    <ShieldCheckIcon className="w-12 h-12" />
                                                </div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">AI Detection Result</p>
                                                <h3 className="text-6xl font-black text-slate-900 mb-6">{result.risk_category}</h3>
                                                <p className="text-slate-500 font-medium mb-10 leading-relaxed">Engagement Score: <span className="text-blue-600 font-black">{(result.game_engagement * 100).toFixed(0)}%</span></p>
                                                <div className="flex gap-4">
                                                    <button
                                                        onClick={() => {
                                                            setResult(null);
                                                            setRecordedVideo(null);
                                                            setGameSelection(null);
                                                        }}
                                                        className="flex-1 py-5 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all"
                                                    >
                                                        Try Again
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="max-w-sm mx-auto">
                                                <div className="w-24 h-24 rounded-[32px] bg-blue-50 flex items-center justify-center mx-auto mb-8">
                                                    <CheckCircleIcon className="w-12 h-12 text-blue-500" />
                                                </div>
                                                <h2 className="text-4xl font-black text-slate-900 mb-4">Good Play!</h2>
                                                <p className="text-slate-500 mb-10 font-medium">Session recorded. Ready to run biometric AI analysis on the video?</p>
                                                <button
                                                    onClick={handleAnalyze}
                                                    disabled={loading}
                                                    className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                                >
                                                    {loading ? (
                                                        <>
                                                            <ArrowPathIcon className="w-5 h-5 animate-spin" />
                                                            AI Calculating...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Run AI Analysis <SparklesIcon className="w-6 h-6" />
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
                        <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
                            <h3 className="font-black text-slate-900 mb-8 flex items-center gap-3 text-lg">
                                <VideoCameraIcon className="w-6 h-6 text-blue-600" />
                                Biometric Feed
                            </h3>
                            <div className="aspect-square bg-slate-50 rounded-[32px] overflow-hidden mb-8 relative border-4 border-slate-50">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    muted
                                    className="w-full h-full object-cover scale-x-[-1]"
                                />
                                {isRecording && (
                                    <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full animate-pulse shadow-lg">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                        Rec ON
                                    </div>
                                )}
                                {isPlaying && (
                                    <div className="absolute bottom-6 right-6 px-4 py-2 bg-white/90 backdrop-blur rounded-2xl text-[10px] font-black text-slate-900 shadow-xl border border-white">
                                        Engagement: {score}
                                    </div>
                                )}
                            </div>

                            {isRecording && (
                                <button
                                    onClick={stopSession}
                                    className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20"
                                >
                                    <StopIcon className="w-6 h-6" />
                                    Stop Session
                                </button>
                            )}
                        </div>

                        <div className="bg-blue-600 p-10 rounded-[48px] text-white shadow-2xl shadow-blue-600/30 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-3xl -mr-12 -mt-12"></div>
                            <h4 className="font-black text-lg mb-4">Clinical Guidance</h4>
                            <p className="text-sm text-blue-100 leading-relaxed font-medium italic">
                                "Encourage the child to interact naturally. Avoid helping them too much, as we want to capture their baseline reaction and motor planning."
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                setGameSelection(null);
                                setIsPlaying(false);
                                setIsRecording(false);
                                setRecordedVideo(null);
                            }}
                            className="w-full py-5 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] hover:text-slate-600 transition-colors"
                        >
                            ← Return to Games
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
