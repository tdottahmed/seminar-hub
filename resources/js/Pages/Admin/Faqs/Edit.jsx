import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ auth, faq }) {
    const { data, setData, put, processing, errors } = useForm({
        question: faq.question || { en: '', bn: '' },
        answer: faq.answer || { en: '', bn: '' },
        order: faq.order || 0,
        is_active: faq.is_active,
    });

    const [activeTab, setActiveTab] = useState('en');

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.faqs.update', faq.id));
    };

    return (
        <AdminLayout user={auth.user} title="Edit FAQ">
            <Head title="Edit FAQ" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link href={route('admin.faqs.index')} className="text-slate-500 hover:text-indigo-600 flex items-center gap-1 mb-2">
                            <ArrowLeft size={16} /> Back to FAQs
                        </Link>
                        <h2 className="text-2xl font-bold text-slate-800">Edit FAQ</h2>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <form onSubmit={submit}>
                            {/* Language Tabs */}
                            <div className="border-b border-slate-200 bg-slate-50 flex">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('en')}
                                    className={clsx(
                                        "px-6 py-4 font-medium text-sm flex items-center gap-2 border-r border-slate-200 focus:outline-none transition",
                                        activeTab === 'en' ? "bg-white text-indigo-600 border-b-2 border-b-indigo-600 -mb-px" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                                    )}
                                >
                                    🇬🇧 English
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('bn')}
                                    className={clsx(
                                        "px-6 py-4 font-medium text-sm flex items-center gap-2 border-r border-slate-200 focus:outline-none transition",
                                        activeTab === 'bn' ? "bg-white text-green-600 border-b-2 border-b-green-600 -mb-px" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                                    )}
                                >
                                    🇧🇩 Bengali
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="grid gap-6">
                                    {/* Translatable Fields */}
                                    <div>
                                        <InputLabel value="Question" />
                                        <TextInput
                                            className="mt-1 block w-full"
                                            value={data.question[activeTab]}
                                            onChange={(e) => setData('question', { ...data.question, [activeTab]: e.target.value })}
                                            placeholder={activeTab === 'en' ? "e.g., How do I register?" : "যেমন: আমি কিভাবে নিবন্ধন করব?"}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel value="Answer" />
                                        <textarea
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            rows="4"
                                            value={data.answer[activeTab]}
                                            onChange={(e) => setData('answer', { ...data.answer, [activeTab]: e.target.value })}
                                            placeholder={activeTab === 'en' ? "Detailed answer here..." : "বিস্তারিত উত্তর এখানে..."}
                                        />
                                    </div>

                                     {/* Common Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                                         <div>
                                            <InputLabel htmlFor="order" value="Sort Order" />
                                            <input
                                                type="number"
                                                id="order"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                value={data.order}
                                                onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                            />
                                            <p className="text-xs text-slate-500 mt-1">Lower numbers appear first.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-t border-slate-200">
                                <div className="flex items-center gap-2">
                                     <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    />
                                    <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Active</label>
                                </div>
                                <PrimaryButton disabled={processing} className="flex items-center gap-2">
                                    <Save size={16} /> Update FAQ
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
