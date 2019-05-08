import React, { useState } from 'react';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

const AppNavbar = () => {
  const [isOpen, setisOpen] = useState(false);

  const toggle = () => {
    setisOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">ShoppingList</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://github.com/Rjts03">GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>  
    </div>
  )
};

export default AppNavbar;
