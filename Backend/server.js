import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import pkg from "pg";
import authRouter from "./routes/auth.js";
import pool from "./db/index.js";

dotenv.config();

const app = express();

// seguridad básica
app.use(helmet());

// permitir que el frontend pueda leer la API
app.use(cors());

// parsear JSON en body
app.use(express.json());

// healthcheck
app.get("/", (req, res) => {
  res.send("FUNCIONO 🍰");
});

// auth (login)
app.use("/api/auth", authRouter);

// listar productos
app.get("/api/productos", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM productos ORDER BY id");
    res.json(rows);
  } catch (err) {
    console.error("Error en /api/productos:", err);
    res.status(500).json({ error: "Error interno obteniendo productos" });
  }
});

// crear pedido
app.post("/api/pedidos", async (req, res) => {
  const { cliente, items, total } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO pedidos (cliente, items, total) VALUES ($1, $2, $3) RETURNING id",
      [cliente, JSON.stringify(items), total]
    );
    res.status(201).json({ pedidoId: result.rows[0].id });
  } catch (err) {
    console.error("Error en /api/pedidos:", err);
    res.status(500).json({ error: "No se pudo crear el pedido" });
  }
});

// 🔍 endpoint de diagnóstico para que veamos si la DB conecta
app.get("/api/debug/dbcheck", async (req, res) => {
  try {
    const now = await pool.query("SELECT NOW()");
    res.json({
      ok: true,
      now: now.rows[0].now
    });
  } catch (err) {
    console.error("Fallo DB:", err);
    res.status(500).json({ ok: false, error: "No se pudo hablar con la base" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`MiSantoCapricho backend escuchando en puerto ${PORT}`);
});
