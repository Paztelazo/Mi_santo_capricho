import { useEffect, useState } from "react";
import { apiUrl } from "../config/api";

export default function AdminEmpleados() {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    fetch(apiUrl("/api/dev/empleados"))
      .then(res => res.json())
      .then(data => setEmpleados(data))
      .catch(err => console.error("Error cargando empleados:", err));
  }, []);

  return (
    <section className="mt-5">
      <h2 className="fw-bold text-danger">
        Área interna (exposición sensible)
      </h2>
      <p className="text-muted small">
        Esta vista no pide login. Esto es una brecha de seguridad (Broken Access Control).
      </p>

      <div className="table-responsive">
        <table className="table table-sm table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Nombre</th>
              <th>Cargo</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Salario (S/)</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
