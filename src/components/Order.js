import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Order = ({ orderId, setOrderId }) => {
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (orderId) {
      axios.get(`/api/order/${orderId}`)
        .then(response => {
          setOrder(response.data.items);
          setTotal(response.data.total_price);
        })
        .catch(error => {
          console.error('There was an error fetching the order!', error);
        });
    }
  }, [orderId]);

  const payOrder = () => {
    axios.post('/api/payment', { order_id: orderId })
      .then(response => {
        console.log('Payment processed:', response.data);
        setOrderId(null); // Очистить ID заказа после оплаты
        setOrder([]); // Очистить заказ после оплаты
        setTotal(0); // Очистить сумму после оплаты
      })
      .catch(error => {
        console.error('There was an error processing the payment!', error);
      });
  };

  return (
    <div>
      <h1>Order</h1>
      <ul>
        {order.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <h2>Total: ${total.toFixed(2)}</h2>
      <button onClick={payOrder} disabled={order.length === 0}>Pay Order</button>
    </div>
  );
};

export default Order;
