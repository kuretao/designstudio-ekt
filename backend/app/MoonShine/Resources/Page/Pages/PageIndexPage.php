<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Page\Pages;

use App\MoonShine\Resources\Page\PageResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\IndexPage;

/**
 * @extends IndexPage<PageResource>
 */
class PageIndexPage extends IndexPage
{
    protected bool $isLazy = true;

    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return CmsFieldSets::for('page', 'index');
    }
}
