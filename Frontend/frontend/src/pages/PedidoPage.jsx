import { useState } from "react";
import Cart from "../components/Cart";

export default function PedidoPage() {
  const [cartItems, setCartItems] = useState([]);

  async function handleCheckout(items, total) {
    const pedido = {
      cliente: "Cliente Anónimo",
      items: items.map(p => ({ id: p.id, nombre: p.nombre, precio: p.precio })),
      total,
    };

    const res = await fetch("http://localhost:4000/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido),
    });

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
