<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Review\Pages;

use App\MoonShine\Resources\Review\ReviewResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\IndexPage;

/**
 * @extends IndexPage<ReviewResource>
 */
class ReviewIndexPage extends IndexPage
{
    protected bool $isLazy = true;

    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return CmsFieldSets::for('review', 'index');
    }
}
