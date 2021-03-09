import KEYS from './keys';

let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

function getIdFromDate(date) {
    return ('' + date.getDate() + (date.getMonth() + 1) + date.getFullYear()).trim();
}

export function getOrBuildDate(date) {

    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const name = month + ' ' + day + ' ' + year;
    const id = getIdFromDate(date);
    const dbDate = findById(id);
    date = {
        id: id,
        name: name,
        transactionId: 0,
        transactions: [],
    };

    if (dbDate) {
        return dbDate;
    } else {
        let dates = getAllDates();
        dates.push(date);
        localStorage.setItem(KEYS.daily, JSON.stringify(dates));
        return date;
    }
}

export function getAllDates() {
    if (localStorage.getItem(KEYS.daily) == null) {
        localStorage.setItem(KEYS.daily, JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem(KEYS.daily));
}

export function findById(id) {
    let dates = getAllDates();
    return dates.filter((m) => m.id == id)[0];
}

export function getTotalForDay(date) {
    date = getOrBuildDate(date);
    return date.transactions
        .map((txn) => parseInt(txn.value))
        .reduce((a, b) => a + b, 0);
}
