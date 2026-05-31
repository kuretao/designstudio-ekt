<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('menu_items', function (Blueprint $table): void {
            $table->string('menu_area', 32)->default('main')->after('id')->index();
            $table->foreignId('parent_id')
                ->nullable()
                ->after('menu_area')
                ->constrained('menu_items')
                ->nullOnDelete();
            $table->text('description')->nullable()->after('href');

            $table->index(['menu_area', 'parent_id', 'position']);
        });

        $this->seedDefaultServiceNavigation();
    }

    public function down(): void
    {
        DB::table('menu_items')
            ->where('menu_area', 'services')
            ->whereNotNull('parent_id')
            ->delete();

        DB::table('menu_items')
            ->where('menu_area', 'services')
            ->whereNull('parent_id')
            ->delete();

        Schema::table('menu_items', function (Blueprint $table): void {
            $table->dropIndex(['menu_area', 'parent_id', 'position']);
            $table->dropIndex(['menu_area']);
            $table->dropConstrainedForeignId('parent_id');
            $table->dropColumn(['menu_area', 'description']);
        });
    }

    private function seedDefaultServiceNavigation(): void
    {
        if (DB::table('menu_items')->where('menu_area', 'services')->exists()) {
            return;
        }

        $now = now();

        collect([
            [
                'label' => 'Архитектурное проектирование',
                'href' => '/arhitekturnoe-proektirovanie',
                'description' => 'Концепция, фасады, объемы здания и рабочая документация для строителей.',
                'items' => [
                    ['label' => 'Эскизный проект', 'href' => '/eskiznyj-proekt'],
                    ['label' => 'Рабочая документация', 'href' => '/rabochaya-dokumentaciya'],
                ],
            ],
            [
                'label' => 'Дизайн интерьера',
                'href' => '/dizajn-interyera',
                'description' => 'Жилые и коммерческие интерьеры, комплектация и авторский надзор.',
                'items' => [
                    ['label' => 'Дизайн интерьера частных пространств', 'href' => '/dizajn-interyera-chastnyh-prostranstv'],
                    ['label' => 'Дизайн интерьера коммерческого пространства', 'href' => '/dizajn-interera-kommercheskogo-prostranstva'],
                    ['label' => 'Комплектация объекта', 'href' => '/komplektaciya-ob-ekta'],
                    ['label' => 'Авторский надзор', 'href' => '/avtorskij-nadzor'],
                ],
            ],
            [
                'label' => '3D-визуализация',
                'href' => '/3d-vizualizaciya',
                'description' => 'Рендеры, архитектурная и интерьерная визуализация, интерактивные 360°-туры.',
                'items' => [
                    ['label' => 'Архитектурная 3D-визуализация ЖК и девелопмента', 'href' => '/arhitekturnaya-3d-vizualizaciya'],
                    ['label' => 'Архитектурная 3D-визуализация коттеджей', 'href' => '/arhitekturnaya-3d-vizualizaciya-kottedzhej'],
                    ['label' => 'Интерьерная 3D-визуализация', 'href' => '/interernaya-3d-vizualizaciya'],
                    ['label' => 'Виртуальные 3D-туры 360°', 'href' => '/virtualnyj-3d-tur-360'],
                ],
            ],
            [
                'label' => 'Ландшафтный дизайн',
                'href' => '/landshaftnyj-dizajn',
                'description' => 'Генплан, инженерные решения, озеленение и авторский надзор реализации.',
                'items' => [
                    ['label' => 'Ландшафтное проектирование и генплан', 'href' => '/landshaftnoe-proektirovanie-i-genplan'],
                    ['label' => 'Проектирование инженерных систем', 'href' => '/proektirovanie-inzhenernyh-sistem'],
                    ['label' => 'Озеленение и дендроплан', 'href' => '/ozelenenie-i-dendroplan'],
                    ['label' => 'Авторский надзор и реализация', 'href' => '/avtorskij-nadzor-i-realizaciya'],
                ],
            ],
        ])->each(static function (array $group, int $index) use ($now): void {
            $groupId = DB::table('menu_items')->insertGetId([
                'menu_area' => 'services',
                'parent_id' => null,
                'label' => $group['label'],
                'href' => $group['href'],
                'description' => $group['description'],
                'position' => ($index + 1) * 10,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            collect($group['items'])->each(static function (array $item, int $childIndex) use ($groupId, $now): void {
                DB::table('menu_items')->insert([
                    'menu_area' => 'services',
                    'parent_id' => $groupId,
                    'label' => $item['label'],
                    'href' => $item['href'],
                    'description' => null,
                    'position' => $childIndex + 1,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            });
        });
    }
};
