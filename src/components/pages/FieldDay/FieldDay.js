import React from 'react';
import SingleFieldDay from './SingleFieldDay';

const FieldDay = () => {
    return (
        <section className='container grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-6'>
            <SingleFieldDay />
            <SingleFieldDay />
            <SingleFieldDay />
            <SingleFieldDay />
            <SingleFieldDay />
            <SingleFieldDay />
            <SingleFieldDay />
            <SingleFieldDay />
            <SingleFieldDay />
            <SingleFieldDay />
            <SingleFieldDay />
            <SingleFieldDay />
        </section>
    );
};

export default FieldDay;