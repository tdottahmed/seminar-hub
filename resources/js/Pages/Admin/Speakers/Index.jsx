import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, User, Mail, Phone, Briefcase } from 'lucide-react';

export default function Index({ auth, speakers }) {
    const handleDelete = (speaker) => {
        if (confirm(`Are you sure you want to delete ${speaker.name}?`)) {
            router.delete(route('admin.speakers.destroy', speaker.id));
        }
    };

    return (
        <AdminLayout user={auth.user} title="Speakers">
            <Head title="Speakers" />

            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Speakers</h2>
                    <p className="text-slate-500">Manage event speakers and their information.</p>
                </div>
                <Link
                    href={route('admin.speakers.create')}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm"
                >
                    <Plus size={18} />
                    Add Speaker
                </Link>
            </div>

            {speakers.data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {speakers.data.map((speaker) => (
                        <div key={speaker.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
                            <div className="p-6">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                        {speaker.photo ? (
                                            <img src={speaker.photo} alt={speaker.name} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            speaker.name.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-slate-800 mb-1 truncate">{speaker.name}</h3>
                                        {speaker.designation && (
                                            <p className="text-sm text-indigo-600 font-medium">{speaker.designation}</p>
                                        )}
                                        {speaker.organization && (
                                            <p className="text-xs text-slate-500 truncate">{speaker.organization}</p>
                                        )}
                                    </div>
                                </div>

                                {speaker.bio && (
                                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">{speaker.bio}</p>
                                )}

                                <div className="space-y-2 mb-4">
                                    {speaker.email && (
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Mail size={14} />
                                            <span className="truncate">{speaker.email}</span>
                                        </div>
                                    )}
                                    {speaker.phone && (
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Phone size={14} />
                                            <span>{speaker.phone}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2 pt-4 border-t border-slate-100">
                                    <Link
                                        href={route('admin.speakers.edit', speaker.id)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                    >
                                        <Edit size={14} />
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(speaker)}
                                        className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                    <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">No speakers yet</h3>
                    <p className="text-slate-500 mb-6">Get started by adding your first speaker.</p>
                    <Link
                        href={route('admin.speakers.create')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        <Plus size={18} />
                        Add Speaker
                    </Link>
                </div>
            )}

            {speakers.links && speakers.links.length > 3 && (
                <div className="mt-6 flex justify-center">
                    {/* Pagination would go here */}
                </div>
            )}
        </AdminLayout>
    );
}

