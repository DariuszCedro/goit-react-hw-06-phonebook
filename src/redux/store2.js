import { devToolsEnhancer } from '@redux-devtools/extension';
import { nanoid } from 'nanoid';
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';
const getStorage = () => {
  const saved = localStorage.getItem('contacts');
  if (!saved) {
    return localStorage.setItem(
      'contacts',
      JSON.stringify([{ name: 'Tadeusz Przykład', id: '1', numer: '0070102' }])
    );
  }
  const initialValue = JSON.parse(saved);
  return initialValue || [{ name: 'Tadzio', id: '1' }];
};
console.log(getStorage());

const initialState = {
  contacts: getStorage(),
  filter: '',
};

// Actions
export const addContact = createAction('contacts/addContact');
export const deleteContact = createAction('contacts/deleteContact');
export const setFilter = createAction('filter/setFilter');

// Reducers
const contactsReducer = createReducer(getStorage(), {
  [addContact]: (state, action) => [...state, action.payload],
  [deleteContact]: (state, action) =>
    state.filter(contact => contact.id !== action.payload),
});

const filterReducer = createReducer('', {
  [setFilter]: (_, action) => action.payload,
});

const rootReducer = {
  contacts: contactsReducer,
  filter: filterReducer,
};

// Store
export const store = configureStore({
  reducer: rootReducer,
});
