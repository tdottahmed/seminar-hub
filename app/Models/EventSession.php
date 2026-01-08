<?php

namespace App\Models;

use App\Models\Event; // Added this line
use Illuminate\Database\Eloquent\Model;

class EventSession extends Model
{
    protected $guarded = ['id'];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
