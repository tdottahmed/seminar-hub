import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import ImageUploader from "@/Components/ImageUploader";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        image: "",
        is_active: true,
        order: 0,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.galleries.store"));
    };

    return (
        <AdminLayout user={auth.user} title="Create Gallery Item">
            <Head title="Create Gallery Item" />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link
                        href={route("admin.galleries.index")}
                        className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-2 w-fit"
                    >
                        <ArrowLeft size={16} className="mr-1" />
                        Back to Gallery
                    </Link>
                    <h2 className="text-2xl font-bold text-slate-800">New Gallery Item</h2>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <form onSubmit={submit} className="p-6 space-y-6">
                        {/* Image */}
                        <div>
                            <ImageUploader
                                value={data.image}
                                onChange={(url) => setData("image", url)}
                                label="Image *"
                                error={errors.image}
                                folder="gallery"
                            />
                            <InputError message={errors.image} className="mt-2" />
                        </div>

                        {/* Order */}
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
                                <span>Create Gallery Item</span>
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

