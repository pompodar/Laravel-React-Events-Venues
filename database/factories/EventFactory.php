<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\Venue;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition()
    {
        // Generate a random image file
        $poster = UploadedFile::fake()->image('poster.jpg', 1200, 600);

        return [
            'name' => $this->faker->sentence(3),
            'poster' => $poster->store('posters', 'public'),
            'event_date' => $this->faker->dateTimeBetween('+1 week', '+1 year'),
            'venue_id' => Venue::factory(),
        ];
    }
}

