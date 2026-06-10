<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Partner;

use Illuminate\Database\Eloquent\Model;
use App\Models\Partner;
use App\MoonShine\Resources\Partner\Pages\PartnerIndexPage;
use App\MoonShine\Resources\Partner\Pages\PartnerFormPage;
use App\MoonShine\Resources\Partner\Pages\PartnerDetailPage;

use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Contracts\Core\PageContract;

/**
 * @extends ModelResource<Partner, PartnerIndexPage, PartnerFormPage, PartnerDetailPage>
 */
class PartnerResource extends ModelResource
{
    protected string $model = Partner::class;

    protected string $title = 'Партнеры и застройщики';

    /**
     * @return list<class-string<PageContract>>
     */
    protected function pages(): array
    {
        return [
            PartnerIndexPage::class,
            PartnerFormPage::class,
            PartnerDetailPage::class,
        ];
    }
}
