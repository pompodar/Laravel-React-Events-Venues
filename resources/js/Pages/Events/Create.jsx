import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';

const CreateEvent = () => {
  const { venues } = usePage().props;
  const [name, setName] = useState('');
  const [poster, setPoster] = useState(null);
  const [eventDate, setEventDate] = useState('');
  const [venueId, setVenueId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('poster', poster);
    formData.append('event_date', eventDate);
    formData.append('venue_id', venueId);

    router.post('/events', formData);
  };

  return (
    <div>
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Poster</label>
          <input type="file" onChange={(e) => setPoster(e.target.files[0])} required />
        </div>
        <div>
          <label>Event Date</label>
          <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
        </div>
        <div>
          <label>Venue</label>
          <select value={venueId} onChange={(e) => setVenueId(e.target.value)} required>
            <option value="">Select Venue</option>
            {venues.map((venue) => (
              <option key={venue.id} value={venue.id}>{venue.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateEvent;
