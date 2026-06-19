<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\UiText\Pages;

use App\MoonShine\Resources\UiText\UiTextResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\IndexPage;

/**
 * @extends IndexPage<UiTextResource>
 */
class UiTextIndexPage extends IndexPage
{
    protected bool $isLazy = true;

    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return CmsFieldSets::for('ui_text', 'index');
    }
}
