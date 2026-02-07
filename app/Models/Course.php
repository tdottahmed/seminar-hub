<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $guarded = [];

    protected $casts = [
        'title' => 'array',
        'description' => 'array',
        'duration' => 'array',
        'outline' => 'array',
        'is_active' => 'boolean',
        'price' => 'decimal:2',
    ];

    public function enrollments()
    {
        return $this->hasMany(CourseEnrollment::class);
    }
}
