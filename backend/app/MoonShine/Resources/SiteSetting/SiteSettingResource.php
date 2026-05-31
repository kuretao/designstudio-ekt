<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\SiteSetting;

use Illuminate\Database\Eloquent\Model;
use App\Models\SiteSetting;
use App\MoonShine\Resources\SiteSetting\Pages\SiteSettingIndexPage;
use App\MoonShine\Resources\SiteSetting\Pages\SiteSettingFormPage;
use App\MoonShine\Resources\SiteSetting\Pages\SiteSettingDetailPage;
use App\MoonShine\Resources\SiteSetting\Pages\SocialLinksFormPage;

use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Contracts\Core\PageContract;

/**
 * @extends ModelResource<SiteSetting, SiteSettingIndexPage, SiteSettingFormPage, SiteSettingDetailPage>
 */
class SiteSettingResource extends ModelResource
{
    protected string $model = SiteSetting::class;

    protected string $title = 'Настройки';

    public function getUrl(): string
    {
        return $this->getFormPageUrl($this->singleton()->getKey());
    }

    public function singleton(): SiteSetting
    {
        return SiteSetting::query()->firstOrCreate([], [
            'site_name' => '3D Smart Design Studio',
        ]);
    }
    
    /**
     * @return list<class-string<PageContract>>
     */
    protected function pages(): array
    {
        return [
            SiteSettingIndexPage::class,
            SiteSettingFormPage::class,
            SocialLinksFormPage::class,
            SiteSettingDetailPage::class,
        ];
    }
}
