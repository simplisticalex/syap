import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CartPage from "./pages/CartPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoryPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <Header />

        <div className="container">
          <main className="main">
            <Routes>
              <Route path="/" element={<CategoriesPage />} />
              <Route path="/category/:id" element={<CategoryPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
