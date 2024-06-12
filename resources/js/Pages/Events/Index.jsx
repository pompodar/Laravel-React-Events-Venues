import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function Events({ auth }) {
    const { events, sort, direction } = usePage().props;

    const [currentPage, setCurrentPage] = useState(events.current_page);

    const handlePageChange = (pageUrl) => {
        // Extracting page number from pageUrl
        const pageNumber = pageUrl.split('page=')[1].split('&')[0];
        setCurrentPage(pageNumber);
        const url = `/events?page=${pageNumber}&sort=${sort}&direction=${direction}`;
        router.visit(url);
    };
        

    const toggleSort = (field) => {
        return `${sort === field && direction === 'asc' ? 'desc' : 'asc'}`;
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="flex justify-center py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <Link href="/events/create" className="btn btn-primary">Create Event</Link>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>
                                <Link href={`/events?sort=name&direction=${toggleSort('name')}`}>Name</Link>
                                </th>
                                <th>Poster</th>
                                <th>
                                <Link href={`/events?sort=event_date&direction=${toggleSort('event_date')}`}>Event Date</Link>
                                </th>
                                <th>
                                <Link href={`/events?sort=venue_id&direction=${toggleSort('venue_id')}`}>Venue</Link>
                                </th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {events.data.map((event) => (
                                <tr key={event.id}>
                                <td>{event.name}</td>
                                <td><img src={`/storage/${event.poster}`} alt={event.name} width="100" /></td>
                                <td>{event.event_date}</td>
                                <td>{event.venue.name}</td>
                                <td>
                                    <Link href={`/events/${event.id}/edit`} className="btn btn-sm btn-warning">Edit</Link>
                                    <Link href={`/events/${event.id}`} className="btn btn-sm btn-danger" method="delete" as="button">Delete</Link>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="flex gap-4">
                            {events.links.map((link, index) => (
                                <span key={index}>
                                    {link.active ? (
                                    <span>{link.label}</span>
                                    ) : (
                                    <button onClick={() => handlePageChange(link.url)}>{link.label}</button>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


