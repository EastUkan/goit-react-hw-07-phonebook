import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import phonebookOperations from '../../redux/phonebook/phonebook-operations';
import phonebookSelectors from '../../redux/phonebook/contacts-selectors';

function ContactList({ contacts, onDeleteContact }) {
  return (
    <TransitionGroup component="ul">
      {contacts.map(({ name, number, id }) => {
        return (
          <CSSTransition
            key={id}
            appear={true}
            timeout={250}
            classNames={styles}
          >
            <li key="id" className={styles.item}>
              <div className={styles.itemTitle}>
                {name}:{number}
              </div>
              <button
                className={styles.button}
                onClick={() => onDeleteContact(id)}
              >
                delete
              </button>
            </li>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.string,
      id: PropTypes.number,
    }),
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  contacts: phonebookSelectors.getVisibleContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(phonebookOperations.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
