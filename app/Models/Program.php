<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    protected $guarded = [];

    protected $casts = [
        'title' => 'array',
        'description' => 'array',
        'count_label' => 'array',
        'is_active' => 'boolean',
    ];

    //
}
