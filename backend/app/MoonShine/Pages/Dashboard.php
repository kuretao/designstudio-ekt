<?php

declare(strict_types=1);

namespace App\MoonShine\Pages;

use App\Models\Faq;
use App\Models\Lead;
use App\Models\NewsArticle;
use App\Models\Project;
use App\Models\Promo;
use App\Models\Review;
use App\Models\Service;
use App\Models\Vacancy;
use MoonShine\AssetManager\InlineCss;
use MoonShine\Contracts\AssetManager\AssetElementContract;
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\Laravel\Pages\Page;
use MoonShine\UI\Components\FlexibleRender;

#[\MoonShine\MenuManager\Attributes\SkipMenu]
class Dashboard extends Page
{
    public function getBreadcrumbs(): array
    {
        return ['#' => $this->getTitle()];
    }

    public function getTitle(): string
    {
        return $this->title ?: 'Главная';
    }

    /**
     * @return list<AssetElementContract>
     */
    protected function assets(): array
    {
        return [
            ...parent::assets(),
            InlineCss::make((string) file_get_contents(resource_path('css/dashboard-admin.css'))),
        ];
    }

    /**
     * @return list<ComponentContract>
     */
    protected function components(): iterable
    {
        return [
            FlexibleRender::make($this->buildDashboardHtml()),
        ];
    }

