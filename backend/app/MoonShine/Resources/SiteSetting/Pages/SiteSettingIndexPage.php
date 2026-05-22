<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\SiteSetting\Pages;

use App\MoonShine\Resources\SiteSetting\SiteSettingResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\IndexPage;
use Symfony\Component\HttpFoundation\Response;

/**
 * @extends IndexPage<SiteSettingResource>
 */
class SiteSettingIndexPage extends IndexPage
{
    protected bool $isLazy = true;

    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return CmsFieldSets::for('site_setting', 'index');
    }

    protected function modifyResponse(): ?Response
    {
        return redirect()->to($this->getResource()->getUrl());
    }
}
