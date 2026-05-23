<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('site_settings', function (Blueprint $table): void {
            $table->string('vk_url')->nullable()->after('max_url');
            $table->boolean('animations_enabled')->default(true)->after('social_preview_image');
            $table->boolean('smooth_scroll_enabled')->default(true)->after('animations_enabled');
            $table->boolean('page_reveal_enabled')->default(true)->after('smooth_scroll_enabled');
        });
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table): void {
            $table->dropColumn([
                'vk_url',
                'animations_enabled',
                'smooth_scroll_enabled',
                'page_reveal_enabled',
            ]);
        });
    }
};
