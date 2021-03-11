import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';
import { connect } from 'react-redux';
import phonebookSelectors from '../../redux/phonebook/contacts-selectors';
import phonebookOperations from '../../redux/phonebook/phonebook-operations';

class ContactForm extends Component {
  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;

    this.props.onAddContact(name, number);

    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        Name{' '}
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Enter name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          className={styles.input}
          type="tel"
          name="number"
          placeholder="Enter phone number"
          value={this.state.number}
          onChange={this.handleChange}
        />
        <button className={styles.button} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  contacts: phonebookSelectors.getAllContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onAddContact: (name, number) =>
    dispatch(phonebookOperations.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
