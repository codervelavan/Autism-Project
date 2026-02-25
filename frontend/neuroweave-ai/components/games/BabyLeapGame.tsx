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
            const colors = ["#20FFB0", "#1DE69F", "#0EA5E9"];
            gameState.current.bubbles.push({
                x: Math.random() * (canvas.width - 40) + 20,
                y: canvas.height + 20,
                radius: Math.random() * 15 + 12,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 2 + 1.5,
            });
        };

        const update = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw grid lines for "hi-tech" feel
            ctx.strokeStyle = "rgba(32, 255, 176, 0.05)";
            ctx.lineWidth = 1;
            for (let i = 0; i < canvas.width; i += 40) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
            }
            for (let i = 0; i < canvas.height; i += 40) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.stroke();
            }

            // Spawn new bubbles
            const now = Date.now();
            if (now - gameState.current.lastSpawn > 800) {
                spawnBubble();
                gameState.current.lastSpawn = now;
            }

            // Draw and move bubbles
            gameState.current.bubbles.forEach((bubble) => {
                bubble.y -= bubble.speed;

                ctx.beginPath();
                ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(bubble.x - bubble.radius / 3, bubble.y - bubble.radius / 3, 1, bubble.x, bubble.y, bubble.radius);
                gradient.addColorStop(0, "white");
                gradient.addColorStop(0.3, bubble.color);
                gradient.addColorStop(1, "rgba(0,0,0,0)");

                ctx.fillStyle = gradient;
                ctx.fill();
                ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.closePath();
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
                if (dist < bubble.radius * 2.5) {
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
        <div className="relative w-full h-full flex items-center justify-center bg-[#0A0B1E]">
            <canvas
                ref={canvasRef}
                width={800}
                height={450}
                className="w-full h-full object-contain cursor-crosshair opacity-80"
            />
            <div className="absolute top-8 left-8 flex items-center gap-4">
                <div className="bg-white/[0.03] backdrop-blur-3xl px-8 py-4 rounded-[2rem] border border-white/10 shadow-2xl">
                    <p className="text-[9px] font-black text-[#20FFB0] uppercase tracking-[0.4em] mb-1">Score Monitor</p>
                    <p className="text-3xl font-black text-white">{score}</p>
                </div>
            </div>
            <div className="absolute top-8 right-8">
                <div className="bg-[#20FFB0]/10 text-[#20FFB0] px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] border border-[#20FFB0]/20 backdrop-blur-3xl shadow-[0_0_20px_rgba(32,255,176,0.1)]">
                    Engage: Bubble Popping
                </div>
            </div>
        </div>
    );
}
