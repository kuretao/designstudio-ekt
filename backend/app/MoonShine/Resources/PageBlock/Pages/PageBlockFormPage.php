<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\PageBlock\Pages;

use App\MoonShine\Resources\PageBlock\PageBlockResource;
use App\MoonShine\Support\CmsFieldSets;
use Illuminate\Validation\Rule;
use MoonShine\AssetManager\InlineCss;
use MoonShine\Contracts\AssetManager\AssetElementContract;
use MoonShine\Contracts\Core\TypeCasts\DataWrapperContract;
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\FormPage;
use MoonShine\UI\Components\Alert;
use MoonShine\UI\Components\FlexibleRender;
use MoonShine\UI\Components\Icon;
use MoonShine\UI\Components\Layout\Box;
use MoonShine\UI\Components\Layout\Column;
use MoonShine\UI\Components\Layout\Grid;
use MoonShine\UI\Components\Tabs;
use MoonShine\UI\Components\Tabs\Tab;

/**
 * @extends FormPage<PageBlockResource>
 */
class PageBlockFormPage extends FormPage
{
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
     * @return list<ComponentContract|FieldContract>
     */
    protected function fields(): iterable
    {
        return [
            FlexibleRender::make($this->overviewHtml()),
            Alert::make('information-circle', 'info')
                ->content('Для первого экрана главной выберите страницу "Главная", вид блока "Первый экран" и заполните подпись, большой заголовок, описание и кнопку. Остальные поля можно не трогать.'),
            Tabs::make([
                Tab::make('Текст блока', [
                    Box::make('Что увидит посетитель', [
                        $this->sectionNote(
                            'Поля повторяют первый экран сайта',
                            'Маленькая строка идет над заголовком, затем большой заголовок, описание и кнопка. Пишите коротко: этот блок должен быстро читаться.'
                        ),
                        Grid::make([
                            Column::make(CmsFieldSets::pageBlockSection('target'))->columnSpan(4),
                            Column::make(CmsFieldSets::pageBlockSection('content'))->columnSpan(8),
                        ]),
                    ])->icon('pencil-square')->customAttributes(['class' => 'page-block-section']),
                ])->icon('document-text')->active(),
                Tab::make('Кнопка и показ', [
                    Box::make('Ссылка и публикация', [
                        $this->sectionNote(
                            'Сначала проверьте кнопку',
                            'Для кнопки главной обычно достаточно текста и адреса /kontakty. Порядок и показ блока меняйте только когда это действительно нужно.'
                        ),
                        Grid::make([
                            Column::make(CmsFieldSets::pageBlockSection('link'))->columnSpan(7),
                            Column::make(CmsFieldSets::pageBlockSection('display'))->columnSpan(5),
                        ]),
                    ])->icon('link')->customAttributes(['class' => 'page-block-section']),
                ])->icon('check-circle'),
            ])->vertical()->customAttributes(['class' => 'page-block-tabs']),
        ];
    }

    protected function rules(DataWrapperContract $item): array
    {
        return [
            'page_id' => ['required', 'integer', 'exists:pages,id'],
            'type' => ['required', Rule::in(['hero', 'text', 'media', 'gallery', 'quote', 'cta'])],
            'eyebrow' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string'],
            'text' => ['nullable', 'string'],
            'image' => ['nullable', 'string'],
            'link_label' => ['nullable', 'string', 'max:255'],
            'link_href' => ['nullable', 'string', 'max:2048'],
            'position' => ['required', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    public function validationMessages(): array
    {
        return [
            'page_id.required' => 'Выберите страницу, на которой должен появиться блок.',
            'page_id.exists' => 'Выбранная страница не найдена. Выберите страницу из списка.',
            'type.required' => 'Выберите вид блока.',
            'type.in' => 'Выберите вид блока из списка.',
            'eyebrow.max' => 'Маленькая строка над заголовком должна быть короче 255 символов.',
            'title.max' => 'Заголовок блока должен быть короче 255 символов.',
            'link_label.max' => 'Текст кнопки должен быть короче 255 символов.',
            'link_href.max' => 'Адрес кнопки получился слишком длинным.',
            'position.required' => 'Укажите порядок блока на странице.',
            'position.integer' => 'Порядок блока должен быть числом.',
            'position.min' => 'Порядок блока не может быть отрицательным.',
        ];
    }

    private function sectionNote(string $title, string $text): ComponentContract
    {
        return FlexibleRender::make(sprintf(
            '<div class="page-block-note"><strong>%s</strong><span>%s</span></div>',
            e($title),
            e($text),
        ));
    }

    private function overviewHtml(): string
    {
        $item = $this->getResource()->getItem();
        $page = $item?->page;
        $pageTitle = e($page?->title ?: 'Страница еще не выбрана');
        $path = ! $page
            ? 'страница выбирается в форме'
            : ($page->slug === 'home' ? 'Главная страница сайта' : '/' . e(ltrim((string) $page->slug, '/')));
        $type = e(CmsFieldSets::pageBlockTypeLabel($item?->type));
        $title = e($item?->title ?: 'Новый блок страницы');
        $updatedAt = $item?->updated_at?->format('d.m.Y, H:i') ?? 'еще не сохранялся';

        return <<<HTML
        <section class="page-block-form-overview">
            <div class="page-block-form-overview__intro">
                <div class="page-block-overview__eyebrow">Редактирование блока</div>
                <h1>{$title}</h1>
                <p><strong>{$pageTitle}</strong> · <code>{$path}</code> · {$type}</p>
                <div class="page-block-form-overview__saved">Последнее сохранение: {$updatedAt}</div>
            </div>
            <div class="page-block-form-overview__steps">
                {$this->guideCard('document-text', 'Страница', 'Выберите, где должен показываться блок. Для hero сайта это "Главная".')}
                {$this->guideCard('pencil-square', 'Текст', 'Меняйте подпись, заголовок, описание и надпись на кнопке.')}
                {$this->guideCard('check-circle', 'Показ', 'Оставьте блок включенным, чтобы посетители увидели изменения.')}
            </div>
        </section>
        HTML;
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
