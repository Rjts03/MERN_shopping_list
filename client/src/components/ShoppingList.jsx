import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Button, Container, ListGroup, ListGroupItem } from 'reactstrap';
import uuid from 'uuid';

const ShoppingList = () => {
  const [items, setitems] = useState([
    { id: uuid(), name: 'Eggs' },
    { id: uuid(), name: 'Bread' },
    { id: uuid(), name: 'Apples' },
    { id: uuid(), name: 'Milk' },
  ]);

  return(
    <Container>
      <Button
        color="dark"
        style={{ marginBottom: '2rem' }}
        onClick={() => {
          const name = prompt('Enter item');
          if(name) {
            const newItems = [...items, { id: uuid(), name }];
            setitems(newItems);
          }
        }}
      >
        Add Item
      </Button>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ id, name }) => (
            <CSSTransition key={id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="rmv-btn"
                  color="danger"
                  size="sm"
                  onClick={() => {
                    const newItems = items.filter(item => item.id !== id);
                    setitems(newItems);
                  }}
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default ShoppingList;
