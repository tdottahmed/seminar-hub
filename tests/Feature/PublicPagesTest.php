<?php

namespace Tests\Feature;

use App\Models\FrontendSection;
use App\Models\Service;
use App\Models\Team;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicPagesTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_pages_are_accessible()
    {
        // Seed necessary data
        $this->seed(\Database\Seeders\FrontendSectionSeeder::class);
        
        Service::create([
            'title' => 'Test Service',
            'slug' => 'test-service',
            'is_active' => true
        ]);

        Team::create([
            'name' => 'John Doe',
            'designation' => 'CEO',
            'type' => 'team_lead',
            'is_active' => true
        ]);

        $response = $this->get('/services');
        $response->assertStatus(200);

        $response = $this->get('/about-us');
        $response->assertStatus(200);

        $response = $this->get('/our-goals');
        $response->assertStatus(200);

        $response = $this->get('/teams');
        $response->assertStatus(200);
    }
}
