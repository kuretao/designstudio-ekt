<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('site_settings', function (Blueprint $table): void {
            $table->string('site_logo')->nullable()->after('site_name');
            $table->string('site_logo_small')->nullable()->after('site_logo');
            $table->string('favicon')->nullable()->after('site_logo_small');
            $table->string('apple_touch_icon')->nullable()->after('favicon');
            $table->string('social_preview_image')->nullable()->after('apple_touch_icon');
        });
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table): void {
            $table->dropColumn([
                'site_logo',
                'site_logo_small',
                'favicon',
                'apple_touch_icon',
                'social_preview_image',
            ]);
        });
    }
};
