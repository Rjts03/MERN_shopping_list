import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';
import './App.css';
import AddItemModal from './components/AddItemModal';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import store from './store';


function App() {
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
}

export default App;
