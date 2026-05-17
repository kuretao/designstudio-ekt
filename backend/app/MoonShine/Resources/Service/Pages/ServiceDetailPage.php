<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Service\Pages;

use App\MoonShine\Resources\Service\ServiceResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\DetailPage;

/**
 * @extends DetailPage<ServiceResource>
 */
class ServiceDetailPage extends DetailPage
{
    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return CmsFieldSets::for('service');
    }
}
