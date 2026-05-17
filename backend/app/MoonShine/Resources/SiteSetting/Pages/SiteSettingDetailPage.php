<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\SiteSetting\Pages;

use App\MoonShine\Resources\SiteSetting\SiteSettingResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\DetailPage;

/**
 * @extends DetailPage<SiteSettingResource>
 */
class SiteSettingDetailPage extends DetailPage
{
    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return CmsFieldSets::for('site_setting');
    }
}
