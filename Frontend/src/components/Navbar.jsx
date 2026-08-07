import { LogOut, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-lg border-b border-slate-800">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">

            <FileText className="text-white" size={26} />

          </div>

          <div>

            <h1 className="text-2xl font-bold text-white">
              AI Resume Analyzer
            </h1>

            <p className="text-sm text-slate-400">
              Smart Resume Insights
            </p>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300 flex items-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;