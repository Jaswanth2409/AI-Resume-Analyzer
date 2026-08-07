import { FileText, Award, Trophy, BarChart3 } from "lucide-react";

function StatsCards({ history = [] }) {

  const totalResumes = history.length;

  const highestATS =
    history.length > 0
      ? Math.max(...history.map((r) => r.ats_score))
      : 0;

  const averageATS =
    history.length > 0
      ? Math.round(
          history.reduce((sum, item) => sum + item.ats_score, 0) /
            history.length
        )
      : 0;

  const latestResume =
    history.length > 0
      ? history[history.length - 1].filename
      : "No Resume";

  const cards = [
    {
      title: "Total Resumes",
      value: totalResumes,
      icon: FileText,
      color: "text-cyan-400",
      bg: "bg-cyan-500/20",
    },
    {
      title: "Average ATS",
      value: averageATS,
      icon: BarChart3,
      color: "text-green-400",
      bg: "bg-green-500/20",
    },
    {
      title: "Highest ATS",
      value: highestATS,
      icon: Trophy,
      color: "text-yellow-400",
      bg: "bg-yellow-500/20",
    },
    {
      title: "Latest Resume",
      value: latestResume,
      icon: Award,
      color: "text-purple-400",
      bg: "bg-purple-500/20",
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

      {cards.map((card, index) => {

        const Icon = card.icon;

        return (

          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl p-6 hover:border-cyan-500 transition-all duration-300 hover:-translate-y-1"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400 text-sm">
                  {card.title}
                </p>

                <h2
                  className={`mt-4 font-bold text-3xl ${card.color}`}
                >
                  {card.value}
                </h2>

              </div>

              <div
                className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center`}
              >

                <Icon
                  className={card.color}
                  size={28}
                />

              </div>

            </div>

          </div>

        );

      })}

    </div>
  );
}

export default StatsCards;