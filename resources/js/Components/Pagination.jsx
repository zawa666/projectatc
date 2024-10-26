// resources/js/Components/Pagination.jsx
import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <div className="flex flex-wrap justify-center gap-1">
            {links.map((link, key) => (
                <Link
                    key={key}
                    href={link.url}
                    className={`px-4 py-2 text-sm rounded ${
                        link.active
                            ? 'bg-blue-500 text-white'
                            : link.url
                            ? 'bg-white text-blue-500 hover:bg-blue-100'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}