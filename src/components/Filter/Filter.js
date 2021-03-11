import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';
import { connect } from 'react-redux';
import { changeFilter } from '../../redux/phonebook/phonebook-actions';
import phonebookSelectors from '../../redux/phonebook/contacts-selectors';

function Filter({ value = '', onChangeFilter }) {
  return (
    <input
      className={styles.input}
      type="text"
      name="filter"
      value={value}
      onChange={onChangeFilter}
      placeholder="Enter name for Search"
    ></input>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChangeFilter: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  value: phonebookSelectors.getFilter(state),
});

const mapDispatchToProps = dispatch => ({
  onChangeFilter: e => dispatch(changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
