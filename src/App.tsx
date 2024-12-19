import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/Login";
import ContactPage from "./pages/Contact";
import Footer from "./pages/Footer";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import SellerSide from "./pages/seller";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product-details/:productId" element={<ProductDetails />} />
        <Route path="/seller-side/" element={<SellerSide />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
