import * as contactService from "./ContactService";
import * as dailyService from "./DailyService";
import KEYS from "./keys";

export function deleteContactExpance(contact, txnId) {
  contact.transactions = contact.transactions.filter((txn) => txn.id !== txnId);
  addContactExpance(contact);
}

export function addContactExpance(data) {
  let contacts = contactService.getAllContacts();
  let recordIndex = contacts.findIndex((cnt) => cnt.id === data.id);
  contacts[recordIndex] = { ...data };
  localStorage.setItem(KEYS.contacts, JSON.stringify(contacts));
}

export function deleteDailyExpance(date, txnId) {
  date.transactions = date.transactions.filter((txn) => txn.id !== txnId);
  addDailyExpance(date);
}

export function addDailyExpance(date) {
  let dates = dailyService.getAllDates();
  let recordIndex = dates.findIndex((m) => m.id === date.id);
  dates[recordIndex] = { ...date };
  localStorage.setItem(KEYS.daily, JSON.stringify(dates));
}
