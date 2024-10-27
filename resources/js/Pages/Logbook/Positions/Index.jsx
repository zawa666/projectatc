import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ShiftBadge from '@/Components/Logbook/ShiftBadge';
import { Link } from '@inertiajs/react';

export default function Index({ auth, positions, sectors }) {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedSector, setSelectedSector] = useState('');

    const handleFilter = () => {
        router.get(route('logbook.positions.index'), {
            date: selectedDate,
            sector_code: selectedSector
        }, {
            preserveState: true
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Position Logs" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Position Logs</h2>
                        <Link href={route('logbook.positions.create')}>
                            <Button>Create New Log</Button>
                        </Link>
                    </div>

                    {/* Filter Section */}
                    <Card className="mb-6">
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date</label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Sector</label>
                                    <select
                                        value={selectedSector}
                                        onChange={(e) => setSelectedSector(e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    >
                                        <option value="">All Sectors</option>
                                        {sectors.map((sector) => (
                                            <option key={sector.code} value={sector.code}>
                                                {sector.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-end">
                                    <Button onClick={handleFilter}>Filter</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Positions List */}
                    <div className="space-y-6">
                        {positions.data.map((position) => (
                            <Card key={position.id}>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle>
                                            {position.member.name} - {position.sector.name}
                                        </CardTitle>
                                        <ShiftBadge shift={position.shift} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-500">Position</label>
                                            <p className="font-medium">{position.position}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-500">Start Time</label>
                                            <p className="font-medium">{position.start_time}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-500">End Time</label>
                                            <p className="font-medium">{position.end_time}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-500">Date</label>
                                            <p className="font-medium">
                                                {new Date(position.log_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    {positions.links && (
                        <div className="mt-6">
                            {/* Add pagination component here */}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}