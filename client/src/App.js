import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShopPage from "./pages/ShopPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/shop" element={<ShopPage />} />
        <Route path="*" element={<Navigate to="/shop" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
