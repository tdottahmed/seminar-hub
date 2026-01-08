<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'meta_data' => 'array',
    ];

    public function sessions()
    {
        return $this->hasMany(EventSession::class);
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    public function notifications()
    {
        return $this->hasMany(EventNotification::class);
    }
}
