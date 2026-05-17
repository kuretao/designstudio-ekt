<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Faq;

use Illuminate\Database\Eloquent\Model;
use App\Models\Faq;
use App\MoonShine\Resources\Faq\Pages\FaqIndexPage;
use App\MoonShine\Resources\Faq\Pages\FaqFormPage;
use App\MoonShine\Resources\Faq\Pages\FaqDetailPage;

use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Contracts\Core\PageContract;

/**
 * @extends ModelResource<Faq, FaqIndexPage, FaqFormPage, FaqDetailPage>
 */
class FaqResource extends ModelResource
{
    protected string $model = Faq::class;

    protected string $title = 'FAQ';
    
    /**
     * @return list<class-string<PageContract>>
     */
    protected function pages(): array
    {
        return [
            FaqIndexPage::class,
            FaqFormPage::class,
            FaqDetailPage::class,
        ];
    }
}
