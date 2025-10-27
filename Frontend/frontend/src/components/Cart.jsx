export default function Cart({ cartItems, onCheckout }) {
  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.precio || 0),
    0
  );

  return (
    <section
      id="pedido"
      style={{
        backgroundColor: "#fff",
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--card-shadow)",
        border: "1px solid var(--rosa-borde)",
        padding: "1.5rem",
      }}
    >
      <h2
        className="fw-bold mb-3"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: "var(--texto-oscuro)",
          fontSize: "1.25rem",
        }}
      >
        Tu pedido
      </h2>

      {cartItems.length === 0 && (
        <p className="text-muted" style={{ fontSize: "0.9rem" }}>
          Aún no has agregado ningún santo capricho ✨
        </p>
      )}

      <ul className="list-group mb-3">
        {cartItems.map((p, i) => (
          <li
            key={i}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{
              fontSize: "0.9rem",
              borderColor: "var(--rosa-borde)",
            }}
          >
            <span>
              {p.nombre}
            </span>
            <strong style={{ color: "var(--rosa-brand)" }}>
              S/ {p.precio}
            </strong>
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-between mb-3">
        <span className="fw-semibold" style={{ fontSize: "0.9rem" }}>
          Total:
        </span>
        <span className="fw-bold" style={{ color: "var(--rosa-brand)" }}>
          S/ {total.toFixed(2)}
        </span>
      </div>

      <button
        className="btn w-100"
        style={{
          backgroundColor: "var(--rosa-brand)",
          color: "#fff",
          borderRadius: "var(--radius-soft)",
          border: "none",
          fontWeight: 500,
        }}
        onClick={() => onCheckout(cartItems, total)}
        disabled={cartItems.length === 0}
      >
        Confirmar pedido
      </button>

      <p className="text-muted text-center mt-2" style={{ fontSize: "0.7rem" }}>
        Guardamos tu pedido en el sistema y nos contactamos contigo.
      </p>
    </section>
  );
}
