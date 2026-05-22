<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Page\Pages;

use App\MoonShine\Resources\Page\PageResource;
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
 * @extends FormPage<PageResource>
 */
class PageFormPage extends FormPage
{
    /**
     * @return list<AssetElementContract>
     */
    protected function assets(): array
    {
        return [
            ...parent::assets(),
            InlineCss::make((string) file_get_contents(resource_path('css/page-admin.css'))),
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
                ->content('Для обычной страницы оставьте тип "Обычная текстовая страница", заполните редактор и включите пункт меню на вкладке "Публикация и меню", если он нужен.'),
            Tabs::make([
                Tab::make('Текст страницы', [
                    Box::make('Содержание страницы', [
                        $this->sectionNote(
                            'Редактор для обычного текста',
                            'Заголовок и текст достаточно заполнить в этой форме. Блоки страниц нужны только для сложных макетов.'
                        ),
                        Grid::make([
                            Column::make(array_slice(CmsFieldSets::pageSection('main'), 0, 3))->columnSpan(5),
                            Column::make(array_slice(CmsFieldSets::pageSection('main'), 3))->columnSpan(7),
                        ]),
                    ])->icon('pencil-square')->customAttributes(['class' => 'page-section']),
                ])->icon('document-text')->active(),
                Tab::make('Публикация и меню', [
                    Box::make('Показ на сайте', [
                        $this->sectionNote(
                            'Поиск, публикация и навигация',
                            'SEO-поля можно заполнить позже. Переключатель меню создаст пункт, связанный с этой страницей, без ручной ссылки.'
                        ),
                        Grid::make([
                            Column::make([
                                ...CmsFieldSets::pageSection('publish'),
                                ...CmsFieldSets::pageSection('menu'),
                            ])->columnSpan(5),
                            Column::make(CmsFieldSets::pageSection('seo'))->columnSpan(7),
                        ]),
                    ])->icon('globe-alt')->customAttributes(['class' => 'page-section']),
                ])->icon('bars-3'),
            ])->vertical()->customAttributes(['class' => 'page-tabs']),
        ];
    }

    protected function rules(DataWrapperContract $item): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-z0-9]+(?:[a-z0-9\/-]*[a-z0-9])?$/',
                Rule::unique('pages', 'slug')->ignore($item->getKey()),
            ],
            'template' => ['required', Rule::in(['text', 'content', 'legal', 'about', 'blog'])],
            'body' => ['nullable', 'string', 'required_if:template,text'],
            'seo_title' => ['nullable', 'string', 'max:120'],
            'seo_description' => ['nullable', 'string', 'max:320'],
            'is_published' => ['nullable', 'boolean'],
            'create_menu_item' => ['nullable', 'boolean'],
            'menu_label' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function validationMessages(): array
    {
        return [
            'title.required' => 'Напишите заголовок страницы.',
            'title.max' => 'Заголовок страницы должен быть короче 255 символов.',
            'slug.required' => 'Проверьте адрес страницы. Он нужен для ссылки на сайте.',
            'slug.unique' => 'Такой адрес уже занят другой страницей. Измените его.',
            'slug.regex' => 'Адрес страницы должен состоять из латинских букв, цифр, дефисов и при необходимости /. Например: dostavka-i-oplata.',
            'template.required' => 'Выберите тип страницы.',
            'template.in' => 'Выберите тип страницы из списка.',
            'body.required_if' => 'Заполните текст обычной текстовой страницы.',
            'seo_title.max' => 'SEO-заголовок должен быть короче 120 символов.',
            'seo_description.max' => 'SEO-описание должно быть короче 320 символов.',
            'menu_label.max' => 'Название в меню должно быть короче 255 символов.',
        ];
    }

    private function sectionNote(string $title, string $text): ComponentContract
    {
        return FlexibleRender::make(sprintf(
            '<div class="page-note"><strong>%s</strong><span>%s</span></div>',
            e($title),
            e($text),
        ));
    }

    private function overviewHtml(): string
    {
        $item = $this->getResource()->getItem();
        $title = e($item?->title ?: 'Новая страница');
        $path = filled($item?->slug) ? '/' . e(ltrim($item->slug, '/')) : 'адрес появится после заполнения';
        $updatedAt = $item?->updated_at?->format('d.m.Y, H:i') ?? 'еще не сохранялась';
        $menuState = $item?->menuItems()->exists() ? 'У страницы уже есть пункт меню.' : 'Пункт меню можно создать при сохранении.';

        return <<<HTML
        <section class="page-form-overview">
            <div class="page-form-overview__intro">
                <div class="page-overview__eyebrow">Редактирование страницы</div>
                <h1>{$title}</h1>
                <p><code>{$path}</code> · {$menuState}</p>
                <div class="page-form-overview__saved">Последнее сохранение: {$updatedAt}</div>
            </div>
            <div class="page-form-overview__steps">
                {$this->guideCard('document-text', 'Текст', 'Напишите страницу в редакторе без создания блоков.')}
                {$this->guideCard('link', 'Адрес', 'Форма предложит ссылку из заголовка страницы.')}
                {$this->guideCard('bars-3', 'Меню', 'Создайте пункт меню тем же сохранением.')}
            </div>
        </section>
        HTML;
    }

    private function guideCard(string $icon, string $title, string $text): string
    {
        $iconHtml = (string) Icon::make($icon, 6)->render();

        return sprintf(
            '<div class="page-guide"><span class="page-guide__icon">%s</span><strong>%s</strong><span>%s</span></div>',
            $iconHtml,
            e($title),
            e($text),
        );
    }
}
