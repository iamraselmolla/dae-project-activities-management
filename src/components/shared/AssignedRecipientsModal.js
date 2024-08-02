import { toBengaliNumber } from 'bengali-number';
import React from 'react';

const AssignedRecipientsModal = ({ recipients, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">এই নোটিশ / কার্যাদেশের আওতায় যে যে ব্লক এবং সংশ্লিষ্ট উপসহকারী কৃষি কর্মকর্তাগণ আওতাধীনঃ</h2>
                <div className="flex flex-col gap-3">
                    {recipients.map((recipient, index) => (
                        <div key={recipient.userId} className="mb-2">
                            {toBengaliNumber(index + 1) + '. ' + recipient.userId?.blockB + ', ' + recipient?.userId?.SAAO?.name}
                        </div>
                    ))}
                </div>
                <button
                    className="mt-4 theme-bg text-white px-4 py-2 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default AssignedRecipientsModal;
