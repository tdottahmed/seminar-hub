import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Check, ArrowRight, Clock, HelpCircle, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

export default function Attempt({ quiz, attempt, questions }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(quiz.time_limit_minutes ? quiz.time_limit_minutes * 60 : null);
    
    // Initialize answers form
    const { data, setData, post, processing } = useForm({
        attempt_id: attempt.id,
        answers: {} // { question_id: answer_value }
    });

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    // Timer Logic
    useEffect(() => {
        if (timeLeft === null) return;
        if (timeLeft <= 0) {
            handleSubmit(); 
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOptionSelect = (option) => {
        setData('answers', {
            ...data.answers,
            [currentQuestion.id]: option
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        post(route('quiz.public.submit', quiz.id));
    };

    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const answeredCurrent = data.answers[currentQuestion.id] !== undefined;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
            <Head title={`Attempting ${quiz.title}`} />

             {/* Background Effects */}
             <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-indigo-100 rounded-full blur-[120px] opacity-40" />
                <div className="absolute bottom-[20%] left-[-5%] w-[30%] h-[30%] bg-purple-100 rounded-full blur-[120px] opacity-40" />
            </div>

            {/* Top Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
                    <span className="font-bold text-lg text-slate-800 truncate pr-4">
                        {quiz.title}
                    </span>
                    {timeLeft !== null && (
                        <div className={clsx(
                            "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold border",
                            timeLeft < 60 ? "bg-red-50 text-red-600 border-red-100 animate-pulse" : "bg-indigo-50 text-indigo-600 border-indigo-100"
                        )}>
                            <Clock size={16} />
                            {formatTime(timeLeft)}
                        </div>
                    )}
                </div>
                {/* Progress Bar */}
                <div className="h-1 w-full bg-slate-100">
                    <div 
                        className="h-full bg-indigo-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(79,70,229,0.3)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="pt-24 pb-32 px-6 max-w-3xl mx-auto min-h-screen flex flex-col justify-center relative z-10">
                
                {/* Question Info */}
                <div className="mb-8 animate-fade-in-up">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs tracking-wider uppercase mb-4 border border-indigo-100">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight text-slate-900 mb-6">
                        {currentQuestion.question_text}
                    </h2>
                </div>

                {/* Options */}
                <div className="space-y-4">
                    {currentQuestion.options.map((option, idx) => {
                        const isSelected = data.answers[currentQuestion.id] === option;
                        return (
                            <button
                                key={idx}
                                onClick={() => handleOptionSelect(option)}
                                className={clsx(
                                    "w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 group relative overflow-hidden flex items-center justify-between",
                                    isSelected 
                                        ? "bg-indigo-50 border-indigo-600 shadow-sm" 
                                        : "bg-white border-slate-100 hover:border-indigo-200 hover:bg-slate-50 hover:shadow-md"
                                )}
                            >
                                <div className="flex items-center gap-4 relative z-10 w-full">
                                    <div className={clsx(
                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                                         isSelected 
                                            ? "border-indigo-600 bg-indigo-600" 
                                            : "border-slate-300 group-hover:border-indigo-400"
                                    )}>
                                        {isSelected && <Check className="w-4 h-4 text-white" />}
                                    </div>
                                    <span className={clsx(
                                        "text-lg font-medium",
                                        isSelected ? "text-indigo-900" : "text-slate-700"
                                    )}>{option}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>

            </div>

             {/* Bottom Navigation */}
             <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-200 z-40">
                <div className="max-w-3xl mx-auto">
                    <button
                        onClick={handleNext}
                        disabled={!answeredCurrent && !processing}
                        className={clsx(
                            "w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.99]",
                            answeredCurrent
                                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200"
                                : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        )}
                    >
                        <span>{isLastQuestion ? 'Submit Quiz' : 'Next Question'}</span>
                        <ArrowRight size={20} />
                    </button>
                </div>
             </div>
             
             <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.5s ease-out forwards;
                }
             `}</style>
        </div>
    );
}
