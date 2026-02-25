"use client";

import { useState } from "react";
import axios from "axios";
import {
  ClipboardDocumentCheckIcon,
  VideoCameraIcon,
  SparklesIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  DocumentArrowDownIcon
} from "@heroicons/react/24/outline";

const QUESTIONS = [
  { id: "A1", label: "Does your child look at you when you call his/her name?", type: "binary" },
  { id: "A2", label: "How easy is it for you to get eye contact with your child?", type: "binary" },
  { id: "A3", label: "Does your child point to indicate that s/he wants something?", type: "binary" },
  { id: "A4", label: "Does your child point to share interest with you?", type: "binary" },
  { id: "A5", label: "Does your child pretend? (e.g. care for dolls, talk on toy phone)", type: "binary" },
  { id: "A6", label: "Does your child follow where you are looking?", type: "binary" },
  { id: "A7", label: "If you or someone else in the family is visibly upset, does your child show signs of wanting to comfort them?", type: "binary" },
  { id: "A8", label: "Would you describe your child's first words as: (Normal/Delayed)?", type: "binary" },
  { id: "A9", label: "Does your child use simple gestures? (e.g. wave goodbye)", type: "binary" },
  { id: "A10", label: "Does your child stare at nothing with no apparent purpose?", type: "binary" },
  { id: "Age_Mons", label: "Child's Age (in months)", type: "number" },
  { id: "Qchat_10_Score", label: "Previous Q-Chat 10 Score (if any)", type: "number" },
  { id: "Jaundice", label: "Was your child born with Jaundice?", type: "binary" },
  { id: "Family_mem_with_ASD", label: "Is there any family member with ASD?", type: "binary" },
];

