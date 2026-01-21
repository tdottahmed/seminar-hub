import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { Edit, LayoutTemplate, Power } from 'lucide-react';
import clsx from 'clsx';

export default function Index({ auth, sections }) {
    return (
        <AdminLayout user={auth.user} title="Frontend Management">
            <Head title="Frontend Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">Frontend Sections</h2>
                            <p className="text-slate-500">Manage the content of your landing page.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sections.map((section) => (
                            <div key={section.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="bg-indigo-50 p-3 rounded-lg">
                                            <LayoutTemplate className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <div className={clsx(
                                            "px-2 py-1 rounded text-xs font-bold uppercase",
                                            section.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                        )}>
                                            {section.is_active ? 'Active' : 'Inactive'}
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">{section.title}</h3>
                                    <p className="text-slate-500 text-sm font-mono mb-6 bg-slate-50 inline-block px-2 py-1 rounded">
                                        Slug: {section.slug}
                                    </p>
                                    
                                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                        <Link 
                                            href={route('admin.frontend.edit', section.slug)}
                                            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition"
                                        >
                                           <span className='sr-only'>Edit</span>
                                            Edit Content
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
