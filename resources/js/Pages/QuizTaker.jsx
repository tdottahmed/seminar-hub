import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import confetti from 'canvas-confetti';

export default function QuizTaker({ event, quiz }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState(null);
    const [timeLeft, setTimeLeft] = useState(quiz.time_limit_minutes * 60);

    const questions = quiz.questions;
    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    // Timer
    useEffect(() => {
        if (!quiz.time_limit_minutes || result) return;
        
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit(); // Auto submit
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [result]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleAnswer = (value) => {
        setAnswers({
            ...answers,
            [currentQuestion.id]: value
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Format answers for backend
            const payload = {
                answers: Object.entries(answers).map(([qId, ans]) => ({
                    question_id: qId,
                    answer: ans
                }))
            };

            const response = await axios.post(route('events.quiz.submit', { slug: event.slug, quiz: quiz.id }), payload);
            setResult(response.data);
            
            if (response.data.percentage >= 70) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }

        } catch (error) {
            console.error("Submission failed", error);
            alert("Failed to submit quiz.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (result) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center p-6 text-white">
                <Head title={`Result - ${quiz.title}`} />
                
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-2xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center shadow-2xl"
                >
                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-indigo-500/50">
                        <span className="text-3xl font-bold">{Math.round(result.percentage)}%</span>
                    </div>
                    
                    <h1 className="text-4xl font-bold mb-4 font-display">
                        {result.percentage >= 70 ? "Congratulations!" : "Keep Learning!"}
                    </h1>
                    
                    <p className="text-xl text-indigo-200 mb-8">
                        You scored {result.score} out of {result.total_points} points.
                    </p>
                    
                    <div className="flex justify-center gap-4">
                        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition border border-white/10">
                            Retake Quiz
                        </button>
                        <button onClick={() => window.location.href = '/'} className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-lg hover:shadow-indigo-500/30 rounded-xl font-semibold transition">
                            Back to Home
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
            <Head title={`Taking Quiz - ${quiz.title}`} />

            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <div>
                    <h1 className="text-lg font-bold text-gray-900">{quiz.title}</h1>
                    <div className="text-xs text-gray-500">Question {currentQuestionIndex + 1} of {questions.length}</div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-mono font-bold flex items-center gap-2">
                        <Clock size={16} />
                        {formatTime(timeLeft)}
                    </div>
                </div>
            </header>

            {/* Progress Bar */}
            <div className="h-1 bg-gray-200">
                <motion.div 
                    className="h-full bg-indigo-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            {/* Question Area */}
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-3xl w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentQuestion.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100"
                        >
                             <div className="flex items-start gap-4 mb-8">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">
                                    {currentQuestionIndex + 1}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 leading-snug">{currentQuestion.question_text}</h2>
                                    <p className="text-gray-500 text-sm mt-2">Points: {currentQuestion.points}</p>
                                </div>
                             </div>

                             <div className="space-y-4 ml-14">
                                {currentQuestion.type === 'multiple_choice' && JSON.parse(currentQuestion.options).map((option, idx) => (
                                    <label 
                                        key={idx} 
                                        className={clsx(
                                            "flex items-center p-4 rounded-xl border-2 cursor-pointer transition duration-200 group",
                                            answers[currentQuestion.id] === option 
                                                ? "border-indigo-500 bg-indigo-50" 
                                                : "border-gray-100 hover:border-indigo-200 hover:bg-gray-50"
                                        )}
                                    >
                                        <input 
                                            type="radio" 
                                            name={`q_${currentQuestion.id}`} 
                                            value={option}
                                            checked={answers[currentQuestion.id] === option}
                                            onChange={() => handleAnswer(option)}
                                            className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                        />
                                        <span className={clsx("ml-3 font-medium", answers[currentQuestion.id] === option ? "text-indigo-900" : "text-gray-700")}>
                                            {option}
                                        </span>
                                    </label>
                                ))}

                                {currentQuestion.type === 'true_false' && (
                                     <div className="flex gap-4">
                                        {['True', 'False'].map((option) => (
                                             <label 
                                                key={option} 
                                                className={clsx(
                                                    "flex-1 flex items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition duration-200 font-bold text-lg",
                                                    answers[currentQuestion.id] === option 
                                                        ? "border-indigo-500 bg-indigo-50 text-indigo-900" 
                                                        : "border-gray-100 hover:border-indigo-200 hover:bg-gray-50 text-gray-700"
                                                )}
                                            >
                                                <input 
                                                    type="radio" 
                                                    name={`q_${currentQuestion.id}`} 
                                                    value={option}
                                                    checked={answers[currentQuestion.id] === option}
                                                    onChange={() => handleAnswer(option)}
                                                    className="hidden"
                                                />
                                                {option}
                                            </label>
                                        ))}
                                     </div>
                                )}
                             </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* Footer Navigation */}
            <footer className="bg-white border-t border-gray-200 px-6 py-5 sticky bottom-0 z-10">
                <div className="max-w-3xl mx-auto flex justify-between items-center">
                    <button 
                        onClick={handlePrev} 
                        disabled={currentQuestionIndex === 0}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        <ChevronLeft size={20} /> Previous
                    </button>

                    {isLastQuestion ? (
                        <button 
                            onClick={handleSubmit} 
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-green-500/30 hover:shadow-xl hover:scale-105 active:scale-95 transition"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
                        </button>
                    ) : (
                        <button 
                            onClick={handleNext} 
                            className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition"
                        >
                            Next <ChevronRight size={20} />
                        </button>
                    )}
                </div>
            </footer>
        </div>
    );
}
