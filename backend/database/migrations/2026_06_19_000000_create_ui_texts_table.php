<?php

use App\Support\DefaultUiTexts;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ui_texts', function (Blueprint $table): void {
            $table->id();
            $table->string('key')->unique();
            $table->string('group')->nullable()->index();
            $table->string('label');
            $table->text('value_ru')->nullable();
            $table->text('value_en')->nullable();
            $table->text('description')->nullable();
            $table->unsignedInteger('position')->default(0)->index();
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();
        });

        $now = now();

        foreach (DefaultUiTexts::rows() as $index => $row) {
            DB::table('ui_texts')->insert([
                ...$row,
                'position' => $index + 1,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('ui_texts');
    }
};
