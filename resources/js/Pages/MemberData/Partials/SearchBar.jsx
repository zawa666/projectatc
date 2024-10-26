// resources/js/Pages/MemberData/Partials/SearchBar.jsx
import React from 'react';
import { router } from '@inertiajs/react';
import debounce from 'lodash/debounce';

export default function SearchBar({ filters }) {
    const handleSearch = debounce((value) => {
        router.get(
            route('member-data.index'),
            { search: value },
            { preserveState: true }
        );
    }, 300);

    return (
        <div className="flex items-center">
            <input
                type="text"
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                placeholder="Search members..."
                defaultValue={filters.search}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    );
}