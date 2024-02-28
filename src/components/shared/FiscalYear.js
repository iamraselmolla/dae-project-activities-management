import { toBengaliNumber } from "bengali-number";
import React from "react";
import getFiscalYear from "./commonDataStores";

const FiscalYear = () => {
  const currentYear = new Date().getFullYear();
  const currentFiscalYear = getFiscalYear();

  return (
    <>
      <option value="" label="অর্থবছর সিলেক্ট করুন" />
      <option
        value={toBengaliNumber(`${currentYear - 2}-${currentYear - 1}`)}
        label={toBengaliNumber(`${currentYear - 2}-${currentYear - 1}`)}
      />
      <option
        value={toBengaliNumber(`${currentYear - 1}-${currentYear}`)}
        label={toBengaliNumber(`${currentYear - 1}-${currentYear}`)}
      />
      <option
        value={toBengaliNumber(`${currentYear}-${currentYear + 1}`)}
        label={toBengaliNumber(`${currentYear}-${currentYear + 1}`)}
      />
      {/* Set the default value to the current fiscal year */}
    </>
  );
};

export default FiscalYear;
