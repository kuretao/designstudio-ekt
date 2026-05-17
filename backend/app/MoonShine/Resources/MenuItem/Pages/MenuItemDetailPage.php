<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\MenuItem\Pages;

use App\MoonShine\Resources\MenuItem\MenuItemResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\DetailPage;

/**
 * @extends DetailPage<MenuItemResource>
 */
class MenuItemDetailPage extends DetailPage
{
    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return CmsFieldSets::for('menu_item');
    }
}
