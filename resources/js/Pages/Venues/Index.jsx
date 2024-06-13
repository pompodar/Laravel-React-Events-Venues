import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function VenuesIndex({ auth }) {
    const { venues, sort, direction } = usePage().props;
    const [currentPage, setCurrentPage] = useState(venues.current_page);

    const handlePageChange = (pageUrl) => {
        const pageNumber = new URL(pageUrl).searchParams.get('page');
        setCurrentPage(pageNumber);
        const url = `/venues?page=${pageNumber}&sort=${sort}&direction=${direction}`;
        router.visit(url);
    };

    const toggleSort = (field) => {
        return `${sort === field && direction === 'asc' ? 'desc' : 'asc'}`;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Venues</h2>}
        >
            <div className="flex justify-center py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <Link href="/venues/create" className="btn btn-primary">Add Venue</Link>
                        <table className="table table-striped mt-4">
                            <thead>
                                <tr>
                                    <th>
                                        <Link href={`/venues?sort=name&direction=${toggleSort('name')}`}>
                                            Name
                                        </Link>
                                    </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {venues.data.map((venue) => (
                                    <tr key={venue.id}>
                                        <td>{venue.name}</td>
                                        <td>
                                            <Link href={`/venues/${venue.id}/edit`} className="btn btn-sm btn-warning">Edit</Link>
                                            <Link
                                                href={`/venues/${venue.id}`}
                                                method="delete"
                                                as="button"
                                                className="btn btn-sm btn-danger"
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex gap-4">
                            {venues.links.map((link, index) => (
                                <span key={index}>
                                    {link.active ? (
                                    <span>{link.label.replaceAll('&laquo; ', '').replaceAll(' &raquo;', '')}</span>
                                    ) : (
                                    <button onClick={() => handlePageChange(link.url)}>{link.label.replaceAll(' &raquo;', '').replaceAll('&laquo; ', '')}</button>
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
