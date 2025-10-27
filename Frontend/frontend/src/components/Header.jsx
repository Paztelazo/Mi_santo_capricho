import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Header() {
  return (
    <header
      className="mb-4 py-4"
      style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid rgba(0,0,0,0.05)"
      }}
    >
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between text-center text-md-start">
        <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-start">
          <img
            src={logo}
            alt="Mi Santo Capricho"
            style={{
              height: "64px",
              width: "64px",
              objectFit: "contain",
              borderRadius: "50%",
              backgroundColor: "#fff"
            }}
          />
          <div>
            <div
              className="m-0"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                color: "#d47a93",
                fontWeight: 600,
                lineHeight: 1.2
              }}
            >
              Mi Santo Capricho
            </div>
            <div
              className="text-muted"
              style={{
                fontSize: "0.9rem",
                fontStyle: "italic",
                color: "#ad6b7c"
              }}
            >
              Pastelería artesanal & pedidos personalizados
            </div>
          </div>
        </div>

        <nav
          className="mt-3 mt-md-0 d-flex gap-3 justify-content-center"
          style={{ fontSize: "0.9rem" }}
        >
          <Link className="text-decoration-none" to="/" style={{ color: "#6b5057" }}>
            Inicio
          </Link>
          <Link className="text-decoration-none" to="/catalogo" style={{ color: "#6b5057" }}>
            Catálogo
          </Link>
          <Link className="text-decoration-none" to="/pedido" style={{ color: "#6b5057" }}>
            Tu pedido
          </Link>
          <Link className="text-decoration-none" to="/admin" style={{ color: "#6b5057" }}>
            Interno
          </Link>
        </nav>
      </div>
    </header>
  );
}
