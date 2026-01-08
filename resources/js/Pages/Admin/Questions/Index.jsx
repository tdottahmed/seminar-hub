import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, quiz, questions }) {
    const { delete: destroy } = useForm();
    const { data, setData, post } = useForm({
         items: []
    });

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this question?')) {
            destroy(route('admin.quizzes.questions.destroy', [quiz.id, id]));
        }
    };
    
    // Placeholder for drag and drop reordering implementation later
    // For now it just lists them in order

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Questions for {quiz.title}</h2>}
        >
            <Head title={`Questions - ${quiz.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <Link href={route('admin.events.quizzes.index', quiz.event.id)} className="text-gray-600 dark:text-gray-400 hover:underline">
                                    &larr; Back to Quizzes
                                </Link>
                                <Link
                                    href={route('admin.quizzes.questions.create', quiz.id)}
                                    className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                >
                                    Add Question
                                </Link>
                            </div>
                            
                            <div className="space-y-4">
                                {questions.map((question, index) => (
                                    <div key={question.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center">
                                                    <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900">
                                                        {question.type.replace('_', ' ').toUpperCase()}
                                                    </span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        {question.points} pts
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-medium mt-1">{question.question_text}</h3>
                                                
                                                {question.type === 'multiple_choice' && question.options && (
                                                    <ul className="mt-2 list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                                                        {JSON.parse(question.options).map((option, idx) => (
                                                            <li key={idx} className={option === question.correct_answer ? 'font-bold text-green-600' : ''}>
                                                                {option} {option === question.correct_answer && '(Correct)'}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                                {question.type === 'true_false' && (
                                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                                        Correct Answer: <span className="font-bold">{question.correct_answer}</span>
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex space-x-2">
                                                {/* Edit link would go here */}
                                                <button onClick={() => handleDelete(question.id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                                {questions.length === 0 && (
                                    <p className="text-center text-gray-500 py-4">No questions added yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
