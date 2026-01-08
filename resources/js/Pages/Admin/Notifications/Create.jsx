import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create({ auth, event }) {
    const { data, setData, post, processing, errors } = useForm({
        subject: '',
        message: '',
        scheduled_at: '',
        status: 'draft',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.events.notifications.store', event.id));
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Compose Notification for {event.title}</h2>}
        >
            <Head title="Compose Notification" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="subject" value="Subject" />
                                    <TextInput
                                        id="subject"
                                        type="text"
                                        name="subject"
                                        value={data.subject}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('subject', e.target.value)}
                                    />
                                    <InputError message={errors.subject} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="message" value="Message" />
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={data.message}
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm h-32"
                                        onChange={(e) => setData('message', e.target.value)}
                                    ></textarea>
                                    <InputError message={errors.message} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="scheduled_at" value="Schedule Send (Optional)" />
                                    <TextInput
                                        id="scheduled_at"
                                        type="datetime-local"
                                        name="scheduled_at"
                                        value={data.scheduled_at}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('scheduled_at', e.target.value)}
                                    />
                                    <p className="text-sm text-gray-500 mt-1">Leave empty to send immediately (or save as draft).</p>
                                    <InputError message={errors.scheduled_at} className="mt-2" />
                                </div>
                                
                                <div className="mt-4">
                                    <InputLabel htmlFor="status" value="Action" />
                                    <select
                                        id="status"
                                        name="status"
                                        value={data.status}
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                        onChange={(e) => setData('status', e.target.value)}
                                    >
                                        <option value="draft">Save as Draft</option>
                                        <option value="scheduled">Schedule / Send</option>
                                    </select>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Link
                                        href={route('admin.events.notifications.index', event.id)}
                                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                    >
                                        Cancel
                                    </Link>

                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Save Notification
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
