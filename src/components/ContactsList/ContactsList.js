import styles from './ContactsList.module.css';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import contactsOperations from '../../redux/phonebook-operations';
import phonebookSelectors from '../../redux/contacts-selectors';

function ContactsList({ contacts, onRemoveContact }) {
  return (
    <TransitionGroup component="ul">
      {contacts.map(({ id, name, number }) => {
        return (
          <CSSTransition id={id} timeout={250} classNames={styles}>
            <li key="id" className={styles.item}>
              <div className={styles.itemTitle}>
                {name}:{number}
              </div>
              <button
                className={styles.button}
                onClick={() => onRemoveContact(id)}
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

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onRemoveContact: PropTypes.func,
};

const mapStateToProps = state => ({
  contacts: phonebookSelectors.getVisibleContacts(state),
});
const mapDispatchToProps = dispatch => ({
  onRemoveContact: id => dispatch(contactsOperations.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
