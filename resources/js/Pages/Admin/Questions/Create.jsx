import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';

export default function Create({ auth, quiz }) {
    const { data, setData, post, processing, errors } = useForm({
        question_text: '',
        type: 'multiple_choice',
        points: 1,
        options: ['', '', '', ''], // Default 4 options for MCQ
        correct_answer: '',
    });

    const [options, setOptions] = useState(['', '', '', '']);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
        setData('options', newOptions);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.quizzes.questions.store', quiz.id));
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Question to {quiz.title}</h2>}
        >
            <Head title="Add Question" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="type" value="Question Type" />
                                    <select
                                        id="type"
                                        name="type"
                                        value={data.type}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={(e) => setData('type', e.target.value)}
                                    >
                                        <option value="multiple_choice">Multiple Choice</option>
                                        <option value="true_false">True / False</option>
                                        <option value="short_answer">Short Answer</option>
                                    </select>
                                    <InputError message={errors.type} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="question_text" value="Question Text" />
                                    <textarea
                                        id="question_text"
                                        name="question_text"
                                        value={data.question_text}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="3"
                                        required
                                        onChange={(e) => setData('question_text', e.target.value)}
                                    ></textarea>
                                    <InputError message={errors.question_text} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="points" value="Points" />
                                    <TextInput
                                        id="points"
                                        type="number"
                                        name="points"
                                        value={data.points}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('points', e.target.value)}
                                    />
                                    <InputError message={errors.points} className="mt-2" />
                                </div>

                                {data.type === 'multiple_choice' && (
                                    <div className="mt-6 border-t pt-4">
                                        <h3 className="font-medium text-gray-900 mb-2">Options</h3>
                                        {options.map((option, index) => (
                                            <div key={index} className="mt-2 flex items-center">
                                                <input 
                                                    type="radio" 
                                                    name="correct_answer_selector"
                                                    className="mr-2"
                                                    checked={data.correct_answer === option && option !== ''}
                                                    onChange={() => setData('correct_answer', option)}
                                                />
                                                <TextInput
                                                    type="text"
                                                    value={option}
                                                    placeholder={`Option ${index + 1}`}
                                                    className="block w-full"
                                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                        <InputError message={errors.options} className="mt-2" />
                                        <InputError message={errors.correct_answer} className="mt-2" />
                                        <p className="text-xs text-gray-500 mt-2">Select the radio button next to the correct answer.</p>
                                    </div>
                                )}
                                
                                {data.type === 'true_false' && (
                                     <div className="mt-6 border-t pt-4">
                                        <h3 className="font-medium text-gray-900 mb-2">Correct Answer</h3>
                                        <div className="flex items-center space-x-4">
                                            <label className="flex items-center">
                                                <input type="radio" name="correct_answer" value="True" checked={data.correct_answer === 'True'} onChange={(e) => setData('correct_answer', e.target.value)} className="mr-2"/>
                                                True
                                            </label>
                                            <label className="flex items-center">
                                                <input type="radio" name="correct_answer" value="False" checked={data.correct_answer === 'False'} onChange={(e) => setData('correct_answer', e.target.value)} className="mr-2"/>
                                                False
                                            </label>
                                        </div>
                                        <InputError message={errors.correct_answer} className="mt-2" />
                                    </div>
                                )}
                                
                                {data.type === 'short_answer' && (
                                     <div className="mt-6 border-t pt-4">
                                        <InputLabel htmlFor="correct_answer" value="Correct Answer (Text match)" />
                                        <TextInput
                                            id="correct_answer"
                                            type="text"
                                            name="correct_answer"
                                            value={data.correct_answer}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('correct_answer', e.target.value)}
                                        />
                                        <InputError message={errors.correct_answer} className="mt-2" />
                                    </div>
                                )}

                                <div className="flex items-center justify-end mt-4">
                                    <Link
                                        href={route('admin.quizzes.questions.index', quiz.id)}
                                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>

                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Save Question
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
