import { useState } from "react";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

export default function CatalogPage() {
  const [cartItems, setCartItems] = useState([]);

  function handleAdd(producto) {
    setCartItems(prev => [...prev, producto]);
  }

  async function handleCheckout(items, total) {
    const pedido = {
      cliente: "Cliente Anónimo",
      items: items.map(p => ({ id: p.id, nombre: p.nombre, precio: p.precio })),
      total,
    };

    const res = await fetch("http://192.168.211.130:4000/api/pedidos", {
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
        Nuestro catálogo
      </h2>

      <div className="row g-4">
        <div className="col-md-8">
          <ProductList onAdd={handleAdd} />
        </div>
        <div className="col-md-4">
          <Cart cartItems={cartItems} onCheckout={handleCheckout} />
        </div>
      </div>
    </div>
  );
}
