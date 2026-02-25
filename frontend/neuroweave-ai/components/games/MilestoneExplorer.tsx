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
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 p-8">
            <div className="flex justify-between w-full max-w-2xl mb-8">
                <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Score</p>
                    <p className="text-2xl font-black text-slate-900">{score}</p>
                </div>
                <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2">
                    Catch the Stars!
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 w-full max-w-xl aspect-square">
                {Array.from({ length: 9 }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => handleTargetClick(i)}
                        className={`rounded-3xl transition-all duration-300 transform ${activeTarget === i
                                ? "bg-yellow-400 shadow-xl shadow-yellow-200 scale-105 border-4 border-white"
                                : "bg-white border-2 border-slate-100 shadow-sm opacity-50"
                            } flex items-center justify-center text-4xl`}
                    >
                        {activeTarget === i ? "⭐" : "☁️"}
                    </button>
                ))}
            </div>
        </div>
    );
}
