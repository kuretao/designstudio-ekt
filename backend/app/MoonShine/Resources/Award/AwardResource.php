<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Award;

use Illuminate\Database\Eloquent\Model;
use App\Models\Award;
use App\MoonShine\Resources\Award\Pages\AwardIndexPage;
use App\MoonShine\Resources\Award\Pages\AwardFormPage;
use App\MoonShine\Resources\Award\Pages\AwardDetailPage;

use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Contracts\Core\PageContract;

/**
 * @extends ModelResource<Award, AwardIndexPage, AwardFormPage, AwardDetailPage>
 */
class AwardResource extends ModelResource
{
    protected string $model = Award::class;

    protected string $title = 'Награды и дипломы';

    /**
     * @return list<class-string<PageContract>>
     */
    protected function pages(): array
    {
        return [
            AwardIndexPage::class,
            AwardFormPage::class,
            AwardDetailPage::class,
        ];
    }
}
