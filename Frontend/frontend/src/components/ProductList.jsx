import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { apiUrl } from "../config/api";

export default function ProductList({ onAdd }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
      fetch(apiUrl("/api/productos"))
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error cargando productos:", err));
  }, []);

  return (
    <section id="catalogo" className="mb-5">
      <h2 className="fw-bold text-center mb-4">Catálogo</h2>
      <div className="row">
        {productos.map(prod => (
          <div key={prod.id} className="col-md-4 mb-3">
            <ProductCard producto={prod} onAdd={onAdd} />
          </div>
        ))}
      </div>
    </section>
  );
}
