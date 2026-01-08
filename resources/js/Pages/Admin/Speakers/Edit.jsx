import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ImageUploader from '@/Components/ImageUploader';
import { ArrowLeft, Save, User, Mail, Phone, Briefcase, Building, Link as LinkIcon } from 'lucide-react';

export default function Edit({ auth, speaker }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: speaker.name || '',
        email: speaker.email || '',
        phone: speaker.phone || '',
        bio: speaker.bio || '',
        designation: speaker.designation || '',
        organization: speaker.organization || '',
        photo: speaker.photo || '',
        portfolio_url: speaker.portfolio_url || '',
        expertise: speaker.expertise || '',
        social_links: speaker.social_links || {
            linkedin: '',
            twitter: '',
            website: '',
        },
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.speakers.update', speaker.id));
    };

    return (
        <AdminLayout user={auth.user} title="Edit Speaker">
            <Head title="Edit Speaker" />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link
                        href={route('admin.speakers.index')}
                        className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-2 w-fit"
                    >
                        <ArrowLeft size={16} className="mr-1" />
                        Back to Speakers
                    </Link>
                    <h2 className="text-2xl font-bold text-slate-800">Edit Speaker: {data.name}</h2>
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
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        {/* Email & Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <div className="relative mt-1">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        className="pl-10 block w-full"
                                        placeholder="john@example.com"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                </div>
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="phone" value="Phone" />
                                <div className="relative mt-1">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                    <TextInput
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        className="pl-10 block w-full"
                                        placeholder="+880 1XXX XXXXXX"
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />
                                </div>
                                <InputError message={errors.phone} className="mt-2" />
                            </div>
                        </div>

                        {/* Designation & Organization */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="designation" value="Designation" />
                                <div className="relative mt-1">
                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                    <TextInput
                                        id="designation"
                                        type="text"
                                        value={data.designation}
                                        className="pl-10 block w-full"
                                        placeholder="Senior Developer"
                                        onChange={(e) => setData('designation', e.target.value)}
                                    />
                                </div>
                                <InputError message={errors.designation} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="organization" value="Organization" />
                                <div className="relative mt-1">
                                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                    <TextInput
                                        id="organization"
                                        type="text"
                                        value={data.organization}
                                        className="pl-10 block w-full"
                                        placeholder="Company Name"
                                        onChange={(e) => setData('organization', e.target.value)}
                                    />
                                </div>
                                <InputError message={errors.organization} className="mt-2" />
                            </div>
                        </div>

                        {/* Bio */}
                        <div>
                            <InputLabel htmlFor="bio" value="Biography" />
                            <textarea
                                id="bio"
                                value={data.bio}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm pl-4 pt-3 min-h-[120px]"
                                placeholder="Tell us about the speaker..."
                                onChange={(e) => setData('bio', e.target.value)}
                            ></textarea>
                            <InputError message={errors.bio} className="mt-2" />
                        </div>

                        {/* Expertise */}
                        <div>
                            <InputLabel htmlFor="expertise" value="Areas of Expertise" />
                            <textarea
                                id="expertise"
                                value={data.expertise}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm pl-4 pt-3 min-h-[80px]"
                                placeholder="e.g. Web Development, AI/ML, Cloud Computing"
                                onChange={(e) => setData('expertise', e.target.value)}
                            ></textarea>
                            <InputError message={errors.expertise} className="mt-2" />
                        </div>

                        {/* Photo */}
                        <div>
                            <ImageUploader
                                value={data.photo}
                                onChange={(url) => setData('photo', url)}
                                label="Photo"
                                error={errors.photo}
                                folder="speakers"
                            />
                            <InputError message={errors.photo} className="mt-2" />
                        </div>

                        {/* Portfolio URL */}
                        <div>
                            <InputLabel htmlFor="portfolio_url" value="Portfolio URL" />
                            <div className="relative mt-1">
                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                <TextInput
                                    id="portfolio_url"
                                    type="url"
                                    value={data.portfolio_url}
                                    className="pl-10 block w-full"
                                    placeholder="https://portfolio.example.com"
                                    onChange={(e) => setData('portfolio_url', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.portfolio_url} className="mt-2" />
                        </div>

                        {/* Social Links */}
                        <div>
                            <InputLabel value="Social Links" />
                            <div className="mt-1 space-y-3">
                                <div>
                                    <label className="block text-xs text-slate-600 mb-1">LinkedIn</label>
                                    <TextInput
                                        type="url"
                                        value={data.social_links.linkedin || ''}
                                        className="block w-full"
                                        placeholder="https://linkedin.com/in/..."
                                        onChange={(e) => setData('social_links', { ...data.social_links, linkedin: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-600 mb-1">Twitter</label>
                                    <TextInput
                                        type="url"
                                        value={data.social_links.twitter || ''}
                                        className="block w-full"
                                        placeholder="https://twitter.com/..."
                                        onChange={(e) => setData('social_links', { ...data.social_links, twitter: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-600 mb-1">Website</label>
                                    <TextInput
                                        type="url"
                                        value={data.social_links.website || ''}
                                        className="block w-full"
                                        placeholder="https://example.com"
                                        onChange={(e) => setData('social_links', { ...data.social_links, website: e.target.value })}
                                    />
                                </div>
                            </div>
                            <InputError message={errors.social_links} className="mt-2" />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                            <Link
                                href={route('admin.speakers.index')}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                            >
                                Cancel
                            </Link>

                            <PrimaryButton className="flex items-center gap-2" disabled={processing}>
                                <Save size={18} />
                                <span>Update Speaker</span>
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

