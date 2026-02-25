"use client";

import { useEffect, useRef, useState } from "react";

interface GameProps {
    onScoreUpdate: (score: number) => void;
    onGameOver: (finalScore: number) => void;
    isPlaying: boolean;
}

export default function MilestoneExplorer({ onScoreUpdate, onGameOver, isPlaying }: GameProps) {
    const [activeTarget, setActiveTarget] = useState<number | null>(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setActiveTarget(Math.floor(Math.random() * 9));
        }, 1500);

        return () => clearInterval(interval);
    }, [isPlaying]);

    const handleTargetClick = (index: number) => {
        if (index === activeTarget) {
            setScore(prev => {
                const newScore = prev + 20;
                onScoreUpdate(newScore);
                return newScore;
            });
            setActiveTarget(null);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#0A0B1E] p-12">
            <div className="flex justify-between w-full max-w-2xl mb-12">
                <div className="bg-white/[0.03] px-8 py-4 rounded-[2rem] border border-white/10 shadow-3xl backdrop-blur-3xl">
                    <p className="text-[9px] font-black text-[#20FFB0] uppercase tracking-[0.4em] mb-1">Latency Monitor</p>
                    <p className="text-3xl font-black text-white">{score}</p>
                </div>
                <div className="bg-[#20FFB0]/10 text-[#20FFB0] px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] border border-[#20FFB0]/20 flex items-center gap-3 backdrop-blur-3xl">
                    <div className="w-2 h-2 rounded-full bg-[#20FFB0] animate-pulse shadow-[0_0_10px_#20FFB0]"></div>
                    Visual Capture Protocol
                </div>
            </div>

            <div className="grid grid-cols-3 gap-8 w-full max-w-xl aspect-square">
                {Array.from({ length: 9 }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => handleTargetClick(i)}
                        className={`rounded-[2.5rem] transition-all duration-500 transform ${activeTarget === i
                            ? "bg-[#20FFB0] shadow-[0_0_40px_rgba(32,255,176,0.4)] scale-110 border-4 border-white/20"
                            : "bg-white/[0.02] border border-white/5 shadow-inner opacity-20 hover:opacity-40"
                            } flex items-center justify-center text-5xl`}
                    >
                        {activeTarget === i ? "✨" : ""}
                    </button>
                ))}
            </div>
        </div>
    );
}
