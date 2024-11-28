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
import Login from "./pages/customer/login/Login";
import AdminLogin from "./pages/admin/login/AdminLogin";
import Register from "./pages/customer/register/Register";
import ProtectedRoute from "./protected-route/ProtectedRoute";
import Categories from "./pages/admin/categories/Categories";
import Vendors from "./pages/admin/vendors/Vendors";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />

        <Route
          path="/home"
          element={
            <Layout>
              <Homepage />
            </Layout>
          }
        />

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

        {/* <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
