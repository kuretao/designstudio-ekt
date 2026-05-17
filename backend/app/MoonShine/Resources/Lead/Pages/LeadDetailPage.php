<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Lead\Pages;

use App\MoonShine\Resources\Lead\LeadResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\DetailPage;

/**
 * @extends DetailPage<LeadResource>
 */
class LeadDetailPage extends DetailPage
{
    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return CmsFieldSets::for('lead');
    }
}
