
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import RichTextEditor from '@/Components/RichTextEditor';

export default function Edit({ auth, service }) {
    const { data, setData, put, processing, errors } = useForm({
        title: service.title,
        slug: service.slug,
        icon: service.icon || '',
        short_description: service.short_description || '',
        description: service.description || '',
        is_active: Boolean(service.is_active),
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.services.update', service.slug));
    };

    return (
        <AdminLayout user={auth.user} title="Edit Service">
            <Head title="Edit Service" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-8">
                        <Link
                            href={route('admin.services.index')}
                            className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-600 shadow-sm hover:shadow transition"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">Edit Service</h2>
                            <p className="text-slate-500">Update service details.</p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6">
                        <div>
                            <InputLabel htmlFor="title" value="Title" />
                            <TextInput
                                id="title"
                                className="mt-1 block w-full"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                                isFocused
                                placeholder="e.g. Web Development"
                            />
                            <InputError className="mt-2" message={errors.title} />
                        </div>

                        <div>
                            <InputLabel htmlFor="slug" value="Slug (Optional)" />
                            <TextInput
                                id="slug"
                                className="mt-1 block w-full"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                placeholder="Leave empty to keep current or auto-generate"
                            />
                            <InputError className="mt-2" message={errors.slug} />
                        </div>

                        <div>
                            <InputLabel htmlFor="icon" value="Icon (Lucide React Name)" />
                            <TextInput
                                id="icon"
                                className="mt-1 block w-full"
                                value={data.icon}
                                onChange={(e) => setData('icon', e.target.value)}
                                placeholder="e.g. Globe, Code, Database"
                            />
                            <p className="text-sm text-slate-500 mt-1">See <a href="https://lucide.dev/icons" target="_blank" className="text-indigo-600 hover:underline">Lucide Icons</a> for names.</p>
                            <InputError className="mt-2" message={errors.icon} />
                        </div>

                        <div>
                            <InputLabel htmlFor="short_description" value="Short Description" />
                            <textarea
                                id="short_description"
                                className="mt-1 block w-full border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.short_description}
                                onChange={(e) => setData('short_description', e.target.value)}
                                rows={3}
                                placeholder="Brief overview for cards and summaries"
                            />
                            <InputError className="mt-2" message={errors.short_description} />
                        </div>

                        <div>
                            <InputLabel htmlFor="description" value="Full Description" />
                            <RichTextEditor
                                value={data.description}
                                onChange={(value) => setData('description', value)}
                                placeholder="Detailed description of the service"
                                className="mt-1"
                            />
                            <InputError className="mt-2" message={errors.description} />
                        </div>

                        <div className="block">
                            <label className="flex items-center">
                                <Checkbox
                                    name="is_active"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                />
                                <span className="ms-2 text-sm text-slate-600">Is Active</span>
                            </label>
                            <InputError className="mt-2" message={errors.is_active} />
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                            <Link
                                href={route('admin.services.index')}
                                className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium transition"
                            >
                                Cancel
                            </Link>
                            <PrimaryButton disabled={processing} className="gap-2">
                                <Save size={18} />
                                {processing ? 'Saving...' : 'Save Changes'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
