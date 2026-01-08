import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";
import {
    Plus,
    MapPin,
    Calendar,
    Users,
    FileQuestion,
    Bell,
    Edit,
    Trash2,
} from "lucide-react";
import clsx from "clsx";

export default function Index({ auth, events }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this event?")) {
            destroy(route("admin.events.destroy", id));
        }
    };

    return (
        <AdminLayout user={auth.user} title="Events Management">
            <Head title="Events" />

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        Events
                    </h2>
                    <p className="text-slate-500 mt-1.5">
                        Manage and track all seminars and events.
                    </p>
                </div>
                <Link
                    href={route("admin.events.create")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                >
                    <Plus size={18} />
                    Create Event
                </Link>
            </div>

            {/* Events Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.data.length > 0 ? (
                    events.data.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all duration-300 group"
                        >
                            <div className="p-5">
                                {/* Header: Status & Actions */}
                                <div className="flex justify-between items-start mb-4">
                                    <span
                                        className={clsx(
                                            "px-3 py-1.5 rounded-full text-xs font-bold border-2",
                                            event.status === "published" &&
                                                "bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm",
                                            event.status === "draft" &&
                                                "bg-amber-50 text-amber-700 border-amber-300 shadow-sm",
                                            event.status === "ongoing" &&
                                                "bg-blue-50 text-blue-700 border-blue-300 shadow-sm",
                                            event.status === "completed" &&
                                                "bg-slate-100 text-slate-700 border-slate-300 shadow-sm",
                                            event.status === "cancelled" &&
                                                "bg-red-50 text-red-700 border-red-300 shadow-sm"
                                        )}
                                    >
                                        {event.status.charAt(0).toUpperCase() +
                                            event.status.slice(1)}
                                    </span>

                                    <div className="flex gap-1">
                                        <Link
                                            href={route(
                                                "admin.events.edit",
                                                event.id
                                            )}
                                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all hover:scale-110"
                                            title="Edit"
                                        >
                                            <Edit size={16} />
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(event.id)
                                            }
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all hover:scale-110"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2 min-h-[3.5rem]">
                                    {event.title}
                                </h3>

                                {/* Details */}
                                <div className="space-y-2 text-sm text-slate-600">
                                    <div className="flex items-center gap-2">
                                        <Calendar
                                            size={16}
                                            className="text-indigo-500 shrink-0"
                                        />
                                        <span>
                                            {new Date(
                                                event.start_date
                                            ).toLocaleDateString(undefined, {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin
                                            size={16}
                                            className="text-rose-500 shrink-0"
                                        />
                                        <span className="truncate">
                                            {event.venue ||
                                                "No venue specified"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="px-5 py-3 bg-gradient-to-r from-slate-50 to-slate-100/50 border-t border-slate-200 flex justify-between items-center gap-2">
                                <Link
                                    href={route(
                                        "admin.events.registrations.index",
                                        event.id
                                    )}
                                    className="flex-1 flex justify-center items-center gap-2 text-xs font-semibold text-slate-600 hover:text-indigo-700 py-2 rounded-lg hover:bg-white hover:shadow-md transition-all group"
                                >
                                    <Users
                                        size={14}
                                        className="group-hover:scale-110 transition-transform"
                                    />
                                    <span>Registrations</span>
                                </Link>
                                <div className="w-px h-6 bg-slate-300"></div>
                                <Link
                                    href={route(
                                        "admin.events.quizzes.index",
                                        event.id
                                    )}
                                    className="flex-1 flex justify-center items-center gap-2 text-xs font-semibold text-slate-600 hover:text-emerald-700 py-2 rounded-lg hover:bg-white hover:shadow-md transition-all group"
                                >
                                    <FileQuestion
                                        size={14}
                                        className="group-hover:scale-110 transition-transform"
                                    />
                                    <span>Quiz</span>
                                </Link>
                                <div className="w-px h-6 bg-slate-300"></div>
                                <Link
                                    href={route(
                                        "admin.events.notifications.index",
                                        event.id
                                    )}
                                    className="flex-1 flex justify-center items-center gap-2 text-xs font-semibold text-slate-600 hover:text-amber-700 py-2 rounded-lg hover:bg-white hover:shadow-md transition-all group"
                                >
                                    <Bell
                                        size={14}
                                        className="group-hover:scale-110 transition-transform"
                                    />
                                    <span>Notify</span>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-300">
                        <div className="inline-flex p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl mb-6 shadow-sm">
                            <Calendar size={40} className="text-indigo-500" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                            No events found
                        </h3>
                        <p className="text-slate-500 mb-8 max-w-md mx-auto">
                            Get started by creating your first event and
                            engaging with your audience.
                        </p>
                        <Link
                            href={route("admin.events.create")}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:-translate-y-0.5"
                        >
                            <Plus size={18} />
                            Create Your First Event
                        </Link>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="mt-8">
                {events.links && (
                    <div className="flex gap-1 justify-center flex-wrap">
                        {events.links.map((link, i) =>
                            link.url ? (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={clsx(
                                        "px-3 py-1 rounded text-sm transition",
                                        link.active
                                            ? "bg-indigo-600 text-white"
                                            : "text-slate-600 hover:bg-white hover:shadow-sm"
                                    )}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ) : (
                                <span
                                    key={i}
                                    className="px-3 py-1 rounded text-sm text-slate-400 opacity-50 cursor-not-allowed"
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            )
                        )}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
