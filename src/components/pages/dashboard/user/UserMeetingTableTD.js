import React from 'react';

const UserMeetingTableTD = ({ text }) => {
    return (
        <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
            {text?.split('\n').map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        </td>
    );
};

export default UserMeetingTableTD;