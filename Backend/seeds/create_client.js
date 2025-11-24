import express from "express";
import pool from "../db/index.js";

const router = express.Router();

// Login inseguro a propósito: compara password en texto plano
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Faltan credenciales" });
  }

  try {
    const q =
      "SELECT id, nombre_completo, email, rol, password FROM usuarios WHERE email = $1";
    const { rows } = await pool.query(q, [email]);

    if (!rows[0]) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const user = rows[0];

    // 🔴 Versión INSEGURA a propósito: comparamos texto plano
    if (password !== user.password) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const safeUser = {
      id: user.id,
      nombre_completo: user.nombre_completo,
      email: user.email,
      rol: user.rol,
      role: user.rol, // por conveniencia para el frontend
    };

    return res.json({ ok: true, user: safeUser });
  } catch (err) {
    console.error("Error en /api/auth/login:", err);
    return res.status(500).json({ error: "Error interno" });
  }
});

export default router;
