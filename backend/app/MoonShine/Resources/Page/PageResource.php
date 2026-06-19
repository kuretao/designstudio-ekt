<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Page;

use App\Models\MenuItem;
use App\Models\Page;
use App\MoonShine\Resources\Page\Pages\PageIndexPage;
use App\MoonShine\Resources\Page\Pages\PageFormPage;
use App\MoonShine\Resources\Page\Pages\PageDetailPage;

use MoonShine\Contracts\Core\PageContract;
use MoonShine\Contracts\Core\TypeCasts\DataWrapperContract;
use MoonShine\Laravel\Resources\ModelResource;

/**
 * @extends ModelResource<Page, PageIndexPage, PageFormPage, PageDetailPage>
 */
class PageResource extends ModelResource
{
    protected string $model = Page::class;

    protected string $title = 'Страницы';
    
    /**
     * @return list<class-string<PageContract>>
     */
    protected function pages(): array
    {
        return [
            PageIndexPage::class,
            PageFormPage::class,
            PageDetailPage::class,
        ];
    }

    protected function afterCreated(DataWrapperContract $item): DataWrapperContract
    {
        $this->syncMenuItem($item->getOriginal());

        return parent::afterCreated($item);
    }

    protected function afterUpdated(DataWrapperContract $item): DataWrapperContract
    {
        $this->syncMenuItem($item->getOriginal());

        return parent::afterUpdated($item);
    }

    private function syncMenuItem(Page $page): void
    {
        if (! request()->boolean('create_menu_item')) {
            return;
        }

        $label = trim((string) request()->input('menu_label'));

        $menuItem = MenuItem::query()->firstOrNew(['page_id' => $page->id]);
        $menuItem->label_ru = $label !== '' ? $label : $page->title;
        $menuItem->label = $menuItem->label_ru;
        $menuItem->href = '/' . ltrim($page->slug, '/');
        $menuItem->is_active = $page->is_published;

        if (! $menuItem->exists) {
            $menuItem->position = MenuItem::query()->max('position') + 1;
        }

        $menuItem->save();
    }
}
