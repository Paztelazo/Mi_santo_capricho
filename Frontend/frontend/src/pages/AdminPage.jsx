import { useEffect, useState } from "react";
import { apiUrl } from "../config/api";

export default function AdminPage() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const res = await fetch(apiUrl("/api/pedidos"));
        if (!res.ok) {
          throw new Error("No se pudieron obtener los pedidos");
        }

        const data = await res.json();
        setPedidos(data || []);
      } catch (err) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    fetchPedidos();
  }, []);

  return (
    <div className="container py-4">
      <h2
        className="fw-bold mb-3 text-center"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: "#b34343",
        }}
      >
        Pedidos de clientes
      </h2>
      <p
        className="text-center text-muted"
        style={{ fontSize: "0.9rem", maxWidth: "640px", margin: "0 auto" }}
      >
        Revisa todos los pedidos que entran al sistema con detalle de productos y montos.
      </p>

      <div
        className="table-responsive mt-4"
        style={{
          backgroundColor: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 12px 24px rgba(0,0,0,0.04)",
          border: "1px solid rgba(212, 122, 147, 0.2)",
          padding: "0.5rem",
        }}
      >
        <table className="table table-sm align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th style={{ minWidth: "70px" }}>ID</th>
              <th style={{ minWidth: "160px" }}>Cliente</th>
              <th style={{ minWidth: "100px" }}>Total (S/)</th>
              <th>Productos</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="text-center text-muted">
                  Cargando pedidos...
                </td>
              </tr>
            )}

            {error && !loading && (
              <tr>
                <td colSpan={4} className="text-center text-danger">
                  {error}
                </td>
              </tr>
            )}

            {!loading && !error && pedidos.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-muted">
                  No hay pedidos registrados todavía.
                </td>
              </tr>
            )}

            {!loading && !error && pedidos.map(pedido => (
              <tr key={pedido.id}>
                <td className="fw-semibold">#{pedido.id}</td>
                <td>{pedido.cliente}</td>
                <td className="fw-semibold" style={{ color: "var(--rosa-brand)" }}>
                  {Number(pedido.total || 0).toFixed(2)}
                </td>
                <td>
                  <ul className="mb-0 ps-3" style={{ fontSize: "0.9rem" }}>
                    {(pedido.items || []).map((item, index) => (
                      <li key={`${pedido.id}-${index}`}>
                        {item.nombre} <span className="text-muted">(S/ {item.precio})</span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
