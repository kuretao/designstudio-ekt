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

    public function test_service_navigation_groups_are_nested_separately_from_main_menu(): void
    {
        MenuItem::query()
            ->where('menu_area', MenuItem::AREA_SERVICES)
            ->whereNotNull('parent_id')
            ->delete();
        MenuItem::query()
            ->where('menu_area', MenuItem::AREA_SERVICES)
            ->whereNull('parent_id')
            ->delete();

        $groupPage = Page::query()->create([
            'slug' => 'dizajn-interyera',
            'title' => 'Дизайн интерьера',
            'is_published' => true,
        ]);

        $childPage = Page::query()->create([
            'slug' => 'komplektaciya-ob-ekta',
            'title' => 'Комплектация объекта',
            'is_published' => true,
        ]);

        $hiddenChildPage = Page::query()->create([
            'slug' => 'hidden-service',
            'title' => 'Скрытая услуга',
            'is_published' => false,
        ]);

        $group = MenuItem::query()->create([
            'menu_area' => MenuItem::AREA_SERVICES,
            'page_id' => $groupPage->id,
            'description' => 'Жилые и коммерческие интерьеры.',
            'position' => 1,
            'is_active' => true,
        ]);

        MenuItem::query()->create([
            'menu_area' => MenuItem::AREA_SERVICES,
            'parent_id' => $group->id,
            'page_id' => $childPage->id,
            'position' => 1,
            'is_active' => true,
        ]);

        MenuItem::query()->create([
            'menu_area' => MenuItem::AREA_SERVICES,
            'parent_id' => $group->id,
            'page_id' => $hiddenChildPage->id,
            'position' => 2,
            'is_active' => true,
        ]);

        $this->getJson('/api/v1/bootstrap')
            ->assertOk()
            ->assertJsonPath('menuItems', [])
            ->assertJsonPath('serviceNavigationGroups.0.title', 'Дизайн интерьера')
            ->assertJsonPath('serviceNavigationGroups.0.href', '/dizajn-interyera')
            ->assertJsonPath('serviceNavigationGroups.0.description', 'Жилые и коммерческие интерьеры.')
            ->assertJsonPath('serviceNavigationGroups.0.items.0.label', 'Комплектация объекта')
            ->assertJsonPath('serviceNavigationGroups.0.items.0.href', '/komplektaciya-ob-ekta')
            ->assertJsonCount(1, 'serviceNavigationGroups.0.items');
    }
}
