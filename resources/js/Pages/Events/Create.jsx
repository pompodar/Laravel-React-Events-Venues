import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const CreateEvent = ({ auth, errors }) => {
  const { venues } = usePage().props;
  const [name, setName] = useState('');
  const [poster, setPoster] = useState(null);
  const [eventDate, setEventDate] = useState('');
  const [venueId, setVenueId] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('poster', poster);
    formData.append('event_date', eventDate);
    formData.append('venue_id', venueId);

    router.visit(`/events`, {
        method: 'post',
        data: formData,
        onSuccess: page => {
            setSuccessMessage('Event created successfully.');
            setErrorMessage(null);
            router.visit(`/events/`);
        },
        onError: errors => {
            setErrorMessage(errors);
            setSuccessMessage(null);
        },
      })
  };

  return (
    <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Venue</h2>}
    >
        <Head title="Edit Venue" />
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <h1>Create Event</h1>
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div>
                        <label className="mr-2">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                        <div>
                        <label className="mr-2">Poster</label>
                        <input type="file" onChange={(e) => setPoster(e.target.files[0])} required />
                        {errors.poster && <div className="invalid-feedback">{errors.poster}</div>}
                        </div>
                        <div>
                        <label className="mr-2">Event Date</label>
                        <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
                        {errors.event_date && <div className="invalid-feedback">{errors.event_date}</div>}
                        </div>
                        <div>
                        <label className="mr-2">Venue</label>
                        <select value={venueId} onChange={(e) => setVenueId(e.target.value)} required>
                            <option value="">Select Venue</option>
                            {venues.map((venue) => (
                            <option key={venue.id} value={venue.id}>{venue.name}</option>
                            ))}
                        </select>
                        {errors.venue_id && <div className="invalid-feedback">{errors.venue_id}</div>}
                        </div>
                        <button type="submit">Create</button>
                    </form>
                </div>    
            </div>
        </div>        
    </AuthenticatedLayout>
  );
};

export default CreateEvent;
