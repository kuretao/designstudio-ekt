<?php

declare(strict_types=1);

namespace App\MoonShine\Layouts;

use MoonShine\Laravel\Layouts\AppLayout;
use MoonShine\ColorManager\Palettes\PurplePalette;
use MoonShine\ColorManager\ColorManager;
use MoonShine\Contracts\ColorManager\ColorManagerContract;
use MoonShine\Contracts\ColorManager\PaletteContract;
use App\MoonShine\Resources\SiteSetting\SiteSettingResource;
use MoonShine\MenuManager\MenuItem;
use App\MoonShine\Resources\MenuItem\MenuItemResource;
use App\MoonShine\Resources\Page\PageResource;
use App\MoonShine\Resources\PageBlock\PageBlockResource;
use App\MoonShine\Resources\Project\ProjectResource;
use App\MoonShine\Resources\Service\ServiceResource;
use App\MoonShine\Resources\NewsArticle\NewsArticleResource;
use App\MoonShine\Resources\Promo\PromoResource;
use App\MoonShine\Resources\Review\ReviewResource;
use App\MoonShine\Resources\Faq\FaqResource;
use App\MoonShine\Resources\Vacancy\VacancyResource;
use App\MoonShine\Resources\Lead\LeadResource;

final class MoonShineLayout extends AppLayout
{
    /**
     * @var null|class-string<PaletteContract>
     */
    protected ?string $palette = PurplePalette::class;

    protected function assets(): array
    {
        return [
            ...parent::assets(),
        ];
    }

    protected function menu(): array
    {
        return [
            ...parent::menu(),
            MenuItem::make(SiteSettingResource::class, 'Settings'),
            MenuItem::make(MenuItemResource::class, 'Menu'),
            MenuItem::make(PageResource::class, 'Pages'),
            MenuItem::make(PageBlockResource::class, 'Page blocks'),
            MenuItem::make(ProjectResource::class, 'Projects'),
            MenuItem::make(ServiceResource::class, 'Services'),
            MenuItem::make(NewsArticleResource::class, 'News'),
            MenuItem::make(PromoResource::class, 'Promos'),
            MenuItem::make(ReviewResource::class, 'Reviews'),
            MenuItem::make(FaqResource::class, 'FAQ'),
            MenuItem::make(VacancyResource::class, 'Vacancies'),
            MenuItem::make(LeadResource::class, 'Leads'),
        ];
    }

    /**
     * @param ColorManager $colorManager
     */
    protected function colors(ColorManagerContract $colorManager): void
    {
        parent::colors($colorManager);

        // $colorManager->primary('#00000');
    }
}
