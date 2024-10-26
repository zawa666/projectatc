// resources/js/Pages/MemberData/Index.jsx
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchBar from './Partials/SearchBar';
import MemberTable from './Partials/MemberTable';
import CreateMemberModal from './Partials/CreateMemberModal';
import EditMemberModal from './Partials/EditMemberModal';
import DeleteConfirmationModal from './Partials/DeleteConfirmationModal';
import Alert from '@/Components/Alert';
import Pagination from '@/Components/Pagination';
import { Loader2 } from 'lucide-react';

export default function Index({ auth, members, filters }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleEdit = (member) => {
        setSelectedMember(member);
        setShowEditModal(true);
    };

    const handleDelete = (member) => {
        setSelectedMember(member);
        setShowDeleteModal(true);
    };

    const showAlert = (message, type = 'success') => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(() => setAlertMessage(''), 3000);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Member Data</h2>}
        >
            <Head title="Member Data" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Alert Messages */}
                    {alertMessage && (
                        <div className="mb-4">
                            <Alert message={alertMessage} type={alertType} />
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header Section */}
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                                <SearchBar filters={filters} />
                                <button
                                    onClick={() => setShowCreateModal(true)}
                                    className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                                    disabled={isLoading}
                                >
                                    {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                                    Add Member
                                </button>
                            </div>

                            {/* Table Section */}
                            <div className="relative">
                                {isLoading && (
                                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                                        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                                    </div>
                                )}
                                <MemberTable 
                                    members={members.data}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            </div>

                            {/* Pagination */}
                            {members.links && (
                                <div className="mt-6">
                                    <Pagination links={members.links} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Modals */}
                    <CreateMemberModal
                        show={showCreateModal}
                        onClose={() => setShowCreateModal(false)}
                        onSuccess={(message) => {
                            setShowCreateModal(false);
                            showAlert(message);
                            setIsLoading(true);
                            // Reload data after creation
                            window.location.reload();
                        }}
                    />

                    {selectedMember && (
                        <EditMemberModal
                            show={showEditModal}
                            member={selectedMember}
                            onClose={() => {
                                setShowEditModal(false);
                                setSelectedMember(null);
                            }}
                            onSuccess={(message) => {
                                setShowEditModal(false);
                                setSelectedMember(null);
                                showAlert(message);
                                setIsLoading(true);
                                // Reload data after update
                                window.location.reload();
                            }}
                        />
                    )}

                    {selectedMember && (
                        <DeleteConfirmationModal
                            show={showDeleteModal}
                            member={selectedMember}
                            onClose={() => {
                                setShowDeleteModal(false);
                                setSelectedMember(null);
                            }}
                            onSuccess={(message) => {
                                setShowDeleteModal(false);
                                setSelectedMember(null);
                                showAlert(message);
                                setIsLoading(true);
                                // Reload data after deletion
                                window.location.reload();
                            }}
                        />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}