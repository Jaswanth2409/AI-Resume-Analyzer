import { Code2 } from "lucide-react";

function SkillsCard({ title, skills }) {

  let skillList = [];

  try {
    if (Array.isArray(skills)) {
      skillList = skills;
    } else if (typeof skills === "string") {
      skillList = JSON.parse(skills);
    }
  } catch (err) {
    skillList = [];
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl p-8 hover:shadow-cyan-500/10 transition-all duration-300">

      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">

          <Code2
            size={24}
            className="text-cyan-400"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            {title}
          </h2>

          <p className="text-slate-400 text-sm">
            AI detected skills
          </p>

        </div>

      </div>

      {skillList.length === 0 ? (

        <div className="text-center py-10">

          <p className="text-slate-500">
            No Skills Found
          </p>

        </div>

      ) : (

        <div className="flex flex-wrap gap-4">

          {skillList.map((skill, index) => (

            <div
              key={index}
              className="bg-slate-800 hover:bg-cyan-500 hover:text-white transition-all duration-300 border border-slate-700 rounded-2xl px-5 py-3 font-medium text-cyan-300 cursor-default"
            >
              {skill}
            </div>

          ))}

        </div>

      )}

      <div className="mt-8 border-t border-slate-800 pt-5">

        <p className="text-slate-400 text-sm">

          <span className="text-cyan-400 font-semibold">
            Total Skills:
          </span>{" "}
          {skillList.length}

        </p>

      </div>

    </div>
  );
}

export default SkillsCard;