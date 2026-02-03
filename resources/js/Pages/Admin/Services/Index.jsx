
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

export default function Index({ auth, services }) {
    const [search, setSearch] = useState('');

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this service?')) {
            router.delete(route('admin.services.destroy', id));
        }
    };

    const filteredServices = services.data.filter(service =>
        service.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout user={auth.user} title="Services">
            <Head title="Services" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold text-slate-800">Services</h2>
                            <Link
                                href={route('admin.services.create')}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                            >
                                <Plus size={20} />
                                <span>Add Service</span>
                            </Link>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search services..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-slate-600">Title</th>
                                    <th className="px-6 py-4 font-semibold text-slate-600">Status</th>
                                    <th className="px-6 py-4 font-semibold text-slate-600 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {services.data.length > 0 ? (
                                    services.data.map((service) => (
                                        <tr key={service.id} className="hover:bg-slate-50 transition">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-900">{service.title}</div>
                                                <div className="text-sm text-slate-500 truncate max-w-xs">{service.short_description}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {service.is_active ? (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        <CheckCircle size={12} />
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                        <XCircle size={12} />
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route('admin.services.edit', service.slug)}
                                                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                                    >
                                                        <Edit size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(service.slug)}
                                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-12 text-center text-slate-500">
                                            No services found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                     <div className="px-6 py-4 border-t border-slate-200">
                         {/* Pagination links could go here if using Laravel pagination links */}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
