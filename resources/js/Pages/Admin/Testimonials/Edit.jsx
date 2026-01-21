import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from 'axios';

export default function Edit({ auth, testimonial }) {
    const { data, setData, put, processing, errors } = useForm({
        name: testimonial.name || '',
        role: testimonial.role || { en: '', bn: '' },
        company: testimonial.company || { en: '', bn: '' },
        content: testimonial.content || { en: '', bn: '' },
        avatar_path: testimonial.avatar_path || '',
        rating: testimonial.rating || 5,
        order: testimonial.order || 0,
        is_active: testimonial.is_active,
    });

    const [activeTab, setActiveTab] = useState('en');

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.testimonials.update', testimonial.id));
    };

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('folder', 'testimonials');

        try {
            const response = await axios.post(route('admin.upload.image'), formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setData('avatar_path', response.data.url);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Image upload failed');
        }
    };

    return (
        <AdminLayout user={auth.user} title="Edit Testimonial">
            <Head title="Edit Testimonial" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link href={route('admin.testimonials.index')} className="text-slate-500 hover:text-indigo-600 flex items-center gap-1 mb-2">
                            <ArrowLeft size={16} /> Back to Testimonials
                        </Link>
                        <h2 className="text-2xl font-bold text-slate-800">Edit Testimonial</h2>
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

                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Common Fields */}
                                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-1">
                                         <InputLabel htmlFor="name" value="Participant Name" />
                                         <TextInput
                                            id="name"
                                            className="mt-1 block w-full"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>

                                    <div className="col-span-1">
                                        <InputLabel htmlFor="rating" value="Rating (1-5)" />
                                        <input
                                            type="number"
                                            min="1"
                                            max="5"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={data.rating}
                                            onChange={(e) => setData('rating', parseInt(e.target.value))}
                                        />
                                    </div>
                                    
                                     {/* Avatar Upload */}
                                    <div className="md:col-span-2">
                                        <InputLabel value="Avatar Photo" />
                                        <div className="flex items-center gap-4 mt-2">
                                            {data.avatar_path ? (
                                                <img src={data.avatar_path} alt="Preview" className="w-16 h-16 rounded-full object-cover border" />
                                            ) : (
                                                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border border-dashed border-slate-300 text-slate-400">
                                                    <ImageIcon size={24} />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <TextInput 
                                                    value={data.avatar_path} 
                                                    onChange={e => setData('avatar_path', e.target.value)} 
                                                    placeholder="Image URL or Upload"
                                                    className="w-full mb-2"
                                                />
                                                <label className="cursor-pointer bg-white border border-slate-300 px-3 py-1.5 rounded text-sm font-medium hover:bg-slate-50 transition">
                                                    Choose File
                                                    <input type="file" className="hidden" accept="image/*" onChange={e => {
                                                        if(e.target.files?.[0]) handleImageUpload(e.target.files[0]);
                                                    }} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Translatable Fields */}
                                <div className="md:col-span-2 border-t pt-6">
                                    <h3 className="font-semibold text-lg mb-4">{activeTab === 'en' ? 'English Content' : 'Bengali Content'}</h3>
                                    
                                    <div className="grid gap-4">
                                        <div>
                                            <InputLabel value="Role / Job Title" />
                                            <TextInput
                                                className="mt-1 block w-full"
                                                value={data.role[activeTab]}
                                                onChange={(e) => setData('role', { ...data.role, [activeTab]: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <InputLabel value="Company / Organization" />
                                            <TextInput
                                                className="mt-1 block w-full"
                                                value={data.company[activeTab]}
                                                onChange={(e) => setData('company', { ...data.company, [activeTab]: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <InputLabel value="Testimonial Content" />
                                            <textarea
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                rows="4"
                                                value={data.content[activeTab]}
                                                onChange={(e) => setData('content', { ...data.content, [activeTab]: e.target.value })}
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
                                    <Save size={16} /> Update Testimonial
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
