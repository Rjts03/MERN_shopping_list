import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, NavLink } from 'reactstrap';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const RegisterModal = props => {
  const { isAuthenticated, error, register, clearErrors } = props;

  const [isOpen, setisOpen] = useState(false);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [msg, setmsg] = useState(null);
  
  useEffect(() => {
    if(error.id === 'REGISTER_FAIL') {
      setmsg(error.msg.msg);
    } else setmsg(null);
  }, [error]);

  useEffect(() => {
    if(isOpen && isAuthenticated) {
      toggle();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const toggle = () => {
    // Clear errors
    clearErrors();
    setisOpen(!isOpen);
  };

  const onSubmit = e => {
    e.preventDefault();

    // Create a user object
    const newUser = { name, email, password };

    // Attempt to register
    register(newUser);

    // toggle();
  };

  return(
    <div>
      <NavLink onClick={toggle} href="#">Register</NavLink>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register Here</ModalHeader>
        <ModalBody>
          {msg && <Alert color="danger">{msg}</Alert>}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={e => setname(e.target.value)}
              />
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={e => setemail(e.target.value)}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={e => setpassword(e.target.value)}
              />
              <Button color="success" block style={{ marginTop: '2rem' }}>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);