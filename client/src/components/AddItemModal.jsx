import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { addItem } from '../actions/itemActions';

const AddItemModal = props => {
  const { addItem, isAuthenticated } = props;

  const [isOpen, setisOpen] = useState(false);
  const [name, setname] = useState('');

  const toggle = () => {
    setisOpen(!isOpen);
  };

  const onSubmit = e => {
    e.preventDefault();

    const newItem = { name };

    if(name !== '') {
      addItem(newItem);
    }

    toggle();
  };

  return(
    <div>
      {
        isAuthenticated ? (
          <Button
            color="dark"
            style={{marginBottom: '2rem'}}
            onClick={toggle}
            className="ml-3"
            size="md"
          >
            Add Item
          </Button>
        ) : (
          <h4 className="mb-4 ml-4">Please login to manage items!</h4>
        )
      }
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add an item..."
                onChange={e => setname(e.target.value)}
              />
              <Button color="dark" disabled={name === ''} block style={{ marginTop: '2rem' }}>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(AddItemModal);