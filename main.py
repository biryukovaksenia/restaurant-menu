from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://192.168.0.12:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class OrderItem(BaseModel):
    id: int
    name: str
    quantity: int
    price: float


class OrderSummary(BaseModel):
    orders: List[OrderItem]
    total: float


class WaiterCall(BaseModel):
    reason: str


# База данных заказов
orders_db: Dict[int, OrderItem] = {}


def get_aggregated_orders() -> List[OrderItem]:
    return list(orders_db.values())


@app.get("/api/order-summary", response_model=OrderSummary)
async def get_order_summary():
    aggregated_orders = get_aggregated_orders()
    total = sum(item.quantity * item.price for item in aggregated_orders)
    return {"orders": aggregated_orders, "total": total}


@app.post("/api/checkout")
async def checkout(order: List[OrderItem]):
    try:
        for item in order:
            if item.id in orders_db:
                orders_db[item.id].quantity += item.quantity
            else:
                orders_db[item.id] = item
        print("Received order:", order)
        return {"message": "Order received successfully", "order": order}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/waiter-call")
async def waiter_call(call: WaiterCall):
    try:
        print("Received waiter call:", call)
        return {"message": "Waiter call received successfully", "call": call}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
