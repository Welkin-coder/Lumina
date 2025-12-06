import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS } from '../constants';
import { Button, Card, ProgressBar, LikertOption } from './UIComponents';
import { Answer } from '../types';
import { ChevronLeft, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';

interface TestPageProps {
  onComplete: (answers: Answer[]) => void;
  onExit: () => void;
}

export const TestPage: React.FC<TestPageProps> = ({ onComplete, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [direction, setDirection] = useState(1);
  const [notification, setNotification] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lumina_answers');
      const savedIndex = localStorage.getItem('lumina_index');
      if (saved) setAnswers(JSON.parse(saved));
      if (savedIndex) setCurrentIndex(parseInt(savedIndex, 10));
    } catch (e) {
      console.error("Failed to load progress", e);
    }
  }, []);

  // Save on change
  useEffect(() => {
    localStorage.setItem('lumina_answers', JSON.stringify(answers));
    localStorage.setItem('lumina_index', currentIndex.toString());
  }, [answers, currentIndex]);

  // Clear notification after 3s
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((Object.keys(answers).length) / QUESTIONS.length) * 100; // Progress based on *answered* count
  const isLastQuestion = currentIndex === QUESTIONS.length - 1;
  const currentAnswer = answers[currentQuestion.id];

  const handleAnswer = (val: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: val }));
    if (!isLastQuestion) {
        setTimeout(() => {
            handleNext();
        }, 200);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    } else {
        finishTest();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const finishTest = () => {
    const answersArray = Object.entries(answers).map(([id, value]) => ({
      questionId: parseInt(id, 10),
      value: Number(value)
    }));
    
    // Strict validation: check for missing questions
    const missingQ = QUESTIONS.find(q => !answers[q.id]);

    if (missingQ) {
      setNotification(`You missed Question ${missingQ.id}. Taking you there...`);
      const idx = QUESTIONS.indexOf(missingQ);
      setDirection(idx > currentIndex ? 1 : -1);
      setCurrentIndex(idx);
      return;
    }

    onComplete(answersArray);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 transition-all">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button onClick={onExit} className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
            Exit
          </button>
          <div className="text-sm font-semibold text-primary-600">
            {currentIndex + 1} <span className="text-slate-400">/</span> {QUESTIONS.length}
          </div>
        </div>
        <div className="max-w-3xl mx-auto mt-4">
            <ProgressBar progress={progress} />
        </div>
      </div>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-0 right-0 z-50 flex justify-center pointer-events-none"
          >
            <div className="bg-slate-800 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
              {notification}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-8 md:px-6 pb-32 overflow-hidden">
        <div className="w-full max-w-3xl relative min-h-[400px]">
          <AnimatePresence mode='wait' initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction * -50, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Bezier for smooth feel
              className="w-full"
            >
              <Card className="shadow-2xl shadow-primary-900/5 border-t-4 border-primary-500 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                <h2 className="text-2xl md:text-3xl font-serif font-medium text-center text-slate-800 mb-12 min-h-[3em] flex items-center justify-center relative z-10 leading-snug">
                  "{currentQuestion.text}"
                </h2>

                <div className="flex flex-row justify-between items-end gap-2 md:gap-4 mb-8 relative z-10">
                  <div className="hidden md:block text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 text-center w-16">Strongly<br/>Disagree</div>
                  {[1, 2, 3, 4, 5].map((val) => (
                    <LikertOption
                      key={val}
                      value={val}
                      selected={currentAnswer === val}
                      onClick={() => handleAnswer(val)}
                      label={
                        val === 1 ? 'Strongly Disagree' :
                        val === 2 ? 'Disagree' :
                        val === 3 ? 'Neutral' :
                        val === 4 ? 'Agree' : 'Strongly Agree'
                      }
                    />
                  ))}
                  <div className="hidden md:block text-xs font-bold text-primary-500 uppercase tracking-wider mb-2 text-center w-16">Strongly<br/>Agree</div>
                </div>

                {/* Mobile Labels */}
                <div className="flex justify-between md:hidden px-2 mt-[-1rem] mb-2 relative z-10">
                     <span className="text-xs font-bold text-rose-400">Disagree</span>
                     <span className="text-xs font-bold text-primary-500">Agree</span>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t border-slate-200 p-4 md:p-6 z-40">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
            <Button 
                variant="ghost" 
                onClick={handlePrev} 
                disabled={currentIndex === 0}
                className="text-slate-500 hover:bg-slate-100"
            >
                <ChevronLeft className="w-5 h-5 mr-1" /> Previous
            </Button>
            
            {isLastQuestion ? (
                 <Button onClick={finishTest} variant="primary" className="px-8 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50">
                    See Results <CheckCircle className="w-5 h-5 ml-2" />
                 </Button>
            ) : (
                <Button onClick={handleNext} variant="secondary" disabled={!currentAnswer}>
                    Next <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
            )}
        </div>
      </div>
    </div>
  );
};
