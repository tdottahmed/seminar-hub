import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { ArrowLeft, Save, Calendar, MapPin } from 'lucide-react';

export default function Edit({ auth, event }) {
    const { data, setData, patch, processing, errors } = useForm({
        title: event.title,
        start_date: event.start_date,
        end_date: event.end_date,
        venue: event.venue || '',
        description: event.description || '',
        status: event.status,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.events.update', event.id));
    };

    return (
        <AdminLayout user={auth.user} title="Edit Event">
            <Head title="Edit Event" />

            <div className="max-w-3xl mx-auto">
                 <div className="mb-6">
                    <Link
                        href={route('admin.events.index')}
                        className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-2 w-fit"
                    >
                        <ArrowLeft size={16} className="mr-1" />
                        Back to Events
                    </Link>
                    <h2 className="text-2xl font-bold text-slate-800">Edit Event: {data.title}</h2>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <form onSubmit={submit} className="p-6 space-y-6">
                        {/* Title */}
                        <div>
                            <InputLabel htmlFor="title" value="Event Title" />
                            <TextInput
                                id="title"
                                type="text"
                                value={data.title}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('title', e.target.value)}
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        {/* Date & Time Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="start_date" value="Start Date & Time" />
                                <div className="relative mt-1">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                    <TextInput
                                        id="start_date"
                                        type="datetime-local"
                                        value={data.start_date ? data.start_date.substring(0, 16) : ''}
                                        className="pl-10 block w-full"
                                        onChange={(e) => setData('start_date', e.target.value)}
                                    />
                                </div>
                                <InputError message={errors.start_date} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="end_date" value="End Date & Time" />
                                 <div className="relative mt-1">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                    <TextInput
                                        id="end_date"
                                        type="datetime-local"
                                        value={data.end_date ? data.end_date.substring(0, 16) : ''}
                                        className="pl-10 block w-full"
                                        onChange={(e) => setData('end_date', e.target.value)}
                                    />
                                </div>
                                <InputError message={errors.end_date} className="mt-2" />
                            </div>
                        </div>

                        {/* Venue & Status Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="venue" value="Venue / Location" />
                                <div className="relative mt-1">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                    <TextInput
                                        id="venue"
                                        type="text"
                                        value={data.venue}
                                        className="pl-10 block w-full"
                                        placeholder="e.g. Grand Convention Center"
                                        onChange={(e) => setData('venue', e.target.value)}
                                    />
                                </div>
                                <InputError message={errors.venue} className="mt-2" />
                            </div>
                            
                            <div>
                                <InputLabel htmlFor="status" value="Status" />
                                <div className="relative mt-1">
                                    <select
                                        id="status"
                                        value={data.status}
                                        className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm pl-3 pr-10"
                                        onChange={(e) => setData('status', e.target.value)}
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <InputError message={errors.status} className="mt-2" />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <InputLabel htmlFor="description" value="Description" />
                            <textarea
                                id="description"
                                value={data.description}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm pl-4 pt-3 min-h-[120px]"
                                rows="4"
                                onChange={(e) => setData('description', e.target.value)}
                            ></textarea>
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                            <Link
                                href={route('admin.events.index')}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                            >
                                Cancel
                            </Link>

                            <PrimaryButton className="flex items-center gap-2" disabled={processing}>
                                <Save size={18} />
                                <span>Update Event</span>
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
