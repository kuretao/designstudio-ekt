<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Vacancy;

use Illuminate\Database\Eloquent\Model;
use App\Models\Vacancy;
use App\MoonShine\Resources\Vacancy\Pages\VacancyIndexPage;
use App\MoonShine\Resources\Vacancy\Pages\VacancyFormPage;
use App\MoonShine\Resources\Vacancy\Pages\VacancyDetailPage;

use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Contracts\Core\PageContract;

/**
 * @extends ModelResource<Vacancy, VacancyIndexPage, VacancyFormPage, VacancyDetailPage>
 */
class VacancyResource extends ModelResource
{
    protected string $model = Vacancy::class;

    protected string $title = 'Vacancies';
    
    /**
     * @return list<class-string<PageContract>>
     */
    protected function pages(): array
    {
        return [
            VacancyIndexPage::class,
            VacancyFormPage::class,
            VacancyDetailPage::class,
        ];
    }
}
