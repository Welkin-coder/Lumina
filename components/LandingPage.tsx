import React from 'react';
import { motion } from 'framer-motion';
import { Button, Card } from './UIComponents';
import { ArrowRight, Brain, Heart, Zap, Compass, Activity, ShieldCheck, Users } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6">
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold tracking-wide mb-6 uppercase">
              Scientific • Insightful • Private
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-6 leading-tight">
              Discover Your True <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
                Personality Type
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Uncover the depths of your character, strengths, and potential with our modern, 40-question psychological assessment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={onStart} className="w-full sm:w-auto group">
                Start Assessment
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="ghost" size="lg" className="w-full sm:w-auto" onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}>
                Learn How it Works
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Dimensions Section --- */}
      <section id="about" className="py-20 bg-white/50 backdrop-blur-sm px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">The 4 Dimensions of Personality</h2>
            <p className="text-slate-600">Based on Jungian psychology and modern psychometrics.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Energy", label: "Introvert vs Extrovert", color: "text-amber-500", bg: "bg-amber-50" },
              { icon: Brain, title: "Mind", label: "Sensing vs Intuition", color: "text-emerald-500", bg: "bg-emerald-50" },
              { icon: Heart, title: "Nature", label: "Thinking vs Feeling", color: "text-rose-500", bg: "bg-rose-50" },
              { icon: Compass, title: "Tactics", label: "Judging vs Perceiving", color: "text-blue-500", bg: "bg-blue-50" },
            ].map((item, idx) => (
              <Card key={idx} delay={idx * 0.1} className="hover:shadow-2xl transition-shadow text-center">
                <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- Features --- */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
           {/* Left Column: Stacked Feature List */}
           <div className="flex-1 w-full">
             <div className="flex flex-col gap-6">
                
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                   <div className="p-3 bg-primary-50 rounded-xl shrink-0">
                      <Activity className="w-6 h-6 text-primary-600" />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-800 text-lg">Precise Scoring</h4>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        Our weighted algorithm ensures nuance, moving beyond simple binary choices.
                      </p>
                   </div>
                </div>

                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                   <div className="p-3 bg-primary-50 rounded-xl shrink-0">
                      <ShieldCheck className="w-6 h-6 text-primary-600" />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-800 text-lg">Private & Secure</h4>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        Your answers are processed locally in your browser. No data tracking.
                      </p>
                   </div>
                </div>

                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                   <div className="p-3 bg-primary-50 rounded-xl shrink-0">
                      <Users className="w-6 h-6 text-primary-600" />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-800 text-lg">Relationship Insights</h4>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        Understand how you connect with others and navigate social dynamics.
                      </p>
                   </div>
                </div>

             </div>
           </div>

           {/* Right Column: Text Content */}
           <div className="flex-1 text-left">
             <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Why It Matters</span>
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">Why take this test?</h2>
             <p className="text-slate-600 mb-8 leading-relaxed text-lg">
               Understanding your personality type isn't just about labeling yourself. It's a tool for growth. It helps you understand why you make certain choices, how you handle stress, and what environments allow you to thrive.
             </p>
             <ul className="space-y-4 mb-10">
               {[
                 'Career guidance tailored to your cognitive style', 
                 'Improved communication with loved ones', 
                 'Deep self-discovery and personal development'
                ].map((item, i) => (
                 <li key={i} className="flex items-center text-slate-700 font-medium">
                   <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3 shrink-0 text-xs">✓</div>
                   {item}
                 </li>
               ))}
             </ul>
             <Button onClick={onStart} size="lg" className="shadow-xl shadow-primary-500/20">
                Get Started Now
             </Button>
           </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Lumina Assessment. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
