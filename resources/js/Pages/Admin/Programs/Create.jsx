import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: { en: '', bn: '' },
        description: { en: '', bn: '' },
        count_label: { en: '', bn: '' },
        icon: 'Activity', // Default icon name
        color_class: 'bg-indigo-500',
        order: 0,
        is_active: true,
    });

    const [activeTab, setActiveTab] = useState('en');

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.programs.store'));
    };

    const colorOptions = [
        { name: 'Indigo', class: 'bg-indigo-500' },
        { name: 'Emerald', class: 'bg-emerald-500' },
        { name: 'Amber', class: 'bg-amber-500' },
        { name: 'Rose', class: 'bg-rose-500' },
        { name: 'Blue', class: 'bg-blue-500' },
        { name: 'Purple', class: 'bg-purple-500' },
        { name: 'Cyan', class: 'bg-cyan-500' },
        { name: 'Orange', class: 'bg-orange-500' },
    ];

    return (
        <AdminLayout user={auth.user} title="Create Program">
            <Head title="Create Program" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link href={route('admin.programs.index')} className="text-slate-500 hover:text-indigo-600 flex items-center gap-1 mb-2">
                            <ArrowLeft size={16} /> Back to Programs
                        </Link>
                        <h2 className="text-2xl font-bold text-slate-800">Add New Program</h2>
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
                                        <InputLabel value="Program Title" />
                                        <TextInput
                                            className="mt-1 block w-full"
                                            value={data.title[activeTab]}
                                            onChange={(e) => setData('title', { ...data.title, [activeTab]: e.target.value })}
                                            placeholder={activeTab === 'en' ? "e.g., Workshops" : "যেমন: কর্মশালা"}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <InputLabel value="Description" />
                                        <textarea
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            rows="3"
                                            value={data.description[activeTab]}
                                            onChange={(e) => setData('description', { ...data.description, [activeTab]: e.target.value })}
                                            placeholder={activeTab === 'en' ? "Brief description..." : "সংক্ষিপ্ত বিবরণ..."}
                                            required
                                        />
                                    </div>
                                     <div>
                                        <InputLabel value="Count Label (Stats)" />
                                        <TextInput
                                            className="mt-1 block w-full"
                                            value={data.count_label[activeTab]}
                                            onChange={(e) => setData('count_label', { ...data.count_label, [activeTab]: e.target.value })}
                                            placeholder={activeTab === 'en' ? "e.g., 50+ Sessions" : "যেমন: ৫০+ সেশন"}
                                        />
                                    </div>

                                     {/* Common Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                                         <div>
                                            <InputLabel htmlFor="icon" value="Icon Name (Lucide React)" />
                                            <TextInput
                                                id="icon"
                                                className="mt-1 block w-full"
                                                value={data.icon}
                                                onChange={(e) => setData('icon', e.target.value)}
                                                placeholder="e.g. Activity, Users, Star"
                                            />
                                            <p className="text-xs text-slate-500 mt-1">Use exact component name from Lucide React.</p>
                                        </div>

                                        <div>
                                            <InputLabel value="Icon Color" />
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {colorOptions.map((color) => (
                                                    <button
                                                        key={color.name}
                                                        type="button"
                                                        onClick={() => setData('color_class', color.class)}
                                                        className={clsx(
                                                            "w-8 h-8 rounded-full border-2 transition-all",
                                                            color.class,
                                                            data.color_class === color.class ? "border-slate-800 scale-110 shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                                                        )}
                                                        title={color.name}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                         <div>
                                            <InputLabel htmlFor="order" value="Sort Order" />
                                            <input
                                                type="number"
                                                id="order"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                value={data.order}
                                                onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                            />
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
                                    <Save size={16} /> Save Program
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
