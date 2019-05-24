import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, NavLink } from 'reactstrap';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const LoginModal = props => {
  const { isAuthenticated, error, login, clearErrors } = props;

  const [isOpen, setisOpen] = useState(false);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [msg, setmsg] = useState(null);
  
  useEffect(() => {
    if(error.id === 'LOGIN_FAIL') {
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

    const user = {
      email,
      password
    };

    // Attempt to login
    login(user);
  };

  return(
    <div>
      <NavLink onClick={toggle} href="#">Login</NavLink>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login Here</ModalHeader>
        <ModalBody>
          {msg && <Alert color="danger">{msg}</Alert>}
          <Form onSubmit={onSubmit}>
            <FormGroup>
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
              <Button color="info" block style={{ marginTop: '2rem' }}>
                Login
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

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);