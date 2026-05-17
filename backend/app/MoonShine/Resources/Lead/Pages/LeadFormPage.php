<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Lead\Pages;

use App\MoonShine\Resources\Lead\LeadResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\Contracts\Core\TypeCasts\DataWrapperContract;
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\FormPage;
use MoonShine\UI\Components\Layout\Box;

/**
 * @extends FormPage<LeadResource>
 */
class LeadFormPage extends FormPage
{
    /**
     * @return list<ComponentContract|FieldContract>
     */
    protected function fields(): iterable
    {
        return [Box::make(CmsFieldSets::for('lead'))];
    }

    protected function rules(DataWrapperContract $item): array
    {
        return [];
    }
}
