import KEYS from './keys';

function initialMonthData() {
  return [
    {
      id: 1,
      name: 'January ' + new Date().getFullYear(),
      transactionId: 0,
      transactions: [],
    },
    {
      id: 2,
      name: 'February ' + new Date().getFullYear(),
      transactionId: 0,
      transactions: [],
    },
  ];
}

function buildMonth(name) {
  return {
    id: 0,
    name: name,
    transactionId: 0,
    transactions: [],
  };
}
export function insertMonth(data) {
  let months = getAllMonths();
  data = buildMonth(data);
  data['id'] = generateMonthId();
  months.push(data);
  localStorage.setItem(KEYS.months, JSON.stringify(months));
}

export function deleteMonth(id) {
  let months = getAllMonths();
  months = months.filter((m) => m.id != id);
  localStorage.setItem(KEYS.months, JSON.stringify(months));
}

export function generateMonthId() {
  if (localStorage.getItem(KEYS.monthId) == null)
    localStorage.setItem(KEYS.monthId, '0');
  var id = parseInt(localStorage.getItem(KEYS.monthId));
  localStorage.setItem(KEYS.monthId, (++id).toString());
  return id;
}

export function getAllMonths() {
  if (localStorage.getItem(KEYS.months) == null) {
    localStorage.setItem(KEYS.months, JSON.stringify(initialMonthData()));
  }
  return JSON.parse(localStorage.getItem(KEYS.months));
}

export function findById(id) {
  let months = getAllMonths();
  return months.filter((m) => m.id == id)[0];
}
