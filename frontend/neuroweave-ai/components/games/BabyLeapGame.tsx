"use client";

import { useEffect, useRef, useState } from "react";

interface GameProps {
    onScoreUpdate: (score: number) => void;
    onGameOver: (finalScore: number) => void;
    isPlaying: boolean;
}

export default function BabyLeapGame({ onScoreUpdate, onGameOver, isPlaying }: GameProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const gameState = useRef({
        bubbles: [] as { x: number; y: number; radius: number; color: string; speed: number }[],
        lastSpawn: 0,
    });

    useEffect(() => {
        if (!isPlaying) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrame: number;

        const spawnBubble = () => {
            const colors = ["#3b82f6", "#60a5fa", "#93c5fd"];
            gameState.current.bubbles.push({
                x: Math.random() * (canvas.width - 40) + 20,
                y: canvas.height + 20,
                radius: Math.random() * 15 + 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 2 + 1,
            });
        };

        const update = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Spawn new bubbles
            const now = Date.now();
            if (now - gameState.current.lastSpawn > 1000) {
                spawnBubble();
                gameState.current.lastSpawn = now;
            }

            // Draw and move bubbles
            gameState.current.bubbles.forEach((bubble, index) => {
                bubble.y -= bubble.speed;

                ctx.beginPath();
                ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
                ctx.fillStyle = bubble.color;
                ctx.fill();
                ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
                ctx.stroke();
                ctx.closePath();

                // Check for click/pop (simulated for eye-tracking/hand-imitation context)
                // For actual user input:
            });

            // Remove off-screen bubbles
            gameState.current.bubbles = gameState.current.bubbles.filter(b => b.y > -50);

            animationFrame = requestAnimationFrame(update);
        };

        update();

        const handleCanvasClick = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            gameState.current.bubbles.forEach((bubble, index) => {
                const dist = Math.sqrt((clickX - bubble.x) ** 2 + (clickY - bubble.y) ** 2);
                if (dist < bubble.radius * 2) {
                    gameState.current.bubbles.splice(index, 1);
                    setScore(prev => {
                        const newScore = prev + 10;
                        onScoreUpdate(newScore);
                        return newScore;
                    });
                }
            });
        };

        canvas.addEventListener("click", handleCanvasClick);

        return () => {
            cancelAnimationFrame(animationFrame);
            canvas.removeEventListener("click", handleCanvasClick);
        };
    }, [isPlaying, onScoreUpdate]);

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-blue-50/10">
            <canvas
                ref={canvasRef}
                width={800}
                height={450}
                className="w-full h-full object-contain cursor-crosshair"
            />
            <div className="absolute top-6 left-6 flex items-center gap-4">
                <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-2xl shadow-lg border border-blue-100">
                    <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-1">Score</p>
                    <p className="text-2xl font-black text-slate-900">{score}</p>
                </div>
            </div>
            <div className="absolute top-6 right-6">
                <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-500/20">
                    Pop the Bubbles!
                </div>
            </div>
        </div>
    );
}
