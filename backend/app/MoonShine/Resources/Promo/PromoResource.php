<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Promo;

use Illuminate\Database\Eloquent\Model;
use App\Models\Promo;
use App\MoonShine\Resources\Promo\Pages\PromoIndexPage;
use App\MoonShine\Resources\Promo\Pages\PromoFormPage;
use App\MoonShine\Resources\Promo\Pages\PromoDetailPage;

use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Contracts\Core\PageContract;

/**
 * @extends ModelResource<Promo, PromoIndexPage, PromoFormPage, PromoDetailPage>
 */
class PromoResource extends ModelResource
{
    protected string $model = Promo::class;

    protected string $title = 'Акции';
    
    /**
     * @return list<class-string<PageContract>>
     */
    protected function pages(): array
    {
        return [
            PromoIndexPage::class,
            PromoFormPage::class,
            PromoDetailPage::class,
        ];
    }
}
