import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Edit = ({ auth }) => {
    const { event, venues, errors } = usePage().props;
    const [values, setValues] = useState({
      name: event.name || '',
      poster: null,
      event_date: event.event_date || '',
      venue_id: event.venue_id || '',
    });
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [previewImage, setPreviewImage] = useState(event.poster ? `/storage/${event.poster}` : null);
  
    const handleChange = (e) => {
      const key = e.target.id;
      const value = key === 'poster' ? e.target.files[0] : e.target.value;
      if (key === 'poster') {
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
      }
      setValues(values => ({
        ...values,
        [key]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('name', values.name);
      formData.append('poster', values.poster);
      formData.append('event_date', values.event_date);
      formData.append('venue_id', values.venue_id);
  
      router.visit(`/events/${event.id}`, {
          method: 'post',
          data: formData,
          onSuccess: page => {
              setSuccessMessage('Event updated successfully.');
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
                        <h1>Edit Event</h1>
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="mr-2" htmlFor="name">Name</label>
                            <input
                            id="name"
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            value={values.name}
                            onChange={handleChange}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="poster">Poster</label>
                            {previewImage && (
                            <div>
                                <img src={previewImage} alt="Current Poster" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                <input
                                id="poster"
                                type="file"
                                className={`form-control ${errors.poster ? 'is-invalid' : ''}`}
                                onChange={handleChange}
                                />
                            </div>
                            )}
                            {!previewImage && (
                            <input
                                id="poster"
                                type="file"
                                className={`form-control ${errors.poster ? 'is-invalid' : ''}`}
                                onChange={handleChange}
                            />
                            )}
                            {errors.poster && <div className="invalid-feedback">{errors.poster}</div>}
                        </div>
                        <div className="form-group">
                            <label className="mr-2" htmlFor="event_date">Event Date</label>
                            <input
                            id="event_date"
                            type="date"
                            className={`form-control ${errors.event_date ? 'is-invalid' : ''}`}
                            value={values.event_date}
                            onChange={handleChange}
                            />
                            {errors.event_date && <div className="invalid-feedback">{errors.event_date}</div>}
                        </div>
                        <div className="form-group">
                            <label className="mr-2" htmlFor="venue_id">Venue</label>
                            <select
                            id="venue_id"
                            className={`form-control ${errors.venue_id ? 'is-invalid' : ''}`}
                            value={values.venue_id}
                            onChange={handleChange}
                            >
                            <option value="">Select a venue</option>
                            {venues.map((venue) => (
                                <option key={venue.id} value={venue.id}>{venue.name}</option>
                            ))}
                            </select>
                            {errors.venue_id && <div className="invalid-feedback">{errors.venue_id}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Update Event</button>
                        </form>
                    </div>
                </div>
            </div>        
        </AuthenticatedLayout>
    );
  };
  
  export default Edit;
  