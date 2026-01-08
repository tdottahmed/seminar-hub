import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Plus, Edit, Trash2, User, Mail, Phone, Briefcase, Crown } from "lucide-react";

export default function Index({ auth, teams }) {
    const handleDelete = (team) => {
        if (confirm(`Are you sure you want to delete ${team.name}?`)) {
            router.delete(route("admin.teams.destroy", team.id));
        }
    };

    return (
        <AdminLayout user={auth.user} title="Team Management">
            <Head title="Team Management" />

            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        Team Members
                    </h2>
                    <p className="text-slate-500 mt-1.5">
                        Manage your team members and their information.
                    </p>
                </div>
                <Link
                    href={route("admin.teams.create")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:-translate-y-0.5"
                >
                    <Plus size={18} />
                    Add Team Member
                </Link>
            </div>

            {teams.data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teams.data.map((team) => (
                        <div
                            key={team.id}
                            className={`bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-xl transition-all duration-300 group ${
                                team.is_team_lead
                                    ? "border-2 border-indigo-300 shadow-lg shadow-indigo-500/20"
                                    : "border-slate-200 hover:border-indigo-200"
                            }`}
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-start gap-4 flex-1">
                                        <div
                                            className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 ${
                                                team.is_team_lead
                                                    ? "bg-gradient-to-br from-indigo-500 to-purple-600 ring-4 ring-indigo-200"
                                                    : "bg-gradient-to-br from-slate-500 to-slate-600"
                                            }`}
                                        >
                                            {team.photo ? (
                                                <img
                                                    src={team.photo}
                                                    alt={team.name}
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            ) : (
                                                team.name.charAt(0).toUpperCase()
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-lg font-bold text-slate-800 truncate">
                                                    {team.name}
                                                </h3>
                                                {team.is_team_lead && (
                                                    <Crown
                                                        size={18}
                                                        className="text-indigo-600 flex-shrink-0"
                                                    />
                                                )}
                                            </div>
                                            {team.designation && (
                                                <p className="text-sm text-indigo-600 font-medium">
                                                    {team.designation}
                                                </p>
                                            )}
                                            {team.organization && (
                                                <p className="text-xs text-slate-500 truncate">
                                                    {team.organization}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {team.bio && (
                                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                                        {team.bio}
                                    </p>
                                )}

                                <div className="space-y-2 mb-4">
                                    {team.email && (
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Mail size={14} />
                                            <span className="truncate">{team.email}</span>
                                        </div>
                                    )}
                                    {team.phone && (
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Phone size={14} />
                                            <span>{team.phone}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <span
                                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                            team.is_active
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "bg-slate-100 text-slate-600"
                                        }`}
                                    >
                                        {team.is_active ? "Active" : "Inactive"}
                                    </span>
                                    {team.is_team_lead && (
                                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                                            Team Lead
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="px-6 py-3 bg-gradient-to-r from-slate-50 to-slate-100/50 border-t border-slate-200 flex gap-2">
                                <Link
                                    href={route("admin.teams.edit", team.id)}
                                    className="flex-1 flex justify-center items-center gap-2 text-xs font-semibold text-slate-600 hover:text-indigo-700 py-2 rounded-lg hover:bg-white hover:shadow-md transition-all group"
                                >
                                    <Edit
                                        size={14}
                                        className="group-hover:scale-110 transition-transform"
                                    />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(team)}
                                    className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-all hover:scale-105"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-slate-300 p-20 text-center">
                    <div className="inline-flex p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl mb-6 shadow-sm">
                        <User size={40} className="text-indigo-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                        No team members found
                    </h3>
                    <p className="text-slate-500 mb-8 max-w-md mx-auto">
                        Get started by adding your first team member.
                    </p>
                    <Link
                        href={route("admin.teams.create")}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <Plus size={18} />
                        Add Team Member
                    </Link>
                </div>
            )}

            {teams.links && teams.links.length > 3 && (
                <div className="mt-8 flex justify-center">
                    <div className="flex gap-1">
                        {teams.links.map((link, i) =>
                            link.url ? (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`px-3 py-1 rounded text-sm transition ${
                                        link.active
                                            ? "bg-indigo-600 text-white"
                                            : "text-slate-600 hover:bg-white hover:shadow-sm"
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ) : (
                                <span
                                    key={i}
                                    className="px-3 py-1 rounded text-sm text-slate-400 opacity-50 cursor-not-allowed"
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            )
                        )}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

