import { Lightbulb } from "lucide-react";

function FeedbackCard({ title, items }) {

  let data = [];

  try {
    if (Array.isArray(items)) {
      data = items;
    } else if (typeof items === "string") {
      data = JSON.parse(items);
    }
  } catch (error) {
    data = [];
  }

  const getColor = () => {
    if (title === "Strengths")
      return {
        bg: "bg-green-500/20",
        text: "text-green-400",
        border: "border-green-500/20",
      };

    if (title === "Weaknesses")
      return {
        bg: "bg-red-500/20",
        text: "text-red-400",
        border: "border-red-500/20",
      };

    if (title === "Missing Skills")
      return {
        bg: "bg-yellow-500/20",
        text: "text-yellow-400",
        border: "border-yellow-500/20",
      };

    return {
      bg: "bg-cyan-500/20",
      text: "text-cyan-400",
      border: "border-cyan-500/20",
    };
  };

  const color = getColor();

  return (
    <div className={`bg-slate-900 border ${color.border} rounded-3xl shadow-xl p-8 hover:-translate-y-1 hover:shadow-cyan-500/10 transition-all duration-300`}>

      <div className="flex items-center gap-3 mb-8">

        <div className={`w-12 h-12 rounded-xl ${color.bg} flex items-center justify-center`}>

          <Lightbulb
            size={24}
            className={color.text}
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            {title}
          </h2>

          <p className="text-slate-400 text-sm">
            AI Generated Insights
          </p>

        </div>

      </div>

      {data.length === 0 ? (

        <div className="text-center py-10">

          <p className="text-slate-500">
            No Data Available
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {data.map((item, index) => (

            <div
              key={index}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex gap-4 items-start hover:border-cyan-500 transition"
            >

              <div className={`mt-1 w-3 h-3 rounded-full ${color.bg}`}></div>

              <p className="text-slate-300 leading-7">
                {item}
              </p>

            </div>

          ))}

        </div>

      )}

      <div className="border-t border-slate-800 mt-8 pt-5">

        <p className="text-sm text-slate-400">

          <span className={color.text}>
            Total:
          </span>{" "}
          {data.length}

        </p>

      </div>

    </div>
  );
}

export default FeedbackCard;