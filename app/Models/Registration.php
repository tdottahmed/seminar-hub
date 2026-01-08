<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Event;
use App\Models\QuizAttempt;

class Registration extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'custom_answers' => 'array',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function quizAttempts()
    {
        return $this->hasMany(QuizAttempt::class);
    }
}
