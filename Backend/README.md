# Backend (Express)

## Arranque rápido
```bash
npm install
npm run dev  # puerto 4000
```

- Seguridad básica: `helmet`, `cors`, parseo JSON.
- Variables: usa `.env` (opcional) para `PORT` y credenciales de base de datos.

## Endpoints actuales
- `GET /` healthcheck simple.
- `POST /api/auth/login` login contra la tabla `usuarios` (comparación directa para fines de prueba, idealmente usar bcrypt en prod).
- `GET /api/productos` lista completa desde la tabla `productos`.
- `GET /api/dev/empleados` datos semilla en memoria para que el frontend no falle y puedas probar controles de autorización.
- `POST /api/pedidos` crea pedido en tabla `pedidos` (almacena JSON de items).
- `GET /api/debug/dbcheck` prueba de conectividad a la base.

## Notas para pruebas WSTG
- `/api/dev/empleados` expone datos sin auth a propósito: sirve para validar enumaración de usuarios, control de acceso y pruebas de proxy.
- `/api/pedidos` acepta JSON arbitrario; puedes añadir validaciones de esquema o límites de tamaño si quieres fortalecerlo.
- `POST /api/auth/login` devuelve el hash en `password` para que tengas material de prueba; en un hardening posterior elimínalo y usa bcrypt.
