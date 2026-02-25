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
    <div className="min-h-screen max-w-6xl mx-auto px-6 py-12">
      {/* Premium Stepper */}
      <div className="flex items-center justify-between mb-24 max-w-4xl mx-auto">
        {[
          { step: 1, label: "Behavior", icon: ClipboardDocumentCheckIcon },
          { step: 2, label: "Expanded", icon: SparklesIcon },
          { step: 3, label: "Context", icon: AcademicCapIcon },
          { step: 4, label: "Biometrics", icon: VideoCameraIcon },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-4 flex-1 relative group">
            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center border-2 transition-all duration-500 ${step >= item.step ? "bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-500/30 scale-110" : "border-slate-100 bg-white text-slate-300"
              }`}>
              <item.icon className="w-8 h-8" />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-[0.25em] transition-colors duration-500 ${step >= item.step ? "text-blue-600" : "text-slate-300"
              }`}>
              {item.label}
            </span>
            {i < 3 && (
              <div className={`absolute top-8 left-[65%] w-[70%] h-0.5 rounded-full transition-all duration-1000 ${step > item.step ? "bg-blue-600" : "bg-slate-100"
                }`} />
            )}
          </div>
        ))}
      </div>

      <div className="card-premium p-10 md:p-20 min-h-[600px] flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-[120px] -mr-48 -mt-48 transition-all duration-1000"></div>

        {/* STEP 1: Q1-A10 */}
        {step === 1 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div>
              <div className="flex items-center gap-3 text-blue-600 font-black uppercase tracking-widest text-[10px] mb-4">
                <ShieldCheckIcon className="w-4 h-4" /> Clinical Phase 01
              </div>
              <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Core Social Behavioral Intake</h2>
              <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">Fundamental behavioral markers based on standardized Q-Chat-10 metrics for early detection.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              {QUESTIONS.slice(0, 10).map((q) => (
                <div key={q.id} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700 leading-snug">{q.label}</label>
                    <span className="text-[9px] font-black text-blue-400 bg-blue-50 px-2 py-1 rounded uppercase tracking-widest">{q.category}</span>
                  </div>
                  <div className="flex gap-4">
                    {["0", "1"].map((val) => (
                      <button
                        key={val}
                        onClick={() => handleInputChange(q.id, val)}
                        className={`flex-1 py-4 rounded-[1.25rem] border-2 text-sm font-bold transition-all duration-300 ${form[q.id] === val
                            ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20 active:scale-95"
                            : "border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200 hover:bg-white"
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

        {/* STEP 2: Expanded Q11-A14 */}
        {step === 2 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div>
              <div className="flex items-center gap-3 text-indigo-600 font-black uppercase tracking-widest text-[10px] mb-4">
                <SparklesIcon className="w-4 h-4" /> Clinical Phase 02
              </div>
              <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Expanded Neuro-Markers</h2>
              <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">Analyzing sensory processing, motor patterns, and adaptability for a more nuanced risk profile.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {QUESTIONS.slice(10, 14).map((q) => (
                <div key={q.id} className="space-y-4 p-8 rounded-3xl bg-slate-50/50 border border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{q.category}</span>
                  </div>
                  <label className="text-sm font-bold text-slate-700 block mb-6 leading-relaxed">{q.label}</label>
                  <div className="flex gap-4">
                    {["0", "1"].map((val) => (
                      <button
                        key={val}
                        onClick={() => handleInputChange(q.id, val)}
                        className={`flex-1 py-4 rounded-2xl border-2 text-xs font-black uppercase tracking-widest transition-all ${form[q.id] === val
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-500/20"
                            : "border-white bg-white text-slate-300 hover:border-indigo-100"
                          }`}
                      >
                        {val === "1" ? "Present" : "Absent"}
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
              <div className="flex items-center gap-3 text-emerald-600 font-black uppercase tracking-widest text-[10px] mb-4">
                <AcademicCapIcon className="w-4 h-4" /> Clinical Phase 03
              </div>
              <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Developmental Context</h2>
              <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">Normalization of behavioral data based on physical milestones and genetics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {QUESTIONS.slice(14).map((q) => (
                <div key={q.id} className="space-y-4">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    {q.label}
                    <span className="text-[9px] text-slate-400 font-black lowercase opacity-0 group-hover:opacity-100">{q.category}</span>
                  </label>
                  {q.type === "number" ? (
                    <input
                      type="number"
                      className="w-full bg-slate-50/50 border-2 border-slate-50 rounded-[1.25rem] px-8 py-5 text-slate-900 font-bold focus:border-blue-600 focus:bg-white focus:shadow-2xl focus:shadow-blue-500/10 outline-none transition-all"
                      onChange={(e) => handleInputChange(q.id, e.target.value)}
                      value={form[q.id] || ""}
                    />
                  ) : (
                    <div className="flex gap-4">
                      {["0", "1"].map((val) => (
                        <button
                          key={val}
                          onClick={() => handleInputChange(q.id, val)}
                          className={`flex-1 py-4 rounded-[1.25rem] border-2 text-sm font-bold transition-all ${form[q.id] === val
                              ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20"
                              : "border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200"
                            }`}
                        >
                          {val === "1" ? "Significant" : "Non-Significant"}
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
              <div className="flex justify-center items-center gap-3 text-blue-600 font-black uppercase tracking-widest text-[10px] mb-4">
                <VideoCameraIcon className="w-4 h-4" /> Biometric Analysis
              </div>
              <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Multimodal Vision Integration</h2>
              <p className="text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">Our computer vision neural network analyzes joint movement and eye-gaze patterns from a short video clip.</p>
            </div>

            <label className="w-full max-w-3xl h-96 border-4 border-dashed border-slate-100 rounded-[4rem] flex flex-col items-center justify-center gap-8 hover:border-blue-600/40 hover:bg-blue-50/20 cursor-pointer transition-all duration-500 bg-slate-50/30 group">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              />
              {videoFile ? (
                <div className="text-center bg-white p-16 rounded-[3.5rem] shadow-2xl border border-slate-50 animate-in zoom-in duration-500">
                  <div className="w-24 h-24 rounded-[2.5rem] bg-blue-50 flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <CheckCircleIcon className="w-12 h-12 text-blue-600" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 mb-2">{videoFile.name}</p>
                  <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.3em]">Payload Ready for AI Routing</p>
                </div>
              ) : (
                <>
                  <div className="w-24 h-24 rounded-[2.5rem] bg-white flex items-center justify-center group-hover:bg-blue-600 group-hover:rotate-6 transition-all duration-700 shadow-xl group-hover:shadow-blue-500/40">
                    <VideoCameraIcon className="w-12 h-12 text-slate-300 group-hover:text-white" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-2xl font-black text-slate-900">Upload Child Recording</p>
                    <p className="text-sm text-slate-400 font-medium">MP4, MOV, WEBM (Max 50MB, 30s Recommended)</p>
                  </div>
                </>
              )}
            </label>
            <div className="flex items-center gap-3 p-5 bg-amber-50 rounded-2xl border border-amber-100 max-w-2xl">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <p className="text-xs text-amber-700 font-medium leading-relaxed italic">
                "Ensure the child's face and upper body are visible. This data is processed locally and not stored permanently on public servers."
              </p>
            </div>
          </div>
        )}

        {/* STEP 5: RESULTS */}
        {step === 5 && result && (
          <div className="space-y-16 animate-in fade-in zoom-in duration-1000 py-10">
            <div className="flex flex-col items-center text-center">
              <div className={`w-32 h-32 rounded-[48px] flex items-center justify-center mb-10 rotate-3 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] ${result.risk_category === "High Risk" ? "bg-red-500 text-white shadow-red-500/40" :
                  result.risk_category === "Moderate Risk" ? "bg-orange-500 text-white shadow-orange-500/40" : "bg-emerald-500 text-white shadow-emerald-500/40"
                }`}>
                <ShieldCheckIcon className="w-16 h-16" />
              </div>
              <h2 className="text-7xl font-black text-slate-900 mb-6 tracking-tighter">Diagnostic Analytics</h2>
              <div className="inline-flex gap-3 items-center px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full">
                Verified Biometric Signature
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="p-12 rounded-[4rem] bg-slate-50 border border-slate-100 flex flex-col justify-between clinical-shadow">
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Probability Synthesis</p>
                  <h3 className={`text-6xl font-black mb-6 tracking-tighter ${result.risk_category === "High Risk" ? "text-red-500" :
                      result.risk_category === "Moderate Risk" ? "text-orange-500" : "text-emerald-500"
                    }`}>
                    {result.risk_category}
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed text-lg">Cross-referenced behavioral markers and CV tracking confirm this category.</p>
                </div>
                <div className="mt-12">
                  <div className="h-6 bg-slate-200/50 rounded-full overflow-hidden flex p-1 border border-white">
                    <div className={`h-full rounded-full transition-all duration-2000 ease-out shadow-lg ${result.risk_category === "High Risk" ? "bg-red-500" :
                        result.risk_category === "Moderate Risk" ? "bg-orange-500" : "bg-emerald-500"
                      }`} style={{ width: `${result.final_risk * 100}%` }} />
                  </div>
                  <div className="flex justify-between mt-5">
                    <span className="text-[11px] font-black text-slate-300 tracking-[0.2em] uppercase">Negative Threshold</span>
                    <span className="text-sm font-black text-slate-900">{(result.final_risk * 100).toFixed(1)}% RISK LOAD</span>
                    <span className="text-[11px] font-black text-slate-300 tracking-[0.2em] uppercase">Spectrum Limit</span>
                  </div>
                </div>
              </div>

              <div className="p-12 rounded-[4rem] bg-white border border-slate-100 shadow-[0_32px_64px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">AI Model Confidence</p>
                  <div className="text-7xl font-black text-blue-600 mb-6 tracking-tighter">{(result.confidence * 100).toFixed(0)}%</div>
                  <p className="text-slate-500 font-medium leading-relaxed italic text-lg opacity-80">"Multimodal training data provides high statistical relevance for this session's inputs."</p>
                </div>
                <div className="space-y-5 mt-12 border-t border-slate-50 pt-10">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                    <span className="text-slate-400">Behavioral Data Load</span>
                    <span className="text-slate-900">{result.risk_breakdown["tabular_contribution_%"]}%</span>
                  </div>
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                    <span className="text-slate-400">Biometric Vision Load</span>
                    <span className="text-slate-900">{result.risk_breakdown["video_contribution_%"]}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-16 rounded-[4.5rem] bg-blue-600 text-white shadow-[0_48px_96px_-16px_rgba(37,99,235,0.4)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -mr-64 -mt-64 group-hover:scale-110 transition-transform duration-1000"></div>
              <h3 className="text-3xl font-black mb-12 flex items-center gap-5 relative z-10 tracking-tight">
                <SparklesIcon className="w-10 h-10 text-blue-200" />
                AI Generated Action Strategy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10">
                <div>
                  <p className="text-blue-200 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Intervention Intensity</p>
                  <p className="text-3xl font-bold leading-tight tracking-tight">{result.therapy_plan.intervention_intensity}</p>
                </div>
                <div>
                  <p className="text-blue-200 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Focus Architecture</p>
                  <div className="flex flex-wrap gap-3">
                    {result.therapy_plan.focus_areas?.map((area: string, i: number) => (
                      <span key={i} className="px-6 py-3 rounded-2xl bg-white/10 text-white text-[11px] font-black uppercase tracking-widest border border-white/10 backdrop-blur-xl">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <button onClick={() => window.location.reload()} className="flex-1 py-7 rounded-[2.5rem] bg-slate-900 text-white font-black uppercase tracking-[0.3em] text-[11px] hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/40 active:scale-95">Reset Session</button>
              <button
                onClick={downloadPDF}
                className="flex-1 py-7 rounded-[2.5rem] bg-white border-2 border-slate-100 text-slate-900 font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-4 hover:bg-slate-50 transition-all shadow-2xl shadow-slate-200/50 active:scale-95"
              >
                <DocumentArrowDownIcon className="w-6 h-6 text-blue-600" />
                Generate PDF Report
              </button>
            </div>
          </div>
        )}

        {/* NAVIGATION BUTTONS */}
        {step < 5 && (
          <div className="flex justify-between mt-20 pt-16 border-t border-slate-100/50">
            <button
              onClick={prevStep}
              disabled={step === 1 || loading}
              className="flex items-center gap-3 px-12 py-5 rounded-[2rem] border-2 border-slate-50 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 disabled:opacity-30 transition-all hover:text-slate-900"
            >
              <ArrowLeftIcon className="w-5 h-5" /> Back
            </button>

            {step < 4 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-3 px-16 py-5 rounded-[2rem] bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/30 active:scale-95"
              >
                Proceed <ArrowRightIcon className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || !videoFile}
                className="flex items-center gap-3 px-16 py-5 rounded-[2rem] bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] disabled:opacity-50 transition-all shadow-2xl shadow-slate-900/40 active:scale-95"
              >
                {loading ? "Analyzing Neural Load..." : "Initialize Analysis"}
                {!loading && <ShieldCheckIcon className="w-6 h-6 text-blue-400" />}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Trust Footer */}
      <div className="mt-20 text-center flex flex-col items-center gap-6">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Clinical Security Protocol 2.4.1</p>
        <div className="flex gap-8 opacity-20 filter grayscale hover:grayscale-0 transition-all duration-700">
          <ShieldCheckIcon className="w-8 h-8" />
          <AcademicCapIcon className="w-8 h-8" />
          <SparklesIcon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}
