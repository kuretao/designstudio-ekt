<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $now = now();
        $pageId = DB::table('pages')->where('slug', 'home')->value('id');

        if (! $pageId) {
            $pageId = DB::table('pages')->insertGetId([
                'slug' => 'home',
                'title' => 'Главная',
                'template' => 'content',
                'is_published' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        $hasHero = DB::table('page_blocks')
            ->where('page_id', $pageId)
            ->where('type', 'hero')
            ->exists();

        if ($hasHero) {
            return;
        }

        DB::table('page_blocks')->insert([
            'page_id' => $pageId,
            'type' => 'hero',
            'eyebrow' => 'Студия дизайна интерьера и архитектуры в Самаре',
            'title' => 'Дизайн с умом.',
            'subtitle' => 'Создаем интерьеры, архитектуру, 3D-визуализацию и ландшафтные проекты: от концепции до рабочей документации, комплектации и сопровождения.',
            'link_label' => 'Обсудить проект',
            'link_href' => '/kontakty',
            'position' => 1,
            'is_active' => true,
            'created_at' => $now,
            'updated_at' => $now,
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $pageId = DB::table('pages')->where('slug', 'home')->value('id');

        if (! $pageId) {
            return;
        }

        DB::table('page_blocks')
            ->where('page_id', $pageId)
            ->where('type', 'hero')
            ->where('position', 1)
            ->where('title', 'Дизайн с умом.')
            ->delete();

        $hasBlocks = DB::table('page_blocks')->where('page_id', $pageId)->exists();

        if (! $hasBlocks) {
            DB::table('pages')
                ->where('id', $pageId)
                ->where('title', 'Главная')
                ->delete();
        }
    }
};
