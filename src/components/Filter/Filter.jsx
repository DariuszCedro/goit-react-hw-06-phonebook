import PropTypes from 'prop-types';
import css from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setStatusFilter } from '../../redux/store';

export const Filter = () => {
  const filter = useSelector(state => state.filter);

  const dispatch = useDispatch();
  const handleFilterChange = evt => {
    evt.preventDefault();
    dispatch(setStatusFilter(evt.target.value.toLowerCase()));
  };
  return (
    <>
      <h3>Find contacts by name</h3>
      <input
        type="text"
        className={css.inputFilter}
        name="filter"
        onChange={handleFilterChange}
      />
    </>
  );
};

Filter.proptyTypes = {
  contactFilter: PropTypes.func,
};
