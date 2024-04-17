import React from 'react';

const FieldDayTD = ({ text }) => {
    return (
        <td className="text-center text-balance text-sm font-medium text-gray-800 dark:text-gray-200">
            {text?.split('\n').map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        </td>
    );
};

export default FieldDayTD;