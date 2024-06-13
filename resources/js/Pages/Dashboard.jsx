import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, weatherData }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                    {weatherData && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 text-gray-900">
                            <p>Temperature in your location: {weatherData.hours.airTemperature.smhi}°C</p>
                        </div>
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 text-gray-900">
                        <Link href="/events/" className="btn btn-primary">Events</Link>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 text-gray-900">
                        <Link href="/venues/" className="btn btn-primary">Venues</Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
