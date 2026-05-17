<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\NewsArticle\Pages;

use App\MoonShine\Resources\NewsArticle\NewsArticleResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\DetailPage;

/**
 * @extends DetailPage<NewsArticleResource>
 */
class NewsArticleDetailPage extends DetailPage
{
    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return CmsFieldSets::for('news_article');
    }
}
