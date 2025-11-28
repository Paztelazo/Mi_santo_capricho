import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import { apiUrl } from "../config/api";
import { useAuth } from "../context/AuthContext";

export default function CatalogPage() {
  const [cartItems, setCartItems] = useState([]);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  function handleAdd(producto) {
    setCartItems((prev) => [...prev, producto]);
  }

  async function handleCheckout(items, total) {
    if (!user) {
      alert("Debes iniciar sesión para confirmar tu pedido.");
      navigate("/login");
      return;
    }
    const authToken = token || user?.token;
    if (!authToken) {
      alert("No se encontró token de autenticación. Vuelve a iniciar sesión.");
      navigate("/login");
      return;
    }

    const pedido = {
      cliente: user.nombre_completo || user.email || "Cliente Anónimo",
      items: items.map((p) => ({ id: p.id, nombre: p.nombre, precio: p.precio })),
      total,
    };

    const res = await fetch(apiUrl("/api/pedidos"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 👇 aquí va el token
        Authorization: `Bearer ${authToken}`,
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
