"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
    ChatBubbleBottomCenterTextIcon,
    XMarkIcon,
    PaperAirplaneIcon,
    FaceSmileIcon
} from "@heroicons/react/24/outline";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([
        { role: "model", content: "Hello! I'm NeuroAssistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMsg = { role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            // Send message with history for context
            const res = await axios.post("http://localhost:8000/chat/ask", {
                message: input,
                history: messages.slice(-5) // Send last 5 messages for context
            });
            setMessages(prev => [...prev, { role: "model", content: res.data.response }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: "model", content: "I'm having a bit of trouble connecting to my brain right now. Please try again in a moment." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            {/* Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-500/40 hover:scale-110 active:scale-95 transition-all group"
                >
                    <ChatBubbleBottomCenterTextIcon className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="w-[420px] h-[650px] max-w-[calc(100vw-3rem)] bg-white rounded-[40px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500">
                    {/* Header */}
                    <div className="bg-blue-600 p-8 flex items-center justify-between text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                                <FaceSmileIcon className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="font-black tracking-tight text-lg">NeuroAssistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                                    <p className="text-[10px] text-blue-100 font-black uppercase tracking-widest">Active Supporter</p>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors relative z-10">
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/50">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[85%] px-5 py-4 rounded-[24px] text-sm leading-relaxed shadow-sm ${msg.role === "user"
                                    ? "bg-blue-600 text-white rounded-tr-none"
                                    : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white px-5 py-4 rounded-[24px] rounded-tl-none border border-slate-100 flex gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-blue-200 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Suggestions */}
                    {!messages.some(m => m.role === "user") && (
                        <div className="px-6 pb-2 overflow-x-auto flex gap-2 no-scrollbar">
                            {[
                                "What are the early signs?",
                                "Explain ABA therapy.",
                                "How to support social skills?",
                                "Tell me about DSM-5."
                            ].map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setInput(q); }}
                                    className="whitespace-nowrap px-4 py-2 rounded-xl bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100 hover:bg-blue-100 transition-colors"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div className="p-6 bg-white border-t border-slate-50">
                        <div className="flex items-center gap-3 bg-slate-100/50 rounded-2xl px-5 py-3 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all border border-transparent focus-within:border-blue-500/20">
                            <input
                                type="text"
                                placeholder="Ask your concern..."
                                className="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 font-medium placeholder:text-slate-400"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={loading || !input.trim()}
                                className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-30 disabled:grayscale transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                            >
                                <PaperAirplaneIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
