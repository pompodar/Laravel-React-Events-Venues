<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;
use GeoIp2\Database\Reader;
use Illuminate\Support\Facades\Http;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $userIpAddress = $request->ip();
        $latitude = 0;
        $longitude = 0;

        try {
            $reader = new Reader(storage_path('app/geoip/GeoLite2-City.mmdb'));
            $record = $reader->city($userIpAddress);

            $latitude = $record->location->latitude;
            $longitude = $record->location->longitude;
        } catch (\Exception $e) {
        }

        $stormglassApiKey = env('STORMGLASS_API_KEY');
        $cacheKey = "weather_{$latitude}_{$longitude}";

        $weatherData = Cache::remember($cacheKey, 3600, function () use ($latitude, $longitude, $stormglassApiKey) {
            $response = Http::withHeaders([
                'Authorization' => $stormglassApiKey,
            ])->get("https://api.stormglass.io/v2/weather/point", [
                'lat' => $latitude,
                'lng' => $longitude,
                'params' => 'airTemperature',
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            return null;
        });

        return Inertia::render('Dashboard', [
            'weatherData' => $weatherData,
        ]);
    }
}
