import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

const PaymentContainer = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const SummaryContainer = styled.div`
  background: #005377;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ItemName = styled.div`
  font-size: 1.2em;
`;

const ItemPrice = styled.div`
  font-size: 1.2em;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5em;
  margin-top: 20px;
`;

const PaymentButton = styled.button`
  background: ${props => props.$primary ? '#ff4d4f' : '#005f73'};
  color: #fff;
  border: none;
  padding: 15px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  margin: 10px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${props => props.$primary ? '#FF4F41' : '#007f8c'};
  }
`;

const Payment = () => {
  const [orderSummary, setOrderSummary] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Запрос на сервер для получения данных о заказах
    axios.get('http://192.168.0.12:8001/api/order-summary')
      .then(response => {
        setOrderSummary(response.data.orders);
        setTotalAmount(response.data.total);
      })
      .catch(error => {
        console.error('There was an error fetching the order summary!', error);
      });
  }, []);

  const callWaiter = (reason) => {
    axios.post('http://192.168.0.12:8001/api/waiter-call', { reason })
      .then(response => {
        console.log('Waiter call placed:', response.data);
      })
      .catch(error => {
        console.error('There was an error placing the waiter call!', error);
      });
  };

  return (
    <PaymentContainer>
      <SummaryContainer>
        <h2>Сводный счет</h2>
        {orderSummary.map((item, index) => (
          <OrderItem key={index}>
            <ItemName>{item.name} x {item.quantity}</ItemName>
            <ItemPrice>{item.price * item.quantity} ₽</ItemPrice>
          </OrderItem>
        ))}
        <Total>
          <span>Итого:</span>
          <span>{totalAmount} ₽</span>
        </Total>
      </SummaryContainer>
      <PaymentButton $primary onClick={() => alert('Оплата картой будет реализована позднее')}>
        <FontAwesomeIcon icon={faCreditCard} style={{ marginRight: '10px' }} />
        Оплатить картой
      </PaymentButton>
      <PaymentButton onClick={() => callWaiter('Оплата наличными')}>
        <FontAwesomeIcon icon={faMoneyBillWave} style={{ marginRight: '10px' }} />
        Оплатить наличными (вызвать официанта)
      </PaymentButton>
    </PaymentContainer>
  );
};

export default Payment;

