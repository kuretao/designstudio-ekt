<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Vacancy\Pages;

use App\MoonShine\Resources\Vacancy\VacancyResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\IndexPage;

/**
 * @extends IndexPage<VacancyResource>
 */
class VacancyIndexPage extends IndexPage
{
    protected bool $isLazy = true;

    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return CmsFieldSets::for('vacancy', 'index');
    }
}
