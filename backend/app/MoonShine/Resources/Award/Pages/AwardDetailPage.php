<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Award\Pages;

use App\MoonShine\Resources\Award\AwardResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\DetailPage;

/**
 * @extends DetailPage<AwardResource>
 */
class AwardDetailPage extends DetailPage
{
    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return CmsFieldSets::for('award');
    }
}
