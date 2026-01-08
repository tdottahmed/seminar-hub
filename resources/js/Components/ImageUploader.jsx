import { useState, useRef, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, Link as LinkIcon, Loader2 } from 'lucide-react';
import clsx from 'clsx';

export default function ImageUploader({ 
    value = '', 
    onChange, 
    label = 'Photo',
    error,
    accept = 'image/*',
    maxSize = 5 * 1024 * 1024, // 5MB
    folder = 'uploads'
}) {
    const [preview, setPreview] = useState(value || '');
    const [uploading, setUploading] = useState(false);
    const [uploadMode, setUploadMode] = useState(value && value.startsWith('http') ? 'url' : 'file');
    const [urlInput, setUrlInput] = useState(value && value.startsWith('http') ? value : '');
    const fileInputRef = useRef(null);

    // Sync preview with value prop
    useEffect(() => {
        if (value) {
            setPreview(value);
            if (value.startsWith('http')) {
                setUrlInput(value);
                setUploadMode('url');
            }
        } else {
            setPreview('');
            setUrlInput('');
        }
    }, [value]);

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file size
        if (file.size > maxSize) {
            alert(`File size must be less than ${maxSize / 1024 / 1024}MB`);
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('folder', folder);

            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
            
            const response = await fetch('/admin/upload/image', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            const imageUrl = data.url || data.path;
            
            setPreview(imageUrl);
            onChange(imageUrl);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleUrlChange = (url) => {
        setUrlInput(url);
        setPreview(url);
        onChange(url);
    };

    const handleRemove = () => {
        setPreview('');
        setUrlInput('');
        onChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700">{label}</label>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setUploadMode('file')}
                        className={clsx(
                            "px-3 py-1 text-xs font-medium rounded-lg transition",
                            uploadMode === 'file' 
                                ? "bg-indigo-100 text-indigo-700" 
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        )}
                    >
                        <Upload size={14} className="inline mr-1" />
                        Upload
                    </button>
                    <button
                        type="button"
                        onClick={() => setUploadMode('url')}
                        className={clsx(
                            "px-3 py-1 text-xs font-medium rounded-lg transition",
                            uploadMode === 'url' 
                                ? "bg-indigo-100 text-indigo-700" 
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        )}
                    >
                        <LinkIcon size={14} className="inline mr-1" />
                        URL
                    </button>
                </div>
            </div>

            {uploadMode === 'file' ? (
                <div className="space-y-3">
                    <div className="relative">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept={accept}
                            onChange={handleFileSelect}
                            className="hidden"
                            id="image-upload"
                            disabled={uploading}
                        />
                        <label
                            htmlFor="image-upload"
                            className={clsx(
                                "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition",
                                uploading 
                                    ? "border-indigo-300 bg-indigo-50 cursor-wait" 
                                    : preview 
                                        ? "border-slate-300 hover:border-indigo-400 hover:bg-slate-50" 
                                        : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50"
                            )}
                        >
                            {uploading ? (
                                <div className="flex flex-col items-center">
                                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-2" />
                                    <span className="text-sm text-slate-600">Uploading...</span>
                                </div>
                            ) : preview ? (
                                <div className="relative w-full h-full group">
                                    <img 
                                        src={preview} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-xl flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleRemove();
                                            }}
                                            className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center p-6">
                                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                                        <ImageIcon className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <p className="text-sm text-slate-600 mb-1">
                                        <span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-slate-500">PNG, JPG, GIF up to 5MB</p>
                                </div>
                            )}
                        </label>
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                        <input
                            type="url"
                            value={urlInput}
                            onChange={(e) => handleUrlChange(e.target.value)}
                            placeholder="https://example.com/image.jpg or https://ui-avatars.com/api/?name=..."
                            className="pl-10 pr-10 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
                        />
                        {urlInput && (
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-600 transition"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                    {urlInput && (
                        <div className="relative w-full h-48 border-2 border-slate-200 rounded-xl overflow-hidden">
                            <img 
                                src={urlInput} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="hidden w-full h-full bg-slate-100 items-center justify-center">
                                <div className="text-center">
                                    <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                                    <p className="text-sm text-slate-500">Invalid image URL</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}

