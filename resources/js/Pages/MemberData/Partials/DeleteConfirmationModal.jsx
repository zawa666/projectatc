// resources/js/Pages/MemberData/Partials/DeleteConfirmationModal.jsx
import React from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import DangerButton from '@/Components/DangerButton';

export default function DeleteConfirmationModal({ show, onClose, member, onSuccess }) {
    const { data, setData, delete: destroy, processing, errors } = useForm({
        password: '',
        force_delete: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        destroy(route('member-data.destroy', member.id), {
            onSuccess: () => {
                onClose();
                onSuccess('Member deleted successfully');
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={handleSubmit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Are you sure you want to delete this member?
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Please enter the admin password to confirm.
                </p>

                <div className="mt-6">
                    <InputLabel htmlFor="password" value="Admin Password" />
                    <TextInput
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                    >
                        Cancel
                    </button>
                    <DangerButton type="submit" disabled={processing}>
                        Delete Member
                    </DangerButton>
                </div>
            </form>
        </Modal>
    );
}