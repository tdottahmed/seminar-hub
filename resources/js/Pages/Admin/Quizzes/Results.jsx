import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeft,
    Trophy,
    Users,
    Activity,
    CheckCircle,
    Download
} from "lucide-react";

export default function Results({ auth, quiz, stats, attempts }) {
    return (
        <AdminLayout user={auth.user} title={`Results: ${quiz.title}`}>
            <Head title={`Results: ${quiz.title}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            {quiz.title} - Results
                        </h1>
                        <p className="text-slate-600 mt-1">
                            Performance analytics and leaderboard
                        </p>
                    </div>
                    <Link
                        href={route("admin.quizzes.index")}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition"
                    >
                        <ArrowLeft size={18} />
                        Back to Quizzes
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                                <Users size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Attempts</p>
                                <p className="text-2xl font-bold text-slate-900">{stats.total_attempts}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                                <Trophy size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Avg. Score</p>
                                <p className="text-2xl font-bold text-slate-900">
                                    {stats.average_score} <span className="text-base text-slate-400 font-normal">/ {stats.max_possible_score}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                <Activity size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Pass Rate</p>
                                <p className="text-2xl font-bold text-slate-900">{stats.pass_rate}%</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                                <CheckCircle size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Completion</p>
                                <p className="text-2xl font-bold text-slate-900">{stats.total_attempts} <span className="text-sm text-slate-400 font-normal">Users</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leaderboard Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-900">Leaderboard</h2>
                        {/* Placeholder for export button if needed later */}
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4">Rank</th>
                                    <th className="px-6 py-4">Participant</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4 text-center">Score</th>
                                    <th className="px-6 py-4 text-center">Time Taken</th>
                                    <th className="px-6 py-4 flex justify-end">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {attempts.data.length > 0 ? (
                                    attempts.data.map((attempt, index) => (
                                        <tr key={attempt.id} className="hover:bg-slate-50 transition">
                                            <td className="px-6 py-4 font-medium text-slate-900">
                                                #{attempts.from + index}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-900">
                                                    {attempt.participant_name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-slate-600">{attempt.participant_email}</div>
                                                {attempt.participant_phone && (
                                                    <div className="text-xs text-slate-400">{attempt.participant_phone}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    {attempt.score} / {stats.max_possible_score}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center text-slate-600 font-mono text-xs">
                                                {attempt.duration_seconds 
                                                    ? `${Math.floor(attempt.duration_seconds / 60)}m ${attempt.duration_seconds % 60}s`
                                                    : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {new Date(attempt.completed_at).toLocaleDateString()} <br/>
                                                <span className="text-slate-400 text-xs">{new Date(attempt.completed_at).toLocaleTimeString()}</span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                            No completed attempts yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {attempts.links && attempts.links.length > 3 && (
                        <div className="p-4 border-t border-slate-200 flex justify-center gap-1">
                            {attempts.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || "#"}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                                        link.active
                                            ? "bg-indigo-600 text-white"
                                            : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
