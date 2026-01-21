import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Plus, Edit, Trash2, HelpCircle } from "lucide-react";
import clsx from "clsx";

export default function Index({ auth, faqs }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this FAQ?")) {
            destroy(route("admin.faqs.destroy", id));
        }
    };

    return (
        <AdminLayout user={auth.user} title="FAQs">
            <Head title="FAQs" />

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        FAQs
                    </h2>
                    <p className="text-slate-500 mt-1.5">
                        Manage Frequently Asked Questions.
                    </p>
                </div>
                <Link
                    href={route("admin.faqs.create")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                >
                    <Plus size={18} />
                    Add FAQ
                </Link>
            </div>

            {/* List */}
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Question</th>
                                <th className="px-6 py-4 w-1/3">Answer</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {faqs.data.length > 0 ? (
                                faqs.data.map((faq) => (
                                    <tr key={faq.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 align-top">
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                                                    <HelpCircle size={18} />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900 mb-1">{faq.question?.en}</p>
                                                    <p className="text-xs text-slate-500">{faq.question?.bn}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <p className="line-clamp-2 mb-1 text-slate-700">{faq.answer?.en}</p>
                                            <p className="line-clamp-2 text-xs text-slate-500">{faq.answer?.bn}</p>
                                        </td>
                                        <td className="px-6 py-4 text-center align-top">
                                             <span
                                                className={clsx(
                                                    "px-2.5 py-1 rounded-full text-xs font-bold border",
                                                    faq.is_active
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                        : "bg-slate-100 text-slate-600 border-slate-200"
                                                )}
                                            >
                                                {faq.is_active ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right align-top">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route("admin.faqs.edit", faq.id)}
                                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(faq.id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                                         No FAQs found. <Link href={route('admin.faqs.create')} className="text-indigo-600 font-semibold hover:underline">Create one</Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                 {/* Pagination */}
                 {faqs.links && (
                    <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50">
                         <div className="flex gap-1 justify-center flex-wrap">
                            {faqs.links.map((link, i) =>
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
