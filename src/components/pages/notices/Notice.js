import React from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const priorityColors = {
    High: 'bg-red-500 text-white',
    Medium: 'bg-yellow-500 text-white',
    Low: 'bg-green-500 text-white'
};

const Notice = ({ notice, handleShowRecipients }) => {
    return (
        <div
            key={notice?._id}
            className={`relative p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 ${priorityColors[notice?.priority]}`}
        >
            <Link to={`/notices/${notice?._id}`}>
                <h2 className="text-xl font-bold mb-2">{notice?.subject}</h2>
                <p className="mb-2">{notice?.content}</p>
                {notice?.link && (
                    <a href={notice?.link} className="underline">{notice?.linkText}</a>
                )}
                <p className="mt-4 text-sm">Expires on: {new Date(notice?.expirationDate).toLocaleDateString("bn-BD")}</p>
            </Link>
            <div className="absolute top-4 right-4">
                {notice?.sendToAll ? (
                    <span className="text-xs bg-green-500 text-white py-1 px-2 rounded">All</span>
                ) : (
                    <AiOutlineUsergroupAdd
                        className="text-2xl cursor-pointer"
                        onClick={() => handleShowRecipients(notice?.recipients)}
                    />
                )}
            </div>
        </div>
    );
};

export default Notice;
