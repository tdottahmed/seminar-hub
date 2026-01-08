<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FrontendSection extends Model
{
    protected $guarded = [];

    protected $casts = [
        'content' => 'array',
        'is_active' => 'boolean',
    ];
}
