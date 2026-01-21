import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Plus, Edit, Trash2, Star, Quote, User } from "lucide-react";
import clsx from "clsx";

export default function Index({ auth, testimonials }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this testimonial?")) {
            destroy(route("admin.testimonials.destroy", id));
        }
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                size={14}
                className={clsx(
                    i < rating ? "text-amber-400 fill-amber-400" : "text-slate-300"
                )}
            />
        ));
    };

    return (
        <AdminLayout user={auth.user} title="Testimonials">
            <Head title="Testimonials" />

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        Testimonials
                    </h2>
                    <p className="text-slate-500 mt-1.5">
                        Manage what people are saying about you.
                    </p>
                </div>
                <Link
                    href={route("admin.testimonials.create")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                >
                    <Plus size={18} />
                    Add Testimonial
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.data.length > 0 ? (
                    testimonials.data.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all duration-300 group flex flex-col"
                        >
                            <div className="p-5 flex-1">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-1">
                                        {renderStars(item.rating)}
                                    </div>
                                    <div className="flex gap-1">
                                        <Link
                                            href={route("admin.testimonials.edit", item.id)}
                                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all hover:scale-110"
                                        >
                                            <Edit size={16} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all hover:scale-110"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="mb-4 relative">
                                    <Quote size={20} className="text-indigo-100 absolute -top-2 -left-2" />
                                    <p className="text-slate-600 text-sm relative z-10 italic line-clamp-3">
                                        "{item.content?.en || 'No content'}"
                                    </p>
                                </div>

                                {/* Profiler */}
                                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
                                    {item.avatar_path ? (
                                        <img 
                                            src={item.avatar_path} 
                                            alt={item.name} 
                                            className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                            <User size={20} />
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                                        <p className="text-xs text-slate-500 truncate max-w-[150px]">
                                            {item.role?.en} @ {item.company?.en}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Status Footer */}
                            {!item.is_active && (
                                <div className="bg-slate-100 px-4 py-2 text-xs text-center text-slate-500 font-medium">
                                    Hidden (Inactive)
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-white rounded-2xl border-2 border-dashed border-slate-300">
                        <p className="text-slate-500 mb-4">No testimonials found.</p>
                        <Link
                            href={route("admin.testimonials.create")}
                            className="text-indigo-600 font-semibold hover:underline"
                        >
                            Create one now
                        </Link>
                    </div>
                )}
            </div>
            
             {/* Pagination */}
            <div className="mt-8">
                {testimonials.links && (
                    <div className="flex gap-1 justify-center flex-wrap">
                        {testimonials.links.map((link, i) =>
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
