'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const questions = [
  {
    id: 'goal',
    question: "What's your main health goal?",
    options: [
      { label: 'Clear & Glowing Skin', value: 'skin', icon: '✨' },
      { label: 'Stronger Hair & Nails', value: 'hair', icon: '💇' },
      { label: 'Energy & Focus', value: 'energy', icon: '⚡' },
      { label: 'Better Digestion', value: 'digestion', icon: '🌿' }
    ]
  },
  {
    id: 'diet',
    question: "How would you describe your current diet?",
    options: [
      { label: 'Balanced', value: 'balanced', icon: '🥗' },
      { label: 'Plant-Based / Vegan', value: 'vegan', icon: '🥕' },
      { label: 'Keto / Low Carb', value: 'keto', icon: '🥩' },
      { label: 'Other', value: 'other', icon: '🍽️' }
    ]
  },
  {
    id: 'supplements',
    question: "Are you currently taking any supplements?",
    options: [
      { label: 'Yes, daily', value: 'daily', icon: '💊' },
      { label: 'Sometimes', value: 'sometimes', icon: '📅' },
      { label: 'No', value: 'no', icon: '❌' }
    ]
  }
];

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = questions[step];
  const progress = ((step + 1) / (questions.length + 1)) * 100;

  const handleOptionSelect = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        setStep(questions.length); // Email step
      }
    }, 300);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F9F7F2] flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-xl max-w-lg w-full"
        >
          <div className="w-20 h-20 bg-[#87917B] rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="text-white w-10 h-10" />
          </div>
          <h2 className="text-3xl font-serif mb-4">Results are ready!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            We've analyzed your profile and found the perfect match for your wellness journey. Check your inbox at <span className="font-bold text-black">{email}</span>.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-black text-white py-4 rounded-full font-bold tracking-widest uppercase hover:bg-[#87917B] transition-colors"
          >
            Back to Shop
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F2] font-montserrat">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
        <motion.div 
          className="h-full bg-[#e10098]" 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto pt-24 pb-12 px-6">
        <div className="flex justify-between items-center mb-12">
          {step > 0 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="flex items-center text-sm font-bold text-gray-400 hover:text-black transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> BACK
            </button>
          )}
          <div className="mx-auto text-center">
            <h1 className="text-2xl font-black tracking-tighter">Veridia</h1>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        <AnimatePresence mode="wait">
          {step < questions.length ? (
            <motion.div
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <span className="text-[11px] font-bold text-[#e10098] tracking-[0.2em] uppercase">Step {step + 1} of {questions.length + 1}</span>
                <h2 className="text-3xl md:text-4xl font-serif leading-tight">{currentQuestion.question}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect(option.value)}
                    className={cn(
                      "flex items-center p-6 bg-white border-2 rounded-2xl text-left transition-all duration-300 hover:border-[#e10098] hover:shadow-md group",
                      answers[currentQuestion.id] === option.value ? "border-[#e10098] bg-[#fdf2f8]" : "border-transparent"
                    )}
                  >
                    <span className="text-3xl mr-6 group-hover:scale-125 transition-transform">{option.icon}</span>
                    <span className="font-bold text-lg">{option.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="email"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-8 max-w-xl mx-auto"
            >
              <div className="text-center space-y-4">
                <span className="text-[11px] font-bold text-[#e10098] tracking-[0.2em] uppercase">Final Step</span>
                <h2 className="text-3xl md:text-4xl font-serif leading-tight">Where should we send your results?</h2>
                <p className="text-gray-500">Get your personalized supplement plan and 15% off your first order.</p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-5 rounded-2xl border-2 border-transparent focus:border-[#e10098] outline-none transition-all text-lg shadow-sm"
                />
                <button
                  type="submit"
                  className="w-full bg-[#e10098] text-white py-5 rounded-2xl font-bold tracking-widest uppercase hover:bg-black transition-colors shadow-lg"
                >
                  Get My Results <ChevronRight className="inline-block w-5 h-5 ml-1" />
                </button>
                <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                  By signing up, you agree to our Terms of Service and Privacy Policy. You can unsubscribe at any time.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}