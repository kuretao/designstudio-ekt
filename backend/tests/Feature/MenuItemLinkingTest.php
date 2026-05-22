<?php

namespace Tests\Feature;

use App\Models\MenuItem;
use App\Models\Page;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MenuItemLinkingTest extends TestCase
{
    use RefreshDatabase;

    public function test_page_backed_menu_item_uses_page_slug_without_manual_link(): void
    {
        $page = Page::query()->create([
            'slug' => 'o-nas',
            'title' => 'О нас',
            'is_published' => true,
        ]);

        $menuItem = MenuItem::query()->create([
            'page_id' => $page->id,
            'position' => 1,
            'is_active' => true,
        ]);

        $this->assertSame('О нас', $menuItem->fresh()->label);
        $this->assertSame('/o-nas', $menuItem->fresh()->href);

        $this->getJson('/api/v1/bootstrap')
            ->assertOk()
            ->assertJsonPath('menuItems.0.label', 'О нас')
            ->assertJsonPath('menuItems.0.href', '/o-nas');

        $page->update(['slug' => 'about-studio']);

        $this->getJson('/api/v1/bootstrap')
            ->assertOk()
            ->assertJsonPath('menuItems.0.href', '/about-studio');
    }

    public function test_page_backed_menu_item_is_hidden_when_page_is_not_published(): void
    {
        $page = Page::query()->create([
            'slug' => 'draft-page',
            'title' => 'Черновик',
            'is_published' => false,
        ]);

        MenuItem::query()->create([
            'page_id' => $page->id,
            'position' => 1,
            'is_active' => true,
        ]);

        $this->getJson('/api/v1/bootstrap')
            ->assertOk()
            ->assertJsonPath('menuItems', []);
    }
}
