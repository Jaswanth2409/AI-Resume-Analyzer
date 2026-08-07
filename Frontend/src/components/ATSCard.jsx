import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TrendingUp } from "lucide-react";

function ATSCard({ score }) {
  const getColor = () => {
    if (score >= 80) return "#22C55E";
    if (score >= 60) return "#06B6D4";
    return "#EF4444";
  };

  const getStatus = () => {
    if (score >= 90) return "Excellent Resume";
    if (score >= 80) return "Very Strong";
    if (score >= 70) return "Good Resume";
    if (score >= 60) return "Average Resume";
    return "Needs Improvement";
  };

  const getMessage = () => {
    if (score >= 80)
      return "Your resume is well optimized for ATS systems.";

    if (score >= 60)
      return "A few improvements can significantly increase your ATS score.";

    return "Improve your resume before applying to companies.";
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl p-8 hover:shadow-cyan-500/10 transition-all duration-300">

      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">

          <TrendingUp
            size={24}
            className="text-cyan-400"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            ATS Score
          </h2>

          <p className="text-slate-400 text-sm">
            Applicant Tracking Score
          </p>

        </div>

      </div>

      <div className="w-52 h-52 mx-auto">

        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            pathColor: getColor(),
            trailColor: "#1E293B",
            textColor: getColor(),
            textSize: "16px",
            strokeLinecap: "round"
          })}
        />

      </div>

      <div className="mt-8 text-center">

        <h3
          className="text-2xl font-bold"
          style={{
            color: getColor()
          }}
        >
          {getStatus()}
        </h3>

        <p className="text-slate-400 mt-3 leading-7">
          {getMessage()}
        </p>

      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">

        <div className="bg-slate-800 rounded-2xl p-4">

          <h4 className="text-slate-400 text-sm">
            Resume
          </h4>

          <p className="text-white font-bold mt-2">
            AI
          </p>

        </div>

        <div className="bg-slate-800 rounded-2xl p-4">

          <h4 className="text-slate-400 text-sm">
            Score
          </h4>

          <p
            className="font-bold mt-2"
            style={{
              color: getColor()
            }}
          >
            {score}/100
          </p>

        </div>

        <div className="bg-slate-800 rounded-2xl p-4">

          <h4 className="text-slate-400 text-sm">
            Status
          </h4>

          <p
            className="font-bold mt-2"
            style={{
              color: getColor()
            }}
          >
            {score >= 80 ? "Pass" : "Review"}
          </p>

        </div>

      </div>

    </div>
  );
}

export default ATSCard;