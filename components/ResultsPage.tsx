import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { MBTIResult, DimensionValue } from '../types';
import { generatePersonalityAnalysis, isGeminiConfigured } from '../services/geminiService';
import { Button, Card } from './UIComponents';
import { Download, Share2, RefreshCw, Briefcase, Zap, AlertCircle, Sparkles, Printer } from 'lucide-react';


declare const confetti: any;

interface ResultsPageProps {
  result: MBTIResult;
  onRetake: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ result, onRetake }) => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);

  // Trigger celebration on mount
  useEffect(() => {
    if (typeof confetti === 'function') {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#8b5cf6', '#c4b5fd', '#a78bfa']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#8b5cf6', '#c4b5fd', '#a78bfa']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, []);

  // Prepare data for Radar Chart
  const chartData = [
    { subject: 'Extraversion', A: isNaN(result.scores.EI.score) ? 50 : result.scores.EI.score, fullMark: 100 },
    { subject: 'Sensing', A: isNaN(result.scores.SN.score) ? 50 : result.scores.SN.score, fullMark: 100 },
    { subject: 'Thinking', A: isNaN(result.scores.TF.score) ? 50 : result.scores.TF.score, fullMark: 100 },
    { subject: 'Judging', A: isNaN(result.scores.JP.score) ? 50 : result.scores.JP.score, fullMark: 100 },
  ];

  // Fetch AI Analysis on Mount
  useEffect(() => {
    const fetchAnalysis = async () => {
      if (isGeminiConfigured()) {
        setLoading(true);
        try {
          const jsonStr = await generatePersonalityAnalysis(result);
          // Clean the string if it has markdown code blocks
          const cleanJson = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
          setAnalysis(JSON.parse(cleanJson));
        } catch (err) {
            console.error(err);
            setError("Could not generate AI insights. Showing standard result.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAnalysis();
  }, [result]);

  const fallbackAnalysis = {
    title: `The ${result.type} Archetype`,
    summary: "A brief overview of your personality type based on your scores. You exhibit a distinct pattern of traits that influence how you interact with the world.",
    strengths: ["Analytical", "Principled", "Dedicated", "Insightful"],
    weaknesses: ["Can be rigid", "Sometimes insensitive", "Perfectionist"],
    workStyle: "You prefer structured environments where expectations are clear.",
    idealEnvironment: "Quiet, organized spaces with intellectual peers.",
    careerPaths: ["Analyst", "Manager", "Developer", "Researcher"]
  };

  const data = analysis || fallbackAnalysis;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `I am a ${result.type}!`,
          text: `I took the Lumina Personality Test and got ${result.type}: ${data.title}.`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      alert("Sharing is not supported on this browser/device.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8 print:bg-white print:p-0" ref={resultRef}>
      <div className="max-w-5xl mx-auto">
        
        {/* Header Result */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 print:mb-6"
        >
            <div className="flex items-center justify-center gap-2 mb-4">
               <Sparkles className="w-5 h-5 text-primary-500 animate-pulse-slow" />
               <h2 className="text-slate-500 font-medium uppercase tracking-widest text-sm">Your Personality Profile</h2>
               <Sparkles className="w-5 h-5 text-primary-500 animate-pulse-slow" />
            </div>
            
            <div className="relative inline-block mb-2">
                <h1 className="text-7xl md:text-9xl font-serif font-bold text-slate-900 print:text-black">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600 print:text-black print:bg-none">
                      {result.type}
                    </span>
                </h1>
            </div>
            
            <AnimatePresence>
                {loading ? (
                    <motion.div key="loading" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="mt-6 flex flex-col items-center gap-2 no-print">
                        <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-primary-600 text-sm font-medium animate-pulse">Consulting AI Psychologist...</p>
                    </motion.div>
                ) : (
                    <motion.div key="result" initial={{opacity:0}} animate={{opacity:1}} className="mt-4">
                         <h3 className="text-3xl font-serif font-medium text-slate-800 print:text-black">{data.title}</h3>
                         <p className="max-w-2xl mx-auto mt-4 text-slate-600 text-lg leading-relaxed print:text-slate-800">
                            {data.summary}
                         </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 print:gap-4 print:mb-6">
            {/* Chart Column */}
            <div className="lg:col-span-1 print-break-inside-avoid">
                <Card className="h-full flex flex-col items-center justify-center min-h-[300px] print:shadow-none print:border-slate-300">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 w-full text-center">Trait Balance</h3>
                    <div className="w-full h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Score"
                                    dataKey="A"
                                    stroke="#7c3aed"
                                    strokeWidth={3}
                                    fill="#8b5cf6"
                                    fillOpacity={0.5}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Breakdown Column */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                 {/* Trait Cards */}
                 {Object.entries(result.scores).map(([key, val], idx) => {
                    const value = val as { label: string; score: number; dominant: DimensionValue };
                    const safeScore = isNaN(value.score) ? 50 : value.score;
                    return (
                    <motion.div 
                        key={key} 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between print:shadow-none print:border-slate-300 print-break-inside-avoid"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{value.label}</span>
                            <span className="text-2xl font-bold text-primary-700 print:text-black">{value.dominant}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full mb-2 relative overflow-hidden print:bg-slate-200">
                             {/* Center marker */}
                             <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white z-10"></div>
                             <div 
                                className="absolute top-0 bottom-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-1000 print:bg-black"
                                style={{
                                    left: safeScore > 50 ? '50%' : `${safeScore}%`,
                                    right: safeScore > 50 ? `${100 - safeScore}%` : '50%'
                                }}
                             ></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 font-medium">
                             <span>{safeScore < 50 ? `${Math.round(100 - safeScore)}%` : ''}</span>
                             <span>{safeScore > 50 ? `${Math.round(safeScore)}%` : ''}</span>
                        </div>
                    </motion.div>
                 )})}
            </div>
        </div>

        {/* AI Details Section */}
        {!loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 print:gap-4 print:mb-6">
                     {/* Strengths & Weaknesses */}
                     <Card className="print:shadow-none print:border-slate-300 print-break-inside-avoid">
                         <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
                             <Zap className="text-amber-500 w-5 h-5" /> Strengths & Growth
                         </h3>
                         <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-bold text-emerald-600 uppercase mb-3 flex items-center gap-2">
                                  <span>Core Strengths</span>
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {data.strengths.map((s: string, i: number) => (
                                        <span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-800 text-sm rounded-lg font-medium border border-emerald-100 print:border-emerald-200">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-rose-500 uppercase mb-3 mt-4 flex items-center gap-2">
                                  <span>Growth Areas</span>
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {data.weaknesses.map((w: string, i: number) => (
                                        <span key={i} className="px-3 py-1.5 bg-rose-50 text-rose-800 text-sm rounded-lg font-medium border border-rose-100 print:border-rose-200">
                                            {w}
                                        </span>
                                    ))}
                                </div>
                            </div>
                         </div>
                     </Card>

                     {/* Career & Work */}
                     <Card className="print:shadow-none print:border-slate-300 print-break-inside-avoid">
                        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
                             <Briefcase className="text-blue-500 w-5 h-5" /> Career & Lifestyle
                         </h3>
                         <div className="space-y-4">
                            <div className="text-sm text-slate-600 bg-blue-50/50 p-4 rounded-xl border border-blue-100 print:bg-transparent print:p-0 print:border-0">
                                <strong className="block text-blue-800 mb-1">Work Style</strong> 
                                {data.workStyle}
                            </div>
                             <div className="text-sm text-slate-600 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 print:bg-transparent print:p-0 print:border-0">
                                <strong className="block text-indigo-800 mb-1">Ideal Environment</strong>
                                {data.idealEnvironment}
                            </div>
                            <div className="pt-2">
                                <h4 className="text-sm font-bold text-slate-700 mb-3">Recommended Paths</h4>
                                <ul className="grid grid-cols-2 gap-3">
                                    {data.careerPaths.map((c: string, i: number) => (
                                        <li key={i} className="flex items-center text-sm text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 print:bg-transparent print:border-0 print:p-0">
                                            <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div> {c}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                         </div>
                     </Card>
                </div>
            </motion.div>
        )}

        {/* Action Bar (Hidden in Print) */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12 pb-20 no-print">
            <Button onClick={handlePrint} variant="primary" className="shadow-xl shadow-primary-500/20">
                <Printer className="w-4 h-4 mr-2" /> Save as PDF
            </Button>
            <Button onClick={handleShare} variant="secondary">
                <Share2 className="w-4 h-4 mr-2" /> Share Result
            </Button>
            <Button onClick={onRetake} variant="ghost" className="text-slate-500 hover:text-slate-800">
                <RefreshCw className="w-4 h-4 mr-2" /> Retake Test
            </Button>
        </div>
      </div>
    </div>
  );
};
