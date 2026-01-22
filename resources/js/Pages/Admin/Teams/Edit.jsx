import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import ImageUploader from "@/Components/ImageUploader";
import { ArrowLeft, Save, User, Mail, Phone, Briefcase, Building, Link as LinkIcon, Crown } from "lucide-react";

export default function Edit({ auth, team }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: team.name || "",
        phone: team.phone || "",
        bio: team.bio || "",
        designation: team.designation || "",
        photo: team.photo || "",
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("admin.teams.update", team.id));
    };

    return (
        <AdminLayout user={auth.user} title="Edit Team Member">
            <Head title="Edit Team Member" />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link
                        href={route("admin.teams.index")}
                        className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-2 w-fit"
                    >
                        <ArrowLeft size={16} className="mr-1" />
                        Back to Team
                    </Link>
                    <h2 className="text-2xl font-bold text-slate-800">Edit Team Member: {data.name}</h2>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <form onSubmit={submit} className="p-6 space-y-6">
                        {/* Name */}
                        <div>
                            <InputLabel htmlFor="name" value="Full Name *" />
                            <div className="relative mt-1">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    className="pl-10 block w-full"
                                    placeholder="John Doe"
                                    onChange={(e) => setData("name", e.target.value)}
                                />
                            </div>
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        {/* Phone */}
                        <div>
                            <InputLabel htmlFor="phone" value="Phone *" />
                            <div className="relative mt-1">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                <TextInput
                                    id="phone"
                                    type="tel"
                                    value={data.phone}
                                    className="pl-10 block w-full"
                                    placeholder="+880 1XXX XXXXXX"
                                    onChange={(e) => setData("phone", e.target.value)}
                                />
                            </div>
                            <InputError message={errors.phone} className="mt-2" />
                        </div>

                        {/* Designation */}
                        <div>
                            <InputLabel htmlFor="designation" value="Designation *" />
                            <div className="relative mt-1">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                <TextInput
                                    id="designation"
                                    type="text"
                                    value={data.designation}
                                    className="pl-10 block w-full"
                                    placeholder="Senior Developer"
                                    onChange={(e) => setData("designation", e.target.value)}
                                />
                            </div>
                            <InputError message={errors.designation} className="mt-2" />
                        </div>

                        {/* Bio / About */}
                        <div>
                            <InputLabel htmlFor="bio" value="About (Optional)" />
                            <textarea
                                id="bio"
                                value={data.bio}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm pl-4 pt-3 min-h-[120px]"
                                placeholder="Tell us about the team member..."
                                onChange={(e) => setData("bio", e.target.value)}
                            ></textarea>
                            <InputError message={errors.bio} className="mt-2" />
                        </div>

                        {/* Photo */}
                        <div>
                            <ImageUploader
                                value={data.photo}
                                onChange={(url) => setData("photo", url)}
                                label="Photo"
                                error={errors.photo}
                                folder="teams"
                            />
                            <InputError message={errors.photo} className="mt-2" />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                            <Link
                                href={route("admin.teams.index")}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                            >
                                Cancel
                            </Link>

                            <PrimaryButton className="flex items-center gap-2" disabled={processing}>
                                <Save size={18} />
                                <span>Update Team Member</span>
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

