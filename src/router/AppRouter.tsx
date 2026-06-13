import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../components/layouts/MainLayout";

import Home from "../pages/Home";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import CheckoutPage from "../components/CheckoutPage/CheckoutPage";
import OrderSuccess from "../components/OrderSucess/OrderSuccess";

function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<OrderSuccess />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default AppRouter;
