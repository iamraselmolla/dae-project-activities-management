// Function to calculate default fiscal year
const getFiscalYear = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // If current month is July or later, then current year is the starting year of fiscal year
    // Otherwise, the starting year of fiscal year is previous year
    const startingYear = currentMonth >= 7 ? currentYear : currentYear - 1;

    return `${startingYear}-${startingYear + 1}`;
}

export default getFiscalYear;