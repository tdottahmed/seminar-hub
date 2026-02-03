
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import RichTextEditor from '@/Components/RichTextEditor';
import { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

export default function Edit({ auth, course }) {
    // Ensure outline is an array
    const initialOutline = Array.isArray(course.outline) ? course.outline : [];

    // Helper to ensure bilingual structure exists for a field
    const ensureBilingual = (field) => {
        return {
            en: field?.en || '',
            bn: field?.bn || ''
        };
    };

    const { data, setData, put, processing, errors } = useForm({
        title: ensureBilingual(course.title),
        description: ensureBilingual(course.description),
        duration: ensureBilingual(course.duration),
        level: course.level || 'Beginner',
        price: course.price || '',
        thumbnail: course.thumbnail || '',
        is_active: Boolean(course.is_active),
        outline: initialOutline
    });

    const [activeTab, setActiveTab] = useState('en');

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.courses.update', course.id));
    };

    // Outline Management Helpers
    const addModule = () => {
        setData('outline', [...data.outline, { title: { en: '', bn: '' }, lessons: [] }]);
    };

    const removeModule = (index) => {
        const newOutline = [...data.outline];
        newOutline.splice(index, 1);
        setData('outline', newOutline);
    };

    const updateModuleTitle = (index, lang, value) => {
        const newOutline = [...data.outline];
        if (!newOutline[index].title) newOutline[index].title = { en: '', bn: '' };
        newOutline[index].title[lang] = value;
        setData('outline', newOutline);
    };

    const addLesson = (moduleIndex) => {
        const newOutline = [...data.outline];
        if (!newOutline[moduleIndex].lessons) newOutline[moduleIndex].lessons = [];
        newOutline[moduleIndex].lessons.push({ title: { en: '', bn: '' } });
        setData('outline', newOutline);
    };

    const removeLesson = (moduleIndex, lessonIndex) => {
        const newOutline = [...data.outline];
        newOutline[moduleIndex].lessons.splice(lessonIndex, 1);
        setData('outline', newOutline);
    };

    const updateLessonTitle = (moduleIndex, lessonIndex, lang, value) => {
        const newOutline = [...data.outline];
        if (!newOutline[moduleIndex].lessons[lessonIndex].title) newOutline[moduleIndex].lessons[lessonIndex].title = { en: '', bn: '' };
        newOutline[moduleIndex].lessons[lessonIndex].title[lang] = value;
        setData('outline', newOutline);
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Course</h2>}
        >
            <Head title="Edit Course" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* Language Tabs */}
                            <div className="border-b border-gray-200 mb-4">
                                <nav className="-mb-px flex space-x-8">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('en')}
                                        className={`${activeTab === 'en' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                    >
                                        English
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('bn')}
                                        className={`${activeTab === 'bn' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                    >
                                        Bengali
                                    </button>
                                </nav>
                            </div>

                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel value="Course Title" />
                                    <TextInput
                                        className="mt-1 block w-full"
                                        value={data.title[activeTab]}
                                        onChange={(e) => setData('title', { ...data.title, [activeTab]: e.target.value })}
                                        placeholder={activeTab === 'en' ? "e.g. Graphic Design Masterclass" : "e.g. গ্রাফিক ডিজাইন মাস্টারক্লাস"}
                                    />
                                    <InputError message={errors[`title.${activeTab}`]} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel value="Duration" />
                                    <TextInput
                                        className="mt-1 block w-full"
                                        value={data.duration[activeTab]}
                                        onChange={(e) => setData('duration', { ...data.duration, [activeTab]: e.target.value })}
                                        placeholder={activeTab === 'en' ? "e.g. 4 Weeks" : "e.g. ৪ সপ্তাহ"}
                                    />
                                </div>
                            </div>

                            {/* Rich Text Description */}
                            <div>
                                <InputLabel value="Detailed Description" />
                                <RichTextEditor
                                    className="mt-1"
                                    value={data.description[activeTab]}
                                    onChange={(value) => setData('description', { ...data.description, [activeTab]: value })}
                                    placeholder={activeTab === 'en' ? "Course details..." : "কোর্সের বিস্তারিত..."}
                                />
                                <InputError message={errors[`description.${activeTab}`]} className="mt-2" />
                            </div>

                            {/* Settings */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-4 rounded-lg">
                                <div>
                                    <InputLabel value="Price (BDT)" />
                                    <TextInput
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        placeholder="0 for Free"
                                    />
                                    <InputError message={errors.price} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel value="Level" />
                                    <select
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.level}
                                        onChange={(e) => setData('level', e.target.value)}
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                    <InputError message={errors.level} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel value="Status" />
                                    <label className="flex items-center mt-3 cursor-pointer">
                                        <div className="relative">
                                            <input 
                                                type="checkbox" 
                                                className="sr-only" 
                                                checked={data.is_active} 
                                                onChange={(e) => setData('is_active', e.target.checked)} 
                                            />
                                            <div className={`block w-10 h-6 rounded-full transition ${data.is_active ? 'bg-indigo-600' : 'bg-gray-400'}`}></div>
                                            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${data.is_active ? 'translate-x-4' : ''}`}></div>
                                        </div>
                                        <div className="ml-3 text-gray-700 font-medium">
                                            {data.is_active ? 'Active' : 'Inactive'}
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Course Outline Builder */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Course Outline ({activeTab.toUpperCase()})</h3>
                                    <PrimaryButton type="button" onClick={addModule} className="bg-slate-700 hover:bg-slate-800">
                                        <Plus size={16} className="mr-2" /> Add Module
                                    </PrimaryButton>
                                </div>
                                
                                <div className="space-y-4">
                                    {data.outline.map((module, mIndex) => (
                                        <div key={mIndex} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                            <div className="flex items-start gap-3">
                                                <GripVertical className="text-gray-400 mt-2 cursor-move" size={20} />
                                                <div className="flex-1 space-y-3">
                                                    {/* Module Title */}
                                                    <div>
                                                        <InputLabel value={`Module ${mIndex + 1} Title`} className="text-xs text-gray-500" />
                                                        <TextInput
                                                            className="w-full"
                                                            value={module.title ? module.title[activeTab] : ''}
                                                            onChange={(e) => updateModuleTitle(mIndex, activeTab, e.target.value)}
                                                            placeholder="Module Name"
                                                        />
                                                    </div>

                                                    {/* Lessons */}
                                                    <div className="pl-4 border-l-2 border-indigo-100 space-y-2">
                                                        {module.lessons && module.lessons.map((lesson, lIndex) => (
                                                            <div key={lIndex} className="flex gap-2 items-center">
                                                                <TextInput
                                                                    className="w-full text-sm"
                                                                    value={lesson.title ? lesson.title[activeTab] : ''}
                                                                    onChange={(e) => updateLessonTitle(mIndex, lIndex, activeTab, e.target.value)}
                                                                    placeholder={`Lesson ${lIndex + 1}`}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeLesson(mIndex, lIndex)}
                                                                    className="text-red-400 hover:text-red-600 p-1"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <button
                                                            type="button"
                                                            onClick={() => addLesson(mIndex)}
                                                            className="text-xs text-indigo-600 font-medium flex items-center hover:underline"
                                                        >
                                                            <Plus size={12} className="mr-1" /> Add Lesson
                                                        </button>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeModule(mIndex)}
                                                    className="text-red-500 hover:text-red-700 p-1 mt-1"
                                                    title="Remove Module"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {data.outline.length === 0 && (
                                        <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                                            No modules added yet. Click "Add Module" to start describing the curriculum.
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-end">
                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Update Course
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
