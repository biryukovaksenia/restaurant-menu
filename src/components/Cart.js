import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

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
`;

const CartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 1.2em;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartItemName = styled.span`
  font-size: 1em;
`;

const CartItemPrice = styled.span`
  font-size: 0.9em;
  color: #bbb;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff4d4f;
  cursor: pointer;

  &:hover {
    color: #ff7875;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.2em;

  &:hover {
    filter: brightness(0.7); /* Затемнение при наведении */
  }

  &:active {
    filter: brightness(0.5); /* Сильное затемнение при нажатии */
  }
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2em;
  margin-top: 20px;
`;

const CheckoutButton = styled.button`
  background: #ff4d4f;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 1em;
  margin-top: 20px;

  &:hover {
    background-color: #FF4F41; /* Темнее при наведении */
  }
`;

const Cart = ({ show, order, onRemove, onCheckout, onClose }) => (
  <ModalOverlay $show={show} onClick={onClose}>
    <ModalContent onClick={e => e.stopPropagation()}>
      <CartHeader>
        <span>Ваш заказ</span>
        <CloseButton onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
      </CartHeader>
      {order.map((item, index) => (
        <CartItem key={index}>
          <CartItemDetails>
            <CartItemName>{item.name}</CartItemName>
            <CartItemPrice>{item.quantity} × {item.price} ₽</CartItemPrice>
          </CartItemDetails>
          <RemoveButton onClick={() => onRemove(item)}>
            <FontAwesomeIcon icon={faTrash} />
          </RemoveButton>
        </CartItem>
      ))}
      <Total>
        <span>Итого:</span>
        <span>{order.reduce((acc, item) => acc + item.price * item.quantity, 0)} ₽</span>
      </Total>
      <CheckoutButton onClick={onCheckout}>ЗАКАЗАТЬ</CheckoutButton>
    </ModalContent>
  </ModalOverlay>
);

export default Cart;
