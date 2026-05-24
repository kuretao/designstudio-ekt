<?php

namespace Tests\Feature;

use App\Models\Page;
use App\Models\PageBlock;
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

    public function test_page_block_payload_contains_button_fields(): void
    {
        $page = Page::query()->create([
            'slug' => 'pervyj-ekran',
            'title' => 'Первый экран',
            'template' => 'content',
            'is_published' => true,
        ]);

        PageBlock::query()->create([
            'page_id' => $page->id,
            'type' => 'hero',
            'image' => "page-blocks/hero-1.webp\nhttps://example.com/hero-2.webp",
            'title' => 'Заголовок блока',
            'subtitle' => 'Описание блока',
            'link_label' => 'Открыть',
            'link_href' => '/kontakty',
            'position' => 1,
            'is_active' => true,
        ]);

        $this->getJson('/api/v1/pages/pervyj-ekran')
            ->assertOk()
            ->assertJsonPath('blocks.0.image', '/storage/page-blocks/hero-1.webp')
            ->assertJsonPath('blocks.0.images.1', 'https://example.com/hero-2.webp')
            ->assertJsonPath('blocks.0.title', 'Заголовок блока')
            ->assertJsonPath('blocks.0.subtitle', 'Описание блока')
            ->assertJsonPath('blocks.0.linkLabel', 'Открыть')
            ->assertJsonPath('blocks.0.linkHref', '/kontakty');
    }
}
