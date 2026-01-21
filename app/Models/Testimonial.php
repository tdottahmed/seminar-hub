<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $guarded = [];

    protected $casts = [
        'role' => 'array',
        'company' => 'array',
        'content' => 'array',
        'is_active' => 'boolean',
    ];
}
