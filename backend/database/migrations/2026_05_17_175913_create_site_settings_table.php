<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_name')->default('3D Smart Design Studio');
            $table->string('phone')->nullable();
            $table->string('phone_href')->nullable();
            $table->text('emails')->nullable();
            $table->string('schedule')->nullable();
            $table->text('address')->nullable();
            $table->text('map_src')->nullable();
            $table->string('telegram_url')->nullable();
            $table->string('max_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('behance_url')->nullable();
            $table->string('pinterest_url')->nullable();
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
