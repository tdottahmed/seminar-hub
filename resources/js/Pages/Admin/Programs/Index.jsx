import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Plus, Edit, Trash2, Box, Layers } from "lucide-react";
import clsx from "clsx";

export default function Index({ auth, programs }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this program?")) {
            destroy(route("admin.programs.destroy", id));
        }
    };

    return (
        <AdminLayout user={auth.user} title="Programs">
            <Head title="Programs" />

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        Programs
                    </h2>
                    <p className="text-slate-500 mt-1.5">
                        Manage your program offerings and stats.
                    </p>
                </div>
                <Link
                    href={route("admin.programs.create")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                >
                    <Plus size={18} />
                    Add Program
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.data.length > 0 ? (
                    programs.data.map((program) => (
                        <div
                            key={program.id}
                            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all duration-300 group flex flex-col"
                        >
                            <div className="p-5 flex-1 relative">
                                 {/* Icon Highlight */}
                                 <div className={clsx("absolute top-0 right-0 p-4 opacity-5 pointer-events-none")}>
                                     <Layers size={80} />
                                 </div>

                                {/* Header */}
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                     <div className={clsx("w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-md", program.color_class || 'bg-slate-500')}>
                                        <Box size={20} />
                                     </div>
                                    <div className="flex gap-1">
                                        <Link
                                            href={route("admin.programs.edit", program.id)}
                                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all hover:scale-110"
                                        >
                                            <Edit size={16} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(program.id)}
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all hover:scale-110"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="mb-4 relative z-10">
                                    <h3 className="text-lg font-bold text-slate-800 mb-1">{program.title?.en}</h3>
                                    <p className="text-xs text-slate-500 mb-2">{program.title?.bn}</p>
                                    
                                    <p className="text-slate-600 text-sm line-clamp-2 mb-1">
                                        {program.description?.en || 'No description'}
                                    </p>
                                </div>
                                
                                {/* Stat Preview */}
                                {program.count_label && (
                                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
                                        <span className="text-2xl font-bold text-indigo-600">
                                            {program.count_label.en?.split(' ')[0]} {/* Quick hack to show first part as number */}
                                        </span>
                                        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                                            {program.count_label.en?.split(' ').slice(1).join(' ')}
                                        </span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Status Footer */}
                            {!program.is_active && (
                                <div className="bg-slate-100 px-4 py-2 text-xs text-center text-slate-500 font-medium">
                                    Hidden (Inactive)
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-white rounded-2xl border-2 border-dashed border-slate-300">
                        <p className="text-slate-500 mb-4">No programs found.</p>
                        <Link
                            href={route("admin.programs.create")}
                            className="text-indigo-600 font-semibold hover:underline"
                        >
                            Create one now
                        </Link>
                    </div>
                )}
            </div>
            
             {/* Pagination */}
            <div className="mt-8">
                {programs.links && (
                    <div className="flex gap-1 justify-center flex-wrap">
                        {programs.links.map((link, i) =>
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
