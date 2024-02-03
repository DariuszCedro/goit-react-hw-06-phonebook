import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { List } from './List/List';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const App = () => {
  const filter = useSelector(state => state.filter);

  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('contacts');
    if (!saved) {
      return localStorage.setItem(
        'contacts',
        JSON.stringify([
          { name: 'Tadeusz Przykład', id: '1', numer: '0070102' },
        ])
      );
    }
    const initialValue = JSON.parse(saved);
    return initialValue || [{ name: 'Tadzio', id: '1' }];
  });
  //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  // ]);

  const handleAddContact = evt => {
    const form = document.querySelector('form');
    const nameToAdd = form.elements.name.value;
    const phoneNumber = form.elements.number.value;
    const contactExist = contacts.some(
      contact => contact.name.toLowerCase() === nameToAdd.toLowerCase()
    );
    if (nameToAdd === '' && phoneNumber === '') {
      return;
    }
    if (contactExist) {
      alert('This contact is already on Your list');
    } else {
      const newContact = { name: nameToAdd, id: nanoid(), number: phoneNumber };
      setContacts([...contacts, newContact]);

      form.reset();
    }
  };

  const deleteContact = contactId => {
    const remainingContacts = contacts.filter(
      contact => contact.id !== contactId
    );
    setContacts(remainingContacts);
  };

  const handleFilter = evt => {
    evt.preventDefault();

    return filter;
  };

  const showFilteredContacts = () => {
    if (contacts)
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter)
      );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <Form addContact={handleAddContact}></Form>
      <h2>Contacts</h2>
      <Filter contactFilter={handleFilter}></Filter>
      <List
        showFiltered={showFilteredContacts()}
        removeContact={deleteContact}
      ></List>
      -----------------------------------------------------------
    </div>
  );
};
