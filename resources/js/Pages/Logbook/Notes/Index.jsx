import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ShiftBadge from '@/Components/Logbook/ShiftBadge';

export default function Index({ auth, notes }) {
    const [formData, setFormData] = useState({
        note: '',
        shift: 'pagi',
        note_date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('logbook.notes.store'), formData);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="MO Notes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Form untuk membuat note baru */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Create New MO Note</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Note
                                    </label>
                                    <textarea
                                        value={formData.note}
                                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        rows="3"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Shift
                                    </label>
                                    <select
                                        value={formData.shift}
                                        onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    >
                                        <option value="pagi">Pagi</option>
                                        <option value="siang">Siang</option>
                                        <option value="pagi-siang">Pagi-Siang</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.note_date}
                                        onChange={(e) => setFormData({ ...formData, note_date: e.target.value })}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    />
                                </div>

                                <Button type="submit">Create Note</Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Daftar Notes */}
                    <div className="space-y-6">
                        {notes.data.map((note) => (
                            <Card key={note.id}>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle>
                                            {new Date(note.note_date).toLocaleDateString()}
                                        </CardTitle>
                                        <ShiftBadge shift={note.shift} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="whitespace-pre-wrap">{note.note}</p>
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-gray-500">Read by:</h4>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {note.note_reads.map((read) => (
                                                <span
                                                    key={read.id}
                                                    className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                                                >
                                                    {read.sector_code}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    {notes.links && (
                        <div className="mt-6">
                            {/* Add pagination component here */}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}