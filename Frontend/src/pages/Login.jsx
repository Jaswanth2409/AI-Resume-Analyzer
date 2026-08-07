import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.access_token);

      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.detail);
      } else {
        alert("Server Error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >

        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-10">

          <div className="flex justify-center">

            <div className="w-20 h-20 rounded-2xl bg-cyan-500/20 flex items-center justify-center">

              <LogIn
                size={38}
                className="text-cyan-400"
              />

            </div>

          </div>

          <h1 className="text-4xl font-bold text-center text-white mt-6">

            Welcome Back

          </h1>

          <p className="text-slate-400 text-center mt-3">

            Login to continue your AI Resume Journey

          </p>

          <form
            onSubmit={handleLogin}
            className="mt-10 space-y-6"
          >

            <div>

              <label className="text-slate-300 text-sm">

                Email Address

              </label>

              <div className="mt-2 flex items-center bg-slate-800 rounded-2xl border border-slate-700 px-4">

                <Mail
                  size={20}
                  className="text-slate-400"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none px-4 py-4 text-white"
                  required
                />

              </div>

            </div>

            <div>

              <label className="text-slate-300 text-sm">

                Password

              </label>

              <div className="mt-2 flex items-center bg-slate-800 rounded-2xl border border-slate-700 px-4">

                <Lock
                  size={20}
                  className="text-slate-400"
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none px-4 py-4 text-white"
                  required
                />

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/30 w-full flex justify-center items-center gap-3"
            >

              {loading ? "Signing In..." : "Login"}

            </button>

          </form>

          <p className="text-center text-slate-400 mt-8">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-cyan-400 hover:text-cyan-300 font-semibold"
            >

              Register

            </Link>

          </p>

        </div>

      </motion.div>

    </div>
  );
}

export default Login;