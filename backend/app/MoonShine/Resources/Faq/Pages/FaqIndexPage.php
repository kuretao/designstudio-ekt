<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Faq\Pages;

use App\Models\Faq;
use App\MoonShine\Resources\Faq\FaqResource;
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
 * @extends IndexPage<FaqResource>
 */
class FaqIndexPage extends IndexPage
{
    protected bool $isLazy = true;

    /**
     * @return list<AssetElementContract>
     */
    protected function assets(): array
    {
        return [
            ...parent::assets(),
            InlineCss::make((string) file_get_contents(resource_path('css/faq-admin.css'))),
        ];
    }

    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return [
            ID::make('#', 'id')->sortable(),

            Preview::make('Вопрос', 'question_ru', function (mixed $item): string {
                if (! $item instanceof Faq) {
                    return '<div class="faq-question"><div class="faq-question__text">' . e((string) $item) . '</div></div>';
                }

                $question  = e($item->questionRu());
                $answerRaw = strip_tags($item->answerRu());
                $answer    = e(mb_substr($answerRaw, 0, 130));

                $answerHtml = ! empty($answerRaw)
                    ? '<div class="faq-question__answer">' . $answer . '</div>'
                    : '<div class="faq-question__answer" style="color:#cbd5e1;font-style:italic;">Без ответа</div>';

                return '<div class="faq-question"><div class="faq-question__text">' . $question . '</div>' . $answerHtml . '</div>';
            }),

            Preview::make('Статус', 'is_published', function (mixed $item): string {
                $published = is_object($item)
                    ? (bool) ($item->is_published ?? false)
                    : (bool) $item;

                return $published
                    ? '<span class="faq-badge faq-badge--published">Опубликован</span>'
                    : '<span class="faq-badge faq-badge--draft">Черновик</span>';
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
        $total       = Faq::count();
        $published   = Faq::where('is_published', true)->count();
        $unpublished = max($total - $published, 0);

        $thisMonth = Faq::whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)
            ->count();

        $publishedShare = $total > 0 ? (int) round(($published / $total) * 100) : 0;

        $latest     = Faq::latest('created_at')->first(['created_at']);
        $latestDate = $latest?->created_at?->format('d.m.Y') ?? 'Нет';

        $createUrl = $this->getResource()->getFormPageUrl();

        return <<<HTML
        <div class="faq-overview">
            <section class="faq-overview__hero">
                <div class="faq-overview__hero-grid">
                    <div>
                        <p class="faq-overview__eyebrow">База знаний</p>
                        <h1 class="faq-overview__title">Часто задаваемые<br>вопросы</h1>
                        <p class="faq-overview__lead">
                            Управляйте вопросами и ответами, которые помогают
                            посетителям сайта. Публикуйте нужные, скрывайте
                            устаревшие — ниже стандартный список с фильтрами.
                        </p>
                        <div class="faq-overview__chips">
                            <span class="faq-overview__chip">Всего: {$total}</span>
                            <span class="faq-overview__chip">Опубликовано: {$published}</span>
                            <span class="faq-overview__chip">Черновики: {$unpublished}</span>
                            <span class="faq-overview__chip">Последний: {$latestDate}</span>
                        </div>
                        <a class="faq-overview__action-btn" href="{$createUrl}">+ Добавить вопрос</a>
                    </div>

                    <div class="faq-overview__spotlight">
                        <article class="faq-overview__spotlight-card">
                            <p class="faq-overview__spotlight-label">Всего вопросов</p>
                            <p class="faq-overview__spotlight-value">{$total}</p>
                            <p class="faq-overview__spotlight-meta">В базе данных</p>
                        </article>
                        <article class="faq-overview__spotlight-card">
                            <p class="faq-overview__spotlight-label">Опубликовано</p>
                            <p class="faq-overview__spotlight-value">{$published}</p>
                            <p class="faq-overview__spotlight-meta">Видны на сайте</p>
                        </article>
                        <article class="faq-overview__spotlight-card">
                            <p class="faq-overview__spotlight-label">Черновики</p>
                            <p class="faq-overview__spotlight-value">{$unpublished}</p>
                            <p class="faq-overview__spotlight-meta">Скрыты от посетителей</p>
                        </article>
                        <article class="faq-overview__spotlight-card">
                            <p class="faq-overview__spotlight-label">Охват публикации</p>
                            <p class="faq-overview__spotlight-value">{$publishedShare}%</p>
                            <p class="faq-overview__spotlight-meta">Доля опубликованных</p>
                        </article>
                    </div>
                </div>
            </section>

            <section class="faq-stats">
                <article class="faq-stat">
                    <p class="faq-stat-label">За этот месяц</p>
                    <p class="faq-stat-value">+{$thisMonth}</p>
                    <p class="faq-stat-meta">Новых вопросов добавлено</p>
                </article>
                <article class="faq-stat">
                    <p class="faq-stat-label">Опубликовано</p>
                    <p class="faq-stat-value">{$published}</p>
                    <p class="faq-stat-meta">Показываются на сайте</p>
                </article>
                <article class="faq-stat">
                    <p class="faq-stat-label">Черновики</p>
                    <p class="faq-stat-value">{$unpublished}</p>
                    <p class="faq-stat-meta">Скрыты от посетителей</p>
                </article>
                <article class="faq-stat">
                    <p class="faq-stat-label">Последний вопрос</p>
                    <p class="faq-stat-value">{$latestDate}</p>
                    <p class="faq-stat-meta">Дата добавления</p>
                </article>
            </section>
        </div>
        HTML;
    }
}
