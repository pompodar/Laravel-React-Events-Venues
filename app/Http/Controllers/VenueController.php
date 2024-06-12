<?php

namespace App\Http\Controllers;

use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VenueController extends Controller
{
    public function index(Request $request)
    {
        $venues = Venue::orderBy($request->get('sort', 'id'), $request->get('direction', 'asc'))->paginate(10);

        return Inertia::render('Venues/Index', [
            'venues' => $venues,
            'sort' => $request->get('sort', 'id'),
            'direction' => $request->get('direction', 'asc'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Venues/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Venue::create($request->all());

        return redirect()->route('venues.index');
    }

    public function edit(Venue $venue)
    {
        return Inertia::render('Venues/Edit', [
            'venue' => $venue,
        ]);
    }

    public function update(Request $request, Venue $venue)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $venue->update($request->all());

        return redirect()->route('venues.index');
    }

    public function destroy(Venue $venue)
    {
        $venue->delete();

        return redirect()->route('venues.index');
    }
}

