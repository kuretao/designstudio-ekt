<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Faq\Pages;

use App\MoonShine\Resources\Faq\FaqResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\Contracts\Core\TypeCasts\DataWrapperContract;
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\FormPage;
use MoonShine\UI\Components\Layout\Box;

/**
 * @extends FormPage<FaqResource>
 */
class FaqFormPage extends FormPage
{
    /**
     * @return list<ComponentContract|FieldContract>
     */
    protected function fields(): iterable
    {
        return [Box::make(CmsFieldSets::for('faq'))];
    }

    protected function rules(DataWrapperContract $item): array
    {
        return [];
    }
}
