import { Routes, Route } from "react-router";
import { HomePage } from "./pages/home/HomePage";
import axios from "axios";
import { CheckoutPage } from "./pages/Checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

    const loadCart = (async () => {
      const response = await axios.get("/api/cart-items?expand=product") //querey parameter
            setCart(response.data)});


  useEffect(() => {
    loadCart();
    }, []);

  return (
    <Routes>
      {/* index == path = "/" */}
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path="/orders" element={<OrdersPage cart={cart} />} />
      <Route path="/tracking" element={<TrackingPage />} />
    </Routes>
  );
}

export default App;
