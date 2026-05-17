<?php

declare(strict_types=1);

namespace App\MoonShine\Layouts;

use MoonShine\Laravel\Layouts\AppLayout;
use MoonShine\ColorManager\Palettes\PurplePalette;
use MoonShine\UI\Components\Layout\Footer;
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
            MenuItem::make(SiteSettingResource::class, 'Настройки')->icon('cog-6-tooth'),
            MenuItem::make(MenuItemResource::class, 'Меню сайта')->icon('bars-3'),
            MenuItem::make(PageResource::class, 'Страницы')->icon('document-text'),
            MenuItem::make(PageBlockResource::class, 'Блоки страниц')->icon('squares-2x2'),
            MenuItem::make(ProjectResource::class, 'Проекты')->icon('photo'),
            MenuItem::make(ServiceResource::class, 'Услуги')->icon('wrench-screwdriver'),
            MenuItem::make(NewsArticleResource::class, 'Новости')->icon('newspaper'),
            MenuItem::make(PromoResource::class, 'Акции')->icon('tag'),
            MenuItem::make(ReviewResource::class, 'Отзывы')->icon('star'),
            MenuItem::make(FaqResource::class, 'FAQ')->icon('question-mark-circle'),
            MenuItem::make(VacancyResource::class, 'Вакансии')->icon('briefcase'),
            MenuItem::make(LeadResource::class, 'Заявки')->icon('inbox'),
        ];
    }

    protected function getFooterCopyright(): string
    {
        return '&copy; 2026 Сделано с ❤️ для <a href="#" class="font-semibold text-primary">3dsmartdesign.ru</a>';
    }

    protected function getFooterMenu(): array
    {
        return [];
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
