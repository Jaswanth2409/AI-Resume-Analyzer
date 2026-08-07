import { useEffect, useState } from "react";
import {
  FileText,
  Eye,
  CalendarDays,
  Trophy,
} from "lucide-react";

import api from "../services/api";

function ResumeHistory({ setAnalysis }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/my-resumes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const viewAnalysis = async (resumeId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        `/analysis/${resumeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalysis(response.data);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl p-8">

      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">

          <FileText
            size={24}
            className="text-cyan-400"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            Resume History
          </h2>

          <p className="text-slate-400 text-sm">
            Previously analyzed resumes
          </p>

        </div>

      </div>

      {history.length === 0 ? (

        <div className="py-12 text-center">

          <FileText
            size={55}
            className="mx-auto text-slate-600"
          />

          <p className="mt-5 text-slate-500">
            No Resume Uploaded Yet
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {history.map((resume) => (

            <div
              key={resume.resume_id}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">

                    <FileText
                      size={20}
                      className="text-cyan-400"
                    />

                    {resume.filename}

                  </h3>

                  <div className="flex items-center gap-2 mt-3 text-slate-400">

                    <CalendarDays size={16} />

                    <span>
                      Resume Analysis
                    </span>

                  </div>

                </div>

                <div className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-xl font-bold">

                  ATS {resume.ats_score}

                </div>

              </div>

              <div className="flex justify-between items-center mt-6">

                <div className="flex items-center gap-2 text-green-400">

                  <Trophy size={18} />

                  AI Analyzed

                </div>

                <button
                  onClick={() =>
                    viewAnalysis(
                      resume.resume_id
                    )
                  }
                  className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 transition px-5 py-2 rounded-xl font-semibold"
                >

                  <Eye size={18} />

                  View Analysis

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default ResumeHistory;