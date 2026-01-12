<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Gallery;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $galleries = Gallery::ordered()->paginate(15);
        return Inertia::render('Admin/Galleries/Index', [
            'galleries' => $galleries
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Galleries/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'order' => 'nullable|integer|min:0',
        ];

        // Add image validation - handle file uploads or string URLs
        if ($request->hasFile('image')) {
            $rules['image'] = 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120';
        } else {
            $rules['image'] = 'nullable';
        }

        $validated = $request->validate($rules);

        // Handle image upload
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('gallery', $filename, 'public');
            $validated['image'] = Storage::url($path);
        } elseif ($request->has('image')) {
            $imageValue = $request->input('image');
            if (empty($imageValue) || $imageValue === null) {
                $validated['image'] = null;
            } else {
                $validated['image'] = $imageValue;
            }
        }

        Gallery::create($validated);

        return redirect()->route('admin.galleries.index')->with('success', 'Gallery item created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Gallery $gallery)
    {
        return Inertia::render('Admin/Galleries/Show', [
            'gallery' => $gallery
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gallery $gallery)
    {
        return Inertia::render('Admin/Galleries/Edit', [
            'gallery' => $gallery
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gallery $gallery)
    {
        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'order' => 'nullable|integer|min:0',
        ];

        // Add image validation - handle file uploads or string URLs
        if ($request->hasFile('image')) {
            $rules['image'] = 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120';
        } else {
            $rules['image'] = 'nullable';
        }

        $validated = $request->validate($rules);

        // Handle image upload/update
        if ($request->hasFile('image')) {
            // New file uploaded - store it
            $file = $request->file('image');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('gallery', $filename, 'public');
            $validated['image'] = Storage::url($path);

            // Delete old image if it exists and is stored locally
            if ($gallery->image && strpos($gallery->image, '/storage/') !== false) {
                $oldPath = str_replace('/storage/', '', parse_url($gallery->image, PHP_URL_PATH));
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }
        } elseif ($request->has('image')) {
            // image field is present in request
            $imageValue = $request->input('image');

            if (empty($imageValue) || $imageValue === null) {
                // Image was removed - clear it
                $validated['image'] = null;

                // Delete old image if it exists and is stored locally
                if ($gallery->image && strpos($gallery->image, '/storage/') !== false) {
                    $oldPath = str_replace('/storage/', '', parse_url($gallery->image, PHP_URL_PATH));
                    if (Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                    }
                }
            } else {
                // It's a URL string (either existing or new external URL) - use it as is
                $validated['image'] = $imageValue;
            }
        } else {
            // image not in request - keep existing value
            $validated['image'] = $gallery->image;
        }

        $gallery->update($validated);

        return redirect()->route('admin.galleries.index')->with('success', 'Gallery item updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gallery $gallery)
    {
        // Delete image file if exists
        if ($gallery->image && strpos($gallery->image, '/storage/') !== false) {
            $oldPath = str_replace('/storage/', '', parse_url($gallery->image, PHP_URL_PATH));
            if (Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
        }

        $gallery->delete();

        return redirect()->route('admin.galleries.index')->with('success', 'Gallery item deleted successfully.');
    }
}
