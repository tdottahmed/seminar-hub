<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    protected $appends = ['image_url'];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('created_at', 'desc');
    }

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }
        
        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }

        // Clean any potential leading slashes or existing storage prefix
        $path = ltrim($this->image, '/');
        if (str_starts_with($path, 'storage/')) {
            return '/' . $path;
        }

        return '/storage/' . $path;
    }
}
