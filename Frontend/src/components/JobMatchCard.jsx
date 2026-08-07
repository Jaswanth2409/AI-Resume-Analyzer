import { useState } from "react";
import {
  Briefcase,
  Target,
  CheckCircle,
  XCircle,
  Lightbulb,
} from "lucide-react";
import api from "../services/api";

function JobMatchCard({ resumeId }) {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeJob = async () => {
    if (!jobDescription.trim()) {
      alert("Please paste a Job Description.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.post(
        `/job-match/${resumeId}`,
        {
          job_description: jobDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(response.data);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.detail ||
        "Unable to analyze Job Description."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">

          <Briefcase
            size={28}
            className="text-cyan-400"
          />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-white">

            Job Description Match

          </h2>

          <p className="text-slate-400">

            Compare your resume with a job description using AI.

          </p>

        </div>

      </div>

      {/* Textarea */}

      <textarea
        rows={10}
        placeholder="Paste the complete Job Description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-5 text-white outline-none resize-none focus:border-cyan-500"
      />

      <button
        onClick={analyzeJob}
        disabled={loading}
       className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/30 mt-6"
      >
        {loading ? "Analyzing..." : "Analyze Job Match"}
      </button>

      {result && (

        <>

          {/* Match Score */}

          <div className="mt-10 bg-slate-800 rounded-3xl p-8 text-center">

            <Target
              size={45}
              className="mx-auto text-cyan-400"
            />

            <h2 className="text-5xl font-bold mt-5 text-cyan-400">

              {result.match_score}%

            </h2>

            <p className="text-slate-400 mt-2">

              Overall Match Score

            </p>

          </div>

          {/* Skills */}

          <div className="grid lg:grid-cols-2 gap-6 mt-8">

            {/* Matching Skills */}

            <div className="bg-slate-800 rounded-3xl p-6">

              <div className="flex items-center gap-3 mb-5">

                <CheckCircle
                  className="text-green-400"
                />

                <h3 className="text-2xl font-bold">

                  Matching Skills

                </h3>

              </div>

              <div className="flex flex-wrap gap-3">

                {result.matching_skills.map((skill, index) => (

                  <span
                    key={index}
                    className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full font-semibold"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

            {/* Missing Skills */}

            <div className="bg-slate-800 rounded-3xl p-6">

              <div className="flex items-center gap-3 mb-5">

                <XCircle
                  className="text-red-400"
                />

                <h3 className="text-2xl font-bold">

                  Missing Skills

                </h3>

              </div>

              <div className="flex flex-wrap gap-3">

                {result.missing_skills.map((skill, index) => (

                  <span
                    key={index}
                    className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full font-semibold"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

          </div>

          {/* Suggestions */}

          <div className="mt-8 bg-slate-800 rounded-3xl p-8">

            <div className="flex items-center gap-3 mb-6">

              <Lightbulb
                className="text-yellow-400"
              />

              <h3 className="text-2xl font-bold">

                AI Recommendations

              </h3>

            </div>

            <div className="space-y-4">

              {result.suggestions.map((item, index) => (

                <div
                  key={index}
                  className="bg-slate-900 border border-slate-700 rounded-2xl p-4"
                >

                  <p className="text-slate-300">

                    {item}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </>

      )}

    </div>
  );
}

export default JobMatchCard;