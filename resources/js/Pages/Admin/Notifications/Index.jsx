import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, event, notifications }) {
    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Notifications for {event.title}</h2>}
        >
            <Head title={`Notifications - ${event.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <Link href={route('admin.events.index')} className="text-gray-600 dark:text-gray-400 hover:underline">
                                    &larr; Back to Events
                                </Link>
                                <Link
                                    href={route('admin.events.notifications.create', event.id)}
                                    className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                >
                                    Compose Notification
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {notifications.map((notification) => (
                                    <div key={notification.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        notification.status === 'sent' ? 'bg-green-100 text-green-800' : 
                                                        notification.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {notification.created_at && new Date(notification.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-medium">{notification.subject}</h3>
                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
                                                    {notification.message.length > 100 ? notification.message.substring(0, 100) + '...' : notification.message}
                                                </p>
                                                {notification.scheduled_at && (
                                                    <p className="mt-2 text-xs text-gray-500">
                                                        Scheduled for: {new Date(notification.scheduled_at).toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {notifications.length === 0 && (
                                    <p className="text-center text-gray-500 py-4">No notifications found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
