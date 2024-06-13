import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';

export default function VenueEdit({ auth, errors }) {
    const { venue } = usePage().props;
    const [name, setName] = useState(venue.name || '');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', name);

        router.visit(`/venues/${venue.id}`, {
            method: 'post',
            data: formData,
            onSuccess: page => {
                setSuccessMessage('Venue updated successfully.');
                setErrorMessage(null);
                router.visit(`/venues/`);
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
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="w-full block">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="form-control"
                                    required
                                />
                                {errors.name && <div className="text-red-600 mt-1">{errors.name}</div>}
                            </div>
                            <button type="submit">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
