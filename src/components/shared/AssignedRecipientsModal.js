import React from 'react';

const AssignedRecipientsModal = ({ recipients, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Assigned Recipients</h2>
                <ul className="list-disc list-inside">
                    {recipients.map(recipient => (
                        <li key={recipient.userId} className="mb-2">
                            {recipient.username}
                        </li>
                    ))}
                </ul>
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default AssignedRecipientsModal;
