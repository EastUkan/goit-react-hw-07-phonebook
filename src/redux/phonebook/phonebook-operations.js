import axios from 'axios';
import {
  addContactSuccess,
  deleteContactSuccess,
  fetchContactsSuccess,
  addContactRequest,
  deleteContactRequest,
  fetchContactsRequest,
  addContactError,
  deleteContactError,
  fetchContactsError,
} from './phonebook-actions';

axios.defaults.baseURL = 'http://localhost:3030';

const fetchContacts = () => dispatch => {
  dispatch(fetchContactsRequest());

  axios
    .get('/contacts')
    .then(({ data }) => dispatch(fetchContactsSuccess(data)))
    .catch(error => dispatch(fetchContactsError(error)));
};

const addContact = (name, number) => dispatch => {
  const contact = {
    name,
    number,
  };

  dispatch(addContactRequest());

  axios
    .post('/contacts', contact)
    .then(({ data }) => dispatch(addContactSuccess(data)))
    .catch(error => dispatch(addContactError(error)));
};

const deleteContact = contactId => dispatch => {
  dispatch(deleteContactRequest());

  axios
    .delete(`/contacts/${contactId}`)
    .then(() => dispatch(deleteContactSuccess(contactId)))
    .catch(error => dispatch(deleteContactError(error)));
};

const operations = { fetchContacts, addContact, deleteContact };

export default operations;
