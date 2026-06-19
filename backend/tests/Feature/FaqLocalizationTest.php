<?php

namespace Tests\Feature;

use App\Models\Faq;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FaqLocalizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_faq_payload_contains_ru_and_en_versions(): void
    {
        Faq::query()->create([
            'question_ru' => 'Работаете удаленно?',
            'question_en' => 'Do you work remotely?',
            'answer_ru' => 'Да, ведем проекты удаленно.',
            'answer_en' => 'Yes, we handle projects remotely.',
            'position' => 1,
            'is_published' => true,
        ]);

        $this->getJson('/api/v1/faqs')
            ->assertOk()
            ->assertJsonPath('0.q', 'Работаете удаленно?')
            ->assertJsonPath('0.qRu', 'Работаете удаленно?')
            ->assertJsonPath('0.qEn', 'Do you work remotely?')
            ->assertJsonPath('0.a', 'Да, ведем проекты удаленно.')
            ->assertJsonPath('0.aRu', 'Да, ведем проекты удаленно.')
            ->assertJsonPath('0.aEn', 'Yes, we handle projects remotely.');
    }
}
