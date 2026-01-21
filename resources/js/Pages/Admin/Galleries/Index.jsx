import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";

export default function Index({ auth, galleries }) {
    const handleDelete = (gallery) => {
        if (confirm(`Are you sure you want to delete this image?`)) {
            router.delete(route("admin.galleries.destroy", gallery.id));
        }
    };

    return (
        <AdminLayout user={auth.user} title="Gallery Management">
            <Head title="Gallery Management" />

            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        Gallery
                    </h2>
                    <p className="text-slate-500 mt-1.5">
                        Manage your gallery images and showcase your events.
                    </p>
                </div>
                <Link
                    href={route("admin.galleries.create")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:-translate-y-0.5"
                >
                    <Plus size={18} />
                    Add Gallery Item
                </Link>
            </div>

            {galleries.data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleries.data.map((gallery) => (
                        <div
                            key={gallery.id}
                            className={`bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-xl transition-all duration-300 group ${
                                gallery.is_active
                                    ? "border-slate-200 hover:border-indigo-200"
                                    : "border-slate-100 opacity-60"
                            }`}
                        >
                            <div className="relative aspect-video bg-slate-100 overflow-hidden">
                                {gallery.image ? (
                                    <img
                                        src={`/storage/${gallery.image}`}
                                        alt={gallery.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ImageIcon className="w-12 h-12 text-slate-400" />
                                    </div>
                                )}
                                {!gallery.is_active && (
                                    <div className="absolute top-2 right-2 px-2 py-1 bg-slate-500 text-white text-xs font-medium rounded">
                                        Inactive
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-slate-100">
                                    <span className="text-sm font-medium text-slate-500">
                                        Order: {gallery.order}
                                    </span>
                                    <div className="flex gap-2">
                                        <Link
                                            href={route("admin.galleries.edit", gallery.id)}
                                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(gallery)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                    <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">
                        No gallery items yet
                    </h3>
                    <p className="text-slate-500 mb-6">
                        Get started by adding your first gallery item.
                    </p>
                    <Link
                        href={route("admin.galleries.create")}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <Plus size={18} />
                        Add Gallery Item
                    </Link>
                </div>
            )}

            {galleries.links && galleries.links.length > 3 && (
                <div className="mt-8 flex justify-center">
                    <div className="flex gap-2">
                        {galleries.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || "#"}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    link.active
                                        ? "bg-indigo-600 text-white"
                                        : link.url
                                          ? "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

