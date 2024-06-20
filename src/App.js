import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Navbar from './components/Navbar';
import OrderPlacedMessage from './components/OrderPlacedMessage';
import './App.css';
import WaiterCallModal from "./components/WaiterCallModal";

const CartIconContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  color: #ff4d4f;
`;

const Badge = styled.div`
  background-color: #ff4d4f;
  color: white;
  border-radius: 50%;
  padding: 0.5em;
  font-size: 0.8em;
  position: absolute;
  top: -10px;
  right: -10px;
`;


const App = () => {
  const [order, setOrder] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderSummary, setOrderSummary] = useState([]);

  const fetchOrderSummary = () => {
  axios.get('http://192.168.0.12:8001/api/order-summary')
    .then(response => {
      setOrderSummary(response.data.orders);
    })
    .catch(error => {
      console.error('There was an error fetching the order summary!', error);
    });
};

  const addToOrder = (menuItem) => {
    const itemIndex = order.findIndex(item => item.id === menuItem.id);
    if (itemIndex > -1) {
      const newOrder = [...order];
      newOrder[itemIndex].quantity += 1;
      setOrder(newOrder);
    } else {
      setOrder([...order, { ...menuItem, quantity: 1 }]);
    }
  };

  const removeFromOrder = (menuItem) => {
    const itemIndex = order.findIndex(item => item.id === menuItem.id);
    if (itemIndex > -1) {
      const newOrder = [...order];
      if (newOrder[itemIndex].quantity > 1) {
        newOrder[itemIndex].quantity -= 1;
      } else {
        newOrder.splice(itemIndex, 1);
      }
      setOrder(newOrder);
    }
  };

  const checkout = () => {
  axios.post('http://192.168.0.12:8001/api/checkout', order)
    .then(response => {
      console.log('Order placed:', response.data);
      setOrderPlaced(true);
      setShowCart(false);
      setOrder([]);
      fetchOrderSummary();  // Fetch order summary here
      setTimeout(() => setOrderPlaced(false), 3000); // Скрыть сообщение через 3 секунды
    })
    .catch(error => {
      console.error('There was an error placing the order!', error);
    });
};

  const totalItems = order.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Menu addToOrder={addToOrder} removeFromOrder={removeFromOrder} />} />
          <Route path="/call-waiter" element={<WaiterCallModal />} />
          <Route path="/payment" element={<Payment orderSummary={orderSummary} />} />
        </Routes>
        <CartIconContainer onClick={() => setShowCart(!showCart)}>
          <FontAwesomeIcon icon={faShoppingCart} size="2x" />
          {totalItems > 0 && <Badge>{totalItems}</Badge>}
        </CartIconContainer>
        <Cart show={showCart} order={order} onRemove={removeFromOrder} onCheckout={checkout} onClose={() => setShowCart(false)} />
        {orderPlaced && (
          <OrderPlacedMessage show={orderPlaced} onClose={() => setOrderPlaced(false)} />
        )}
      </div>
    </Router>
  );
}

export default App;
