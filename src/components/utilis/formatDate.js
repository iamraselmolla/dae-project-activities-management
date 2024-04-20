import { toBengaliNumber } from "bengali-number";

function formatDateToday(date) {
    date = new Date(date)
    const year = toBengaliNumber(date.getFullYear());
    const month = toBengaliNumber(String(date.getMonth() + 1).padStart(2, '0')); // Adding 1 because months are zero-indexed
    const day = toBengaliNumber(String(date.getDate()).padStart(2, '0'));
    return `${day}-${month}-${year}`;
}

export default formatDateToday;
