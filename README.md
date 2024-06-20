# Restaurant Menu Application

This project is a restaurant menu web application that allows users to view menu items, add items to their cart, call a waiter, and proceed to payment. The backend is built with FastAPI and Python, while the frontend is developed using React.The application is containerized using Docker and Docker Compose.

## Features

- **View Menu**: Browse through the restaurant's menu with details like name, description, and price.
- **Add to Cart**: Add items to the cart and adjust quantities.
- **Call Waiter**: Call a waiter for assistance.
- **Checkout**: Review the order and proceed to payment.

## Technologies Used

- **Frontend**: React, Styled-components, FontAwesome
- **Backend**: FastAPI, Python
- **Other**: Axios for API requests, React Router for navigation


## API Endpoints
The following are some of the key API endpoints:

- GET /menu: Fetch all menu items.
- POST /order: Place an order.
- POST /call-waiter: Call a waiter.

## Getting Started

### Clone the repository

```bash
git clone https://github.com/biryukovaksenia/restaurant-menu.git
cd restaurant-menu
```

### Running the Application
```bash
docker-compose up --build
```
Open your browser and navigate to http://192.168.0.12:3000 for the frontend and http://192.168.0.12:8001 for the backend.
