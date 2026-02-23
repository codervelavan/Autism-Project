"use client";

import { useState } from "react";
import axios from "axios";

export default function Screening() {

  const [form, setForm] = useState({
    A1: "",
    A2: "",
    A3: "",
    A4: "",
    A5: "",
    A6: "",
    A7: "",
    A8: "",
    A9: "",
    A10: "",
    Age_Mons: "",
    Qchat_10_Score: "",
    Jaundice: "",
    Family_mem_with_ASD: ""
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      if (videoFile) {
        formData.append("file", videoFile);
      }

      const res = await axios.post(
        "http://127.0.0.1:8000/screening/multimodal",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data);
      setLoading(false);

    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-10">

      <h1 className="text-3xl font-bold mb-6">
        AI Multimodal Autism Screening
      </h1>

      {/* Questionnaire Inputs */}
      <div className="grid grid-cols-2 gap-4 mb-6">

        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            className="p-3 rounded text-black"
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
          />
        ))}

      </div>

      {/* Video Upload */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">
          Upload Child Video
        </label>

        <input
          type="file"
          accept="video/*"
          className="p-2 rounded text-black w-full"
          onChange={(e) => {
            if (e.target.files) {
              setVideoFile(e.target.files[0]);
            }
          }}
        />
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Analyzing..." : "Run AI Analysis"}
      </button>

      {/* Result Section */}
      {result && (
        <div className="mt-10 p-6 bg-[#1e293b] rounded-xl shadow-xl">

          <h2 className="text-xl font-semibold mb-4">
            Multimodal Risk Analysis Result
          </h2>

          <p>
            <strong>Final Risk:</strong>{" "}
            {(result.final_risk * 100).toFixed(2)}%
          </p>

          <p>
            <strong>Risk Category:</strong>{" "}
            {result.risk_category}
          </p>

          <p>
            <strong>Confidence:</strong>{" "}
            {(result.confidence * 100).toFixed(2)}%
          </p>

          <div className="mt-4">
            <h3 className="font-semibold">Risk Breakdown</h3>

            <p>
              Tabular Contribution:{" "}
              {result.risk_breakdown["tabular_contribution_%"]}%
            </p>

            <p>
              Video Contribution:{" "}
              {result.risk_breakdown["video_contribution_%"]}%
            </p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Therapy Recommendation</h3>

            <p>
              Intervention Intensity:{" "}
              {result.therapy_plan.intervention_intensity}
            </p>

            <p>
              Recommended Focus Areas:{" "}
              {result.therapy_plan.focus_areas?.join(", ")}
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
