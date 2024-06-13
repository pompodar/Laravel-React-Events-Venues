<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $sort = $request->get('sort', 'events.id');
        $direction = $request->get('direction', 'asc');

        $events = Event::with('venue');

        if ($sort === 'venue') {
            $events = $events->join('venues', 'events.venue_id', '=', 'venues.id')
                            ->select('events.*', 'venues.name as venue_name')
                            ->orderBy('venues.name', $direction);
        } else {
            $events = $events->orderBy($sort, $direction);
        }

        $events = $events->paginate(10);

        return Inertia::render('Events/Index', [
            'events' => $events,
            'sort' => $sort,
            'direction' => $direction,
        ]);
    }

    public function create()
    {
        $venues = Venue::all();
        return Inertia::render('Events/Create', [
            'venues' => $venues,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'poster' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'event_date' => 'required|date',
            'venue_id' => 'required|exists:venues,id',
        ]);

        $posterPath = $request->file('poster')->store('posters', 'public');

        $image = Image::make(storage_path('app/public/' . $posterPath));
        if ($image->width() > 1200) {
            $image->resize(1200, null, function ($constraint) {
                $constraint->aspectRatio();
            })->save();
        }

        Event::create([
            'name' => $request->name,
            'poster' => $posterPath,
            'event_date' => $request->event_date,
            'venue_id' => $request->venue_id,
        ]);

        return redirect()->route('events.index');
    }

    public function edit(Event $event)
    {
        $venues = Venue::all();
        return Inertia::render('Events/Edit', [
            'event' => $event,
            'venues' => $venues,
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'event_date' => 'required|date',
            'venue_id' => 'required|exists:venues,id',
        ]);

        $data = $request->only(['name', 'event_date', 'venue_id']);

        if ($request->hasFile('poster')) {
            $posterPath = $request->file('poster')->store('posters', 'public');
            $image = Image::make(storage_path('app/public/' . $posterPath));
            if ($image->width() > 1200) {
                $image->resize(1200, null, function ($constraint) {
                    $constraint->aspectRatio();
                })->save();
            }
            Storage::delete($event->poster);
            $data['poster'] = $posterPath;
        }

        $event->update($data);

        return redirect()->route('events.index');
    }

    public function destroy(Event $event)
    {
        Storage::delete($event->poster);

        $event->delete();

        return redirect()->route('events.index');
    }

}


