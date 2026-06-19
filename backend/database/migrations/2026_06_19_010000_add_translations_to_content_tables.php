<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Добавляет двуязычные (_ru / _en) поля ко всем контентным таблицам,
 * чтобы переключатель RU/EN на сайте переводил не только меню и UI-тексты,
 * но и контент страниц, проектов, услуг, новостей, отзывов, наград и партнёров.
 *
 * Существующие значения копируются в *_ru (основной язык), *_en остаются
 * пустыми до заполнения переводов в админ-панели или сидером.
 */
return new class extends Migration
{
    /**
     * Карта: таблица => [[базовое поле, тип], ...].
     * Тип 'string'|'text'|'longText'.
     */
    private function schemaMap(): array
    {
        return [
            'projects' => [
                ['title', 'string'],
                ['category', 'string'],
                ['location', 'string'],
                ['description', 'text'],
            ],
            'services' => [
                ['title', 'string'],
                ['eyebrow', 'string'],
                ['text', 'longText'],
                ['price', 'string'],
                ['timeline', 'string'],
                ['deliverables', 'longText'],
                ['benefits', 'longText'],
                ['process', 'longText'],
            ],
            'news_articles' => [
                ['title', 'string'],
                ['category', 'string'],
                ['preview', 'text'],
                ['body', 'longText'],
                ['date', 'string'],
                ['reading_time', 'string'],
            ],
            'reviews' => [
                ['name', 'string'],
                ['date', 'string'],
                ['service', 'string'],
                ['title', 'string'],
                ['text', 'longText'],
                ['admin_reply', 'longText'],
            ],
            'awards' => [
                ['title', 'string'],
                ['issuer', 'string'],
                ['description', 'longText'],
            ],
            'partners' => [
                ['name', 'string'],
                ['note', 'string'],
            ],
            'promos' => [
                ['badge', 'string'],
                ['title', 'string'],
                ['highlight', 'string'],
                ['valid_until', 'string'],
                ['description', 'longText'],
                ['conditions', 'longText'],
            ],
            'pages' => [
                ['title', 'string'],
                ['body', 'longText'],
                ['seo_title', 'string'],
                ['seo_description', 'text'],
            ],
            'page_blocks' => [
                ['eyebrow', 'string'],
                ['title', 'string'],
                ['subtitle', 'text'],
                ['text', 'longText'],
                ['link_label', 'string'],
            ],
        ];
    }

    public function up(): void
    {
        foreach ($this->schemaMap() as $table => $fields) {
            Schema::table($table, function (Blueprint $blueprint) use ($fields): void {
                foreach ($fields as [$name, $type]) {
                    $ruColumn = $name . '_ru';
                    $enColumn = $name . '_en';

                    if (! Schema::hasColumn($blueprint->getTable(), $ruColumn)) {
                        $this->columnOfType($blueprint, $type, $ruColumn)
                            ->nullable()
                            ->after(Schema::hasColumn($blueprint->getTable(), $name) ? $name : 'id');
                    }

                    if (! Schema::hasColumn($blueprint->getTable(), $enColumn)) {
                        $this->columnOfType($blueprint, $type, $enColumn)
                            ->nullable()
                            ->after($ruColumn);
                    }
                }
            });

            // Backfill: существующее значение переносим в _ru (основной язык).
            $baseColumns = DB::getSchemaBuilder()->getColumnListing($table);
            $rows = DB::table($table)->get();

            foreach ($rows as $row) {
                $update = [];
                foreach ($fields as [$name,]) {
                    $ruColumn = $name . '_ru';

                    if (in_array($name, $baseColumns, true) && filled($row->{$name} ?? null) && blank($row->{$ruColumn} ?? null)) {
                        $update[$ruColumn] = $row->{$name};
                    }
                }

                if ($update !== []) {
                    $update['updated_at'] = now();
                    DB::table($table)->where('id', $row->id)->update($update);
                }
            }
        }
    }

    public function down(): void
    {
        foreach ($this->schemaMap() as $table => $fields) {
            Schema::table($table, function (Blueprint $blueprint) use ($fields): void {
                $drop = [];
                foreach ($fields as [$name,]) {
                    $drop[] = $name . '_ru';
                    $drop[] = $name . '_en';
                }
                $blueprint->dropColumn($drop);
            });
        }
    }

    private function columnOfType(Blueprint $blueprint, string $type, string $column)
    {
        return match ($type) {
            'string' => $blueprint->string($column),
            'text' => $blueprint->text($column),
            'longText' => $blueprint->longText($column),
            default => $blueprint->string($column),
        };
    }
};
