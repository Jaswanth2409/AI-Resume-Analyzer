import { useState } from "react";
import { UploadCloud, FileText } from "lucide-react";
import api from "../services/api";

function UploadCard({ setAnalysis, setLoading, setResumeId }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await api.post(
        "/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const resumeId = uploadResponse.data.resume_id;

      setResumeId(resumeId);

      const analysisResponse = await api.get(
        `/analysis/${resumeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalysis(analysisResponse.data);

      alert("Resume analyzed successfully!");

    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.detail);
      } else {
        alert("Something went wrong.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl p-8">

      <div className="flex items-center gap-3 mb-2">
        <UploadCloud className="text-cyan-400" size={32} />
        <h2 className="text-3xl font-bold text-white">
          Upload Resume
        </h2>
      </div>

      <p className="text-slate-400 mb-8">
        Upload your latest resume and receive an AI-powered ATS analysis.
      </p>

      <label className="border-2 border-dashed border-cyan-500 hover:border-cyan-400 transition rounded-3xl p-14 flex flex-col items-center justify-center cursor-pointer bg-slate-950">

        <UploadCloud
          size={60}
          className="text-cyan-400 mb-5"
        />

        <h3 className="text-2xl font-semibold text-white">
          Drag & Drop Resume
        </h3>

        <p className="text-slate-400 mt-2">
          or click to browse
        </p>

        <span className="text-sm text-slate-500 mt-3">
          PDF files only
        </span>

        <input
          type="file"
          accept=".pdf"
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />

      </label>

      {file && (
        <div className="mt-8 bg-slate-800 rounded-2xl p-5 flex items-center gap-4">

          <FileText
            className="text-cyan-400"
            size={30}
          />

          <div>

            <h3 className="text-white font-semibold">
              {file.name}
            </h3>

            <p className="text-slate-400 text-sm">
              Ready for AI Analysis
            </p>

          </div>

        </div>
      )}

      <button
        onClick={handleUpload}
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/30 mt-8 w-full"
      >
        🚀 Analyze Resume
      </button>

    </div>
  );
}

export default UploadCard;