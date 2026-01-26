import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    ArrowLeft,
    Plus,
    FileQuestion,
    Clock,
    Edit,
    Trash2,
    Eye,
} from "lucide-react";
import clsx from "clsx";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ auth, event, quizzes }) {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this quiz?")) {
            router.delete(
                route("admin.events.quizzes.destroy", [event.id, id])
            );
        }
    };

    return (
        <AdminLayout user={auth.user} title={`Quizzes - ${event.title}`}>
            <Head title={`Quizzes - ${event.title}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <Link
                            href={route("admin.events.index")}
                            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 mb-2 transition"
                        >
                            <ArrowLeft size={16} />
                            Back to Events
                        </Link>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Quizzes
                        </h1>
                        <p className="text-slate-600 mt-1">
                            Manage quizzes for{" "}
                            <span className="font-semibold text-indigo-600">
                                {event.title}
                            </span>
                        </p>
                    </div>
                    <Link
                        href={route("admin.events.quizzes.create", event.id)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/30 transition"
                    >
                        <Plus size={18} />
                        Create Quiz
                    </Link>
                </div>

                {/* Quizzes Grid */}
                {quizzes.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quizzes.data.map((quiz) => (
                            <div
                                key={quiz.id}
                                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-200 group"
                            >
                                <div className="p-6">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-indigo-600 transition">
                                                {quiz.title}
                                            </h3>
                                        </div>
                                        <span
                                            className={clsx(
                                                "px-2.5 py-1 rounded-full text-xs font-semibold",
                                                quiz.is_published
                                                    ? "bg-green-100 text-green-800 border border-green-300"
                                                    : "bg-slate-100 text-slate-800 border border-slate-300"
                                            )}
                                        >
                                            {quiz.is_published
                                                ? "Published"
                                                : "Draft"}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    {quiz.description && (
                                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                                            {quiz.description}
                                        </p>
                                    )}

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
                                        {quiz.time_limit_minutes && (
                                            <div className="flex items-center gap-1">
                                                <Clock size={16} />
                                                <span>
                                                    {quiz.time_limit_minutes}{" "}
                                                    mins
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1">
                                            <FileQuestion size={16} />
                                            <span>
                                                {quiz.questions_count || 0}{" "}
                                                questions
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
                                        <Link
                                            href={route(
                                                "admin.quizzes.questions.index",
                                                quiz.id
                                            )}
                                            className="flex-1 px-3 py-2 text-sm font-medium text-center text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                        >
                                            Questions
                                        </Link>
                                        <button
                                            onClick={() => window.open(route('quiz.public.show', quiz.id), '_blank')}
                                            className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                            title="View Public Link / QR"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <Link
                                            href={route(
                                                "admin.events.quizzes.edit",
                                                [event.id, quiz.id]
                                            )}
                                            className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                            title="Edit"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(quiz.id)
                                            }
                                            className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                        <FileQuestion
                            className="mx-auto text-slate-400 mb-4"
                            size={48}
                        />
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            No quizzes found
                        </h3>
                        <p className="text-slate-600 mb-6">
                            Get started by creating a quiz for this event.
                        </p>
                        <Link
                            href={route(
                                "admin.events.quizzes.create",
                                event.id
                            )}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
                        >
                            <Plus size={18} />
                            Create Quiz
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {quizzes.links && quizzes.links.length > 3 && (
                    <div className="flex justify-center gap-2">
                        {quizzes.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || "#"}
                                className={clsx(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition",
                                    link.active
                                        ? "bg-indigo-600 text-white"
                                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                                )}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
