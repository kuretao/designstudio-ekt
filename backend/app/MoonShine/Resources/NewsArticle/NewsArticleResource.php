<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\NewsArticle;

use Illuminate\Database\Eloquent\Model;
use App\Models\NewsArticle;
use App\MoonShine\Resources\NewsArticle\Pages\NewsArticleIndexPage;
use App\MoonShine\Resources\NewsArticle\Pages\NewsArticleFormPage;
use App\MoonShine\Resources\NewsArticle\Pages\NewsArticleDetailPage;

use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Contracts\Core\PageContract;

/**
 * @extends ModelResource<NewsArticle, NewsArticleIndexPage, NewsArticleFormPage, NewsArticleDetailPage>
 */
class NewsArticleResource extends ModelResource
{
    protected string $model = NewsArticle::class;

    protected string $title = 'News';
    
    /**
     * @return list<class-string<PageContract>>
     */
    protected function pages(): array
    {
        return [
            NewsArticleIndexPage::class,
            NewsArticleFormPage::class,
            NewsArticleDetailPage::class,
        ];
    }
}
