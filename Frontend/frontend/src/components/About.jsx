export default function About() {
  return (
    <section
      id="about"
      className="mt-5"
      style={{
        backgroundColor: "var(--rosa-claro)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--rosa-borde)",
        boxShadow: "var(--card-shadow)",
        padding: "1.5rem",
      }}
    >
      <h2
        className="fw-bold mb-3"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.25rem",
          color: "var(--texto-oscuro)",
        }}
      >
        Sobre Mi Santo Capricho
      </h2>

      <p
        className="mb-2"
        style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "var(--texto-oscuro)" }}
      >
        Pastelería artesanal hecha con paciencia, vainilla real y manos humanas.
      </p>
      <p
        className="mb-2"
        style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "var(--texto-oscuro)" }}
      >
        Tortas personalizadas para cumpleaños, aniversarios y “me lo merezco”.
      </p>
      <p
        className="text-muted"
        style={{ fontSize: "0.8rem", lineHeight: 1.4 }}
      >
        Delivery en Lima. Atención Lunes a Viernes de 9am–7pm.
      </p>
    </section>
  );
}
