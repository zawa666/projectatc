export default function ShiftBadge({ shift }) {
    const getShiftColor = (shift) => {
        switch (shift.toLowerCase()) {
            case 'pagi':
                return 'bg-yellow-100 text-yellow-800';
            case 'siang':
                return 'bg-blue-100 text-blue-800';
            case 'malam':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getShiftColor(shift)}`}>
            {shift}
        </span>
    );
}