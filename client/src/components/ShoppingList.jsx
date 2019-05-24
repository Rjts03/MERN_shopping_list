import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Alert, Button, Container, ListGroup, ListGroupItem } from 'reactstrap';
import { deleteItem, getItems } from '../actions/itemActions';

const ShoppingList = props => {
  const { item: { items }, auth: { isAuthenticated, user }, getItems, deleteItem } = props;

  const [alert, setalert] = useState(false);

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    if(isAuthenticated) {
      setalert(true);
      setTimeout(() => {
        setalert(false);
      }, 3000);
    } else {
      setalert(false);
    }
  }, [isAuthenticated]);

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
                  color={isAuthenticated ? "danger" : "info"}
                  size="sm"
                  onClick={() => onRemoveItem(_id)}
                  disabled={!isAuthenticated}
                >
                  {isAuthenticated ? <>&#10005;</> : <>&#10140;</>}
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
      {
        alert && (
          <Alert className="mt-4">
            {`Welcome ${user.name}! Now you can manage the list.`}
          </Alert>
        )
      }
    </Container>
  );
};

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
