export default function ProductCard({ producto, onAdd }) {
  return (
    <div
      className="h-100 p-3"
      style={{
        backgroundColor: "#fff",
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--card-shadow)",
        border: "1px solid var(--rosa-borde)",
      }}
    >
      <h5
        className="fw-semibold"
        style={{
          color: "var(--texto-oscuro)",
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.15rem",
        }}
      >
        {producto.nombre}
      </h5>

      <p
        className="text-muted"
        style={{
          minHeight: "3rem",
          fontSize: "0.9rem",
          lineHeight: 1.4,
        }}
      >
        {producto.descripcion}
      </p>

      <p
        className="fw-bold"
        style={{
          color: "var(--rosa-brand)",
          fontSize: "1rem",
          marginBottom: "1rem",
        }}
      >
        S/ {producto.precio}
      </p>

      <button
        className="btn w-100"
        style={{
          backgroundColor: "var(--rosa-brand)",
          color: "#fff",
          borderRadius: "var(--radius-soft)",
          border: "none",
          fontWeight: 500,
        }}
        onClick={() => onAdd(producto)}
      >
        Agregar al pedido
      </button>
    </div>
  );
}
