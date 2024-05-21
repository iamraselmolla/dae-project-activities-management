import React from 'react';

const TableHead = ({ text }) => {
    return (
        <th
            scope="col"
            className="py-4 font-extrabold px-2  text-black text-center uppercase"
        >
            {text}
        </th>
    );
};

export default TableHead;