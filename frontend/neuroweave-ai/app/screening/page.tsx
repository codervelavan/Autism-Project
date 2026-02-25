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
  DocumentArrowDownIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { jsPDF } from "jspdf";

const QUESTIONS = [
  // Behavioral (A1-A10)
  { id: "A1", label: "Does your child look at you when you call his/her name?", type: "binary", category: "Social" },
  { id: "A2", label: "How easy is it for you to get eye contact with your child?", type: "binary", category: "Social" },
  { id: "A3", label: "Does your child point to indicate that s/he wants something?", type: "binary", category: "Communication" },
  { id: "A4", label: "Does your child point to share interest with you?", type: "binary", category: "Social" },
  { id: "A5", label: "Does your child pretend? (e.g. care for dolls, talk on toy phone)", type: "binary", category: "Cognitive" },
  { id: "A6", label: "Does your child follow where you are looking?", type: "binary", category: "Social" },
  { id: "A7", label: "If you/someone else is upset, does your child show signs of wanting to comfort them?", type: "binary", category: "Emotional" },
  { id: "A8", label: "Would you describe your child's first words as: (Normal/Delayed)?", type: "binary", category: "Communication" },
  { id: "A9", label: "Does your child use simple gestures? (e.g. wave goodbye)", type: "binary", category: "Communication" },
  { id: "A10", label: "Does your child stare at nothing with no apparent purpose?", type: "binary", category: "Behavioral" },

  // Expanded Questions
  { id: "A11", label: "Does your child show unusual interest in the sensory aspects of materials?", type: "binary", category: "Sensory" },
  { id: "A12", label: "Does your child have repetitive body movements (e.g. hand flapping)?", type: "binary", category: "Motor" },
  { id: "A13", label: "Does your child struggle with changes in routine or environment?", type: "binary", category: "Adaptability" },
  { id: "A14", label: "Does your child react strongly to specific sounds or textures?", type: "binary", category: "Sensory" },

  // Demographics/Bio
  { id: "Age_Mons", label: "Child's Age (in months)", type: "number", category: "Bio" },
  { id: "Qchat_10_Score", label: "Previous Q-Chat 10 Score (if any)", type: "number", category: "History" },
  { id: "Jaundice", label: "Was your child born with Jaundice?", type: "binary", category: "Medical" },
  { id: "Family_mem_with_ASD", label: "Is there any family member with ASD?", type: "binary", category: "Genetics" },
];

