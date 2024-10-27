export default function StatusBadge({ status }) {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'normal':
                return 'bg-green-100 text-green-800';
            case 'unserviceable':
                return 'bg-red-100 text-red-800';
            case 'reported':
                return 'bg-yellow-100 text-yellow-800';
            case 'accident':
                return 'bg-red-100 text-red-800';
            case 'ser-incident':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
            {status}
        </span>
    );
}