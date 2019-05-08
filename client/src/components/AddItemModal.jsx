import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { addItem } from '../actions/itemActions';

const AddItemModal = props => {
  const { addItem } = props;

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
      <Button
        color="dark"
        style={{marginBottom: '2rem'}}
        onClick={toggle}
      >
        Add Item
      </Button>
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
  item: state.item
});

export default connect(mapStateToProps, { addItem })(AddItemModal);