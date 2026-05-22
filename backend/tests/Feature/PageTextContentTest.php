<?php

namespace Tests\Feature;

use App\Models\Page;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PageTextContentTest extends TestCase
{
    use RefreshDatabase;

    public function test_text_page_payload_contains_editor_body(): void
    {
        Page::query()->create([
            'slug' => 'dostavka-i-oplata',
            'title' => 'Доставка и оплата',
            'template' => 'text',
            'body' => '<h2>Доставка</h2><p>Текст из редактора.</p>',
            'is_published' => true,
        ]);

        $this->getJson('/api/v1/pages/dostavka-i-oplata')
            ->assertOk()
            ->assertJsonPath('template', 'text')
            ->assertJsonPath('body', '<h2>Доставка</h2><p>Текст из редактора.</p>');
    }
}
