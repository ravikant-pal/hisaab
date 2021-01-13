import * as contactService from './ContactService';
import * as monthService from './MonthService';
import KEYS from './keys';

export function deleteExpanceOfContact(contact, txnId) {
  contact.transactions = contact.transactions.filter((txn) => txn.id != txnId);
  addExpanceInContact(contact);
}

export function addExpanceInContact(data) {
  let contacts = contactService.getAllContacts();
  let recordIndex = contacts.findIndex((cnt) => cnt.id == data.id);
  contacts[recordIndex] = { ...data };
  localStorage.setItem(KEYS.contacts, JSON.stringify(contacts));
}

export function deleteExpanceOfMonth(month, txnId) {
  month.transactions = month.transactions.filter((txn) => txn.id != txnId);
  addExpanceInMonth(month);
}

export function addExpanceInMonth(data) {
  let months = monthService.getAllMonths();
  let recordIndex = months.findIndex((m) => m.id == data.id);
  months[recordIndex] = { ...data };
  localStorage.setItem(KEYS.months, JSON.stringify(months));
}
