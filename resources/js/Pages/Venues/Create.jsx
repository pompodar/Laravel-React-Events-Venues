import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const CreateEvent = ({ auth, errors }) => {
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);

    router.visit(`/venues`, {
        method: 'post',
        data: formData,
        onSuccess: page => {
            setSuccessMessage('Venue created successfully.');
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
                        <h1>Create Venue</h1>
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <form onSubmit={handleSubmit}>
                            <div>
                            <label className="w-full block">Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
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
