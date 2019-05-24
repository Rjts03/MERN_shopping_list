import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';
import { logout } from '../../actions/authActions';

const Logout = ({ logout }) => {
  return (
    <Fragment>
      <NavLink onClick={logout} href="#">Logout</NavLink>
    </Fragment>
  );
};

export default connect(null, { logout })(Logout);
