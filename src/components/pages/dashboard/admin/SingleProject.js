import React from 'react';
import Title from '../../../shared/Title';

const SingleProject = ({ data, index }) => {
    console.log(data)
    return (
        <div className='mb-5'>
            <Title title={data?.name?.details} />
        </div>
    );
};

export default SingleProject;