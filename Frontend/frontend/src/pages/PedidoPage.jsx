import { useState } from "react";
import Cart from "../components/Cart";
import { apiUrl } from "../config/api";
import { useAuth } from "../context/AuthContext";

export default function PedidoPage() {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  async function handleCheckout(items, total) {
    // 🛑 Seguridad en frontend: si por algún motivo no hay usuario, no dejamos continuar
    if (!user) {
      alert("Debes iniciar sesión para confirmar tu pedido.");
      return;
    }

    // Ligamos el pedido al usuario autenticado
    const pedido = {
      // puedes cambiar los nombres de campos según lo que espere tu backend
      cliente: user.nombre_completo || user.email || "Cliente sin nombre",
      items: items.map(p => ({
        id: p.id,
        nombre: p.nombre,
        precio: p.precio,
      })),
      total,
    };

    const res = await fetch(apiUrl("/api/pedidos"), {
      method: "POST",
      headers: { "Content-Type": "application/json", 
            ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
       },
      body: JSON.stringify(pedido),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err.error || "Ocurrió un error al enviar el pedido");
      return;
    }

    const data = await res.json();
    alert("Pedido enviado. ID: " + data.pedidoId);
    setCartItems([]);
  }

  return (
    <div className="container py-4">
      <h2
        className="fw-bold mb-4 text-center"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: "var(--texto-oscuro)",
        }}
      >
        Tu pedido
      </h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <Cart cartItems={cartItems} onCheckout={handleCheckout} />
        </div>
      </div>

      <p className="text-center text-muted mt-3" style={{ fontSize: "0.8rem" }}>
        Recibimos tu pedido y nos comunicamos contigo para coordinar el delivery.
      </p>
    </div>
  );
}
