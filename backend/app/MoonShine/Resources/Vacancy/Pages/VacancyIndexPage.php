<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Vacancy\Pages;

use App\Models\Vacancy;
use App\MoonShine\Resources\Vacancy\VacancyResource;
use MoonShine\AssetManager\InlineCss;
use MoonShine\Contracts\AssetManager\AssetElementContract;
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\IndexPage;
use MoonShine\UI\Components\FlexibleRender;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Number;
use MoonShine\UI\Fields\Preview;

/**
 * @extends IndexPage<VacancyResource>
 */
class VacancyIndexPage extends IndexPage
{
    protected bool $isLazy = true;

    /**
     * @return list<AssetElementContract>
     */
    protected function assets(): array
    {
        return [
            ...parent::assets(),
            InlineCss::make((string) file_get_contents(resource_path('css/vacancy-admin.css'))),
        ];
    }

    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return [
            ID::make('#', 'id')->sortable(),

            Preview::make('Вакансия', 'title', function (mixed $item): string {
                if (! is_object($item)) {
                    return '<div class="vac-title"><div class="vac-title__name">' . e((string) $item) . '</div></div>';
                }

                $name = e($item->title ?? '');

                $tags = '';
                if (! empty($item->employment)) {
                    $tags .= '<span class="vac-title__tag vac-title__tag--employment">' . e($item->employment) . '</span>';
                }
                if (! empty($item->location)) {
                    $tags .= '<span class="vac-title__tag vac-title__tag--location">📍 ' . e($item->location) . '</span>';
                }

                $metaHtml = $tags
                    ? '<div class="vac-title__meta">' . $tags . '</div>'
                    : '';

                return '<div class="vac-title"><div class="vac-title__name">' . $name . '</div>' . $metaHtml . '</div>';
            }),

            Preview::make('Зарплата', 'salary', function (mixed $item): string {
                $salary = is_object($item)
                    ? (string) ($item->salary ?? '')
                    : (string) $item;

                return ! empty(trim($salary))
                    ? '<span class="vac-salary">' . e($salary) . '</span>'
                    : '<span class="vac-salary--empty">Не указана</span>';
            }),

            Preview::make('Статус', 'is_active', function (mixed $item): string {
                $active = is_object($item)
                    ? (bool) ($item->is_active ?? false)
                    : (bool) $item;

                return $active
                    ? '<span class="vac-badge vac-badge--active">Активна</span>'
                    : '<span class="vac-badge vac-badge--inactive">Закрыта</span>';
            }),

            Number::make('Поз.', 'position')->sortable(),
        ];
    }

    /**
     * @return list<ComponentContract>
     */
    protected function topLayer(): array
    {
        return [
            FlexibleRender::make($this->buildOverviewHtml()),
            ...parent::topLayer(),
        ];
    }

    private function buildOverviewHtml(): string
    {
        $total    = Vacancy::count();
        $active   = Vacancy::where('is_active', true)->count();
        $inactive = max($total - $active, 0);

        $thisMonth = Vacancy::whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)
            ->count();

        $activeShare = $total > 0 ? (int) round(($active / $total) * 100) : 0;

        $latest     = Vacancy::latest('created_at')->first(['created_at']);
        $latestDate = $latest?->created_at?->format('d.m.Y') ?? 'Нет';

        $createUrl = $this->getResource()->getFormPageUrl();

        return <<<HTML
        <div class="vac-overview">
            <section class="vac-overview__hero">
                <div class="vac-overview__hero-grid">
                    <div>
                        <p class="vac-overview__eyebrow">Карьера и найм</p>
                        <h1 class="vac-overview__title">Открытые вакансии</h1>
                        <p class="vac-overview__lead">
                            Управляйте списком вакансий: публикуйте открытые позиции,
                            закрывайте заполненные, указывайте условия и требования.
                            Ниже — стандартный список с фильтрами и сортировкой.
                        </p>
                        <div class="vac-overview__chips">
                            <span class="vac-overview__chip">Всего: {$total}</span>
                            <span class="vac-overview__chip">Активных: {$active}</span>
                            <span class="vac-overview__chip">Закрытых: {$inactive}</span>
                            <span class="vac-overview__chip">Последняя: {$latestDate}</span>
                        </div>
                        <a class="vac-overview__action-btn" href="{$createUrl}">+ Добавить вакансию</a>
                    </div>

                    <div class="vac-overview__spotlight">
                        <article class="vac-overview__spotlight-card">
                            <p class="vac-overview__spotlight-label">Всего вакансий</p>
                            <p class="vac-overview__spotlight-value">{$total}</p>
                            <p class="vac-overview__spotlight-meta">В базе данных</p>
                        </article>
                        <article class="vac-overview__spotlight-card">
                            <p class="vac-overview__spotlight-label">Активных</p>
                            <p class="vac-overview__spotlight-value">{$active}</p>
                            <p class="vac-overview__spotlight-meta">Открыты для отклика</p>
                        </article>
                        <article class="vac-overview__spotlight-card">
                            <p class="vac-overview__spotlight-label">Закрытых</p>
                            <p class="vac-overview__spotlight-value">{$inactive}</p>
                            <p class="vac-overview__spotlight-meta">Позиции закрыты</p>
                        </article>
                        <article class="vac-overview__spotlight-card">
                            <p class="vac-overview__spotlight-label">Доля активных</p>
                            <p class="vac-overview__spotlight-value">{$activeShare}%</p>
                            <p class="vac-overview__spotlight-meta">От всех вакансий</p>
                        </article>
                    </div>
                </div>
            </section>

            <section class="vac-stats">
                <article class="vac-stat">
                    <p class="vac-stat-label">За этот месяц</p>
                    <p class="vac-stat-value">+{$thisMonth}</p>
                    <p class="vac-stat-meta">Новых вакансий добавлено</p>
                </article>
                <article class="vac-stat">
                    <p class="vac-stat-label">Активных</p>
                    <p class="vac-stat-value">{$active}</p>
                    <p class="vac-stat-meta">Открыты для кандидатов</p>
                </article>
                <article class="vac-stat">
                    <p class="vac-stat-label">Закрытых</p>
                    <p class="vac-stat-value">{$inactive}</p>
                    <p class="vac-stat-meta">Позиции недоступны</p>
                </article>
                <article class="vac-stat">
                    <p class="vac-stat-label">Последняя добавлена</p>
                    <p class="vac-stat-value">{$latestDate}</p>
                    <p class="vac-stat-meta">Дата публикации</p>
                </article>
            </section>
        </div>
        HTML;
    }
}
