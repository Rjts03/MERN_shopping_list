import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';
import { loadUser } from './actions/authActions';
import './App.css';
import AddItemModal from './components/AddItemModal';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import store from './store';


const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <AddItemModal />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
};

export default App;
