import About from "../components/About";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container py-4">
      {/* Hero inline para que la home se sienta cálida */}
      <section
        className="text-center py-5 bg-light rounded shadow-sm mb-4"
        style={{
          border: "1px solid rgba(212, 122, 147, 0.2)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.04)",
        }}
      >
        <h1
          className="fw-bold display-5"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#d47a93",
          }}
        >
          Mi Santo Capricho 🍰
        </h1>
        <p className="text-muted fs-5" style={{ color: "#ad6b7c" }}>
          Pastelería artesanal · Tortas personalizadas · Delivery en Lima
        </p>

        <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
          <Link
            to="/catalogo"
            className="btn"
            style={{
              backgroundColor: "var(--rosa-brand)",
              color: "#fff",
              borderRadius: "0.5rem",
              border: "none",
              fontWeight: 500,
              minWidth: "150px",
            }}
          >
            Ver catálogo
          </Link>
          <Link
            to="/pedido"
            className="btn btn-outline-dark"
            style={{
              borderRadius: "0.5rem",
              minWidth: "150px",
            }}
          >
            Ver mi pedido
          </Link>
        </div>
      </section>

      <About />
    </div>
  );
}
