<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\PageBlock\Pages;

use App\Models\PageBlock;
use App\MoonShine\Resources\PageBlock\PageBlockResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\AssetManager\InlineCss;
use MoonShine\Contracts\AssetManager\AssetElementContract;
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\IndexPage;
use MoonShine\UI\Components\FlexibleRender;
use MoonShine\UI\Components\Icon;

/**
 * @extends IndexPage<PageBlockResource>
 */
class PageBlockIndexPage extends IndexPage
{
    protected bool $isLazy = true;

    /**
     * @return list<AssetElementContract>
     */
    protected function assets(): array
    {
        return [
            ...parent::assets(),
            InlineCss::make((string) file_get_contents(resource_path('css/page-block-admin.css'))),
        ];
    }

    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return CmsFieldSets::for('page_block', 'index');
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
        $total = PageBlock::query()->count();
        $active = PageBlock::query()->where('is_active', true)->count();
        $pages = PageBlock::query()->distinct()->count('page_id');
        $heroBlocks = PageBlock::query()->where('type', 'hero')->count();

        return <<<HTML
        <section class="page-block-overview">
            <div class="page-block-overview__intro">
                <div class="page-block-overview__eyebrow">Блоки страниц</div>
                <h1>Тексты на сложных экранах</h1>
                <p>Здесь меняются крупные блоки сайта: первый экран главной, шапки специальных страниц, подписи, описания и кнопки. Сначала найдите нужную страницу, затем откройте ее блок и замените только видимый текст.</p>
            </div>
            <div class="page-block-overview__stats">
                {$this->statCard('squares-2x2', $total, 'Всего блоков')}
                {$this->statCard('check-circle', $active, 'Показываются')}
                {$this->statCard('document-text', $pages, 'Страниц с блоками')}
                {$this->statCard('pencil-square', $heroBlocks, 'Первые экраны')}
            </div>
            <div class="page-block-overview__steps">
                {$this->guideCard('document-text', '1. Выбрать страницу', 'Для текста из первого экрана сайта откройте блок страницы "Главная".')}
                {$this->guideCard('pencil-square', '2. Заменить текст', 'Подпись, заголовок, описание и кнопка подписаны так же, как выглядят на сайте.')}
                {$this->guideCard('check-circle', '3. Сохранить', 'Блок обновится на сайте, если переключатель "Показывать" включен.')}
            </div>
        </section>
        HTML;
    }

    private function statCard(string $icon, int $value, string $label): string
    {
        $iconHtml = (string) Icon::make($icon, 6)->render();

        return sprintf(
            '<div class="page-block-stat"><span class="page-block-stat__icon">%s</span><strong>%d</strong><span>%s</span></div>',
            $iconHtml,
            $value,
            e($label),
        );
    }

    private function guideCard(string $icon, string $title, string $text): string
    {
        $iconHtml = (string) Icon::make($icon, 6)->render();

        return sprintf(
            '<div class="page-block-guide"><span class="page-block-guide__icon">%s</span><strong>%s</strong><span>%s</span></div>',
            $iconHtml,
            e($title),
            e($text),
        );
    }
}
