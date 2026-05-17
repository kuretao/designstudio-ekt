<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Faq\Pages;

use App\MoonShine\Resources\Faq\FaqResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\IndexPage;

/**
 * @extends IndexPage<FaqResource>
 */
class FaqIndexPage extends IndexPage
{
    protected bool $isLazy = true;

    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return CmsFieldSets::for('faq', 'index');
    }
}
