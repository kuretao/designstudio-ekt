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
        Schema::table('projects', function (Blueprint $table) {
            $table->text('image_file')->nullable()->after('image');
            $table->text('before_image_file')->nullable()->after('before_image');
            $table->text('after_image_file')->nullable()->after('after_image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['image_file', 'before_image_file', 'after_image_file']);
        });
    }
};
