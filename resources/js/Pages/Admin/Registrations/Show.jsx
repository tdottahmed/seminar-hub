import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show({ auth, registration }) {
    const { data, setData, put, processing } = useForm({
        status: registration.status,
    });

    const updateStatus = (newStatus) => {
        setData('status', newStatus);
        // We need to use put with the new status immediately, or use a useEffect. 
        // For simplicity, let's just make a manual visit or cleaner form usage.
        // Actually, let's use the form submit but trigger it via button
         // A better way for immediate action buttons:
         // We can't use 'put' inside this function directly comfortably without state update lag.
         // Let's us the Inertia router instead for direct actions if not using a form submit button.
    };
    
    // Alternative: Just use a form for status update
    
    const submitStatus = (e) => {
        e.preventDefault();
        put(route('admin.registrations.update', registration.id));
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Registration Details</h2>}
        >
            <Head title={`Registration - ${registration.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <Link href={route('admin.events.registrations.index', registration.event.id)} className="text-gray-600 dark:text-gray-400 hover:underline">
                                    &larr; Back to Registrations
                                </Link>
                                
                                <span className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                                    registration.status === 'approved' ? 'bg-green-100 text-green-800' : 
                                    registration.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                    registration.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                    Status: {registration.status.toUpperCase()}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Attendee Information</h3>
                                    <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{registration.name}</dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{registration.email}</dd>
                                        </div>
                                         <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Event</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{registration.event.title}</dd>
                                        </div>
                                         <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Registered At</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{new Date(registration.created_at).toLocaleString()}</dd>
                                        </div>
                                    </dl>
                                </div>

                                <div className="border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 md:pl-6 pt-4 md:pt-0">
                                    <h3 className="text-lg font-medium mb-4">Update Status</h3>
                                    <form onSubmit={submitStatus}>
                                        <div className="mb-4">
                                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Change Status</label>
                                            <select
                                                id="status"
                                                name="status"
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                value={data.status}
                                                onChange={(e) => setData('status', e.target.value)}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="approved">Approved</option>
                                                <option value="rejected">Rejected</option>
                                                <option value="shortlisted">Shortlisted</option>
                                                <option value="attended">Attended</option>
                                            </select>
                                        </div>
                                        <PrimaryButton disabled={processing}>
                                            Update Status
                                        </PrimaryButton>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
