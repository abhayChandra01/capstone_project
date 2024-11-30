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

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
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
      </AppProvider>
    </Router>
  );
}

export default App;
