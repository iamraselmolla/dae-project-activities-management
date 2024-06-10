import { toBengaliNumber } from "bengali-number";
import React from "react";
import getFiscalYear from "./commonDataStores";

const FiscalYear = () => {
  const currentYear = new Date().getFullYear();
  const currentFiscalYear = getFiscalYear();


  //make the function to convert the english FiscalYear to Bangle FiscalYear
  function convertToFiscalYearBangla(fiscalYear) {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    let banglaFiscalYear = '';

    for (let i = 0; i < fiscalYear.length; i++) {
      const char = fiscalYear.charAt(i);
      if (!isNaN(char)) { // If character is a digit
        banglaFiscalYear += banglaDigits[parseInt(char)];
      } else {
        banglaFiscalYear += char;
      }
    }

    return banglaFiscalYear;
  }

  //call this function with the english Fiscal year
  const banglaFiscalYear = convertToFiscalYearBangla(currentFiscalYear);

  return (
    <>
      {/* <option value="" label="অর্থবছর সিলেক্ট করুন" /> */}
      <option value={''} label={'সকল'} />
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
