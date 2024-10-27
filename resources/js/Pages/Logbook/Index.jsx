import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Logbook" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h1 className="text-2xl font-semibold mb-4">Logbook System</h1>
                            
                            <div className="grid md:grid-cols-3 gap-4">
                                {/* MO Notes Section */}
                                <div className="p-4 border rounded-lg">
                                    <h2 className="font-semibold mb-2">MO Notes</h2>
                                    <p className="text-gray-600 mb-4">Manage and view Manager Operation notes</p>
                                    <a 
                                        href={route('logbook.notes.index')} 
                                        className="text-blue-600 hover:underline"
                                    >
                                        View Notes →
                                    </a>
                                </div>

                                {/* Positions Section */}
                                <div className="p-4 border rounded-lg">
                                    <h2 className="font-semibold mb-2">Positions</h2>
                                    <p className="text-gray-600 mb-4">Log and track controller positions</p>
                                    <a 
                                        href={route('logbook.positions.index')} 
                                        className="text-blue-600 hover:underline"
                                    >
                                        View Positions →
                                    </a>
                                </div>

                                {/* Remarks Section */}
                                <div className="p-4 border rounded-lg">
                                    <h2 className="font-semibold mb-2">Remarks</h2>
                                    <p className="text-gray-600 mb-4">Add and view operational remarks</p>
                                    <a 
                                        href={route('logbook.remarks.index')} 
                                        className="text-blue-600 hover:underline"
                                    >
                                        View Remarks →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}