import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import UploadCard from "../components/UploadCard";
import ATSCard from "../components/ATSCard";
import SkillsCard from "../components/SkillsCard";
import FeedbackCard from "../components/FeedbackCard";
import ResumeHistory from "../components/ResumeHistory";
import JobMatchCard from "../components/JobMatchCard";
import DownloadReport from "../components/DownloadReport";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

import api from "../services/api";

function Dashboard() {

    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [resumeId, setResumeId] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/my-resumes",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setHistory(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <motion.div
                className="max-w-7xl mx-auto px-6 py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >

                {/* ================= HERO SECTION ================= */}

                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-10 shadow-xl"
                >

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

                        <div className="lg:w-2/3">

                            <p className="uppercase tracking-[4px] text-cyan-400 font-semibold">

                                AI Powered Resume Analyzer

                            </p>

                            <h1 className="text-5xl font-extrabold mt-5 leading-tight">

                                Welcome Back 👋

                            </h1>

                            <p className="text-slate-400 text-lg mt-6 leading-8 max-w-2xl">

                                Upload your resume and instantly receive
                                an AI-powered ATS Score, Resume Feedback,
                                Missing Skills Analysis, Job Description
                                Matching and a downloadable PDF Report.

                            </p>

                            <div className="flex flex-wrap gap-5 mt-10">

                                <div className="bg-slate-800 border border-slate-700 rounded-2xl px-6 py-5">

                                    <h2 className="text-cyan-400 text-2xl font-bold">

                                        ATS

                                    </h2>

                                    <p className="text-slate-400 mt-2">

                                        Resume Score

                                    </p>

                                </div>

                                <div className="bg-slate-800 border border-slate-700 rounded-2xl px-6 py-5">

                                    <h2 className="text-green-400 text-2xl font-bold">

                                        AI

                                    </h2>

                                    <p className="text-slate-400 mt-2">

                                        Smart Suggestions

                                    </p>

                                </div>

                                <div className="bg-slate-800 border border-slate-700 rounded-2xl px-6 py-5">

                                    <h2 className="text-yellow-400 text-2xl font-bold">

                                        PDF

                                    </h2>

                                    <p className="text-slate-400 mt-2">

                                        Download Report

                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="hidden lg:flex items-center justify-center">

                            <div className="w-64 h-64 rounded-full bg-cyan-500/10 border border-cyan-500 flex items-center justify-center shadow-2xl shadow-cyan-500/10">

                                <span className="text-8xl">

                                    🤖

                                </span>

                            </div>

                        </div>

                    </div>

                </motion.div>

                {/* ================= STATS ================= */}

                <motion.div
                    className="mt-8"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >

                    <StatsCards history={history} />

                </motion.div>

                {/* ================= UPLOAD ================= */}

                <motion.div
                    className="mt-8"
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >

                    <UploadCard
                        setAnalysis={setAnalysis}
                        setLoading={setLoading}
                        setResumeId={setResumeId}
                    />

                </motion.div>

                {/* ================= LOADER ================= */}

                {loading && (

                    <div className="mt-8">

                        <Loader />

                    </div>

                )}

                {/* ================= ANALYSIS ================= */}

                {analysis && !loading && (

                <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
>

    {/* ================= ATS + SKILLS ================= */}

    <div className="grid lg:grid-cols-3 gap-6 mt-8">

        <ATSCard
            score={analysis.ats_score}
        />

        <SkillsCard
            title="Technical Skills"
            skills={analysis.technical_skills}
        />

        <SkillsCard
            title="Soft Skills"
            skills={analysis.soft_skills}
        />

    </div>

    {/* ================= FEEDBACK ================= */}

    <div className="grid lg:grid-cols-3 gap-6 mt-8">

        <FeedbackCard
            title="Strengths"
            items={analysis.strengths}
        />

        <FeedbackCard
            title="Weaknesses"
            items={analysis.weaknesses}
        />

        <FeedbackCard
            title="Missing Skills"
            items={analysis.missing_skills}
        />

    </div>

    {/* ================= SUGGESTIONS ================= */}

    <div className="mt-8">

        <FeedbackCard
            title="Suggestions"
            items={analysis.suggestions}
        />

    </div>

    {/* ================= DOWNLOAD REPORT ================= */}

    {resumeId && (

        <div className="flex justify-center mt-8">

            <DownloadReport
                resumeId={resumeId}
            />

        </div>

    )}

    {/* ================= JOB MATCH ================= */}

    {resumeId && (

        <div className="mt-8">

            <JobMatchCard
                resumeId={resumeId}
            />

        </div>

    )}

</motion.div>

)}
                {/* ================= RESUME HISTORY ================= */}

                <motion.div
                    className="mt-10"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >

                    <ResumeHistory
                        setAnalysis={setAnalysis}
                    />

                </motion.div>

                {/* ================= FOOTER ================= */}

                <Footer />

            </motion.div>

        </div>

    );

}

export default Dashboard;