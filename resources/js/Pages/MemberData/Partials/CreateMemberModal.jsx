// resources/js/Pages/MemberData/Partials/CreateMemberModal.jsx
import React from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function CreateMemberModal({ show, onClose, onSuccess }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '',
        nik: '',
        no_telp: '',
        email: '',
        spesialisasi: '',
        lokasi: 'palembang',
        photo: null,
        medex_file: null,
        medex_expired: '',
        ielp_file: null,
        ielp_expired: '',
        license_file: null,
        license_expired: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        post(route('member-data.store'), formData, {
            forceFormData: true,
            onSuccess: () => {
                reset();
                onClose();
                onSuccess('Member created successfully');
            },
        });
    };

    const handleFileChange = (e, field) => {
        setData(field, e.target.files[0]);
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <form onSubmit={handleSubmit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                    Add New Member
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div>
                        <InputLabel htmlFor="nama" value="Name" />
                        <TextInput
                            id="nama"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.nama}
                            onChange={(e) => setData('nama', e.target.value)}
                        />
                        <InputError message={errors.nama} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="nik" value="NIK" />
                        <TextInput
                            id="nik"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.nik}
                            onChange={(e) => setData('nik', e.target.value)}
                        />
                        <InputError message={errors.nik} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="no_telp" value="Phone Number" />
                        <TextInput
                            id="no_telp"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.no_telp}
                            onChange={(e) => setData('no_telp', e.target.value)}
                        />
                        <InputError message={errors.no_telp} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="spesialisasi" value="Specialization" />
                        <TextInput
                            id="spesialisasi"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.spesialisasi}
                            onChange={(e) => setData('spesialisasi', e.target.value)}
                        />
                        <InputError message={errors.spesialisasi} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="lokasi" value="Location" />
                        <select
                            id="lokasi"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={data.lokasi}
                            onChange={(e) => setData('lokasi', e.target.value)}
                        >
                            <option value="palembang">Palembang</option>
                            <option value="jambi">Jambi</option>
                        </select>
                        <InputError message={errors.lokasi} className="mt-2" />
                    </div>

                    {/* File Uploads */}
                    <div>
                        <InputLabel htmlFor="photo" value="Photo (PNG/JPG)" />
                        <input
                            type="file"
                            id="photo"
                            accept="image/png,image/jpeg"
                            onChange={(e) => handleFileChange(e, 'photo')}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.photo} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="medex_file" value="Medex File (PDF)" />
                        <input
                            type="file"
                            id="medex_file"
                            accept=".pdf"
                            onChange={(e) => handleFileChange(e, 'medex_file')}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.medex_file} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="medex_expired" value="Medex Expiry Date" />
                        <TextInput
                            id="medex_expired"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.medex_expired}
                            onChange={(e) => setData('medex_expired', e.target.value)}
                        />
                        <InputError message={errors.medex_expired} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="ielp_file" value="IELP File (PDF)" />
                        <input
                            type="file"
                            id="ielp_file"
                            accept=".pdf"
                            onChange={(e) => handleFileChange(e, 'ielp_file')}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.ielp_file} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="ielp_expired" value="IELP Expiry Date" />
                        <TextInput
                            id="ielp_expired"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.ielp_expired}
                            onChange={(e) => setData('ielp_expired', e.target.value)}
                        />
                        <InputError message={errors.ielp_expired} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="license_file" value="License File (PDF)" />
                        <input
                            type="file"
                            id="license_file"
                            accept=".pdf"
                            onChange={(e) => handleFileChange(e, 'license_file')}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.license_file} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="license_expired" value="License Expiry Date" />
                        <TextInput
                            id="license_expired"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.license_expired}
                            onChange={(e) => setData('license_expired', e.target.value)}
                        />
                        <InputError message={errors.license_expired} className="mt-2" />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                    >
                        Cancel
                    </button>
                    <PrimaryButton type="submit" disabled={processing}>
                        Create Member
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}