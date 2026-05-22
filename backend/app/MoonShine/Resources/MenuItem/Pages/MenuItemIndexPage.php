<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\MenuItem\Pages;

use App\Models\MenuItem;
use App\MoonShine\Resources\MenuItem\MenuItemResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\AssetManager\InlineCss;
use MoonShine\Contracts\AssetManager\AssetElementContract;
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\IndexPage;
use MoonShine\UI\Components\FlexibleRender;
use MoonShine\UI\Components\Icon;

/**
 * @extends IndexPage<MenuItemResource>
 */
class MenuItemIndexPage extends IndexPage
{
    protected bool $isLazy = true;

    /**
     * @return list<AssetElementContract>
     */
    protected function assets(): array
    {
        return [
            ...parent::assets(),
            InlineCss::make((string) file_get_contents(resource_path('css/menu-admin.css'))),
        ];
    }

    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return CmsFieldSets::for('menu_item', 'index');
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
        $total = MenuItem::query()->count();
        $active = MenuItem::query()->where('is_active', true)->count();
        $pageLinks = MenuItem::query()->whereNotNull('page_id')->count();
        $customLinks = MenuItem::query()->whereNull('page_id')->count();

        return <<<HTML
        <section class="menu-overview">
            <div class="menu-overview__intro">
                <div class="menu-overview__eyebrow">Меню сайта</div>
                <h1>Пункты навигации</h1>
                <p>Для обычной страницы достаточно создать пункт и выбрать ее из списка. Адрес страницы подставится сам, поэтому slug и ссылку вручную трогать не нужно.</p>
            </div>
            <div class="menu-overview__stats">
                {$this->statCard('bars-3', $total, 'Всего пунктов')}
                {$this->statCard('check-circle', $active, 'Показываются')}
                {$this->statCard('document-text', $pageLinks, 'Привязаны к страницам')}
                {$this->statCard('link', $customLinks, 'Свои ссылки')}
            </div>
            <div class="menu-overview__steps">
                {$this->guideCard('document-plus', '1. Добавить', 'Создайте пункт меню и дайте ему понятное название.')}
                {$this->guideCard('document-text', '2. Выбрать страницу', 'Выберите страницу, которую посетитель должен открыть.')}
                {$this->guideCard('arrows-up-down', '3. Расставить', 'Порядок меняется числом: 1 идет раньше 2 и 3.')}
            </div>
        </section>
        HTML;
    }

    private function statCard(string $icon, int $value, string $label): string
    {
        $iconHtml = (string) Icon::make($icon, 6)->render();

        return sprintf(
            '<div class="menu-stat"><span class="menu-stat__icon">%s</span><strong>%d</strong><span>%s</span></div>',
            $iconHtml,
            $value,
            e($label),
        );
    }

    private function guideCard(string $icon, string $title, string $text): string
    {
        $iconHtml = (string) Icon::make($icon, 6)->render();

        return sprintf(
            '<div class="menu-guide"><span class="menu-guide__icon">%s</span><strong>%s</strong><span>%s</span></div>',
            $iconHtml,
            e($title),
            e($text),
        );
    }
}
