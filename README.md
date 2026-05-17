# DesignStudio EKT

Dockerized Next frontend + Laravel MoonShine CMS.

## Run

```bash
docker compose up --build -d
```

Public site:

- `http://localhost:8080`
- `http://localhost:8088` if `127.0.0.1:8080` is already occupied on the host

Admin panel:

- `http://localhost:8080/admin`
- `http://localhost:8088/admin`

Default local admin credentials:

- email: `admin@example.com`
- password: `password`

Change them through `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in `docker-compose.yml` or environment overrides before first boot.

## Structure

- `frontend/` - existing Next/React design. It fetches CMS data from `/api/v1/all` and falls back to `src/data.ts`.
- `backend/` - Laravel 13 + MoonShine 4 CMS and public API.
- `infra/nginx/` - reverse proxy. `/admin`, `/api`, `/storage`, and MoonShine assets go to Laravel; everything else goes to Next.

## Checks

```bash
cd frontend && npm run build
cd backend && php artisan migrate:fresh --seed && php artisan test
```