    private function buildDashboardHtml(): string
    {
        // ── CRM ──
        $leadsTotal      = Lead::count();
        $leadsNew        = Lead::where('status', 'new')->count();
        $leadsInProgress = Lead::where('status', 'in_progress')->count();
        $leadsProcessed  = Lead::where('status', 'processed')->count();
        $leadsClosed     = Lead::where('status', 'closed')->count();
        $leadsToday      = Lead::whereDate('created_at', today())->count();

        // ── Content ──
        $projectsCount = Project::where('is_published', true)->count();
        $servicesCount = Service::where('is_published', true)->count();
        $newsCount     = NewsArticle::where('is_published', true)->count();
        $promosCount   = Promo::where('is_active', true)->count();

        // ── Feedback ──
        $reviewsCount  = Review::where('is_published', true)->count();
        $faqCount      = Faq::where('is_published', true)->count();
        $vacanciesCount = Vacancy::where('is_active', true)->count();

        // ── URLs ──
        $leadsUrl     = $this->resourceUrl('lead-resource',        'lead-index-page');
        $reviewsUrl   = $this->resourceUrl('review-resource',      'review-index-page');
        $faqUrl       = $this->resourceUrl('faq-resource',         'faq-index-page');
        $vacanciesUrl = $this->resourceUrl('vacancy-resource',     'vacancy-index-page');
        $projectsUrl  = $this->resourceUrl('project-resource',     'project-index-page');
        $servicesUrl  = $this->resourceUrl('service-resource',     'service-index-page');
        $newsUrl      = $this->resourceUrl('news-article-resource','news-article-index-page');
        $promosUrl    = $this->resourceUrl('promo-resource',       'promo-index-page');
        $settingsUrl  = $this->resourceUrl('site-setting-resource','site-setting-form-page') . '/1';
        $menuUrl      = $this->resourceUrl('menu-item-resource',   'menu-item-index-page');
        $pagesUrl     = $this->resourceUrl('page-resource',        'page-index-page');
        $blocksUrl    = $this->resourceUrl('page-block-resource',  'page-block-index-page');

        // ── CRM funnel bars ──
        $funnelHtml = $this->funnelBar('Новые',      $leadsNew,        $leadsTotal, 'ocean')
                    . $this->funnelBar('В работе',   $leadsInProgress, $leadsTotal, 'amber')
                    . $this->funnelBar('Обработаны', $leadsProcessed,  $leadsTotal, 'emerald')
                    . $this->funnelBar('Закрыты',    $leadsClosed,     $leadsTotal, 'slate');

        return <<<HTML
        <div class="dash">
            <section class="dash__hero">
                <div class="dash__hero-grid">
                    <div>
                        <p class="dash__eyebrow">Design Studio — CMS</p>
                        <h1 class="dash__title">Центр управления студией</h1>
                        <p class="dash__lead">
                            Все разделы сайта в одном месте: портфолио, услуги, новости, заявки
                            и настройки. Используйте быстрые переходы ниже или боковое меню.
                        </p>
                        <div class="dash__chips">
                            <span class="dash__chip">Заявок сегодня: {$leadsToday}</span>
                            <span class="dash__chip">Новых заявок: {$leadsNew}</span>
                            <span class="dash__chip">Проектов: {$projectsCount}</span>
                            <span class="dash__chip">Вакансий: {$vacanciesCount}</span>
                        </div>
                        <div class="dash__actions">
                            <a class="dash__action dash__action--primary" href="{$leadsUrl}">Входящие заявки</a>
                            <a class="dash__action dash__action--ghost"   href="{$projectsUrl}">Проекты</a>
                            <a class="dash__action dash__action--ghost"   href="{$settingsUrl}">Настройки</a>
                        </div>
                    </div>

                    <div class="dash__spotlight">
                        <article class="dash__spotlight-card">
                            <p class="dash__spotlight-label">Новых заявок</p>
                            <p class="dash__spotlight-value">{$leadsNew}</p>
                            <p class="dash__spotlight-meta">Всего заявок: {$leadsTotal}</p>
                        </article>
                        <article class="dash__spotlight-card">
                            <p class="dash__spotlight-label">Проектов</p>
                            <p class="dash__spotlight-value">{$projectsCount}</p>
                            <p class="dash__spotlight-meta">Опубликованы в портфолио</p>
                        </article>
                        <article class="dash__spotlight-card">
                            <p class="dash__spotlight-label">Отзывов</p>
                            <p class="dash__spotlight-value">{$reviewsCount}</p>
                            <p class="dash__spotlight-meta">Опубликованы на сайте</p>
                        </article>
                        <article class="dash__spotlight-card">
                            <p class="dash__spotlight-label">Вакансий открыто</p>
                            <p class="dash__spotlight-value">{$vacanciesCount}</p>
                            <p class="dash__spotlight-meta">Активны для кандидатов</p>
                        </article>
                    </div>
                </div>
            </section>

            <section class="dash__stats">
                <article class="dash__stat">
                    <p class="dash__stat-label">Услуг на сайте</p>
                    <p class="dash__stat-value">{$servicesCount}</p>
                    <p class="dash__stat-meta">Опубликованных услуг</p>
                </article>
                <article class="dash__stat">
                    <p class="dash__stat-label">Статей в блоге</p>
                    <p class="dash__stat-value">{$newsCount}</p>
                    <p class="dash__stat-meta">Опубликованных материалов</p>
                </article>
                <article class="dash__stat">
                    <p class="dash__stat-label">Вопросов FAQ</p>
                    <p class="dash__stat-value">{$faqCount}</p>
                    <p class="dash__stat-meta">Опубликованных ответов</p>
                </article>
                <article class="dash__stat">
                    <p class="dash__stat-label">Акций активных</p>
                    <p class="dash__stat-value">{$promosCount}</p>
                    <p class="dash__stat-meta">Действующих предложений</p>
                </article>
            </section>

            <div class="dash__grid">

                <section class="dash__card">
                    <div class="dash__card-head">
                        <div>
                            <h2>CRM — Воронка заявок</h2>
                            <p>Распределение по статусам: от новой до закрытой. Всего заявок в системе: <strong>{$leadsTotal}</strong>.</p>
                        </div>
                        <span class="dash__badge dash__badge--violet">CRM</span>
                    </div>
                    <div class="dash__card-body">
                        <div class="dash__stack">{$funnelHtml}</div>
                    </div>
                </section>

                <section class="dash__card">
                    <div class="dash__card-head">
                        <div>
                            <h2>Быстрые переходы</h2>
                            <p>Все разделы CMS в одном экране — сайт, контент и обратная связь.</p>
                        </div>
                        <span class="dash__badge dash__badge--teal">Навигация</span>
                    </div>
                    <div class="dash__card-body">
                        <div class="dash__quick-grid">
                            <a class="dash__quick-link dash__quick-link--slate"   href="{$settingsUrl}">
                                <p class="dash__quick-eyebrow">Сайт</p>
                                <p class="dash__quick-title">Настройки</p>
                                <p class="dash__quick-meta">Контакты, логотипы, SEO</p>
                            </a>
                            <a class="dash__quick-link dash__quick-link--violet"  href="{$menuUrl}">
                                <p class="dash__quick-eyebrow">Сайт</p>
                                <p class="dash__quick-title">Меню сайта</p>
                                <p class="dash__quick-meta">Навигация и ссылки</p>
                            </a>
                            <a class="dash__quick-link dash__quick-link--ocean"   href="{$pagesUrl}">
                                <p class="dash__quick-eyebrow">Сайт</p>
                                <p class="dash__quick-title">Страницы</p>
                                <p class="dash__quick-meta">Шаблоны и SEO страниц</p>
                            </a>
                            <a class="dash__quick-link dash__quick-link--cyan"    href="{$blocksUrl}">
                                <p class="dash__quick-eyebrow">Сайт</p>
                                <p class="dash__quick-title">Блоки страниц</p>
                                <p class="dash__quick-meta">Секции и контент блоков</p>
                            </a>
                            <a class="dash__quick-link dash__quick-link--emerald" href="{$projectsUrl}">
                                <p class="dash__quick-eyebrow">Контент</p>
                                <p class="dash__quick-title">Проекты</p>
                                <p class="dash__quick-meta">Портфолио студии</p>
                            </a>
                            <a class="dash__quick-link dash__quick-link--teal"    href="{$servicesUrl}">
                                <p class="dash__quick-eyebrow">Контент</p>
                                <p class="dash__quick-title">Услуги</p>
                                <p class="dash__quick-meta">Прайс и описания</p>
                            </a>
                            <a class="dash__quick-link dash__quick-link--orange"  href="{$newsUrl}">
                                <p class="dash__quick-eyebrow">Контент</p>
                                <p class="dash__quick-title">Новости</p>
                                <p class="dash__quick-meta">Блог и статьи</p>
                            </a>
                            <a class="dash__quick-link dash__quick-link--rose"    href="{$promosUrl}">
                                <p class="dash__quick-eyebrow">Контент</p>
                                <p class="dash__quick-title">Акции</p>
                                <p class="dash__quick-meta">Спецпредложения</p>
                            </a>
                            <a class="dash__quick-link dash__quick-link--indigo"  href="{$leadsUrl}">
                                <p class="dash__quick-eyebrow">Обратная связь</p>
                                <p class="dash__quick-title">Заявки</p>
                                <p class="dash__quick-meta">CRM и обращения</p>
                            </a>
                            <a class="dash__quick-link dash__quick-link--amber"   href="{$reviewsUrl}">
                                <p class="dash__quick-eyebrow">Обратная связь</p>
                                <p class="dash__quick-title">Отзывы</p>
                                <p class="dash__quick-meta">Модерация и ответы</p>
                            </a>
                            <a class="dash__quick-link dash__quick-link--yellow"  href="{$faqUrl}">
                                <p class="dash__quick-eyebrow">Обратная связь</p>
                                <p class="dash__quick-title">FAQ</p>
                                <p class="dash__quick-meta">Частые вопросы</p>
                            </a>
                            <a class="dash__quick-link dash__quick-link--pink"    href="{$vacanciesUrl}">
                                <p class="dash__quick-eyebrow">Обратная связь</p>
                                <p class="dash__quick-title">Вакансии</p>
                                <p class="dash__quick-meta">Открытые позиции</p>
                            </a>
                        </div>
                    </div>
                </section>

                <section class="dash__card">
                    <div class="dash__card-head">
                        <div>
                            <h2>Контентный контур</h2>
                            <p>Опубликованные материалы по каждому разделу сайта.</p>
                        </div>
                        <span class="dash__badge dash__badge--teal">Контент</span>
                    </div>
                    <div class="dash__card-body">
                        <div class="dash__metric-grid">
                            <article class="dash__metric-box dash__metric-box--emerald">
                                <p class="dash__metric-box-label">Проекты</p>
                                <p class="dash__metric-box-value">{$projectsCount}</p>
                                <p class="dash__metric-box-meta">В портфолио</p>
                            </article>
                            <article class="dash__metric-box dash__metric-box--teal">
                                <p class="dash__metric-box-label">Услуги</p>
                                <p class="dash__metric-box-value">{$servicesCount}</p>
                                <p class="dash__metric-box-meta">На странице услуг</p>
                            </article>
                            <article class="dash__metric-box dash__metric-box--orange">
                                <p class="dash__metric-box-label">Новости</p>
                                <p class="dash__metric-box-value">{$newsCount}</p>
                                <p class="dash__metric-box-meta">В блоге</p>
                            </article>
                            <article class="dash__metric-box dash__metric-box--rose">
                                <p class="dash__metric-box-label">Акции</p>
                                <p class="dash__metric-box-value">{$promosCount}</p>
                                <p class="dash__metric-box-meta">Активных</p>
                            </article>
                        </div>
                    </div>
                </section>

                <section class="dash__card">
                    <div class="dash__card-head">
                        <div>
                            <h2>Обратная связь</h2>
                            <p>Отзывы, вопросы и открытые вакансии — всё в одном блоке.</p>
                        </div>
                        <span class="dash__badge dash__badge--amber">Отклики</span>
                    </div>
                    <div class="dash__card-body">
                        <div class="dash__metric-grid">
                            <article class="dash__metric-box dash__metric-box--amber">
                                <p class="dash__metric-box-label">Отзывы</p>
                                <p class="dash__metric-box-value">{$reviewsCount}</p>
                                <p class="dash__metric-box-meta">Опубликованных</p>
                            </article>
                            <article class="dash__metric-box dash__metric-box--ocean">
                                <p class="dash__metric-box-label">FAQ</p>
                                <p class="dash__metric-box-value">{$faqCount}</p>
                                <p class="dash__metric-box-meta">Опубликованных</p>
                            </article>
                            <article class="dash__metric-box dash__metric-box--violet">
                                <p class="dash__metric-box-label">Вакансии</p>
                                <p class="dash__metric-box-value">{$vacanciesCount}</p>
                                <p class="dash__metric-box-meta">Активных</p>
                            </article>
                            <article class="dash__metric-box dash__metric-box--slate">
                                <p class="dash__metric-box-label">Заявки</p>
                                <p class="dash__metric-box-value">{$leadsTotal}</p>
                                <p class="dash__metric-box-meta">Всего получено</p>
                            </article>
                        </div>
                    </div>
                </section>

            </div>
        </div>
        HTML;
    }

    private function funnelBar(string $label, int $count, int $total, string $tone): string
    {
        $share = $total > 0 ? (int) round(($count / $total) * 100) : 0;
        $width = $count > 0 ? max($share, 6) : 0;

        return <<<HTML
        <div class="dash__progress-card">
            <div class="dash__progress-top">
                <p class="dash__progress-label">{$label}</p>
                <p class="dash__progress-value" style="color:var(--dash-muted)">{$count} / {$share}%</p>
            </div>
            <div class="dash__progress-bar">
                <span class="dash__progress-fill dash__progress-fill--{$tone}" style="width:{$width}%"></span>
            </div>
        </div>
        HTML;
    }

    private function resourceUrl(string $resourceUri, string $pageUri): string
    {
        return route('moonshine.resource.page', compact('resourceUri', 'pageUri'));
    }
}
