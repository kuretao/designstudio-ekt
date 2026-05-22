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
            $table->foreignId('page_id')
                ->nullable()
                ->after('href')
                ->constrained()
                ->nullOnDelete();
        });

        DB::table('pages')
            ->select(['id', 'slug'])
            ->orderBy('id')
            ->get()
            ->each(static function (object $page): void {
                DB::table('menu_items')
                    ->where('href', '/' . ltrim((string) $page->slug, '/'))
                    ->update(['page_id' => $page->id]);
            });
    }

    public function down(): void
    {
        Schema::table('menu_items', function (Blueprint $table): void {
            $table->dropConstrainedForeignId('page_id');
        });
    }
};
