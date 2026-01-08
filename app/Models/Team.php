<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'social_links' => 'array',
        'is_team_lead' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeTeamLead($query)
    {
        return $query->where('is_team_lead', true);
    }

    public function scopeMembers($query)
    {
        return $query->where('is_team_lead', false);
    }
}
