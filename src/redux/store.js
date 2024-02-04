import { configureStore } from '@reduxjs/toolkit';
import { devToolsEnhancer } from '@redux-devtools/extension';
import { nanoid } from 'nanoid';
const getStorage = () => {
  const saved = localStorage.getItem('contacts');
  if (!saved) {
    return localStorage.setItem(
      'contacts',
      JSON.stringify([{ name: 'Tadeusz Przykład', id: '1', numer: '0070102' }])
    );
  }
};
console.log(getStorage);

const initialState = {
  contacts: JSON.parse(localStorage.getItem('contacts')) || [
    { name: 'Tadzio' },
  ],
  filter: '',
};

//Selector functions
export const getContacts = state => state.contacts;
export const getFilter = state => state.filter;

//Actions
export const addContact = (name, number) => {
  return {
    type: 'contacts/addContact',
    payload: {
      id: nanoid(),
      name: name,
      number: number,
    },
  };
};

export const deleteContact = contactId => {
  return {
    type: 'contacts/deleteContact',
    payload: contactId,
  };
};

export const setFilter = value => {
  return {
    type: 'filter/setFilter',
    payload: value,
  };
};
//Reducers
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'contacts/addContact': {
      return {
        ...state,

        contacts: [...state.contacts, action.payload],
      };
    }
    case 'contacts/deleteContact': {
      return {
        ...state,

        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        ),
      };
    }
    case 'filter/setFilter': {
      return {
        ...state,

        filter: action.payload,
      };
    }
    default:
      return state;
  }
};

const enhancer = devToolsEnhancer();
export const statusFilters = Object.freeze({ value: '' });

//Store
export const store = configureStore({ reducer: rootReducer });
