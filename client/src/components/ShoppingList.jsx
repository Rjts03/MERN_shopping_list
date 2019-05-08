import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Button, Container, ListGroup, ListGroupItem } from 'reactstrap';
import { deleteItem, getItems } from '../actions/itemActions';

const ShoppingList = props => {
  const { item: { items }, getItems, deleteItem } = props;

  useEffect(() => {
    getItems();
  }, [getItems]);

  const onRemoveItem = id => {
    deleteItem(id);
  };

  return(
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={700} classNames="fade">
              <ListGroupItem>
                <Button
                  className="rmv-btn"
                  color="danger"
                  size="sm"
                  onClick={() => onRemoveItem(_id)}
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

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
