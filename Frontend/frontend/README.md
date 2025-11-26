# Frontend (Vite + React)

## Ejecución rápida
- Desarrollo: `npm install` y `npm run dev` (puerto 5173).
- Build estático: `npm run build` y `npm run preview`.
- La API se consume directamente en `http://localhost:4000`, así que el backend debe estar activo en ese puerto.

## Uso con ZAP / proxies
Vite usa WebSockets para HMR y eso puede chocar con proxies tipo ZAP. Para desactivarlo:

```bash
# Desactiva HMR para evitar errores de WebSocket con el proxy
DISABLE_HMR=true npm run dev
```

Otra opción es trabajar sobre la build estática (sin HMR ni WebSockets):

```bash
npm run build
npm run preview -- --host --port 5173
```

Con ambas opciones puedes apuntar el navegador al proxy (ej. 127.0.0.1:8080) sin los `NetworkError` comunes de HMR.
