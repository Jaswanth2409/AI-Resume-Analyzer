import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, User, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/register", {
    full_name: name,
    email,
    password,
});

      alert("Registration Successful");

      navigate("/");

    } catch (error) {
    console.log(error);

    if (error.response) {

        const message =
            error.response.data.detail ||
            error.response.data.message ||
            JSON.stringify(error.response.data);

        alert(message);

    } else {

        alert(error.message);

    }
}
    
    finally {

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

              <UserPlus
                size={38}
                className="text-cyan-400"
              />

            </div>

          </div>

          <h1 className="text-4xl font-bold text-center text-white mt-6">

            Create Account

          </h1>

          <p className="text-slate-400 text-center mt-3">

            Join AI Resume Analyzer and improve your resume.

          </p>

          <form
            onSubmit={handleRegister}
            className="mt-10 space-y-6"
          >

            {/* Name */}

            <div>

              <label className="text-slate-300 text-sm">

                Full Name

              </label>

              <div className="mt-2 flex items-center bg-slate-800 border border-slate-700 rounded-2xl px-4">

                <User
                  size={20}
                  className="text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-transparent outline-none px-4 py-4 text-white"
                  required
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label className="text-slate-300 text-sm">

                Email Address

              </label>

              <div className="mt-2 flex items-center bg-slate-800 border border-slate-700 rounded-2xl px-4">

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

            {/* Password */}

            <div>

              <label className="text-slate-300 text-sm">

                Password

              </label>

              <div className="mt-2 flex items-center bg-slate-800 border border-slate-700 rounded-2xl px-4">

                <Lock
                  size={20}
                  className="text-slate-400"
                />

                <input
                  type="password"
                  placeholder="Create a password"
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

              {loading ? "Creating Account..." : "Register"}

            </button>

          </form>

          <p className="text-center text-slate-400 mt-8">

            Already have an account?{" "}

            <Link
              to="/"
              className="text-cyan-400 hover:text-cyan-300 font-semibold"
            >

              Login

            </Link>

          </p>

        </div>

      </motion.div>

    </div>
  );
}

export default Register;