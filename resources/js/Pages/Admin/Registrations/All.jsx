import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    ArrowLeft,
    Search,
    Filter,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    User,
    Mail,
    Calendar,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import PrimaryButton from "@/Components/PrimaryButton";

export default function All({ auth, registrations, events, filters = {} }) {
    const [search, setSearch] = useState(filters.search || "");
    const [statusFilter, setStatusFilter] = useState(filters.status || "");
    const [eventFilter, setEventFilter] = useState(filters.event_id || "");

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(
            route("admin.registrations.index"),
            {
                search,
                status: statusFilter,
                event_id: eventFilter,
            },
            { preserveState: true }
        );
    };

    const getStatusBadge = (status) => {
        const styles = {
            approved: "bg-green-100 text-green-800 border border-green-300",
            rejected: "bg-red-100 text-red-800 border border-red-300",
            pending: "bg-yellow-100 text-yellow-800 border border-yellow-300",
            shortlisted: "bg-blue-100 text-blue-800 border border-blue-300",
            attended: "bg-purple-100 text-purple-800 border border-purple-300",
        };
        return (
            styles[status] ||
            "bg-slate-100 text-slate-800 border border-slate-300"
        );
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "approved":
                return <CheckCircle size={16} />;
            case "rejected":
                return <XCircle size={16} />;
            default:
                return <Clock size={16} />;
        }
    };

    return (
        <AdminLayout user={auth.user} title="All Registrations">
            <Head title="All Registrations" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            All Registrations
                        </h1>
                        <p className="text-slate-600 mt-1">
                            View and manage all event registrations
                        </p>
                    </div>
                    <Link
                        href={route("admin.events.index")}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition"
                    >
                        <ArrowLeft size={18} />
                        Back to Events
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-sm border border-slate-200 p-6">
                    <form onSubmit={handleFilter} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative">
                                <Search
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={18}
                                />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by name or email..."
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />
                            </div>
                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            >
                                <option value="">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                                <option value="shortlisted">Shortlisted</option>
                                <option value="attended">Attended</option>
                            </select>
                            <select
                                value={eventFilter}
                                onChange={(e) => setEventFilter(e.target.value)}
                                className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            >
                                <option value="">All Events</option>
                                {events.map((event) => (
                                    <option key={event.id} value={event.id}>
                                        {event.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <PrimaryButton type="submit">
                                Apply Filters
                            </PrimaryButton>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setStatusFilter("");
                                    setEventFilter("");
                                    router.get(
                                        route("admin.registrations.index")
                                    );
                                }}
                                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition"
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                </div>

                {/* Registrations Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Attendee
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Event
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Registered
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {registrations.data.map((registration) => (
                                    <tr
                                        key={registration.id}
                                        className="hover:bg-slate-50 transition"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold mr-3">
                                                    {registration.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-900">
                                                        {registration.name}
                                                    </div>
                                                    <div className="text-sm text-slate-500 flex items-center gap-1">
                                                        <Mail size={14} />
                                                        {registration.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-900">
                                                {registration.event?.title ||
                                                    "N/A"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={clsx(
                                                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold",
                                                    getStatusBadge(
                                                        registration.status
                                                    )
                                                )}
                                            >
                                                {getStatusIcon(
                                                    registration.status
                                                )}
                                                {registration.status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    registration.status.slice(
                                                        1
                                                    )}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-500 flex items-center gap-1">
                                                <Calendar size={14} />
                                                {new Date(
                                                    registration.created_at
                                                ).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                href={route(
                                                    "admin.registrations.show",
                                                    registration.id
                                                )}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                            >
                                                <Eye size={16} />
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {registrations.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-12 text-center"
                                        >
                                            <User
                                                className="mx-auto text-slate-400 mb-4"
                                                size={48}
                                            />
                                            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                                No registrations found
                                            </h3>
                                            <p className="text-slate-600">
                                                {search ||
                                                statusFilter ||
                                                eventFilter
                                                    ? "Try adjusting your filters."
                                                    : "No registrations have been submitted yet."}
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {registrations.links && registrations.links.length > 3 && (
                        <div className="px-6 py-4 border-t border-slate-200 flex justify-center gap-2">
                            {registrations.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || "#"}
                                    className={clsx(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition",
                                        link.active
                                            ? "bg-indigo-600 text-white"
                                            : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                                    )}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
