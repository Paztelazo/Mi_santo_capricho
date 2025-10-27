import { useEffect, useState } from "react";

export default function AdminPage() {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/dev/empleados")
      .then(res => res.json())
      .then(data => setEmpleados(data))
      .catch(err => console.error("Error cargando empleados:", err));
  }, []);

  return (
    <div className="container py-4">
      <h2
        className="fw-bold mb-3 text-center"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: "#b34343",
        }}
      >
        Área interna (Datos sensibles expuestos)
      </h2>
      <p
        className="text-center text-muted"
        style={{ fontSize: "0.9rem", maxWidth: "600px", margin: "0 auto" }}
      >
        Esta página no está protegida. Cualquier persona puede ver números de
        teléfono, correos internos y salario. Eso es una brecha de
        confidencialidad. Esta será la vulnerabilidad que luego cerraremos con
        autenticación.
      </p>

      <div className="table-responsive mt-4">
        <table className="table table-sm table-bordered align-middle"
          style={{
            backgroundColor: "#fff",
            borderRadius: "1rem",
            overflow: "hidden",
            boxShadow: "0 12px 24px rgba(0,0,0,0.04)",
            border: "1px solid rgba(212, 122, 147, 0.2)"
          }}
        >
          <thead className="table-light">
            <tr>
              <th>Nombre</th>
              <th>Cargo</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Salario (S/)</th>
              <th>Activo</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map(emp => (
              <tr key={emp.id}>
                <td>{emp.nombres} {emp.apellidos}</td>
                <td>{emp.cargo}</td>
                <td>{emp.telefono}</td>
                <td>{emp.email_corporativo}</td>
                <td>{emp.salario_mensual}</td>
                <td>{emp.activo ? "Sí" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center text-muted mt-3" style={{ fontSize: "0.8rem" }}>
        *Esto es exactamente el tipo de fuga que ISO 27001 y OWASP piden evitar.
        Luego vamos a exigir token de administrador.
      </p>
    </div>
  );
}
