import { BrainCircuit, Sparkles } from "lucide-react";

function Loader() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl p-12 flex flex-col items-center justify-center">

      {/* Animated AI Icon */}

      <div className="relative">

        <div className="w-24 h-24 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>

        <div className="absolute inset-0 flex items-center justify-center">

          <BrainCircuit
            size={42}
            className="text-cyan-400"
          />

        </div>

      </div>

      {/* Heading */}

      <h2 className="text-3xl font-bold text-white mt-8">

        AI is Analyzing Your Resume...

      </h2>

      <p className="text-slate-400 mt-4 text-center max-w-xl leading-8">

        Please wait while our AI extracts your resume,
        evaluates ATS compatibility, identifies technical and
        soft skills, finds missing keywords, generates
        personalized suggestions, and prepares your report.

      </p>

      {/* Progress Bar */}

      <div className="w-full max-w-xl mt-10">

        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">

          <div className="h-full w-1/2 bg-cyan-500 animate-pulse rounded-full"></div>

        </div>

      </div>

      {/* Status Cards */}

      <div className="grid md:grid-cols-3 gap-4 mt-10 w-full">

        <div className="bg-slate-800 rounded-2xl p-5 text-center">

          <Sparkles
            size={26}
            className="mx-auto text-cyan-400 mb-3"
          />

          <h3 className="font-semibold text-white">

            ATS Analysis

          </h3>

          <p className="text-slate-400 text-sm mt-2">

            Calculating resume score

          </p>

        </div>

        <div className="bg-slate-800 rounded-2xl p-5 text-center">

          <Sparkles
            size={26}
            className="mx-auto text-green-400 mb-3"
          />

          <h3 className="font-semibold text-white">

            Skills Detection

          </h3>

          <p className="text-slate-400 text-sm mt-2">

            Extracting skills

          </p>

        </div>

        <div className="bg-slate-800 rounded-2xl p-5 text-center">

          <Sparkles
            size={26}
            className="mx-auto text-yellow-400 mb-3"
          />

          <h3 className="font-semibold text-white">

            AI Suggestions

          </h3>

          <p className="text-slate-400 text-sm mt-2">

            Preparing recommendations

          </p>

        </div>

      </div>

    </div>
  );
}

export default Loader;