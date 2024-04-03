import React from 'react';

const UserNoteTD = ({ text }) => {
    return (
        <td className="py-4 px-2 text-black text-center">
            {text?.split('\n').map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        </td>
    );
};

export default UserNoteTD;