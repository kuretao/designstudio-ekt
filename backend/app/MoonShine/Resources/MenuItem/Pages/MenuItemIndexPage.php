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
        $mainLinks = MenuItem::query()
            ->where('menu_area', MenuItem::AREA_MAIN)
            ->whereNull('parent_id')
            ->count();
        $serviceGroups = MenuItem::query()
            ->where('menu_area', MenuItem::AREA_SERVICES)
            ->whereNull('parent_id')
            ->count();
        $serviceChildren = MenuItem::query()
            ->where('menu_area', MenuItem::AREA_SERVICES)
            ->whereNotNull('parent_id')
            ->count();

        return <<<HTML
        <section class="menu-overview">
            <div class="menu-overview__intro">
                <div class="menu-overview__eyebrow">Меню сайта</div>
                <h1>Пункты навигации</h1>
                <p>Здесь редактируются обычные ссылки сайта и вложенная структура услуг. Для верхнего раздела услуг оставьте родителя пустым, для подпункта выберите нужный раздел.</p>
            </div>
            <div class="menu-overview__stats">
                {$this->statCard('bars-3', $total, 'Всего пунктов')}
                {$this->statCard('check-circle', $active, 'Показываются')}
                {$this->statCard('globe-alt', $mainLinks, 'Главное меню')}
                {$this->statCard('squares-2x2', $serviceGroups, 'Разделы услуг')}
            </div>
            <div class="menu-overview__steps">
                {$this->guideCard('document-plus', '1. Добавить', 'Создайте пункт и выберите, где он будет показываться.')}
                {$this->guideCard('squares-2x2', '2. Собрать услуги', 'Группы услуг оставляйте без родителя, подпункты привязывайте к группе.')}
                {$this->guideCard('arrows-up-down', '3. Расставить', 'Порядок меняется числом внутри своего уровня меню. Подпунктов сейчас: ' . $serviceChildren)}
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
