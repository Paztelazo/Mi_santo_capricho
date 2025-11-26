import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import pool from "./db/index.js";

dotenv.config();

const app = express();

async function ensurePedidosTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pedidos (
        id SERIAL PRIMARY KEY,
        cliente TEXT NOT NULL DEFAULT 'Cliente Anónimo',
        items JSONB NOT NULL DEFAULT '[]',
        total NUMERIC(10,2) NOT NULL DEFAULT 0,
        creado TIMESTAMP DEFAULT now()
      );
    `);
  } catch (err) {
    console.error("No se pudo asegurar la tabla pedidos:", err);
  }
}

// seguridad básica
app.use(helmet());

// permitir que el frontend pueda leer la API
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://192.168.211.130:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// parsear JSON en body
app.use(express.json());

// healthcheck
app.get("/", (req, res) => {
  res.send("FUNCIONO 🍰");
});

// auth (login)
app.use("/api/auth", authRouter);

// asegurar tabla de pedidos al iniciar
ensurePedidosTable();

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

// datos de prueba para visibilidad en el frontend y pruebas WSTG
app.get("/api/dev/empleados", (req, res) => {
  const empleados = [
    { id: 1, nombre: "Ana Gómez", rol: "admin", email: "ana@example.com" },
    { id: 2, nombre: "Luis Pérez", rol: "user", email: "luis@example.com" },
    { id: 3, nombre: "Carla Ruiz", rol: "user", email: "carla@example.com" },
  ];

  res.json({ empleados, total: empleados.length });
});

// crear pedido
app.post("/api/pedidos", async (req, res) => {
  const { cliente, items, total } = req.body || {};

  if (!Array.isArray(items)) {
    return res.status(400).json({ error: "Formato de items inválido" });
  }

  try {
    const clienteFinal = (cliente || "Cliente Anónimo").toString();
    const totalNumerico = Number(total) || 0;

    const result = await pool.query(
      "INSERT INTO pedidos (cliente, items, total) VALUES ($1, $2, $3) RETURNING id",
      [clienteFinal, JSON.stringify(items), totalNumerico]
    );
    res.status(201).json({ pedidoId: result.rows[0].id });
  } catch (err) {
    console.error("Error en /api/pedidos:", err);
    res.status(500).json({ error: "No se pudo crear el pedido" });
  }
});

// listar pedidos (vista de administración)
app.get("/api/pedidos", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, cliente, items, total FROM pedidos ORDER BY id DESC"
    );

    const pedidos = rows.map(pedido => {
      let items = pedido.items;
      try {
        items = typeof items === "string" ? JSON.parse(items) : items;
      } catch (err) {
        console.warn("No se pudo parsear items de pedido", pedido.id, err);
      }

      return { ...pedido, items: Array.isArray(items) ? items : [] };
    });

    res.json(pedidos);
  } catch (err) {
    console.error("Error en GET /api/pedidos:", err);
    res.status(500).json({ error: "No se pudo obtener los pedidos" });
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
