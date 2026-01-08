import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, ArrowLeft, Globe } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ auth, section }) {
    const { data, setData, put, processing, errors } = useForm({
        content: section.content,
        is_active: section.is_active,
    });

    const [activeTab, setActiveTab] = useState('en');

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.frontend.update', section.id));
    };

    // Helper to render inputs recursively or for specific keys
    const renderInputs = (lang) => {
        const content = data.content[lang];
        if (!content) return <p className="text-red-500">No content for {lang}</p>;

        return Object.keys(content).map((key) => {
            const value = content[key];
            const fieldKey = `content.${lang}.${key}`;

            if (Array.isArray(value)) {
                // Determine if it's a list of strings or list of objects
                if (value.length > 0 && typeof value[0] === 'string') {
                    // List of strings (e.g., words)
                     return (
                        <div key={key} className="mb-4">
                            <InputLabel value={key.charAt(0).toUpperCase() + key.slice(1)} />
                            {value.map((item, idx) => (
                                <div key={idx} className="mb-2">
                                    <TextInput
                                        className="w-full"
                                        value={item}
                                        onChange={(e) => {
                                            const newArray = [...data.content[lang][key]];
                                            newArray[idx] = e.target.value;
                                            const newContent = {
                                                ...data.content,
                                                [lang]: { ...data.content[lang], [key]: newArray }
                                            };
                                            setData('content', newContent);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    );
                } else if (value.length > 0 && typeof value[0] === 'object') {
                    // List of objects (e.g., features)
                     return (
                        <div key={key} className="mb-6 border p-4 rounded-lg bg-slate-50">
                            <InputLabel value={key.charAt(0).toUpperCase() + key.slice(1)} className="mb-2 font-bold text-lg" />
                            {value.map((item, idx) => (
                                <div key={idx} className="mb-4 pb-4 border-b last:border-0 border-slate-200">
                                    <p className="text-xs font-bold text-slate-400 mb-2 uppercase">Item {idx + 1}</p>
                                    {Object.keys(item).map((subKey) => (
                                        <div key={subKey} className="mb-2">
                                            <InputLabel value={subKey} className="text-xs" />
                                            <TextInput
                                                className="w-full text-sm"
                                                value={item[subKey]}
                                                onChange={(e) => {
                                                    const newArray = [...data.content[lang][key]];
                                                    newArray[idx] = { ...newArray[idx], [subKey]: e.target.value };
                                                    const newContent = {
                                                        ...data.content,
                                                        [lang]: { ...data.content[lang], [key]: newArray }
                                                    };
                                                    setData('content', newContent);
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    );
                }
            }

            return (
                <div key={key} className="mb-4">
                    <InputLabel htmlFor={fieldKey} value={key.charAt(0).toUpperCase() + key.slice(1)} />
                    <TextInput
                        id={fieldKey}
                        className="mt-1 block w-full"
                        value={value}
                        onChange={(e) => {
                            const newContent = {
                                ...data.content,
                                [lang]: { ...data.content[lang], [key]: e.target.value }
                            };
                            setData('content', newContent);
                        }}
                    />
                </div>
            );
        });
    };

    return (
        <AdminLayout user={auth.user} title={`Edit ${section.title}`}>
            <Head title={`Edit ${section.title}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                     <div className="mb-6">
                        <Link href={route('admin.frontend.index')} className="text-slate-500 hover:text-indigo-600 flex items-center gap-1 mb-2">
                            <ArrowLeft size={16} /> Back to Sections
                        </Link>
                        <h2 className="text-2xl font-bold text-slate-800">Edit: {section.title}</h2>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <form onSubmit={submit}>
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
                                {renderInputs(activeTab)}
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
                                    <Save size={16} /> Save Changes
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
