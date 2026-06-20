<?php

use App\Support\DefaultUiTexts;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Заполняет строки полной страницы "О нас" (/o-nas), группа about-full.
 *
 * Используется insertOrIgnore по уникальному ключу `key`, чтобы:
 *  - не затирать пользовательские правки существующих строк,
 *  - добавлять только недостающие ключи группы about-full при повторных запусках.
 */
return new class extends Migration
{
    public function up(): void
    {
        $existingMaxPosition = (int) DB::table('ui_texts')->max('position');
        $now = now();

        $position = $existingMaxPosition;

        foreach (DefaultUiTexts::rows() as $row) {
            if (($row['group'] ?? null) !== 'about-full') {
                continue;
            }

            $position++;

            DB::table('ui_texts')->insertOrIgnore([
                'key' => $row['key'],
                'group' => $row['group'],
                'label' => $row['label'],
                'value_ru' => $row['value_ru'] ?? null,
                'value_en' => $row['value_en'] ?? null,
                'description' => $row['description'] ?? null,
                'position' => $position,
                'is_active' => $row['is_active'] ?? true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }

    public function down(): void
    {
        DB::table('ui_texts')
            ->where('group', 'about-full')
            ->delete();
    }
};
