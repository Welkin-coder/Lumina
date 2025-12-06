import React from 'react';
import { motion } from 'framer-motion';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/30 focus:ring-primary-500 border border-transparent hover:-translate-y-0.5",
    secondary: "bg-white text-slate-800 hover:bg-slate-50 shadow-md border border-slate-200 focus:ring-slate-400 hover:shadow-lg hover:-translate-y-0.5",
    outline: "bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};

// --- Card ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const Card: React.FC<CardProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className={`bg-white/90 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- Progress Bar ---
export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden shadow-inner border border-slate-200">
      <motion.div
        className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "circOut" }}
      />
    </div>
  );
};

// --- Likert Option ---
interface LikertOptionProps {
  value: number;
  selected: boolean;
  onClick: () => void;
  label: string;
}

export const LikertOption: React.FC<LikertOptionProps> = ({ value, selected, onClick, label }) => {
  // Size mapping based on 1-5 scale
  const sizeClass = 
    value === 1 || value === 5 ? "w-14 h-14 md:w-16 md:h-16" :
    value === 2 || value === 4 ? "w-12 h-12 md:w-14 md:h-14" :
    "w-10 h-10 md:w-12 md:h-12";
  
  const colorClass =
    value === 5 ? "border-primary-600 text-primary-600" : // Strong Agree
    value === 4 ? "border-primary-400 text-primary-400" : // Agree
    value === 3 ? "border-slate-300 text-slate-400" :     // Neutral
    value === 2 ? "border-rose-300 text-rose-300" :       // Disagree
    "border-rose-500 text-rose-500";                      // Strong Disagree

  const activeClass = selected 
    ? (value >= 4 ? "bg-primary-600 text-white ring-4 ring-primary-200 scale-110 shadow-lg shadow-primary-500/30" : value <= 2 ? "bg-rose-500 text-white ring-4 ring-rose-200 scale-110 shadow-lg shadow-rose-500/30" : "bg-slate-400 text-white ring-4 ring-slate-200 scale-110")
    : "bg-white hover:bg-slate-50";

  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer" onClick={onClick}>
      <motion.div
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`${sizeClass} rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-sm ${selected ? 'border-transparent' : colorClass} ${activeClass}`}
      >
        {selected && (
          <motion.span 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="text-xl font-bold"
          >
            ✓
          </motion.span>
        )}
      </motion.div>
      <span className={`text-xs md:text-sm font-medium transition-colors opacity-0 group-hover:opacity-100 md:opacity-100 ${selected ? 'text-slate-900 opacity-100' : 'text-slate-400'}`}>
        {label}
      </span>
    </div>
  );
};
