<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Review\Pages;

use App\Models\Review;
use App\MoonShine\Resources\Review\ReviewResource;
use MoonShine\AssetManager\InlineCss;
use MoonShine\Contracts\AssetManager\AssetElementContract;
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\IndexPage;
use MoonShine\UI\Components\FlexibleRender;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Number;
use MoonShine\UI\Fields\Preview;
use MoonShine\UI\Fields\Text;

/**
 * @extends IndexPage<ReviewResource>
 */
class ReviewIndexPage extends IndexPage
{
    protected bool $isLazy = true;

    /**
     * @return list<AssetElementContract>
     */
    protected function assets(): array
    {
        return [
            ...parent::assets(),
            InlineCss::make((string) file_get_contents(resource_path('css/review-admin.css'))),
        ];
    }

    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return [
            ID::make('#', 'id')->sortable(),

            Preview::make('Автор', 'name', function (mixed $item): string {
                if (! is_object($item)) {
                    return e((string) $item);
                }

                $rawName = $item->fieldRu('name') ?? 'Аноним';
                $name = e($rawName);
                $serviceValue = $item->fieldRu('service');
                $service = $serviceValue
                    ? '<div class="rv-author__service">'.e($serviceValue).'</div>'
                    : '';

                $initial = mb_strtoupper(mb_substr($rawName, 0, 1));

                $palette = ['#1d4ed8', '#0f766e', '#7c3aed', '#b45309', '#be185d', '#0e7490', '#047857'];
                $colorIndex = abs(crc32($rawName)) % count($palette);
                $color = $palette[$colorIndex];

                $avatar = sprintf(
                    '<div class="rv-author__avatar" style="background:%s">%s</div>',
                    $color,
                    $initial,
                );

                return sprintf(
                    '<div class="rv-author">%s<div><div class="rv-author__name">%s</div>%s</div></div>',
                    $avatar,
                    $name,
                    $service,
                );
            }),

            Preview::make('Отзыв', 'text', function (mixed $item): string {
                if (! is_object($item)) {
                    $snippet = e(mb_substr(strip_tags((string) $item), 0, 120));

                    return '<div class="rv-text"><div class="rv-text__body">'.$snippet.'</div></div>';
                }

                $title = $item->fieldRu('title');
                $text = $item->fieldRu('text');

                $titleHtml = $title
                    ? '<div class="rv-text__title">'.e($title).'</div>'
                    : '';

                $bodyHtml = ! empty($text)
                    ? '<div class="rv-text__body">'.e(mb_substr(strip_tags((string) $text), 0, 120)).'</div>'
                    : '<div class="rv-text__body" style="color:#cbd5e1;font-style:italic;">Без текста</div>';

                return '<div class="rv-text">'.$titleHtml.$bodyHtml.'</div>';
            }),

            Text::make('Дата', 'date_ru'),

            Preview::make('Статус', 'is_published', function (mixed $item): string {
                $published = is_object($item)
                    ? (bool) ($item->is_published ?? false)
                    : (bool) $item;

                return $published
                    ? '<span class="rv-badge rv-badge--published">Опубликован</span>'
                    : '<span class="rv-badge rv-badge--draft">Черновик</span>';
            }),

            Preview::make('Ответ', 'admin_reply', function (mixed $item): string {
                $reply = is_object($item)
                    ? (string) ($item->fieldRu('admin_reply') ?? '')
                    : (string) $item;

                return ! empty(trim($reply))
                    ? '<span class="rv-badge rv-badge--reply">Есть</span>'
                    : '<span class="rv-badge rv-badge--no-reply">Нет</span>';
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
        $total = Review::count();
        $published = Review::where('is_published', true)->count();
        $unpublished = max($total - $published, 0);
        $withReply = Review::where(function ($query): void {
            $query->whereNotNull('admin_reply_ru')
                ->where('admin_reply_ru', '!=', '')
                ->orWhere(function ($fallback): void {
                    $fallback->whereNotNull('admin_reply')
                        ->where('admin_reply', '!=', '');
                });
        })->count();
        $noReply = max($total - $withReply, 0);

        $thisMonth = Review::whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)
            ->count();

        $latest = Review::latest('created_at')->first(['created_at']);
        $latestDate = $latest?->created_at?->format('d.m.Y') ?? 'Нет';

        $createUrl = $this->getResource()->getFormPageUrl();

        return <<<HTML
        <div class="rv-overview">
            <section class="rv-overview__hero">
                <div class="rv-overview__hero-grid">
                    <div>
                        <p class="rv-overview__eyebrow">Управление отзывами</p>
                        <h1 class="rv-overview__title">Отзывы клиентов</h1>
                        <p class="rv-overview__lead">
                            Здесь собраны все отзывы: публикуйте лучшие, отвечайте на них
                            и следите за актуальностью. Ниже — стандартный список
                            с фильтрами и сортировкой.
                        </p>
                        <div class="rv-overview__chips">
                            <span class="rv-overview__chip">Всего: {$total}</span>
                            <span class="rv-overview__chip">Опубликовано: {$published}</span>
                            <span class="rv-overview__chip">С ответом: {$withReply}</span>
                            <span class="rv-overview__chip">Последний: {$latestDate}</span>
                        </div>
                        <a class="rv-overview__action-btn" href="{$createUrl}">+ Добавить отзыв</a>
                    </div>

                    <div class="rv-overview__spotlight">
                        <article class="rv-overview__spotlight-card">
                            <p class="rv-overview__spotlight-label">Всего отзывов</p>
                            <p class="rv-overview__spotlight-value">{$total}</p>
                            <p class="rv-overview__spotlight-meta">В базе данных</p>
                        </article>
                        <article class="rv-overview__spotlight-card">
                            <p class="rv-overview__spotlight-label">Опубликовано</p>
                            <p class="rv-overview__spotlight-value">{$published}</p>
                            <p class="rv-overview__spotlight-meta">Видны на сайте</p>
                        </article>
                        <article class="rv-overview__spotlight-card">
                            <p class="rv-overview__spotlight-label">Черновики</p>
                            <p class="rv-overview__spotlight-value">{$unpublished}</p>
                            <p class="rv-overview__spotlight-meta">Скрыты от посетителей</p>
                        </article>
                        <article class="rv-overview__spotlight-card">
                            <p class="rv-overview__spotlight-label">С ответом</p>
                            <p class="rv-overview__spotlight-value">{$withReply}</p>
                            <p class="rv-overview__spotlight-meta">Есть ответ редактора</p>
                        </article>
                    </div>
                </div>
            </section>

            <section class="rv-stats">
                <article class="rv-stat">
                    <p class="rv-stat-label">За этот месяц</p>
                    <p class="rv-stat-value">+{$thisMonth}</p>
                    <p class="rv-stat-meta">Новых отзывов добавлено</p>
                </article>
                <article class="rv-stat">
                    <p class="rv-stat-label">Без ответа</p>
                    <p class="rv-stat-value">{$noReply}</p>
                    <p class="rv-stat-meta">Ожидают ответа редактора</p>
                </article>
                <article class="rv-stat">
                    <p class="rv-stat-label">Черновики</p>
                    <p class="rv-stat-value">{$unpublished}</p>
                    <p class="rv-stat-meta">Не показываются на сайте</p>
                </article>
                <article class="rv-stat">
                    <p class="rv-stat-label">Последний отзыв</p>
                    <p class="rv-stat-value">{$latestDate}</p>
                    <p class="rv-stat-meta">Дата добавления</p>
                </article>
            </section>
        </div>
        HTML;
    }
}
