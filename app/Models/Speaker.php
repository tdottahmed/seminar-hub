<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Speaker extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'social_links' => 'array',
    ];

    public function events()
    {
        return $this->belongsToMany(Event::class, 'event_speaker');
    }
}
