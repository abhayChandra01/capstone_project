import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Homepage from "./pages/customer/homepage/Homepage";
import Products from "./pages/admin/products/Products";
import AdminLayout from "./components/Admin/Layout/AdminLayout";
import Layout from "./components/Customer/Layout/Layout";
import AdminLogin from "./pages/admin/login/AdminLogin";
import ProtectedRoute from "./protected-route/ProtectedRoute";
import Categories from "./pages/admin/categories/Categories";
import Vendors from "./pages/admin/vendors/Vendors";
import { AppProvider } from "./context/AppProvider";
import ViewProducts from "./pages/customer/products/ViewProducts";
import ViewProductDetails from "./pages/customer/products/details/ViewProductDetails";
import Wishlist from "./pages/customer/wishlist/Wishlist";
import Cart from "./pages/customer/cart/Cart";
import Orders from "./pages/customer/orders/Orders";
import Checkout from "./pages/customer/checkout/Checkout";
import OrderPlaced from "./pages/customer/placed/OrderPlaced";
import AdminViewProducts from "./pages/admin/view/AdminViewProducts";

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          {/* Customer Routes */}

          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/home"
            element={
              <Layout>
                <Homepage />
              </Layout>
            }
          />
          <Route
            path="/products"
            element={
              <Layout>
                <ViewProducts />
              </Layout>
            }
          />
          <Route
            path="/products/:id"
            element={
              <Layout>
                <ViewProductDetails />
              </Layout>
            }
          />
          <Route
            path="/wishlist"
            element={
              <Layout>
                <Wishlist />
              </Layout>
            }
          />
          <Route
            path="/cart"
            element={
              <Layout>
                <Cart />
              </Layout>
            }
          />
          <Route
            path="/orders"
            element={
              <Layout>
                <Orders />
              </Layout>
            }
          />
          <Route
            path="/checkout"
            element={
              <Layout>
                <Checkout />
              </Layout>
            }
          />
          <Route
            path="/order-placed"
            element={
              <Layout>
                <OrderPlaced />
              </Layout>
            }
          />

          {/* Admin/Vendor Routes */}

          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/:role/products"
            element={
              <ProtectedRoute allowedRoles={["admin", "vendor"]}>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:role/products/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "vendor"]}>
                <AdminViewProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:role/categories"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:role/vendors"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Vendors />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
