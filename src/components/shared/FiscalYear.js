import { toBengaliNumber } from 'bengali-number';
import React from 'react';
import { getYear } from './commonDataStores';

const FiscalYear = () => {
    return (
        <>
            <option value="" label="অর্থবছর সিলেক্ট করুন" />
            <option value={toBengaliNumber(`${getYear - 1}-${getYear}`)} label={toBengaliNumber(`${getYear - 1}-${getYear}`)} />
            <option value={toBengaliNumber(`${getYear}-${getYear + 1}`)} label={toBengaliNumber(`${getYear}-${getYear + 1}`)} />
            <option value={toBengaliNumber(`${getYear + 1}-${getYear + 2}`)} label={toBengaliNumber(`${getYear + 1}-${getYear + 2}`)} />
        </>
    );
};

export default FiscalYear;