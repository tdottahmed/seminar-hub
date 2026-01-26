import { Head, Link } from '@inertiajs/react';
import { Trophy, CheckCircle, ArrowRight, XCircle, Home, RotateCw } from 'lucide-react';
import clsx from 'clsx';

export default function Result({ quiz, attempt, score, total_points }) {
    const percentage = Math.round((score / total_points) * 100);
    
    let gradeColor = 'text-green-600';
    let gradeBg = 'bg-green-50';
    let gradeBorder = 'border-green-100';
    let gradeMessage = 'Amazing Job!';
    let TrophyColor = 'text-yellow-500';
    
    if (percentage < 50) {
        gradeColor = 'text-red-600';
        gradeBg = 'bg-red-50';
        gradeBorder = 'border-red-100';
        gradeMessage = 'Keep Practicing!';
        TrophyColor = 'text-slate-400';
    } else if (percentage < 80) {
        gradeColor = 'text-orange-600';
        gradeBg = 'bg-orange-50';
        gradeBorder = 'border-orange-100';
        gradeMessage = 'Great Effort!';
        TrophyColor = 'text-orange-400';
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700 flex items-center justify-center p-6">
            <Head title="Quiz Results" />

             {/* Background Effects */}
             <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-indigo-100 rounded-full blur-[120px] opacity-50" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Result Card */}
                <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 mt-8 relative">
                    
                    {/* Floating Icon */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                        <div className={clsx(
                            "inline-flex items-center justify-center w-24 h-24 rounded-3xl shadow-xl animate-bounce-slow border-4 border-slate-50",
                            percentage >= 80 ? "bg-gradient-to-br from-yellow-300 to-orange-400" : (percentage >= 50 ? "bg-gradient-to-br from-orange-300 to-red-400" : "bg-white")
                        )}>
                            <Trophy className={clsx("w-12 h-12", percentage < 50 ? "text-slate-400" : "text-white")} />
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <h1 className={clsx("text-3xl font-extrabold mb-2", gradeColor)}>{gradeMessage}</h1>
                        <p className="text-slate-500 font-medium mb-8">You completed <span className="text-slate-900">{quiz.title}</span></p>

                        <div className="flex items-center justify-center gap-8 mb-8">
                            <div className="text-center p-4 bg-slate-50 rounded-2xl min-w-[100px]">
                                <div className="text-3xl font-extrabold text-indigo-600">
                                    {score}
                                </div>
                                <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mt-1">Score</div>
                            </div>
                            <div className="w-px h-12 bg-slate-200" />
                            <div className="text-center p-4 bg-slate-50 rounded-2xl min-w-[100px]">
                                <div className="text-3xl font-extrabold text-slate-700">
                                    {total_points}
                                </div>
                                 <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mt-1">Total</div>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-100">
                            <div className="flex items-center justify-between text-sm mb-3">
                                <span className="text-slate-500 font-medium">Accuracy</span>
                                <span className="text-slate-900 font-bold">{percentage}%</span>
                            </div>
                            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div 
                                    className={clsx(
                                        "h-full rounded-full transition-all duration-1000 ease-out",
                                        percentage >= 80 ? 'bg-green-500' : (percentage >= 50 ? 'bg-orange-500' : 'bg-red-500')
                                    )}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>

                        <a href={route('home')} className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-center">
                            <Home size={20} />
                            <span>Back to Home</span>
                        </a>
                    </div>
                </div>
            </div>
             <style>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
