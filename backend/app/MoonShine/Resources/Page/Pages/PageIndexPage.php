<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Page\Pages;

use App\Models\Page;
use App\MoonShine\Resources\Page\PageResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\AssetManager\InlineCss;
use MoonShine\Contracts\AssetManager\AssetElementContract;
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\IndexPage;
use MoonShine\UI\Components\FlexibleRender;
use MoonShine\UI\Components\Icon;

/**
 * @extends IndexPage<PageResource>
 */
class PageIndexPage extends IndexPage
{
    protected bool $isLazy = true;

    /**
     * @return list<AssetElementContract>
     */
    protected function assets(): array
    {
        return [
            ...parent::assets(),
            InlineCss::make((string) file_get_contents(resource_path('css/page-admin.css'))),
        ];
    }

    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return CmsFieldSets::for('page', 'index');
    }

    /**
     * @return list<ComponentContract>
     */
    protected function topLayer(): array
    {
        return [
            FlexibleRender::make($this->overviewHtml()),
            ...parent::topLayer(),
        ];
    }

    private function overviewHtml(): string
    {
        $total = Page::query()->count();
        $published = Page::query()->where('is_published', true)->count();
        $textPages = Page::query()->where('template', 'text')->count();
        $menuPages = Page::query()->has('menuItems')->count();

        return <<<HTML
        <section class="page-overview">
            <div class="page-overview__intro">
                <div class="page-overview__eyebrow">Страницы сайта</div>
                <h1>Страницы и тексты</h1>
                <p>Обычную страницу можно создать здесь: придумайте заголовок, заполните текст в редакторе и при необходимости сразу добавьте ее в меню.</p>
            </div>
            <div class="page-overview__stats">
                {$this->statCard('document-text', $total, 'Всего страниц')}
                {$this->statCard('check-circle', $published, 'Опубликованы')}
                {$this->statCard('pencil-square', $textPages, 'Текстовые')}
                {$this->statCard('bars-3', $menuPages, 'Есть в меню')}
            </div>
            <div class="page-overview__steps">
                {$this->guideCard('pencil-square', '1. Написать', 'Заголовок и текст редактируются прямо в форме страницы.')}
                {$this->guideCard('link', '2. Проверить адрес', 'Адрес создается из заголовка, его можно уточнить до сохранения.')}
                {$this->guideCard('bars-3', '3. Добавить в меню', 'Включите пункт меню, если посетитель должен легко найти страницу.')}
            </div>
        </section>
        HTML;
    }

    private function statCard(string $icon, int $value, string $label): string
    {
        $iconHtml = (string) Icon::make($icon, 6)->render();

        return sprintf(
            '<div class="page-stat"><span class="page-stat__icon">%s</span><strong>%d</strong><span>%s</span></div>',
            $iconHtml,
            $value,
            e($label),
        );
    }

    private function guideCard(string $icon, string $title, string $text): string
    {
        $iconHtml = (string) Icon::make($icon, 6)->render();

        return sprintf(
            '<div class="page-guide"><span class="page-guide__icon">%s</span><strong>%s</strong><span>%s</span></div>',
            $iconHtml,
            e($title),
            e($text),
        );
    }
}
