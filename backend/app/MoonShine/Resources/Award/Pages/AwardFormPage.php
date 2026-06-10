<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Award\Pages;

use App\MoonShine\Resources\Award\AwardResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\Contracts\Core\TypeCasts\DataWrapperContract;
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\FormPage;
use MoonShine\UI\Components\Layout\Box;

/**
 * @extends FormPage<AwardResource>
 */
class AwardFormPage extends FormPage
{
    /**
     * @return list<ComponentContract|FieldContract>
     */
    protected function fields(): iterable
    {
        return [Box::make(CmsFieldSets::for('award'))];
    }

    protected function rules(DataWrapperContract $item): array
    {
        return [];
    }
}
