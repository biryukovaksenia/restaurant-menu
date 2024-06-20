import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => (props.$show ? 'block' : 'none')}; 
  z-index: 999;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #005377;
  color: #fff;
  width: 400px;
  max-height: 500px;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.2em;
  align-self: flex-end;

  &:hover {
    filter: brightness(0.7); 
  }

  &:active {
    filter: brightness(0.5); 
  }
`;

const MessageContent = styled.div`
  text-align: center;
  font-size: 1.2em;
  font-family: 'Open Sans', sans-serif;
  padding: 20px 0;
`;

const OrderPlacedMessage = ({ show, onClose }) => {
  return (
    <ModalOverlay $show={show} onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
        <MessageContent>
          <span>Ваш заказ был успешно оформлен.</span>
        </MessageContent>
      </ModalContent>
    </ModalOverlay>
  );
};

export default OrderPlacedMessage;


