import { configureStore } from '@reduxjs/toolkit';
import { devToolsEnhancer } from '@redux-devtools/extension';
import { nanoid } from 'nanoid';

const initialState = {
  contacts: JSON.parse(localStorage.getItem('contacts')),
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

export const setStatusFilter = value => {
  return {
    type: 'filter/setStatusFilter',
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
    case 'filter/setStatusFilter': {
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
