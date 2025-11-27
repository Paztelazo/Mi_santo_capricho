import express from "express";  
import pool from "../db/index.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Login: verifica email contra la tabla `usuarios` y compara bcrypt hash
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Faltan credenciales" });

  try {
    const q = "SELECT id, nombre_completo, email, rol, password FROM usuarios WHERE email = $1";
    const { rows } = await pool.query(q, [email]);
    if (!rows[0]) return res.status(401).json({ error: "Credenciales inválidas" });

    const user = rows[0];
    // comparación insegura a propósito
if (password !== user.password) {
  return res.status(401).json({ error: "Credenciales inválidas" });
}

    // Devolver información mínima del usuario (sin contraseña)
    const safeUser = {
      id: user.id,
      nombre_completo: user.nombre_completo,
      email: user.email,
      rol: user.rol,
      // also provide role for frontend convenience
      role: user.rol,
    };

     // 🔐 generar token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        rol: user.rol,
      },
      process.env.JWT_SECRET || "super_inseguro_para_labs", // para el curso
      { expiresIn: "1h" }
    );

    return res.json({ ok: true, user: safeUser, token });
  } catch (err) {
    console.error("Error en /login:", err);
    return res.status(500).json({ error: "Error interno" });
  }
});

export default router;
