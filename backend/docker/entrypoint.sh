#!/usr/bin/env sh
set -e

php artisan storage:link >/dev/null 2>&1 || true
php artisan migrate --force

# Seed only on a fresh database (no menu items = first run)
COUNT=$(php artisan tinker --no-interaction --execute="echo \App\Models\MenuItem::count();" 2>/dev/null | tail -1)
if [ "$COUNT" = "0" ]; then
    php artisan db:seed --force
fi

exec "$@"
