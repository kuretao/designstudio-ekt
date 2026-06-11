<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('faqs', function (Blueprint $table): void {
            $table->string('question_ru')->nullable()->after('question');
            $table->string('question_en')->nullable()->after('question_ru');
            $table->longText('answer_ru')->nullable()->after('answer');
            $table->longText('answer_en')->nullable()->after('answer_ru');
        });

        $translations = $this->translations();

        DB::table('faqs')
            ->orderBy('id')
            ->get(['id', 'question', 'answer'])
            ->each(static function (object $faq) use ($translations): void {
                $translation = $translations[$faq->question] ?? [];

                DB::table('faqs')
                    ->where('id', $faq->id)
                    ->update([
                        'question_ru' => $faq->question,
                        'question_en' => $translation['question_en'] ?? null,
                        'answer_ru' => $faq->answer,
                        'answer_en' => $translation['answer_en'] ?? null,
                        'updated_at' => now(),
                    ]);
            });
    }

    public function down(): void
    {
        Schema::table('faqs', function (Blueprint $table): void {
            $table->dropColumn([
                'question_ru',
                'question_en',
                'answer_ru',
                'answer_en',
            ]);
        });
    }

    private function translations(): array
    {
        return [
            'Сколько длится разработка проекта?' => [
                'question_en' => 'How long does project development take?',
                'answer_en' => 'A concept design takes 2-4 weeks; a full design project usually takes 8-14 weeks. Timing depends on the area, scope of work, and approval speed.',
            ],
            'Можно заказать только визуализацию?' => [
                'question_en' => 'Can I order visualization only?',
                'answer_en' => 'Yes. For an accurate result, we need plans, drawings, references, materials, and a list of required views.',
            ],
            'Работаете удаленно?' => [
                'question_en' => 'Do you work remotely?',
                'answer_en' => 'Yes. We handle projects in Samara and remotely using video briefs, cloud boards, 3D presentations, and detailed working drawings.',
            ],
        ];
    }
};
