<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Lead\Pages;

use App\Models\Lead;
use App\MoonShine\Resources\Lead\LeadResource;
use MoonShine\AssetManager\InlineCss;
use MoonShine\Contracts\AssetManager\AssetElementContract;
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\IndexPage;
use MoonShine\UI\Components\FlexibleRender;
use MoonShine\UI\Fields\Date;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Preview;
use MoonShine\UI\Fields\Text;

/**
 * @extends IndexPage<LeadResource>
 */
class LeadIndexPage extends IndexPage
{
    /**
     * @return list<AssetElementContract>
     */
    protected function assets(): array
    {
        return [
            ...parent::assets(),
            InlineCss::make((string) file_get_contents(resource_path('css/lead-admin.css'))),
        ];
    }

    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return [
            ID::make('#', 'id')->sortable(),

            Text::make('Имя', 'name'),

            Text::make('Контакт', 'contact'),

            Preview::make('Статус', 'status', function (mixed $item): string {
                $value = is_object($item) ? ($item->status ?? '') : (string) $item;
                $labels = [
                    'new'         => 'Новая',
                    'in_progress' => 'В работе',
                    'processed'   => 'Обработана',
                    'closed'      => 'Закрыта',
                ];
                $label = $labels[$value] ?? ($value ?: 'Не задан');
                $cls   = 'lead-badge lead-badge-' . ($value ?: 'new');
                return "<span class=\"{$cls}\">{$label}</span>";
            }),

            Text::make('Услуга', 'service'),

            Text::make('Источник', 'source'),

            Date::make('Создана', 'created_at')
                ->format('d.m.Y')
                ->sortable(),
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
        $total      = Lead::count();
        $new        = Lead::where('status', 'new')->count();
        $inProgress = Lead::where('status', 'in_progress')->count();
        $processed  = Lead::where('status', 'processed')->count();
        $closed     = Lead::where('status', 'closed')->count();
        $today      = Lead::whereDate('created_at', today())->count();

        $thisMonth = Lead::whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)
            ->count();

        $conversionRate = $total > 0
            ? (int) round((($processed + $closed) / $total) * 100)
            : 0;

        $latest     = Lead::latest('created_at')->first(['created_at']);
        $latestDate = $latest?->created_at?->format('d.m.Y H:i') ?? 'Нет';

        $createUrl = $this->getResource()->getFormPageUrl();

        return <<<HTML
        <div class="ld-overview">
            <section class="ld-overview__hero">
                <div class="ld-overview__hero-grid">
                    <div>
                        <p class="ld-overview__eyebrow">CRM — Управление заявками</p>
                        <h1 class="ld-overview__title">Входящие заявки</h1>
                        <p class="ld-overview__lead">
                            Все обращения клиентов в одном месте: новые, в работе,
                            обработанные и закрытые. Следите за конверсией и
                            не упускайте ни одного лида.
                        </p>
                        <div class="ld-overview__chips">
                            <span class="ld-overview__chip">Всего: {$total}</span>
                            <span class="ld-overview__chip">Новых: {$new}</span>
                            <span class="ld-overview__chip">В работе: {$inProgress}</span>
                            <span class="ld-overview__chip">Сегодня: {$today}</span>
                        </div>
                        <a class="ld-overview__action-btn" href="{$createUrl}">+ Добавить заявку</a>
                    </div>

                    <div class="ld-overview__spotlight">
                        <article class="ld-overview__spotlight-card">
                            <p class="ld-overview__spotlight-label">Всего заявок</p>
                            <p class="ld-overview__spotlight-value">{$total}</p>
                            <p class="ld-overview__spotlight-meta">В базе данных</p>
                        </article>
                        <article class="ld-overview__spotlight-card">
                            <p class="ld-overview__spotlight-label">Новые</p>
                            <p class="ld-overview__spotlight-value">{$new}</p>
                            <p class="ld-overview__spotlight-meta">Ожидают обработки</p>
                        </article>
                        <article class="ld-overview__spotlight-card">
                            <p class="ld-overview__spotlight-label">В работе</p>
                            <p class="ld-overview__spotlight-value">{$inProgress}</p>
                            <p class="ld-overview__spotlight-meta">Активно ведутся</p>
                        </article>
                        <article class="ld-overview__spotlight-card">
                            <p class="ld-overview__spotlight-label">Сегодня</p>
                            <p class="ld-overview__spotlight-value">{$today}</p>
                            <p class="ld-overview__spotlight-meta">Поступило за день</p>
                        </article>
                    </div>
                </div>
            </section>

            <section class="ld-stats">
                <article class="ld-stat">
                    <p class="ld-stat-label">За этот месяц</p>
                    <p class="ld-stat-value">+{$thisMonth}</p>
                    <p class="ld-stat-meta">Новых заявок поступило</p>
                </article>
                <article class="ld-stat">
                    <p class="ld-stat-label">Обработаны</p>
                    <p class="ld-stat-value">{$processed}</p>
                    <p class="ld-stat-meta">Успешно завершены</p>
                </article>
                <article class="ld-stat">
                    <p class="ld-stat-label">Закрыты</p>
                    <p class="ld-stat-value">{$closed}</p>
                    <p class="ld-stat-meta">Без результата</p>
                </article>
                <article class="ld-stat">
                    <p class="ld-stat-label">Конверсия</p>
                    <p class="ld-stat-value">{$conversionRate}%</p>
                    <p class="ld-stat-meta">Обработано от всех заявок</p>
                </article>
            </section>
        </div>
        HTML;
    }
}
