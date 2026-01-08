import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    Building,
    Briefcase,
    Calendar,
    CheckCircle,
    XCircle,
    Clock,
    FileText,
} from "lucide-react";
import clsx from "clsx";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";

export default function Show({ auth, registration }) {
    const { data, setData, put, processing } = useForm({
        status: registration.status,
    });

    const submitStatus = (e) => {
        e.preventDefault();
        put(route("admin.registrations.update", registration.id));
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
                return <CheckCircle size={18} />;
            case "rejected":
                return <XCircle size={18} />;
            default:
                return <Clock size={18} />;
        }
    };

    return (
        <AdminLayout
            user={auth.user}
            title={`Registration - ${registration.name}`}
        >
            <Head title={`Registration - ${registration.name}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <Link
                            href={route(
                                "admin.events.registrations.index",
                                registration.event.id
                            )}
                            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 mb-2 transition"
                        >
                            <ArrowLeft size={16} />
                            Back to Registrations
                        </Link>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Registration Details
                        </h1>
                        <p className="text-slate-600 mt-1">
                            View and manage registration information
                        </p>
                    </div>
                    <span
                        className={clsx(
                            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold",
                            getStatusBadge(registration.status)
                        )}
                    >
                        {getStatusIcon(registration.status)}
                        {registration.status.charAt(0).toUpperCase() +
                            registration.status.slice(1)}
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Info Card */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Attendee Information */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                                    {registration.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        {registration.name}
                                    </h2>
                                    <p className="text-slate-600">
                                        {registration.email}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        <Mail
                                            className="text-indigo-600"
                                            size={20}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                                            Email
                                        </p>
                                        <p className="text-sm font-medium text-slate-900">
                                            {registration.email}
                                        </p>
                                    </div>
                                </div>

                                {registration.phone && (
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <Phone
                                                className="text-purple-600"
                                                size={20}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                                                Phone
                                            </p>
                                            <p className="text-sm font-medium text-slate-900">
                                                {registration.phone}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {registration.organization && (
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <Building
                                                className="text-blue-600"
                                                size={20}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                                                Organization
                                            </p>
                                            <p className="text-sm font-medium text-slate-900">
                                                {registration.organization}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {registration.designation && (
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <Briefcase
                                                className="text-green-600"
                                                size={20}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                                                Designation
                                            </p>
                                            <p className="text-sm font-medium text-slate-900">
                                                {registration.designation}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <Calendar
                                            className="text-orange-600"
                                            size={20}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                                            Registered At
                                        </p>
                                        <p className="text-sm font-medium text-slate-900">
                                            {new Date(
                                                registration.created_at
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-pink-100 rounded-lg">
                                        <FileText
                                            className="text-pink-600"
                                            size={20}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                                            Event
                                        </p>
                                        <Link
                                            href={route(
                                                "admin.events.show",
                                                registration.event.id
                                            )}
                                            className="text-sm font-medium text-indigo-600 hover:underline"
                                        >
                                            {registration.event.title}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Update Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">
                                Update Status
                            </h3>
                            <form onSubmit={submitStatus} className="space-y-4">
                                <div>
                                    <InputLabel
                                        htmlFor="status"
                                        value="Status"
                                    />
                                    <select
                                        id="status"
                                        name="status"
                                        className="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">
                                            Approved
                                        </option>
                                        <option value="rejected">
                                            Rejected
                                        </option>
                                        <option value="shortlisted">
                                            Shortlisted
                                        </option>
                                        <option value="attended">
                                            Attended
                                        </option>
                                    </select>
                                </div>
                                <PrimaryButton
                                    disabled={processing}
                                    className="w-full"
                                >
                                    {processing
                                        ? "Updating..."
                                        : "Update Status"}
                                </PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
