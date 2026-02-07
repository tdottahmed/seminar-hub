import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { useState } from "react";
import {
    Search,
    Filter,
    MoreVertical,
    CheckCircle,
    XCircle,
    Clock,
    Trash2,
    Mail,
    Phone,
    User,
    BookOpen
} from "lucide-react";
import clsx from "clsx";

export default function Index({ auth, enrollments }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this enrollment?")) {
            destroy(route("admin.course-enrollments.destroy", id));
        }
    };

    const handleStatusUpdate = (id, status) => {
        router.put(route("admin.course-enrollments.update", id), { status }, {
            preserveScroll: true,
            onSuccess: () => {
                // Optional: Show toast
            }
        });
    };

    return (
        <AdminLayout user={auth.user} title="Enrollment Management">
            <Head title="Course Enrollments" />

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        Enrollments
                    </h2>
                    <p className="text-slate-500 mt-1.5">
                        Manage course enrollment requests.
                    </p>
                </div>
            </div>

            {/* Enrollments Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                <th className="px-6 py-4">Student</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Course</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {enrollments.data.length > 0 ? (
                                enrollments.data.map((enrollment) => (
                                    <tr 
                                        key={enrollment.id} 
                                        className="hover:bg-slate-50/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                                                    {enrollment.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-900">{enrollment.name}</div>
                                                    <div className="text-xs text-slate-500">ID: #{enrollment.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <Mail size={14} className="text-slate-400" />
                                                    {enrollment.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <Phone size={14} className="text-slate-400" />
                                                    {enrollment.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <BookOpen size={16} className="text-indigo-500" />
                                                <span className="font-medium text-slate-700">
                                                    {enrollment.course?.title?.en || enrollment.course?.title?.bn || 'Unknown Course'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={clsx(
                                                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border",
                                                    enrollment.status === "approved" &&
                                                        "bg-emerald-50 text-emerald-700 border-emerald-200",
                                                    enrollment.status === "pending" &&
                                                        "bg-amber-50 text-amber-700 border-amber-200",
                                                    enrollment.status === "rejected" &&
                                                        "bg-red-50 text-red-700 border-red-200"
                                                )}
                                            >
                                                {enrollment.status === "approved" && <CheckCircle size={12} />}
                                                {enrollment.status === "pending" && <Clock size={12} />}
                                                {enrollment.status === "rejected" && <XCircle size={12} />}
                                                {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {new Date(enrollment.created_at).toLocaleDateString()}
                                            <div className="text-xs text-slate-400">
                                                {new Date(enrollment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {enrollment.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusUpdate(enrollment.id, 'approved')}
                                                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                            title="Approve"
                                                        >
                                                            <CheckCircle size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(enrollment.id, 'rejected')}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Reject"
                                                        >
                                                            <XCircle size={18} />
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(enrollment.id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-20 text-center text-slate-500">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <User size={32} className="text-slate-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-700 mb-1">No Enrollments Yet</h3>
                                        <p>New enrollment requests will appear here.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                {enrollments.links && (
                    <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
                        {/* Use shared pagination component or render links */}
                         <div className="flex gap-1 justify-center flex-wrap">
                            {enrollments.links.map((link, i) =>
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
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
