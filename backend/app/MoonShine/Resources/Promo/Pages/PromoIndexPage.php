<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Promo\Pages;

use App\Models\Promo;
use App\MoonShine\Resources\Promo\PromoResource;
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
 * @extends IndexPage<PromoResource>
 */
class PromoIndexPage extends IndexPage
{
    protected bool $isLazy = true;

    /**
     * @return list<AssetElementContract>
     */
    protected function assets(): array
    {
        return [
            ...parent::assets(),
            InlineCss::make((string) file_get_contents(resource_path('css/promo-admin.css'))),
        ];
    }

    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return [
            ID::make('#', 'id')->sortable(),

            Preview::make('Акция', 'title', function (mixed $item): string {
                if (! is_object($item)) {
                    return '<div class="promo-card"><div class="promo-card__title">'.e((string) $item).'</div></div>';
                }

                $rawTitle = $item->fieldRu('title') ?? '';
                $title = e($rawTitle);
                $slug = e($item->slug ?? '');
                $badgeValue = $item->fieldRu('badge');
                $badge = $badgeValue ? e($badgeValue) : null;
                $initial = mb_strtoupper(mb_substr($rawTitle !== '' ? $rawTitle : 'P', 0, 1));

                $thumbSrc = $item->effective_image ?? null;
                $thumb = ! empty($thumbSrc)
                    ? sprintf(
                        '<div class="promo-card__thumb"><img src="%s" alt="" loading="lazy"></div>',
                        e($thumbSrc)
                    )
                    : sprintf('<div class="promo-card__thumb">%s</div>', $initial);

                $badgeHtml = $badge
                    ? sprintf('<div class="promo-card__badge">%s</div>', $badge)
                    : '';

                return sprintf(
                    '<div class="promo-card">%s<div>%s<div class="promo-card__title">%s</div><div class="promo-card__slug">/%s</div></div></div>',
                    $thumb,
                    $badgeHtml,
                    $title,
                    $slug,
                );
            }),

            Preview::make('Описание', 'description', function (mixed $item): string {
                $text = is_object($item) ? ($item->fieldRu('description') ?? '') : (string) $item;

                return ! empty($text)
                    ? '<div class="promo-description">'.e($text).'</div>'
                    : '<span style="color:#cbd5e1;font-size:12px;">—</span>';
            }),

            Preview::make('Акцент / Срок', 'valid_until', function (mixed $item): string {
                if (! is_object($item)) {
                    return '<span style="color:#cbd5e1;font-size:12px;">—</span>';
                }

                $parts = '';

                $validUntil = $item->fieldRu('valid_until');
                $highlight = $item->fieldRu('highlight');

                if (! empty($validUntil)) {
                    $parts .= sprintf(
                        '<div class="promo-meta__date">⏳ До: %s</div>',
                        e($validUntil)
                    );
                }

                if (! empty($highlight)) {
                    $parts .= sprintf(
                        '<span class="promo-meta__highlight">✨ %s</span>',
                        e($highlight)
                    );
                }

                return $parts
                    ? '<div class="promo-meta">'.$parts.'</div>'
                    : '<span style="color:#cbd5e1;font-size:12px;">—</span>';
            }),

            Preview::make('Статус', 'is_active', function (mixed $item): string {
                $active = is_object($item) ? (bool) ($item->is_active ?? false) : (bool) $item;

                return $active
                    ? '<span class="promo-badge promo-badge--active">Активна</span>'
                    : '<span class="promo-badge promo-badge--inactive">Отключена</span>';
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
        $total = Promo::count();
        $active = Promo::where('is_active', true)->count();
        $inactive = max($total - $active, 0);
        $withBadge = Promo::where(function ($query): void {
            $query->whereNotNull('badge_ru')
                ->where('badge_ru', '!=', '')
                ->orWhere(function ($fallback): void {
                    $fallback->whereNotNull('badge')
                        ->where('badge', '!=', '');
                });
        })->count();
        $withImage = Promo::where(function ($q) {
            $q->whereNotNull('image_file')->where('image_file', '!=', '')
                ->orWhere(function ($q2) {
                    $q2->whereNotNull('image')->where('image', '!=', '');
                });
        })->count();

        $thisMonth = Promo::whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)
            ->count();

        $withDeadline = Promo::where(function ($query): void {
            $query->whereNotNull('valid_until_ru')
                ->where('valid_until_ru', '!=', '')
                ->orWhere(function ($fallback): void {
                    $fallback->whereNotNull('valid_until')
                        ->where('valid_until', '!=', '');
                });
        })->count();

        $latest = Promo::latest('created_at')->first(['created_at']);
        $latestDate = $latest?->created_at?->format('d.m.Y') ?? 'Нет';

        $createUrl = $this->getResource()->getFormPageUrl();

        return <<<HTML
        <div class="promo-overview">
            <section class="promo-overview__hero">
                <div class="promo-overview__hero-grid">
                    <div>
                        <p class="promo-overview__eyebrow">Маркетинг и спецпредложения</p>
                        <h1 class="promo-overview__title">Акции и промо</h1>
                        <p class="promo-overview__lead">
                            Управляйте акциями и спецпредложениями студии: добавляйте бейджи,
                            указывайте сроки действия, акцентные фразы и контролируйте
                            видимость каждого промо. Ниже — список с фильтрами.
                        </p>
                        <div class="promo-overview__chips">
                            <span class="promo-overview__chip">Всего: {$total}</span>
                            <span class="promo-overview__chip">Активных: {$active}</span>
                            <span class="promo-overview__chip">С бейджем: {$withBadge}</span>
                            <span class="promo-overview__chip">С изображением: {$withImage}</span>
                        </div>
                        <a class="promo-overview__action-btn" href="{$createUrl}">+ Добавить акцию</a>
                    </div>

                    <div class="promo-overview__spotlight">
                        <article class="promo-overview__spotlight-card">
                            <p class="promo-overview__spotlight-label">Всего акций</p>
                            <p class="promo-overview__spotlight-value">{$total}</p>
                            <p class="promo-overview__spotlight-meta">В базе</p>
                        </article>
                        <article class="promo-overview__spotlight-card">
                            <p class="promo-overview__spotlight-label">Активных</p>
                            <p class="promo-overview__spotlight-value">{$active}</p>
                            <p class="promo-overview__spotlight-meta">Видны на сайте</p>
                        </article>
                        <article class="promo-overview__spotlight-card">
                            <p class="promo-overview__spotlight-label">С бейджем</p>
                            <p class="promo-overview__spotlight-value">{$withBadge}</p>
                            <p class="promo-overview__spotlight-meta">Есть метка</p>
                        </article>
                        <article class="promo-overview__spotlight-card">
                            <p class="promo-overview__spotlight-label">С изображением</p>
                            <p class="promo-overview__spotlight-value">{$withImage}</p>
                            <p class="promo-overview__spotlight-meta">Есть обложка</p>
                        </article>
                    </div>
                </div>
            </section>

            <section class="promo-stats">
                <article class="promo-stat">
                    <p class="promo-stat-label">За этот месяц</p>
                    <p class="promo-stat-value">+{$thisMonth}</p>
                    <p class="promo-stat-meta">Новых акций добавлено</p>
                </article>
                <article class="promo-stat">
                    <p class="promo-stat-label">Отключено</p>
                    <p class="promo-stat-value">{$inactive}</p>
                    <p class="promo-stat-meta">Скрыты от посетителей</p>
                </article>
                <article class="promo-stat">
                    <p class="promo-stat-label">Со сроком</p>
                    <p class="promo-stat-value">{$withDeadline}</p>
                    <p class="promo-stat-meta">Указан дедлайн</p>
                </article>
                <article class="promo-stat">
                    <p class="promo-stat-label">Последняя добавлена</p>
                    <p class="promo-stat-value">{$latestDate}</p>
                    <p class="promo-stat-meta">Дата добавления</p>
                </article>
            </section>
        </div>
        HTML;
    }
}
