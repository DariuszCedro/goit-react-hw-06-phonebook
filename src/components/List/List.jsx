import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import css from './List.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/store';
import { useEffect } from 'react';

export const List = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contacts);

  const filter = useSelector(state => state.filter);
  console.log(contacts);
  const showFilteredContacts = () => {
    if (contacts)
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter)
      );
  };
  const handleDelete = contactId => {
    dispatch(deleteContact(contactId));
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  return (
    <ul>
      {showFilteredContacts().map(contact => (
        <li key={contact.id}>
          {contact.name} : {contact.number}
          <button
            type="button"
            className={css.buttonRemove}
            onClick={() => handleDelete(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  showFiltered: PropTypes.array,
  removeContact: PropTypes.func,
};
