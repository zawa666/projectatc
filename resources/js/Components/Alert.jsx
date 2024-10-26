// resources/js/Components/Alert.jsx
import React from 'react';

export default function Alert({ message, type = 'success' }) {
    const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
    const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';

    return (
        <div className={`${bgColor} ${textColor} p-4 mb-4 rounded-lg`}>
            {message}
        </div>
    );
}