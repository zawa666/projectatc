// resources/js/Pages/Logbook/Positions/Create.jsx
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

export default function Create({ auth, sectors, todayNote }) {
    const [formData, setFormData] = useState({
        member_id: '',
        sector_code: '',
        mo_note_read_id: '',
        start_time: '',
        end_time: '',
        position: 'controller',
        log_date: new Date().toISOString().split('T')[0]
    });

    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!todayNote) {
            setError('Cannot create position without reading today\'s MO Note');
            return;
        }

        router.post(route('logbook.positions.store'), formData);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Position Log" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            {error}
                        </Alert>
                    )}

                    {todayNote && !todayNote.is_read && (
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Today's MO Note</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{todayNote.note}</p>
                                <Button 
                                    onClick={() => {
                                        // Handle marking note as read
                                    }}
                                    className="mt-4"
                                >
                                    Mark as Read
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle>Create Position Log</CardTitle>
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
                                        {sectors.map((sector) => (
                                            <option key={sector.code} value={sector.code}>
                                                {sector.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Position
                                    </label>
                                    <select
                                        value={formData.position}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    >
                                        <option value="controller">Controller</option>
                                        <option value="assistant">Assistant</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Start Time
                                        </label>
                                        <input
                                            type="time"
                                            value={formData.start_time}
                                            onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            End Time
                                        </label>
                                        <input
                                            type="time"
                                            value={formData.end_time}
                                            onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button type="submit" disabled={!todayNote?.is_read}>
                                    Create Position Log
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}