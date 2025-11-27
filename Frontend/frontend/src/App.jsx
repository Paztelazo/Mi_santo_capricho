import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider, RequireAuth, RequireRole } from "./context/AuthContext";

import HomePage from "./pages/HomePage.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import PedidoPage from "./pages/PedidoPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import LoginPage from "./pages/Login.jsx";

export default function App() {
  return (
    <AuthProvider>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />

        <Route
          path="/pedido"
          element={
            <RequireAuth>
              <PedidoPage />
            </RequireAuth>
          }
        />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <RequireRole role="admin">
              <AdminPage />
            </RequireRole>
          }
        />
      </Routes>

      <footer
        className="text-center py-4 text-muted"
        style={{ fontSize: "0.8rem" }}
      >
        <div style={{ color: "var(--texto-oscuro)" }}>
          © {new Date().getFullYear()} MiSantoCapricho · Lima · Hecho con azúcar y amor
        </div>
      </footer>
    </AuthProvider>
  );
}
