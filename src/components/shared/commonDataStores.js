export const getYear = new Date().getFullYear()


export const getFiscalYear = () => {
    const countFiscalYearMonth = new Date().getMonth();
    const countFiscalYear = new Date().getFullYear();
    let fiscalYear;
    if (countFiscalYearMonth >= 7) {
        return fiscalYear = `${countFiscalYear}-${countFiscalYear + 1}`
    } else {
        return fiscalYear = `${countFiscalYear - 1}-${countFiscalYear}`

    }
}