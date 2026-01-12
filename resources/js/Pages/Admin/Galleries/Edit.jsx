import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import ImageUploader from "@/Components/ImageUploader";
import { ArrowLeft, Save } from "lucide-react";

export default function Edit({ auth, gallery }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: "patch",
        title: gallery.title || "",
        description: gallery.description || "",
        image: gallery.image || "",
        category: gallery.category || "",
        is_active: gallery.is_active !== undefined ? gallery.is_active : true,
        order: gallery.order || 0,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.galleries.update", gallery.id));
    };

    return (
        <AdminLayout user={auth.user} title="Edit Gallery Item">
            <Head title="Edit Gallery Item" />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link
                        href={route("admin.galleries.index")}
                        className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-2 w-fit"
                    >
                        <ArrowLeft size={16} className="mr-1" />
                        Back to Gallery
                    </Link>
                    <h2 className="text-2xl font-bold text-slate-800">
                        Edit Gallery Item: {data.title}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <form onSubmit={submit} className="p-6 space-y-6">
                        {/* Title */}
                        <div>
                            <InputLabel htmlFor="title" value="Title *" />
                            <TextInput
                                id="title"
                                type="text"
                                value={data.title}
                                className="mt-1 block w-full"
                                placeholder="Gallery item title"
                                onChange={(e) => setData("title", e.target.value)}
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        {/* Description */}
                        <div>
                            <InputLabel htmlFor="description" value="Description" />
                            <textarea
                                id="description"
                                value={data.description}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm pl-4 pt-3 min-h-[100px]"
                                placeholder="Describe this gallery item..."
                                onChange={(e) => setData("description", e.target.value)}
                            ></textarea>
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        {/* Image */}
                        <div>
                            <ImageUploader
                                value={data.image}
                                onChange={(url) => setData("image", url)}
                                label="Image"
                                error={errors.image}
                                folder="gallery"
                            />
                            <InputError message={errors.image} className="mt-2" />
                        </div>

                        {/* Category & Order */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="category" value="Category" />
                                <TextInput
                                    id="category"
                                    type="text"
                                    value={data.category}
                                    className="mt-1 block w-full"
                                    placeholder="e.g. Events, Team, Awards"
                                    onChange={(e) => setData("category", e.target.value)}
                                />
                                <InputError message={errors.category} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="order" value="Display Order" />
                                <TextInput
                                    id="order"
                                    type="number"
                                    value={data.order}
                                    className="mt-1 block w-full"
                                    placeholder="0"
                                    min="0"
                                    onChange={(e) => setData("order", parseInt(e.target.value) || 0)}
                                />
                                <InputError message={errors.order} className="mt-2" />
                            </div>
                        </div>

                        {/* Active Status */}
                        <div>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData("is_active", e.target.checked)}
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <span className="text-sm text-slate-700">Active (visible on frontend)</span>
                            </label>
                            <InputError message={errors.is_active} className="mt-2" />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                            <Link
                                href={route("admin.galleries.index")}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                            >
                                Cancel
                            </Link>

                            <PrimaryButton className="flex items-center gap-2" disabled={processing}>
                                <Save size={18} />
                                <span>Update Gallery Item</span>
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

