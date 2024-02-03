import { createStore } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';
import { nanoid } from 'nanoid';

const initialState = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
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

export const setStatusFilter = value => {
  return {
    type: 'filter/setStatusFilter',
    payload: value,
  };
};

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
export const store = createStore(rootReducer, enhancer);
