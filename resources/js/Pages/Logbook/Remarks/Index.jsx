import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import StatusBadge from '@/Components/Logbook/StatusBadge';

export default function Index({ auth, remarks, sectors }) {
    const [formData, setFormData] = useState({
        sector_code: '',
        log_time: '',
        remarks: '',
        status: 'normal',
        log_date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('logbook.remarks.store'), formData);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Logbook Remarks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Add New Remark</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Sector
                                    </label>
                                    <select
                                        value={formData.sector_code}
                                        onChange={(e) => setFormData({ ...formData, sector_code: e.target.value })}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    >
                                        <option value="">Select Sector</option>
                                        {sectors?.map((sector) => (
                                            <option key={sector.code} value={sector.code}>
                                                {sector.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Time
                                    </label>
                                    <input
                                        type="time"
                                        value={formData.log_time}
                                        onChange={(e) => setFormData({ ...formData, log_time: e.target.value })}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Status
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    >
                                        <option value="normal">Normal</option>
                                        <option value="unserviceable">Unserviceable</option>
                                        <option value="reported">Reported</option>
                                        <option value="accident">Accident</option>
                                        <option value="ser-incident">SER Incident</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Remarks
                                    </label>
                                    <textarea
                                        value={formData.remarks}
                                        onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        rows="3"
                                        required
                                    />
                                </div>

                                <Button type="submit">Add Remark</Button>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        {remarks?.data?.map((remark) => (
                            <Card key={remark.id}>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle>
                                            {remark.sector.name} - {remark.log_time}
                                        </CardTitle>
                                        <StatusBadge status={remark.status} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="whitespace-pre-wrap">{remark.remarks}</p>
                                    <div className="mt-2 text-sm text-gray-500">
                                        {new Date(remark.log_date).toLocaleDateString()}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}