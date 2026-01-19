import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Header1 from "./Components/Header1";
import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages imports (same as yours)
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import Faq from "./Pages/Faq";
import Home from "./Pages/Home";
import StoreLocations from "./Pages/StoreLocation";
import StandardBlog from "./Pages/StandardBlog";
import BlogLeftSidebar from "./Pages/BlogLeftSidebar";
import BlogRightSidebar from "./Pages/BlogRightSidebar";
import BlogDetail from "./Pages/BlogDetail";
import ShopDetail from "./Pages/ShopDetail";
import Privacy from "./Pages/Privacy";
import Terms from "./Pages/Terms";
import Error from "./Pages/Error";
import ShopGrid from "./Pages/ShopGrid";
import ShopLeftSidebar from "./Pages/ShopLeftSidebar";
import ShopRightSidebar from "./Pages/ShopRightSidebar";
import Wishlist from "./Pages/Whishlist";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Orders from "./Pages/Orders";
import Register from "./Pages/Registration";
import Main from "./Pages/Main"; // ADMIN PAGE

function App() {
  const location = useLocation();

  // 🔥 admin page check
  const isAdminPage =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/main";

  return (
    <>
      {!isAdminPage && (
        <>
          <Header1 />
          <Header />
          <Navbar />
        </>
      )}
      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/store-location" element={<StoreLocations />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/error" element={<Error />} />
        <Route path="/blog-standard" element={<StandardBlog />} />
        <Route path="/blog-leftsidebar" element={<BlogLeftSidebar />} />
        <Route path="/blog-rightsidebar" element={<BlogRightSidebar />} />
        <Route path="/blogdetail" element={<BlogDetail />} />
        <Route path="/shop-detail/:id" element={<ShopDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop-grid" element={<ShopGrid />} />
        <Route path="/shop-sidebar1" element={<ShopLeftSidebar />} />
        <Route path="/shop-sidebar2" element={<ShopRightSidebar />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
      </Routes>
      {!isAdminPage && <Footer />}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        pauseOnHover
      />
    </>
  );
}

export default App;
