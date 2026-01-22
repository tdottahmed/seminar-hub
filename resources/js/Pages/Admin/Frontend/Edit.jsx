import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, ArrowLeft, Globe, Plus, Trash2 } from 'lucide-react';
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
        put(route('admin.frontend.update', section.slug)); // Use slug for route binding
    };

    // Helper to upload image
    const handleImageUpload = async (file, onSuccess) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('folder', `frontend/${section.slug}`);

        try {
            const response = await axios.post(route('admin.upload.image'), formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            onSuccess(response.data.url);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Image upload failed. Please try again.');
        }
    };

    const renderImageInput = (value, onChange, label, onRemove = null) => (
        <div className="mb-4">
            <div className="flex items-center justify-between">
                <InputLabel value={label} />
                {onRemove && (
                    <button
                        type="button"
                        onClick={onRemove}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Remove Image"
                    >
                        <Trash2 size={16} />
                    </button>
                )}
            </div>
            <div className="flex items-start gap-4 mt-1">
                <div className="flex-1">
                    <TextInput
                        className="w-full"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Image URL"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="cursor-pointer bg-indigo-50 text-indigo-600 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-100 transition text-center whitespace-nowrap">
                        Upload
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    handleImageUpload(e.target.files[0], onChange);
                                }
                            }}
                        />
                    </label>
                </div>
            </div>
            {value && (
                <div className="mt-2 relative group w-fit">
                    <img src={value} alt="Preview" className="h-24 w-auto rounded border border-slate-200 object-cover bg-slate-50" />
                </div>
            )}
        </div>
    );

    // Helper to render inputs recursively or for specific keys
    const renderInputs = (lang) => {
        const content = data.content[lang];
        if (!content) return <p className="text-red-500">No content for {lang}</p>;

        return Object.keys(content).map((key) => {
            const value = content[key];
            const fieldKey = `content.${lang}.${key}`;
            const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim();

            if (Array.isArray(value)) {
                // Determine if it's a list of strings or list of objects
                if (value.length > 0 && typeof value[0] === 'string') {
                    // Check if it's likely an image array
                    const isImageArray = key.toLowerCase().includes('image') || key.toLowerCase().includes('photo');
                    
                    // List of strings (e.g., words, images)
                     return (
                        <div key={key} className="mb-4 bg-slate-50/50 p-4 rounded-xl border border-slate-200">
                            <InputLabel value={label} className="mb-3 font-semibold text-lg text-slate-700" />
                            {value.map((item, idx) => (
                                <div key={idx} className="mb-3 last:mb-0">
                                    {isImageArray ? renderImageInput(
                                        item,
                                        (newUrl) => {
                                            const newArray = [...data.content[lang][key]];
                                            newArray[idx] = newUrl;
                                            const newContent = {
                                                ...data.content,
                                                [lang]: { ...data.content[lang], [key]: newArray }
                                            };
                                            setData('content', newContent);
                                        },
                                        `Image ${idx + 1}`,
                                        value.length > 1 ? () => {
                                            const newArray = data.content[lang][key].filter((_, i) => i !== idx);
                                            const newContent = {
                                                ...data.content,
                                                [lang]: { ...data.content[lang], [key]: newArray }
                                            };
                                            setData('content', newContent);
                                        } : null
                                    ) : (
                                        <div className="flex items-center gap-2">
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
                                            {value.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newArray = data.content[lang][key].filter((_, i) => i !== idx);
                                                        const newContent = {
                                                            ...data.content,
                                                            [lang]: { ...data.content[lang], [key]: newArray }
                                                        };
                                                        setData('content', newContent);
                                                    }}
                                                    className="text-slate-400 hover:text-red-500 transition p-2"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    const newArray = [...data.content[lang][key], ''];
                                    const newContent = {
                                        ...data.content,
                                        [lang]: { ...data.content[lang], [key]: newArray }
                                    };
                                    setData('content', newContent);
                                }}
                                className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                            >
                                <Plus size={16} /> Add Item
                            </button>
                        </div>
                    );
                } else if (value.length > 0 && typeof value[0] === 'object') {
                    // List of objects (e.g., features)
                     return (
                        <div key={key} className="mb-6 border p-4 rounded-xl bg-slate-50/50">
                            <InputLabel value={label} className="mb-4 font-bold text-lg text-slate-800" />
                            {value.map((item, idx) => (
                                <div key={idx} className="mb-4 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                                    <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Item {idx + 1}</p>
                                    <div className="grid gap-4">
                                        {Object.keys(item).map((subKey) => {
                                            const isImageField = subKey.toLowerCase().includes('url') || subKey.toLowerCase().includes('image') || subKey.toLowerCase().includes('photo') || subKey.toLowerCase().includes('avatar');
                                            const subLabel = subKey.charAt(0).toUpperCase() + subKey.slice(1).replace(/([A-Z])/g, ' $1').trim();
                                            
                                            if (isImageField) {
                                                return (
                                                    <div key={subKey}>
                                                        {renderImageInput(
                                                            item[subKey],
                                                            (newUrl) => {
                                                                const newArray = [...data.content[lang][key]];
                                                                newArray[idx] = { ...newArray[idx], [subKey]: newUrl };
                                                                const newContent = {
                                                                    ...data.content,
                                                                    [lang]: { ...data.content[lang], [key]: newArray }
                                                                };
                                                                setData('content', newContent);
                                                            },
                                                            subLabel
                                                        )}
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div key={subKey}>
                                                    <InputLabel value={subLabel} className="text-xs mb-1 text-slate-500" />
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
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                }
            }

            // Single Value
            const isImageKey = key.toLowerCase().includes('image') || key.toLowerCase().includes('photo') || key.toLowerCase().includes('url') || key.toLowerCase().includes('bg');
            if (isImageKey) {
                 return (
                    <div key={key}>
                        {renderImageInput(
                            value,
                            (newUrl) => {
                                const newContent = {
                                    ...data.content,
                                    [lang]: { ...data.content[lang], [key]: newUrl }
                                };
                                setData('content', newContent);
                            },
                            label
                        )}
                    </div>
                 );
            }

            return (
                <div key={key} className="mb-4">
                    <InputLabel htmlFor={fieldKey} value={label} />
                    {value.length > 100 ? (
                         <textarea
                            id={fieldKey}
                            rows={3}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={value}
                            onChange={(e) => {
                                const newContent = {
                                    ...data.content,
                                    [lang]: { ...data.content[lang], [key]: e.target.value }
                                };
                                setData('content', newContent);
                            }}
                        />
                    ) : (
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
                    )}
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
