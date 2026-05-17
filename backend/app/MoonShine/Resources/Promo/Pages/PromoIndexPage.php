<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Promo\Pages;

use App\MoonShine\Resources\Promo\PromoResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\IndexPage;

/**
 * @extends IndexPage<PromoResource>
 */
class PromoIndexPage extends IndexPage
{
    protected bool $isLazy = true;

    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return CmsFieldSets::for('promo', 'index');
    }
}
