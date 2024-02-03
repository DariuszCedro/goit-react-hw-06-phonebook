import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { statusFilters } from '../../redux/store';
import css from './List.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/store';

export const List = contactId => {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contacts);

  const filter = useSelector(state => state.filter);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );
  const handleDelete = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ul>
      {filteredContacts.map(contact => (
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
