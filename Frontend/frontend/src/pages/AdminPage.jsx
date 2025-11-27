// src/pages/AdminPage.jsx
import { useEffect, useState } from "react";
import { apiUrl } from "../config/api";
import { useAuth } from "../context/AuthContext";

export default function AdminPage() {
  const { user, token } = useAuth(); // o solo { user } si guardas el token dentro del user
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarPedidos() {
      // si no hay sesión, marcamos error y salimos
      if (!user) {
        setError("No hay sesión activa.");
        setLoading(false);
        return;
      }

      // ajusta según dónde guardes el token
      const authToken = token || user.token;

      if (!authToken) {
        setError("No se encontró token de autenticación.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(apiUrl("/api/pedidos"), {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          setError("No estás autenticada o no tienes permisos para ver esta sección.");
          setLoading(false);
          return;
        }

        if (!res.ok) {
          setError("Error al obtener pedidos del servidor.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setPedidos(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error de conexión con el servidor.");
        setLoading(false);
      }
    }

    cargarPedidos();
  }, [user, token]);

  return (
    <div className="container py-4">
      <h2
        className="fw-bold mb-3 text-center"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: "#d47a93",
        }}
      >
        Pedidos de clientes
      </h2>

      <p className="text-center text-muted mb-4">
        Revisa todos los pedidos que entran al sistema con detalle de productos y montos.
      </p>

      <div
        className="table-responsive"
        style={{
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        <table className="table mb-0">
          <thead
            style={{
              backgroundColor: "#ffe9ef",
              color: "#6b5057",
            }}
          >
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Cliente</th>
              <th scope="col">Total (S/)</th>
              <th scope="col">Productos</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="text-center py-3">
                  Cargando pedidos...
                </td>
              </tr>
            )}

            {!loading && error && (
              <tr>
                <td colSpan={4} className="text-center py-3 text-danger">
                  {error}
                </td>
              </tr>
            )}

            {!loading && !error && pedidos.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-3 text-muted">
                  Aún no hay pedidos registrados.
                </td>
              </tr>
            )}

            {!loading &&
              !error &&
              pedidos.length > 0 &&
              pedidos.map((p) => {
                const productosTexto = Array.isArray(p.items)
                  ? p.items
                      .map((item) => `${item.nombre} (S/ ${item.precio})`)
                      .join(", ")
                  : p.productos || "";

                return (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.cliente || p.cliente_nombre || "—"}</td>
                    <td>{p.total}</td>
                    <td style={{ maxWidth: 350 }}>{productosTexto}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
