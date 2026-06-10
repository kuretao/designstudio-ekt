<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Partner\Pages;

use App\MoonShine\Resources\Partner\PartnerResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\DetailPage;

/**
 * @extends DetailPage<PartnerResource>
 */
class PartnerDetailPage extends DetailPage
{
    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return CmsFieldSets::for('partner');
    }
}
