import { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import phonebookOperations from './redux/phonebook/phonebook-operations';
import phonebookSelectors from './redux/phonebook/contacts-selectors';
import ContactForm from './components/ContactForm';
import ContactsList from './components/ContactList/ContactList';
import Filter from './components/Filter';
import Title from './components/Title';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <>
        <div className="container">
          {this.props.isLoading && <h1>Loading...</h1>}
          <CSSTransition
            in={true}
            appear={true}
            classNames="transition"
            timeout={500}
            unmountOnExit
          >
            <Title title="Form Contact" />
          </CSSTransition>

          <ContactForm />
          <Title title="Contacts List" />

          <Filter />

          <ContactsList />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: phonebookSelectors.getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(phonebookOperations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
