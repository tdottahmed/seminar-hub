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
    folder = 'uploads',
    id = 'image-upload' // Default ID, but should be overridden if multiple instances exist
}) {
    // Helper function to check if value is a string URL
    const isStringUrl = (val) => {
        return typeof val === 'string' && val.trim() !== '' && val.startsWith('http');
    };

    // Helper function to get string value or empty string
    const getStringValue = (val) => {
        if (typeof val === 'string') return val;
        if (val instanceof File) return ''; // File objects should not be used as preview
        return '';
    };

    const [preview, setPreview] = useState(getStringValue(value) || '');
    const [uploading, setUploading] = useState(false);
    const [uploadMode, setUploadMode] = useState(isStringUrl(value) ? 'url' : 'file');
    const [urlInput, setUrlInput] = useState(isStringUrl(value) ? value : '');
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const objectUrlRef = useRef(null);

    // Cleanup object URL on unmount
    useEffect(() => {
        return () => {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
            }
        };
    }, []);

    // Sync preview with value prop
    useEffect(() => {
        const stringValue = getStringValue(value);
        if (stringValue && stringValue.trim() !== '') {
            // Only update preview if we don't have a selected file
            if (!selectedFile) {
                setPreview(stringValue);
            }
            if (isStringUrl(value)) {
                setUrlInput(stringValue);
            }
        } else if (!selectedFile) {
            setPreview('');
            setUrlInput('');
        }
    }, [value, selectedFile]);

    const handleFileSelect = (e) => {
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

        // Cleanup previous object URL
        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
        }

        const objectUrl = URL.createObjectURL(file);
        objectUrlRef.current = objectUrl;
        setPreview(objectUrl);
        setSelectedFile(file);
        setUploadMode('file');
        
        // Pass the File object to parent
        onChange(file);
    };

    const handleUrlChange = (url) => {
        setUrlInput(url);
        setSelectedFile(null);
        // Cleanup file object URL if exists
        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
            objectUrlRef.current = null;
        }
        if (url && url.trim() !== '') {
            setPreview(url);
            onChange(url); // Pass URL string to parent
        } else {
            setPreview('');
            onChange(null);
        }
    };

    const handleRemove = () => {
        setPreview('');
        setUrlInput('');
        setSelectedFile(null);
        // Cleanup object URL
        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
            objectUrlRef.current = null;
        }
        onChange(null); // Pass null to indicate removal
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
                    {/* Show preview if exists */}
                    {preview && (
                        <div className="relative w-full h-64 border-2 border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                            <img 
                                src={preview} 
                                alt="Image Preview" 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    const errorDiv = e.target.nextElementSibling;
                                    if (errorDiv) {
                                        errorDiv.style.display = 'flex';
                                    }
                                }}
                            />
                            <div className="hidden w-full h-full bg-slate-100 items-center justify-center absolute inset-0">
                                <div className="text-center">
                                    <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                                    <p className="text-sm text-slate-500">Invalid image</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition shadow-lg"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    )}
                    
                    {/* Upload area */}
                    <div className="relative">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept={accept}
                            onChange={handleFileSelect}
                            className="hidden"
                            id={id}
                            disabled={uploading}
                        />
                        <label
                            htmlFor={id}
                            className={clsx(
                                "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition",
                                uploading 
                                    ? "border-indigo-300 bg-indigo-50 cursor-wait" 
                                    : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50"
                            )}
                        >
                            {uploading ? (
                                <div className="flex flex-col items-center">
                                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-2" />
                                    <span className="text-sm text-slate-600">Uploading...</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center p-6">
                                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                                        <ImageIcon className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <p className="text-sm text-slate-600 mb-1">
                                        <span className="font-semibold text-indigo-600">
                                            {preview ? 'Change image' : 'Click to upload'}
                                        </span> or drag and drop
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
                    {preview && (
                        <div className="relative w-full h-64 border-2 border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                            <img 
                                src={preview} 
                                alt="Image Preview" 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    const errorDiv = e.target.nextElementSibling;
                                    if (errorDiv) {
                                        errorDiv.style.display = 'flex';
                                    }
                                }}
                            />
                            <div className="hidden w-full h-full bg-slate-100 items-center justify-center absolute inset-0">
                                <div className="text-center">
                                    <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                                    <p className="text-sm text-slate-500">Invalid image URL</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition shadow-lg"
                            >
                                <X size={18} />
                            </button>
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

