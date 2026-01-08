import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import ImageUploader from "@/Components/ImageUploader";
import {
    ArrowLeft,
    Save,
    Calendar,
    MapPin,
    Users,
    Link as LinkIcon,
    Plus,
    X,
} from "lucide-react";
import { useState } from "react";

export default function Create({ auth, speakers = [] }) {
    const [topics, setTopics] = useState([""]);
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        short_description: "",
        start_date: "",
        end_date: "",
        venue: "",
        location: "",
        meeting_link: "",
        max_participants: "",
        description: "",
        topics: [],
        outline: "",
        banner_image: "",
        speaker_ids: [],
    });

    const addTopic = () => {
        setTopics([...topics, ""]);
    };

    const removeTopic = (index) => {
        const newTopics = topics.filter((_, i) => i !== index);
        setTopics(newTopics);
        setData(
            "topics",
            newTopics.filter((t) => t.trim() !== "")
        );
    };

    const updateTopic = (index, value) => {
        const newTopics = [...topics];
        newTopics[index] = value;
        setTopics(newTopics);
        setData(
            "topics",
            newTopics.filter((t) => t.trim() !== "")
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.events.store"));
    };

    return (
        <AdminLayout user={auth.user} title="Create Event">
            <Head title="Create Event" />

            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <Link
                        href={route("admin.events.index")}
                        className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-2 w-fit"
                    >
                        <ArrowLeft size={16} className="mr-1" />
                        Back to Events
                    </Link>
                    <h2 className="text-2xl font-bold text-slate-800">
                        New Event
                    </h2>
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
                                className="mt-1 block w-full placeholder-slate-300"
                                placeholder="e.g. Annual Tech Conference 2026"
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

                        {/* Short Description */}
                        <div>
                            <InputLabel
                                htmlFor="short_description"
                                value="Short Description"
                            />
                            <textarea
                                id="short_description"
                                value={data.short_description}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm pl-4 pt-3 placeholder-slate-300 min-h-[80px]"
                                placeholder="A brief summary (shown on event cards)..."
                                onChange={(e) =>
                                    setData("short_description", e.target.value)
                                }
                            ></textarea>
                            <InputError
                                message={errors.short_description}
                                className="mt-2"
                            />
                        </div>

                        {/* Date & Time Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel
                                    htmlFor="start_date"
                                    value="Start Date & Time"
                                />
                                <div className="relative mt-1">
                                    <Calendar
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                        size={18}
                                    />
                                    <TextInput
                                        id="start_date"
                                        type="datetime-local"
                                        value={data.start_date}
                                        className="pl-10 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "start_date",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <InputError
                                    message={errors.start_date}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="end_date"
                                    value="End Date & Time"
                                />
                                <div className="relative mt-1">
                                    <Calendar
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                        size={18}
                                    />
                                    <TextInput
                                        id="end_date"
                                        type="datetime-local"
                                        value={data.end_date}
                                        className="pl-10 block w-full"
                                        onChange={(e) =>
                                            setData("end_date", e.target.value)
                                        }
                                    />
                                </div>
                                <InputError
                                    message={errors.end_date}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        {/* Venue & Location Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="venue" value="Venue" />
                                <div className="relative mt-1">
                                    <MapPin
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                        size={18}
                                    />
                                    <TextInput
                                        id="venue"
                                        type="text"
                                        value={data.venue}
                                        className="pl-10 block w-full placeholder-slate-300"
                                        placeholder="e.g. Grand Convention Center"
                                        onChange={(e) =>
                                            setData("venue", e.target.value)
                                        }
                                    />
                                </div>
                                <InputError
                                    message={errors.venue}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="location"
                                    value="Full Address"
                                />
                                <TextInput
                                    id="location"
                                    type="text"
                                    value={data.location}
                                    className="mt-1 block w-full placeholder-slate-300"
                                    placeholder="Full address or coordinates"
                                    onChange={(e) =>
                                        setData("location", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.location}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        {/* Meeting Link & Max Participants */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel
                                    htmlFor="meeting_link"
                                    value="Online Meeting Link"
                                />
                                <div className="relative mt-1">
                                    <LinkIcon
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                        size={18}
                                    />
                                    <TextInput
                                        id="meeting_link"
                                        type="url"
                                        value={data.meeting_link}
                                        className="pl-10 block w-full placeholder-slate-300"
                                        placeholder="https://zoom.us/j/..."
                                        onChange={(e) =>
                                            setData(
                                                "meeting_link",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <InputError
                                    message={errors.meeting_link}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="max_participants"
                                    value="Max Participants"
                                />
                                <div className="relative mt-1">
                                    <Users
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                        size={18}
                                    />
                                    <TextInput
                                        id="max_participants"
                                        type="number"
                                        value={data.max_participants}
                                        className="pl-10 block w-full placeholder-slate-300"
                                        placeholder="100"
                                        onChange={(e) =>
                                            setData(
                                                "max_participants",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <InputError
                                    message={errors.max_participants}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <InputLabel
                                htmlFor="description"
                                value="Full Description"
                            />
                            <textarea
                                id="description"
                                value={data.description}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm pl-4 pt-3 placeholder-slate-300 min-h-[120px]"
                                placeholder="Write a detailed description of the event..."
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            ></textarea>
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>

                        {/* Topics */}
                        <div>
                            <InputLabel value="Topics Covered" />
                            <div className="mt-1 space-y-2">
                                {topics.map((topic, index) => (
                                    <div key={index} className="flex gap-2">
                                        <TextInput
                                            type="text"
                                            value={topic}
                                            className="flex-1"
                                            placeholder={`Topic ${index + 1}`}
                                            onChange={(e) =>
                                                updateTopic(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {topics.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeTopic(index)
                                                }
                                                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                            >
                                                <X size={18} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addTopic}
                                    className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition text-sm font-medium"
                                >
                                    <Plus size={16} />
                                    Add Topic
                                </button>
                            </div>
                            <InputError
                                message={errors.topics}
                                className="mt-2"
                            />
                        </div>

                        {/* Outline */}
                        <div>
                            <InputLabel
                                htmlFor="outline"
                                value="Event Outline"
                            />
                            <textarea
                                id="outline"
                                value={data.outline}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm pl-4 pt-3 placeholder-slate-300 min-h-[150px]"
                                placeholder="Detailed event schedule and outline..."
                                onChange={(e) =>
                                    setData("outline", e.target.value)
                                }
                            ></textarea>
                            <InputError
                                message={errors.outline}
                                className="mt-2"
                            />
                        </div>

                        {/* Banner Image */}
                        <div>
                            <ImageUploader
                                value={data.banner_image}
                                onChange={(url) => setData("banner_image", url)}
                                label="Banner Image"
                                error={errors.banner_image}
                                folder="events"
                            />
                            <InputError
                                message={errors.banner_image}
                                className="mt-2"
                            />
                        </div>

                        {/* Speakers */}
                        {speakers.length > 0 && (
                            <div>
                                <InputLabel value="Select Speakers" />
                                <div className="mt-2 space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
                                    {speakers.map((speaker) => (
                                        <label
                                            key={speaker.id}
                                            className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={data.speaker_ids.includes(
                                                    speaker.id
                                                )}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setData("speaker_ids", [
                                                            ...data.speaker_ids,
                                                            speaker.id,
                                                        ]);
                                                    } else {
                                                        setData(
                                                            "speaker_ids",
                                                            data.speaker_ids.filter(
                                                                (id) =>
                                                                    id !==
                                                                    speaker.id
                                                            )
                                                        );
                                                    }
                                                }}
                                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span className="text-sm text-slate-700">
                                                {speaker.name}
                                            </span>
                                            {speaker.designation && (
                                                <span className="text-xs text-slate-500">
                                                    - {speaker.designation}
                                                </span>
                                            )}
                                        </label>
                                    ))}
                                </div>
                                <InputError
                                    message={errors.speaker_ids}
                                    className="mt-2"
                                />
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                            <Link
                                href={route("admin.events.index")}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                            >
                                Cancel
                            </Link>

                            <PrimaryButton
                                className="flex items-center gap-2"
                                disabled={processing}
                            >
                                <Save size={18} />
                                <span>Create Event</span>
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
