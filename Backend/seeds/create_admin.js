// seeds/create_admin.js
import dotenv from "dotenv";
import pkg from "pg";
import { fileURLToPath } from "url";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function ensureUsersTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      nombre_completo VARCHAR(200),
      email TEXT UNIQUE NOT NULL,
      rol VARCHAR(50) DEFAULT 'cliente',
      password TEXT NOT NULL,
      creado TIMESTAMP DEFAULT now()
    );
  `);
}

async function createOrUpdateAdmin(email, plainPassword) {
  // 🔴 VULNERABLE A PROPÓSITO: guarda password en texto plano
  const result = await pool.query(
    `INSERT INTO usuarios (nombre_completo, email, password, rol)
     VALUES ($1, $2, $3, 'admin')
     ON CONFLICT (email)
     DO UPDATE SET password = EXCLUDED.password, rol = 'admin'
     RETURNING id, email, rol, creado`,
    [email.split("@")[0], email, plainPassword]
  );

  return result.rows[0];
}

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error(
      "ERROR: set ADMIN_EMAIL and ADMIN_PASSWORD in your .env before running this script."
    );
    process.exit(1);
  }

  try {
    await ensureUsersTable();
    const user = await createOrUpdateAdmin(email, password);
    console.log("Admin creado/actualizado:", {
      id: user.id,
      email: user.email,
      role: user.rol,
    });
  } catch (err) {
    console.error("Fallo creando admin:", err);
  } finally {
    await pool.end();
  }
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) main();
