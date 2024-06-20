import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import WaiterCallModal from './WaiterCallModal';

const NavbarContainer = styled.nav`
  background-color: #ff4d4f;
  padding: 1em 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
`;

const Logo = styled.div`
  font-size: 1.5em;
  font-weight: bold;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0 1em;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1em;
  padding: 10px 15px;
  border-radius: 4px;
  background-color: transparent; 
  border: 1px solid transparent; 

  &:hover {
    color: #005f73;
    background-color: #edd8d8; 
    border-color: #ff4d4f; 
  }
`;

const Navbar = () => {
  const [showWaiterCallModal, setShowWaiterCallModal] = useState(false);

  const handleWaiterCallSubmit = (reason) => {
    console.log(`Причина вызова: ${reason}`);
    // Здесь можно отправить запрос на сервер с выбранной причиной
    axios.post('http://192.168.0.12:8001/api/waiter-call', { reason })
      .then(response => {
        console.log('Waiter call placed:', response.data);
        setShowWaiterCallModal(false);
      })
      .catch(error => {
        console.error('There was an error placing the waiter call!', error);
      });
  };

  return (
    <>
      <NavbarContainer>
        <Logo>Ocean TASTE</Logo>
        <NavList>
          <NavItem><NavLink to="/">Главная</NavLink></NavItem>
          <NavItem><NavLink to="#" onClick={() => setShowWaiterCallModal(true)}>Вызвать официанта</NavLink></NavItem>
          <NavItem><NavLink to="/payment">Счет</NavLink></NavItem>
        </NavList>
      </NavbarContainer>
      <WaiterCallModal
        show={showWaiterCallModal}
        onClose={() => setShowWaiterCallModal(false)}
        onSubmit={handleWaiterCallSubmit}
      />
    </>
  );
};

export default Navbar;
