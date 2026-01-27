import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";

export default function Create({ auth, event }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        time_limit_minutes: "",
        total_questions: "",
        is_published: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.events.quizzes.store", event.id));
    };

    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Quiz for {event.title}
                </h2>
            }
        >
            <Head title="Create Quiz" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="title" value="Title" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.title}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="description"
                                        value="Description"
                                    />
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="4"
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    ></textarea>
                                    <InputError
                                        message={errors.description}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="time_limit_minutes"
                                        value="Time Limit (Minutes)"
                                    />
                                    <TextInput
                                        id="time_limit_minutes"
                                        type="number"
                                        name="time_limit_minutes"
                                        value={data.time_limit_minutes}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "time_limit_minutes",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        This determines the number of questions shown per attempt (1 minute = 1 question).
                                    </p>
                                    {data.time_limit_minutes && (
                                        <p className="text-sm text-indigo-600 mt-1 font-medium">
                                            Total Questions per Attempt: {data.time_limit_minutes}
                                        </p>
                                    )}
                                    <InputError
                                        message={errors.time_limit_minutes}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="total_questions"
                                        value="Total Questions"
                                    />
                                    <TextInput
                                        id="total_questions"
                                        type="number"
                                        name="total_questions"
                                        value={data.total_questions}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "total_questions",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Max number of questions to attempt (Overrides time-based calc).
                                    </p>
                                    <InputError
                                        message={errors.total_questions}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="block mt-4">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="is_published"
                                            checked={data.is_published}
                                            onChange={(e) =>
                                                setData(
                                                    "is_published",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <span className="ml-2 text-sm text-gray-600">
                                            Publish immediately
                                        </span>
                                    </label>
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Link
                                        href={route(
                                            "admin.events.quizzes.index",
                                            event.id
                                        )}
                                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>

                                    <PrimaryButton
                                        className="ml-4"
                                        disabled={processing}
                                    >
                                        Create Quiz
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