export default function Screening() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Record<string, string>>({
    A1: "0", A2: "0", A3: "0", A4: "0", A5: "0",
    A6: "0", A7: "0", A8: "0", A9: "0", A10: "0",
    A11: "0", A12: "0", A13: "0", A14: "0",
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

  const downloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("NeuroWeave AI - Clinical Screening Report", 20, 30);
    doc.setFontSize(12);
    doc.text(`Session Risk Category: ${result.risk_category}`, 20, 50);
    doc.text(`Final Risk Probability: ${(result.final_risk * 100).toFixed(1)}%`, 20, 60);
    doc.text(`Model Confidence: ${(result.confidence * 100).toFixed(0)}%`, 20, 70);
    doc.text(`Intervention: ${result.therapy_plan?.intervention_intensity || "N/A"}`, 20, 80);
    doc.text("--------------------------------------------------", 20, 90);
    doc.text("Focus Areas:", 20, 100);
    result.therapy_plan?.focus_areas?.forEach((area: string, i: number) => {
      doc.text(`- ${area}`, 30, 110 + (i * 10));
    });
    doc.save("NeuroWeave-Analysis-Report.pdf");
  };

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
      setStep(5); // Results step
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Ensure the local backend (Port 8000) is active.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 py-12 bg-[#0A0B1E]">
      {/* Premium Stepper */}
      <div className="flex items-center justify-between mb-24 max-w-4xl mx-auto overflow-x-auto pb-4 md:pb-0">
        {[
          { step: 1, label: "Behavior", icon: ClipboardDocumentCheckIcon },
          { step: 2, label: "Expanded", icon: SparklesIcon },
          { step: 3, label: "Context", icon: AcademicCapIcon },
          { step: 4, label: "Biometrics", icon: VideoCameraIcon },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-4 flex-1 min-w-[100px] relative group">
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] md:rounded-3xl flex items-center justify-center border-2 transition-all duration-500 ${step >= item.step ? "bg-[#20FFB0] border-[#20FFB0] text-[#0A0B1E] shadow-[0_0_20px_rgba(32,255,176,0.3)] scale-110" : "border-white/10 bg-white/5 text-white/30"
              }`}>
              <item.icon className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] transition-colors duration-500 ${step >= item.step ? "text-[#20FFB0]" : "text-white/20"
              }`}>
              {item.label}
            </span>
            {i < 3 && (
              <div className={`absolute top-7 md:top-8 left-[65%] w-[70%] h-[2px] rounded-full transition-all duration-1000 ${step > item.step ? "bg-[#20FFB0]" : "bg-white/5"
                }`} />
            )}
          </div>
        ))}
      </div>

      <div className="card-premium p-8 md:p-20 min-h-[600px] flex flex-col justify-between relative overflow-hidden bg-white/[0.03] border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#20FFB0]/5 rounded-full blur-[120px] -mr-48 -mt-48 transition-all duration-1000"></div>

        {/* STEP 1: Q1-A10 */}
        {step === 1 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div>
              <div className="flex items-center gap-3 text-[#20FFB0] font-black uppercase tracking-widest text-[10px] mb-4">
                <ShieldCheckIcon className="w-4 h-4" /> Neural Phase 01
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Core Social Intake</h2>
              <p className="text-white/40 font-medium max-w-2xl leading-relaxed">Fundamental behavioral markers normalized for early detection analytics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              {QUESTIONS.slice(0, 10).map((q) => (
                <div key={q.id} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-white/80 leading-snug">{q.label}</label>
                    <span className="text-[9px] font-black text-[#20FFB0] bg-[#20FFB0]/5 px-2 py-1 rounded uppercase tracking-widest">{q.category}</span>
                  </div>
                  <div className="flex gap-4">
                    {["0", "1"].map((val) => (
                      <button
                        key={val}
                        onClick={() => handleInputChange(q.id, val)}
                        className={`flex-1 py-4 rounded-[1.25rem] border-2 text-xs font-black uppercase tracking-widest transition-all duration-300 ${form[q.id] === val
                          ? "bg-[#20FFB0] border-[#20FFB0] text-[#0A0B1E] shadow-[0_0_15px_rgba(32,255,176,0.2)]"
                          : "border-white/5 bg-white/5 text-white/40 hover:border-white/20"
                          }`}
                      >
                        {val === "1" ? "Positive" : "Negative"}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Expanded Q11-A14 */}
        {step === 2 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div>
              <div className="flex items-center gap-3 text-[#20FFB0] font-black uppercase tracking-widest text-[10px] mb-4">
                <SparklesIcon className="w-4 h-4" /> Neural Phase 02
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Expanded Neuro-Markers</h2>
              <p className="text-white/40 font-medium max-w-2xl leading-relaxed">Analyzing sensory processing and motor patterns for high-fidelity risk profiling.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {QUESTIONS.slice(10, 14).map((q) => (
                <div key={q.id} className="space-y-4 p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-black text-[#20FFB0] uppercase tracking-widest">{q.category}</span>
                  </div>
                  <label className="text-sm font-bold text-white/80 block mb-6 leading-relaxed">{q.label}</label>
                  <div className="flex gap-4">
                    {["0", "1"].map((val) => (
                      <button
                        key={val}
                        onClick={() => handleInputChange(q.id, val)}
                        className={`flex-1 py-4 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${form[q.id] === val
                          ? "bg-[#20FFB0] border-[#20FFB0] text-[#0A0B1E]"
                          : "border-white/5 bg-white/5 text-white/30 hover:border-white/10"
                          }`}
                      >
                        {val === "1" ? "Detected" : "None"}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Demographic & Bio */}
        {step === 3 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div>
              <div className="flex items-center gap-3 text-[#20FFB0] font-black uppercase tracking-widest text-[10px] mb-4">
                <AcademicCapIcon className="w-4 h-4" /> Neural Phase 03
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Clinical Context</h2>
              <p className="text-white/40 font-medium max-w-2xl leading-relaxed">Statistical normalization based on developmental milestones.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {QUESTIONS.slice(14).map((q) => (
                <div key={q.id} className="space-y-4">
                  <label className="text-sm font-bold text-white/80 flex items-center gap-2">
                    {q.label}
                  </label>
                  {q.type === "number" ? (
                    <input
                      type="number"
                      className="w-full bg-white/5 border-2 border-white/5 rounded-[1.25rem] px-8 py-5 text-white font-bold focus:border-[#20FFB0] focus:bg-white/[0.08] outline-none transition-all shadow-inner"
                      onChange={(e) => handleInputChange(q.id, e.target.value)}
                      value={form[q.id] || ""}
                    />
                  ) : (
                    <div className="flex gap-4">
                      {["0", "1"].map((val) => (
                        <button
                          key={val}
                          onClick={() => handleInputChange(q.id, val)}
                          className={`flex-1 py-4 rounded-[1.25rem] border-2 text-[10px] font-black uppercase tracking-widest transition-all ${form[q.id] === val
                            ? "bg-[#20FFB0] border-[#20FFB0] text-[#0A0B1E]"
                            : "border-white/5 bg-white/5 text-white/30 hover:border-white/10"
                            }`}
                        >
                          {val === "1" ? "Significant" : "Standard"}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Video Upload */}
        {step === 4 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700 flex flex-col items-center">
            <div className="text-center">
              <div className="flex justify-center items-center gap-3 text-[#20FFB0] font-black uppercase tracking-widest text-[10px] mb-4">
                <VideoCameraIcon className="w-4 h-4" /> Biometric Analysis
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Neural Vision Integration</h2>
              <p className="text-white/40 font-medium max-w-xl mx-auto leading-relaxed">Processing biometric joint markers and eye-gaze through the core neural model.</p>
            </div>

            <label className="w-full max-w-3xl h-96 border-4 border-dashed border-white/10 rounded-[4rem] flex flex-col items-center justify-center gap-8 hover:border-[#20FFB0]/40 hover:bg-[#20FFB0]/5 cursor-pointer transition-all duration-500 bg-white/[0.02] group">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              />
              {videoFile ? (
                <div className="text-center bg-white/[0.05] p-16 rounded-[3.5rem] border border-white/10 animate-in zoom-in duration-500 backdrop-blur-xl">
                  <div className="w-20 h-20 rounded-[2.5rem] bg-[#20FFB0] flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(32,255,176,0.4)]">
                    <CheckCircleIcon className="w-10 h-10 text-[#0A0B1E]" />
                  </div>
                  <p className="text-xl font-black text-white mb-2">{videoFile.name}</p>
                  <p className="text-[10px] text-[#20FFB0] font-black uppercase tracking-[0.3em]">Payload Ready: Analyzing</p>
                </div>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#20FFB0] group-hover:rotate-6 transition-all duration-700 shadow-xl group-hover:shadow-[0_0_30px_rgba(32,255,176,0.3)]">
                    <VideoCameraIcon className="w-10 h-10 text-white/30 group-hover:text-[#0A0B1E]" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-xl font-black text-white">Upload Neural Data Record</p>
                    <p className="text-xs text-white/30 font-medium uppercase tracking-widest">MP4 / WEBM (Stream Max 50MB)</p>
                  </div>
                </>
              )}
            </label>
            <div className="flex items-center gap-3 p-5 bg-white/[0.03] rounded-2xl border border-white/5 max-w-2xl">
              <ExclamationTriangleIcon className="w-5 h-5 text-[#20FFB0] flex-shrink-0" />
              <p className="text-xs text-white/40 font-medium leading-relaxed italic">
                "Ensure standard lighting and full-body visibility for biometric tracking protocols."
              </p>
            </div>
          </div>
        )}

        {/* STEP 5: RESULTS */}
        {step === 5 && result && (
          <div className="space-y-16 animate-in fade-in zoom-in duration-1000 py-10">
            <div className="flex flex-col items-center text-center">
              <div className={`w-28 h-28 md:w-32 md:h-32 rounded-[40px] md:rounded-[48px] flex items-center justify-center mb-8 md:mb-10 rotate-3 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] ${result.risk_category === "High Risk" ? "bg-red-500 shadow-red-500/30" :
                result.risk_category === "Moderate Risk" ? "bg-orange-500 shadow-orange-500/30" : "bg-[#20FFB0] shadow-[0_0_30px_rgba(32,255,176,0.3)]"
                }`}>
                <ShieldCheckIcon className={`w-14 h-14 md:w-16 md:h-16 ${result.risk_category === "Low Risk" ? "text-[#0A0B1E]" : "text-white"}`} />
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">Diagnostic Output</h2>
              <div className="inline-flex gap-3 items-center px-4 py-2 bg-[#20FFB0]/10 text-[#20FFB0] text-[10px] font-black uppercase tracking-[0.4em] rounded-full border border-[#20FFB0]/20">
                Encrypted Neural Token Verified
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="p-10 md:p-14 rounded-[3.5rem] bg-white/[0.03] border border-white/10 flex flex-col justify-between backdrop-blur-xl">
                <div>
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Risk Probability Matrix</p>
                  <h3 className={`text-4xl md:text-6xl font-black mb-6 tracking-tighter ${result.risk_category === "High Risk" ? "text-red-500" :
                    result.risk_category === "Moderate Risk" ? "text-orange-500" : "text-[#20FFB0]"
                    }`}>
                    {result.risk_category}
                  </h3>
                  <p className="text-white/40 font-medium leading-relaxed text-lg">System analytics confirms current behavioral trajectory.</p>
                </div>
                <div className="mt-12">
                  <div className="h-4 bg-white/5 rounded-full overflow-hidden flex p-0.5 border border-white/10">
                    <div className={`h-full rounded-full transition-all duration-2000 ease-out shadow-[0_0_15px_rgba(0,0,0,0.5)] ${result.risk_category === "High Risk" ? "bg-red-500" :
                      result.risk_category === "Moderate Risk" ? "bg-orange-500" : "bg-[#20FFB0]"
                      }`} style={{ width: `${result.final_risk * 100}%` }} />
                  </div>
                  <div className="flex justify-between mt-5">
                    <span className="text-[10px] font-black text-white/20 tracking-[0.2em] uppercase">Negative</span>
                    <span className="text-xs font-black text-white uppercase tracking-widest">{(result.final_risk * 100).toFixed(1)}% Load</span>
                    <span className="text-[10px] font-black text-white/20 tracking-[0.2em] uppercase">Spectrum</span>
                  </div>
                </div>
              </div>

              <div className="p-10 md:p-14 rounded-[3.5rem] bg-white/[0.02] border border-white/5 flex flex-col justify-between">
                <div>
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Core Engine Confidence</p>
                  <div className="text-6xl md:text-7xl font-black text-white/90 mb-6 tracking-tighter">{(result.confidence * 100).toFixed(0)}%</div>
                  <p className="text-white/30 font-medium leading-relaxed italic text-lg opacity-80 max-w-xs">"Multimodal training sets provide verified clinical relevance."</p>
                </div>
                <div className="space-y-5 mt-12 border-t border-white/5 pt-10">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-white/30">Tabular Input Load</span>
                    <span className="text-white">{result.risk_breakdown["tabular_contribution_%"]}%</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-white/30">Biometric CV Load</span>
                    <span className="text-white">{result.risk_breakdown["video_contribution_%"]}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12 md:p-16 rounded-[4rem] bg-[#20FFB0] text-[#0A0B1E] shadow-[0_48px_96px_-16px_rgba(32,255,176,0.3)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 rounded-full blur-[120px] -mr-64 -mt-64 group-hover:scale-110 transition-transform duration-1000"></div>
              <h3 className="text-2xl md:text-3xl font-black mb-12 flex items-center gap-5 relative z-10 tracking-tight">
                <SparklesIcon className="w-8 h-8 md:w-10 md:h-10 text-[#0A0B1E]/60" />
                Strategic Intervention Protocol
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10">
                <div>
                  <p className="text-[#0A0B1E]/40 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Intervention Intensity</p>
                  <p className="text-2xl md:text-3xl font-bold leading-tight tracking-tight">{result.therapy_plan.intervention_intensity}</p>
                </div>
                <div>
                  <p className="text-[#0A0B1E]/40 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Focus Architecture</p>
                  <div className="flex flex-wrap gap-3">
                    {result.therapy_plan.focus_areas?.map((area: string, i: number) => (
                      <span key={i} className="px-5 py-2.5 rounded-xl bg-white/20 text-[#0A0B1E] text-[10px] font-black uppercase tracking-widest border border-white/20">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <button onClick={() => window.location.reload()} className="flex-1 py-6 rounded-[2rem] bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white/10 transition-all active:scale-95">Reset Session</button>
              <button
                onClick={downloadPDF}
                className="flex-1 py-6 rounded-[2rem] bg-white text-[#0A0B1E] font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 hover:bg-[#20FFB0] transition-all shadow-2xl active:scale-95"
              >
                <DocumentArrowDownIcon className="w-6 h-6" />
                Generate Verification PDF
              </button>
            </div>
          </div>
        )}

        {/* NAVIGATION BUTTONS */}
        {step < 5 && (
          <div className="flex justify-between mt-20 pt-16 border-t border-white/5">
            <button
              onClick={prevStep}
              disabled={step === 1 || loading}
              className="flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 rounded-[2rem] border-2 border-white/5 text-white/30 font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-white/5 disabled:opacity-20 transition-all hover:text-white"
            >
              <ArrowLeftIcon className="w-5 h-5" /> Back
            </button>

            {step < 4 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-3 px-10 md:px-16 py-4 md:py-5 rounded-[2rem] bg-white text-[#0A0B1E] font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-[#20FFB0] transition-all shadow-[0_0_20px_rgba(32,255,176,0.2)] active:scale-95"
              >
                Forward <ArrowRightIcon className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || !videoFile}
                className="flex items-center gap-3 px-10 md:px-16 py-4 md:py-5 rounded-[2rem] bg-[#20FFB0] text-[#0A0B1E] font-black uppercase tracking-widest text-[9px] md:text-[10px] disabled:opacity-30 transition-all shadow-[0_0_30px_rgba(32,255,176,0.3)] active:scale-95"
              >
                {loading ? "Neural Synthesis..." : "Run Analysis"}
                {!loading && <ShieldCheckIcon className="w-6 h-6" />}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Trust Footer */}
      <div className="mt-20 text-center flex flex-col items-center gap-6">
        <p className="text-[9px] md:text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Neural Protocol Verification 4.1.0</p>
        <div className="flex gap-8 opacity-10 filter grayscale group-hover:grayscale-0 transition-all duration-700">
          <ShieldCheckIcon className="w-8 h-8 text-white" />
          <AcademicCapIcon className="w-8 h-8 text-white" />
          <SparklesIcon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
}