export default function Screening() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Record<string, string>>({
    A1: "0", A2: "0", A3: "0", A4: "0", A5: "0",
    A6: "0", A7: "0", A8: "0", A9: "0", A10: "0",
    Age_Mons: "24", Qchat_10_Score: "0", Jaundice: "0", Family_mem_with_ASD: "0"
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (id: string, value: string) => {
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (videoFile) formData.append("file", videoFile);

      const res = await axios.post(
        "http://localhost:8000/screening/multimodal",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(res.data);
      setStep(4);
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-6 py-12">
      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-20">
        {[
          { step: 1, label: "Behavioral", icon: ClipboardDocumentCheckIcon },
          { step: 2, label: "Child Bio", icon: AcademicCapIcon },
          { step: 3, label: "Analysis", icon: VideoCameraIcon },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-3 flex-1 relative">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${step >= item.step ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20 rotate-3" : "border-slate-100 bg-white text-slate-300"
              }`}>
              <item.icon className="w-7 h-7" />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${step >= item.step ? "text-blue-600" : "text-slate-300"}`}>
              {item.label}
            </span>
            {i < 2 && (
              <div className={`absolute top-7 left-[65%] w-[70%] h-0.5 rounded-full ${step > item.step ? "bg-blue-600" : "bg-slate-100"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/50 p-8 md:p-16 min-h-[500px] flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -z-10"></div>

        {/* STEP 1: Q1-A10 */}
        {step === 1 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-3">Behavioral Intake</h2>
              <p className="text-slate-500 font-medium">Standardized Q-Chat observations for early autism screening.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {QUESTIONS.slice(0, 10).map((q) => (
                <div key={q.id} className="space-y-4">
                  <label className="text-sm font-bold text-slate-700 leading-snug">{q.label}</label>
                  <div className="flex gap-3">
                    {["0", "1"].map((val) => (
                      <button
                        key={val}
                        onClick={() => handleInputChange(q.id, val)}
                        className={`flex-1 py-3 rounded-2xl border-2 text-sm font-bold transition-all ${form[q.id] === val
                            ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20"
                            : "border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200 hover:bg-slate-100"
                          }`}
                      >
                        {val === "1" ? "Yes" : "No"}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Demographic & Bio */}
        {step === 2 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-3">Developmental Context</h2>
              <p className="text-slate-500 font-medium">Providing baseline metrics for accurate risk normalization.</p>
            </div>

            <div className="space-y-8">
              {QUESTIONS.slice(10).map((q) => (
                <div key={q.id} className="max-w-md">
                  <label className="block text-sm font-bold text-slate-700 mb-4">{q.label}</label>
                  {q.type === "number" ? (
                    <input
                      type="number"
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:border-blue-600 focus:bg-white outline-none transition-all"
                      onChange={(e) => handleInputChange(q.id, e.target.value)}
                      value={form[q.id] || ""}
                    />
                  ) : (
                    <div className="flex gap-3">
                      {["0", "1"].map((val) => (
                        <button
                          key={val}
                          onClick={() => handleInputChange(q.id, val)}
                          className={`flex-1 py-3 rounded-2xl border-2 text-sm font-bold transition-all ${form[q.id] === val
                              ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20"
                              : "border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200"
                            }`}
                        >
                          {val === "1" ? "Yes" : "No"}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Video Upload */}
        {step === 3 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 flex flex-col items-center">
            <div className="text-center">
              <h2 className="text-4xl font-black text-slate-900 mb-3">Multimodal Analysis</h2>
              <p className="text-slate-500 font-medium">Upload a video for computer vision behavioral analysis.</p>
            </div>

            <label className="w-full max-w-2xl h-80 border-4 border-dashed border-slate-100 rounded-[40px] flex flex-col items-center justify-center gap-6 hover:border-blue-600/30 hover:bg-blue-50/30 cursor-pointer transition-all group">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              />
              {videoFile ? (
                <div className="text-center bg-white p-10 rounded-[40px] shadow-xl border border-slate-50 animate-in zoom-in duration-300">
                  <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircleIcon className="w-10 h-10 text-blue-600" />
                  </div>
                  <p className="text-xl font-black text-slate-900 mb-2">{videoFile.name}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Selected for Analysis</p>
                </div>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:rotate-6 transition-all duration-500">
                    <VideoCameraIcon className="w-10 h-10 text-slate-300 group-hover:text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-slate-900 mb-1">Upload Child Video</p>
                    <p className="text-sm text-slate-400 font-medium">Drag & drop or click to browse</p>
                  </div>
                </>
              )}
            </label>
          </div>
        )}

        {/* STEP 4: RESULTS */}
        {step === 4 && result && (
          <div className="space-y-12 animate-in fade-in zoom-in duration-1000">
            <div className="flex flex-col items-center text-center">
              <div className={`w-24 h-24 rounded-[32px] flex items-center justify-center mb-8 rotate-3 shadow-2xl ${result.risk_category === "High Risk" ? "bg-red-500 text-white shadow-red-500/20" :
                  result.risk_category === "Moderate Risk" ? "bg-orange-500 text-white shadow-orange-500/20" : "bg-green-500 text-white shadow-green-500/20"
                }`}>
                <ShieldCheckIcon className="w-12 h-12" />
              </div>
              <h2 className="text-5xl font-black text-slate-900 mb-4">Biometric Report</h2>
              <p className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">Confidential Clinical Data</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 flex flex-col justify-between">
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-6">Risk Sentiment</p>
                  <h3 className={`text-5xl font-black mb-4 ${result.risk_category === "High Risk" ? "text-red-500" :
                      result.risk_category === "Moderate Risk" ? "text-orange-500" : "text-green-500"
                    }`}>
                    {result.risk_category}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">Based on the provided behavioral inputs and computer vision tracking.</p>
                </div>
                <div className="mt-10">
                  <div className="h-4 bg-slate-200 rounded-full overflow-hidden flex">
                    <div className={`h-full transition-all duration-1000 ${result.risk_category === "High Risk" ? "bg-red-500" :
                        result.risk_category === "Moderate Risk" ? "bg-orange-500" : "bg-green-500"
                      }`} style={{ width: `${result.final_risk * 100}%` }} />
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="text-[10px] font-black text-slate-400">0%</span>
                    <span className="text-[10px] font-black text-slate-900">{(result.final_risk * 100).toFixed(1)}% RISK</span>
                    <span className="text-[10px] font-black text-slate-400">100%</span>
                  </div>
                </div>
              </div>

              <div className="p-10 rounded-[40px] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between">
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-6">Model Confidence</p>
                  <div className="text-6xl font-black text-blue-600 mb-4">{(result.confidence * 100).toFixed(0)}%</div>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed italic">"Our neural networks are highly confident in this multimodal classification."</p>
                </div>
                <div className="space-y-3 mt-10 border-t border-slate-50 pt-6">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-400">Q-Chat Data:</span>
                    <span className="text-slate-900">{result.risk_breakdown["tabular_contribution_%"]}%</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-400">Vision Analysis:</span>
                    <span className="text-slate-900">{result.risk_breakdown["video_contribution_%"]}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 rounded-[40px] bg-blue-600 text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                <SparklesIcon className="w-8 h-8 text-blue-200" />
                Clinical Action Plan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <p className="text-blue-200 text-[10px] font-black uppercase tracking-widest mb-3">Intervention Intensity</p>
                  <p className="text-2xl font-bold leading-tight">{result.therapy_plan.intervention_intensity}</p>
                </div>
                <div>
                  <p className="text-blue-200 text-[10px] font-black uppercase tracking-widest mb-3">Recommended Focus</p>
                  <div className="flex flex-wrap gap-2">
                    {result.therapy_plan.focus_areas?.map((area: string, i: number) => (
                      <span key={i} className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold border border-white/10 backdrop-blur">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => window.location.reload()} className="flex-1 py-5 rounded-3xl bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-[11px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">Finish Report</button>
              <button className="flex-1 py-5 rounded-3xl bg-white border border-slate-100 text-slate-900 font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-xl shadow-slate-200/50">
                <DocumentArrowDownIcon className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>
        )}

        {/* NAVIGATION BUTTONS */}
        {step < 4 && (
          <div className="flex justify-between mt-12 pt-10 border-t border-slate-50">
            <button
              onClick={prevStep}
              disabled={step === 1 || loading}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-slate-50 text-slate-400 font-bold hover:bg-slate-50 disabled:opacity-30 transition-all"
            >
              <ArrowLeftIcon className="w-5 h-5" /> Back
            </button>

            {step < 3 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-10 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
              >
                Next Step <ArrowRightIcon className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || !videoFile}
                className="flex items-center gap-2 px-10 py-4 rounded-2xl bg-blue-600 text-white font-bold disabled:opacity-50 transition-all shadow-2xl shadow-blue-500/30 active:scale-95"
              >
                {loading ? "Analyzing Data..." : "Run AI Analysis"}
                {!loading && <SparklesIcon className="w-6 h-6" />}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
