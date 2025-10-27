import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import HomePage from "./pages/HomePage.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import PedidoPage from "./pages/PedidoPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/pedido" element={<PedidoPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>

      <footer
        className="text-center py-4 text-muted"
        style={{ fontSize: "0.8rem" }}
      >
        <div style={{ color: "var(--texto-oscuro)" }}>
          © {new Date().getFullYear()} MiSantoCapricho · Lima · Hecho con azúcar y Postgres
        </div>
      </footer>
    </>
  );
}
