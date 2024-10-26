// resources/js/Pages/MemberData/Partials/MemberTable.jsx
import React from 'react';
import { format } from 'date-fns';

export default function MemberTable({ members, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Photo
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name/NIK
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Documents
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {members?.map((member) => (
                        <tr key={member.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <img 
                                    src={`/storage/${member.photo}`} 
                                    alt={member.nama}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{member.nama}</div>
                                <div className="text-sm text-gray-500">{member.nik}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{member.email}</div>
                                <div className="text-sm text-gray-500">{member.no_telp}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    member.lokasi === 'palembang' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-blue-100 text-blue-800'
                                }`}>
                                    {member.lokasi}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm space-y-1">
                                    {member.medex_file && (
                                        <div>
                                            <a 
                                                href={`/storage/${member.medex_file}`} 
                                                target="_blank" 
                                                className="text-blue-600 hover:underline"
                                            >
                                                Medex
                                            </a>
                                            <span className="text-gray-500 ml-1">
                                                (Exp: {format(new Date(member.medex_expired), 'dd/MM/yyyy')})
                                            </span>
                                        </div>
                                    )}
                                    {member.ielp_file && (
                                        <div>
                                            <a 
                                                href={`/storage/${member.ielp_file}`} 
                                                target="_blank" 
                                                className="text-blue-600 hover:underline"
                                            >
                                                IELP
                                            </a>
                                            <span className="text-gray-500 ml-1">
                                                (Exp: {format(new Date(member.ielp_expired), 'dd/MM/yyyy')})
                                            </span>
                                        </div>
                                    )}
                                    {member.license_file && (
                                        <div>
                                            <a 
                                                href={`/storage/${member.license_file}`} 
                                                target="_blank" 
                                                className="text-blue-600 hover:underline"
                                            >
                                                License
                                            </a>
                                            <span className="text-gray-500 ml-1">
                                                (Exp: {format(new Date(member.license_expired), 'dd/MM/yyyy')})
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => onEdit(member)}
                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(member)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}