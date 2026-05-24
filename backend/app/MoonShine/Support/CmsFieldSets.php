<?php

declare(strict_types=1);

namespace App\MoonShine\Support;

use App\Models\MenuItem;
use App\Models\Page;
use App\Models\PageBlock;
use App\MoonShine\Resources\Page\PageResource;
use Illuminate\Contracts\Database\Eloquent\Builder;
use MoonShine\CKEditor\Fields\CKEditor;
use MoonShine\Laravel\Fields\Slug;
use MoonShine\Laravel\Fields\Relationships\BelongsTo;
use MoonShine\UI\Fields\Date;
use MoonShine\UI\Fields\File;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Image;
use MoonShine\UI\Fields\Json;
use MoonShine\UI\Fields\Number;
use MoonShine\UI\Fields\Preview;
use MoonShine\UI\Fields\Select;
use MoonShine\UI\Fields\Switcher;
use MoonShine\UI\Fields\Text;
use MoonShine\UI\Fields\Textarea;
use MoonShine\UI\Fields\Url;

final class CmsFieldSets
{
    public static function for(string $key, string $mode = 'form'): array
    {
        $compact = $mode === 'index';

        return match ($key) {
            'site_setting' => self::siteSetting($compact),
            'menu_item' => self::menuItem($compact),
            'page' => self::page($compact),
            'page_block' => self::pageBlock($compact),
            'project' => self::project($compact),
            'service' => self::service($compact),
            'news_article' => self::newsArticle($compact),
            'promo' => self::promo($compact),
            'review' => self::review($compact),
            'faq' => self::faq($compact),
            'vacancy' => self::vacancy($compact),
            'lead' => self::lead($compact),
            default => [ID::make()->sortable()],
        };
    }

    private static function siteSetting(bool $compact): array
    {
        if ($compact) {
            return [
                ID::make()->sortable(),
                Text::make('Название сайта', 'site_name')->required(),
                Text::make('Телефон', 'phone'),
                Text::make('Ссылка телефона', 'phone_href'),
            ];
        }

        return [
            ...self::siteSettingSection('main'),
            ...self::siteSettingSection('branding'),
            ...self::siteSettingSection('animations'),
            ...self::siteSettingSection('contacts'),
            ...self::siteSettingSection('links'),
            ...self::siteSettingSection('seo'),
        ];
    }

    public static function siteSettingSection(string $section): array
    {
        return match ($section) {
            'main' => [
                Text::make('Название сайта', 'site_name')
                    ->required()
                    ->placeholder('3D Smart Design Studio')
                    ->hint('Показывается в подписи логотипа и используется как запасной заголовок сайта.'),
            ],
            'branding' => [
                Image::make('Логотип сайта', 'site_logo')
                    ->disk('public')
                    ->dir('site/branding')
                    ->allowedExtensions(['svg', 'png', 'jpg', 'jpeg', 'webp'])
                    ->removable()
                    ->hint('Основной логотип для подвала сайта. Подойдут SVG, PNG, JPG или WEBP до 4 МБ.'),
                Image::make('Компактный логотип', 'site_logo_small')
                    ->disk('public')
                    ->dir('site/branding')
                    ->allowedExtensions(['svg', 'png', 'jpg', 'jpeg', 'webp'])
                    ->removable()
                    ->hint('Логотип для верхней панели. Если оставить пустым, будет использован основной логотип.'),
                File::make('Фавикон', 'favicon')
                    ->disk('public')
                    ->dir('site/branding')
                    ->allowedExtensions(['ico', 'svg', 'png'])
                    ->removable()
                    ->hint('Маленькая иконка во вкладке браузера. Лучше ICO, SVG или квадратный PNG.'),
                Image::make('Иконка для iPhone и iPad', 'apple_touch_icon')
                    ->disk('public')
                    ->dir('site/branding')
                    ->allowedExtensions(['png', 'jpg', 'jpeg', 'webp'])
                    ->removable()
                    ->hint('Квадратная картинка для сохранения сайта на экран устройства. Рекомендуется PNG 180x180.'),
            ],
            'animations' => [
                Switcher::make('Включить анимации сайта', 'animations_enabled')
                    ->default(true)
                    ->hint('Главный переключатель GSAP-анимаций, появления блоков и декоративной анимации.'),
                Switcher::make('Масляный скролл', 'smooth_scroll_enabled')
                    ->default(true)
                    ->hint('Плавная прокрутка колесом мыши на desktop. Выключите, если нужен более привычный скролл.'),
                Switcher::make('Появление блоков при скролле', 'page_reveal_enabled')
                    ->default(true)
                    ->hint('Анимация появления карточек и секций при прокрутке страницы.'),
            ],
            'contacts' => [
                Text::make('Телефон для показа', 'phone')
                    ->placeholder('+7 (987) 942-12-42')
                    ->hint('Так номер увидит посетитель сайта.'),
                Text::make('Ссылка для звонка', 'phone_href')
                    ->placeholder('tel:+79879421242')
                    ->hint('Для звонка с телефона начните значение с tel:. Пример: tel:+79879421242.'),
                Textarea::make('Email, по одному в строке', 'emails')
                    ->placeholder("mail@example.ru\ninfo@example.ru - вопросы по рекламе")
                    ->hint('В начале каждой строки должен быть email. После него можно добавить пояснение через дефис.'),
                Text::make('Режим работы', 'schedule')
                    ->placeholder('Пн-Пт 9:00-20:00, Сб-Вс 10:00-19:00')
                    ->hint('Короткая строка для блока контактов.'),
                Textarea::make('Адрес и пояснение', 'address')
                    ->placeholder('Самара. Работаем удаленно по всей России.')
                    ->hint('Можно указать город, офис или короткое пояснение о географии работы.'),
                Textarea::make('Ссылка для карты', 'map_src')
                    ->placeholder('https://www.openstreetmap.org/export/embed.html?...')
                    ->hint('Вставьте URL карты, который можно открыть в браузере. HTML-код iframe сюда не нужен.'),
            ],
            'links' => [
                Url::make('Telegram', 'telegram_url')
                    ->placeholder('https://t.me/company')
                    ->hint('Ссылка на чат, канал или профиль Telegram.'),
                Url::make('MAX', 'max_url')
                    ->placeholder('https://max.ru/company')
                    ->hint('Ссылка на страницу в MAX.'),
                Url::make('VK', 'vk_url')
                    ->placeholder('https://vk.com/company')
                    ->hint('Ссылка на сообщество или профиль VK.'),
                Url::make('LinkedIn', 'linkedin_url')
                    ->placeholder('https://www.linkedin.com/in/company')
                    ->hint('Оставьте пустым, если ссылка не нужна на сайте.'),
                Url::make('Behance', 'behance_url')
                    ->placeholder('https://www.behance.net/company')
                    ->hint('Оставьте пустым, если портфолио не ведется в Behance.'),
                Url::make('Pinterest', 'pinterest_url')
                    ->placeholder('https://pinterest.com/company')
                    ->hint('Оставьте пустым, если Pinterest не используется.'),
            ],
            'seo' => [
                Text::make('SEO-заголовок', 'seo_title')
                    ->placeholder('3D Smart Design Studio')
                    ->hint('Заголовок сайта во вкладке браузера и для поисковой выдачи.'),
                Textarea::make('SEO-описание', 'seo_description')
                    ->placeholder('Коротко опишите студию, услуги и город.')
                    ->hint('Короткое описание сайта. Держите главный смысл в первых 160 символах.'),
                Image::make('Изображение для соцсетей', 'social_preview_image')
                    ->disk('public')
                    ->dir('site/branding')
                    ->allowedExtensions(['png', 'jpg', 'jpeg', 'webp'])
                    ->removable()
                    ->hint('Картинка для превью ссылки в соцсетях. Рекомендуется горизонтальный PNG или JPG.'),
            ],
            default => [],
        };
    }

    private static function menuItem(bool $compact): array
    {
        if ($compact) {
            return [
                ID::make()->sortable(),
                Text::make('Название', 'label')->sortable(),
                self::menuPageField(),
                Preview::make('Ссылка на сайте', 'href', static function (mixed $item): string {
                    if (! $item instanceof MenuItem) {
                        return e((string) $item);
                    }

                    $href = $item->siteHref();

                    if ($href === null) {
                        return '<span class="menu-link-badge menu-link-badge--muted">Не показывается</span>';
                    }

                    $kind = $item->page_id !== null ? 'Страница' : 'Своя ссылка';

                    return sprintf(
                        '<span class="menu-link-badge">%s</span><code class="menu-link-path">%s</code>',
                        e($kind),
                        e($href),
                    );
                }),
                Number::make('Порядок', 'position')->sortable(),
                Switcher::make('Показывать', 'is_active'),
            ];
        }

        return [
            ...self::menuItemSection('text'),
            ...self::menuItemSection('target'),
            ...self::menuItemSection('display'),
        ];
    }

    public static function menuItemSection(string $section): array
    {
        return match ($section) {
            'text' => [
                Text::make('Название в меню', 'label')
                    ->placeholder('О нас')
                    ->hint('Текст, который увидит посетитель. Если выбрана страница и поле оставить пустым, возьмем заголовок страницы.'),
            ],
            'target' => [
                self::menuPageField(),
                Text::make('Другая ссылка', 'href')
                    ->nullable()
                    ->placeholder('/portfolio или https://example.com')
                    ->hint('Оставьте пустым, если выбрали страницу выше. Заполняйте только для готовых разделов сайта, якорей или внешних ссылок.'),
            ],
            'display' => [
                Number::make('Порядок в меню', 'position')
                    ->default(0)
                    ->sortable()
                    ->hint('Меньшее число ставит пункт ближе к началу меню. Например: 1, 2, 3.'),
                Switcher::make('Показывать на сайте', 'is_active')
                    ->default(true)
                    ->hint('Выключите, чтобы временно скрыть пункт меню без удаления.'),
            ],
            default => [],
        };
    }

    private static function menuPageField(): BelongsTo
    {
        return BelongsTo::make(
            'Страница сайта',
            'page',
            formatted: static function (Page $page): string {
                if (! $page->exists || blank($page->slug)) {
                    return '';
                }

                return sprintf(
                    '%s /%s%s',
                    $page->title,
                    ltrim($page->slug, '/'),
                    $page->is_published ? '' : ' (не опубликована)',
                );
            },
            resource: PageResource::class,
        )
            ->nullable()
            ->searchable()
            ->valuesQuery(static fn (Builder $query): Builder => $query
                ->select(['id', 'title', 'slug', 'is_published'])
                ->orderBy('title'))
            ->hint('Выберите страницу из раздела "Страницы". Ее адрес подставится автоматически и обновится при смене slug.');
    }

    private static function page(bool $compact): array
    {
        if ($compact) {
            return [
                ID::make()->sortable(),
                Text::make('Заголовок', 'title')->sortable(),
                Preview::make('Адрес', 'slug', static function (mixed $item): string {
                    $slug = $item instanceof Page ? $item->slug : (string) $item;

                    return filled($slug)
                        ? '<code class="page-path">/' . e(ltrim($slug, '/')) . '</code>'
                        : '<span class="page-badge page-badge--muted">Нет адреса</span>';
                }),
                Preview::make('Тип', 'template', static function (mixed $item): string {
                    $template = $item instanceof Page ? $item->template : (string) $item;

                    return sprintf(
                        '<span class="page-badge">%s</span>',
                        e(self::pageTemplateLabel($template)),
                    );
                }),
                Preview::make('Меню', 'id', static function (mixed $item): string {
                    if (! $item instanceof Page) {
                        return '';
                    }

                    return $item->menuItems()->exists()
                        ? '<span class="page-badge page-badge--menu">Есть пункт</span>'
                        : '<span class="page-badge page-badge--muted">Без меню</span>';
                }),
                Switcher::make('Опубликована', 'is_published'),
            ];
        }

        return [
            ...self::pageSection('main'),
            ...self::pageSection('seo'),
            ...self::pageSection('publish'),
            ...self::pageSection('menu'),
        ];
    }

    public static function pageSection(string $section): array
    {
        return match ($section) {
            'main' => [
                Text::make('Заголовок страницы', 'title')
                    ->required()
                    ->placeholder('Доставка и оплата')
                    ->hint('Главный заголовок страницы. Он будет виден посетителю и поможет создать адрес.'),
                Slug::make('Адрес страницы', 'slug')
                    ->from('title')
                    ->unique()
                    ->required()
                    ->placeholder('dostavka-i-oplata')
                    ->hint('Часть ссылки после домена. Для новой страницы обычно достаточно адреса, который предложит форма.'),
                Select::make('Тип страницы', 'template')
                    ->options([
                        'text' => 'Обычная текстовая страница',
                        'content' => 'Страница-конструктор с блоками',
                        'legal' => 'Юридическая страница с узким текстом',
                        'about' => 'О нас: служебный раздел',
                        'blog' => 'Блог: лента новостей',
                    ])
                    ->default('text')
                    ->hint('Для новой страницы обычно выбирайте "Текстовая" или "Страница-конструктор". Служебные типы нужны только существующим разделам вроде блога и юридических страниц.'),
                CKEditor::make('Текст страницы', 'body')
                    ->hint('Пишите текст как в обычном редакторе: заголовки, абзацы, списки и ссылки сохранятся на странице.'),
            ],
            'seo' => [
                Text::make('SEO-заголовок', 'seo_title')
                    ->placeholder('Доставка и оплата | 3D Smart Design')
                    ->hint('Заголовок во вкладке и в поиске. Можно оставить пустым, тогда сайт использует заголовок страницы.'),
                Textarea::make('SEO-описание', 'seo_description')
                    ->placeholder('Коротко опишите, что посетитель найдет на этой странице.')
                    ->hint('Короткое описание для поиска и превью. Достаточно одного-двух предложений.'),
            ],
            'publish' => [
                Switcher::make('Опубликовать страницу', 'is_published')
                    ->default(true)
                    ->hint('Выключите, чтобы подготовить страницу и пока не показывать ее посетителям.'),
            ],
            'menu' => [
                Switcher::make('Создать или обновить пункт меню', 'create_menu_item')
                    ->onApply(static fn (Page $page): Page => $page)
                    ->hint('Включите при сохранении, если эта страница должна появиться в меню сайта.'),
                Text::make('Название в меню', 'menu_label')
                    ->nullable()
                    ->placeholder('Доставка')
                    ->onApply(static fn (Page $page): Page => $page)
                    ->hint('Можно оставить пустым: тогда пункт меню получит заголовок страницы.'),
            ],
            default => [],
        };
    }

    public static function pageTemplateLabel(?string $template): string
    {
        return match ($template) {
            'text' => 'Текстовая',
            'content' => 'С блоками',
            'legal' => 'Юридическая',
            'about' => 'О нас',
            'blog' => 'Блог',
            default => filled($template) ? $template : 'Не задан',
        };
    }

    private static function pageBlock(bool $compact): array
    {
        if ($compact) {
            return [
                ID::make()->sortable(),
                self::pageBlockPageField(),
                Preview::make('Блок', 'type', static function (mixed $item): string {
                    $type = $item instanceof PageBlock ? $item->type : (string) $item;

                    return sprintf(
                        '<span class="page-block-badge">%s</span>',
                        e(self::pageBlockTypeLabel($type)),
                    );
                }),
                Text::make('Заголовок', 'title')->sortable(),
                Number::make('Порядок', 'position')->sortable(),
                Switcher::make('Показывать', 'is_active'),
            ];
        }

        return [
            ...self::pageBlockSection('target'),
            ...self::pageBlockSection('content'),
            ...self::pageBlockSection('link'),
            ...self::pageBlockSection('display'),
        ];
    }

    public static function pageBlockSection(string $section): array
    {
        return match ($section) {
            'target' => [
                self::pageBlockPageField(),
                Select::make('Вид блока', 'type')
                    ->options([
                        'hero' => 'Первый экран / крупный заголовок',
                        'text' => 'Текстовый блок',
                        'media' => 'Текст + изображение',
                        'gallery' => 'Галерея / слайдер',
                        'quote' => 'Акцентная цитата',
                        'cta' => 'Призыв к действию',
                    ])
                    ->default('hero')
                    ->required()
                    ->hint('Для главной и шапок страниц выбирайте "Первый экран". Это блок с маленькой строкой, большим заголовком, описанием и кнопкой.'),
            ],
            'content' => [
                Text::make('Маленькая строка над заголовком', 'eyebrow')
                    ->placeholder('Студия дизайна интерьера и архитектуры в Самаре')
                    ->hint('На первом экране это тонкая подпись над крупным заголовком. Можно оставить пустой.'),
                Text::make('Главный заголовок блока', 'title')
                    ->placeholder('Дизайн с умом.')
                    ->hint('Самый заметный текст блока. На главной это большая фраза на первом экране.'),
                Textarea::make('Описание под заголовком', 'subtitle')
                    ->placeholder('Создаем интерьеры, архитектуру, 3D-визуализацию и ландшафтные проекты...')
                    ->hint('Короткий абзац рядом с кнопкой или сразу под заголовком. Для главного блока заполняйте именно это поле.'),
                Textarea::make('Дополнительный текст блока', 'text')
                    ->hint('Нужен для страниц, где блок показывает более длинное пояснение или текст карточки. Если на первом экране достаточно описания выше, поле можно оставить пустым.'),
            ],
            'link' => [
                Text::make('Текст кнопки', 'link_label')
                    ->placeholder('Обсудить проект')
                    ->hint('Надпись на кнопке. Если кнопка в этом блоке не нужна, оставьте поле пустым.'),
                Text::make('Куда ведет кнопка', 'link_href')
                    ->placeholder('/kontakty')
                    ->hint('Для страницы сайта укажите путь с /. Например: /kontakty. Можно вставить и полную внешнюю ссылку.'),
                Textarea::make('Изображения / слайды', 'image')
                    ->hint('Укажите полный URL или путь из хранилища. Для слайдера и галереи добавляйте каждую картинку с новой строки.'),
            ],
            'display' => [
                Number::make('Порядок на странице', 'position')
                    ->default(1)
                    ->sortable()
                    ->hint('Меньшее число ставит блок раньше. Для первого экрана обычно указывают 1.'),
                Switcher::make('Показывать блок на сайте', 'is_active')
                    ->default(true)
                    ->hint('Выключите, чтобы временно скрыть блок без удаления текста.'),
            ],
            default => [],
        };
    }

    public static function pageBlockTypeLabel(?string $type): string
    {
        return match ($type) {
            'hero' => 'Первый экран',
            'text' => 'Текстовый блок',
            'media' => 'Текст + изображение',
            'gallery' => 'Галерея',
            'quote' => 'Цитата',
            'cta' => 'CTA',
            default => filled($type) ? $type : 'Не задан',
        };
    }

    private static function pageBlockPageField(): BelongsTo
    {
        return BelongsTo::make(
            'Страница сайта',
            'page',
            formatted: static function (Page $page): string {
                if (! $page->exists) {
                    return '';
                }

                $path = $page->slug === 'home' ? 'Главная' : '/' . ltrim((string) $page->slug, '/');

                return sprintf(
                    '%s - %s%s',
                    $page->title,
                    $path,
                    $page->is_published ? '' : ' (не опубликована)',
                );
            },
            resource: PageResource::class,
        )
            ->searchable()
            ->valuesQuery(static fn (Builder $query): Builder => $query
                ->select(['id', 'title', 'slug', 'is_published'])
                ->orderBy('title'))
            ->required()
            ->hint('Выберите страницу, на которой должен появиться блок. Для первого экрана сайта выбирайте страницу "Главная".');
    }

    private static function project(bool $compact): array
    {
        $fields = [
            ID::make()->sortable(),
            Text::make('Slug', 'slug')->required(),
            Text::make('Заголовок', 'title')->required(),
            Text::make('Категория', 'category')->required(),
            Number::make('Позиция', 'position')->sortable(),
            Switcher::make('Опубликовано', 'is_published'),
        ];

        return $compact ? $fields : [
            ...$fields,
            Text::make('Локация', 'location'),
            Text::make('Год', 'year'),
            Textarea::make('Описание', 'description'),
            Textarea::make('URL изображения или путь в хранилище', 'image'),
            Textarea::make('Изображение до', 'before_image'),
            Textarea::make('Изображение после', 'after_image'),
            Switcher::make('Избранный', 'is_featured'),
        ];
    }

    private static function service(bool $compact): array
    {
        $fields = [
            ID::make()->sortable(),
            Text::make('Slug', 'slug')->required(),
            Text::make('Заголовок', 'title')->required(),
            Text::make('Стоимость', 'price'),
            Text::make('Срок', 'timeline'),
            Number::make('Позиция', 'position')->sortable(),
            Switcher::make('Опубликовано', 'is_published'),
        ];

        return $compact ? $fields : [
            ...$fields,
            Text::make('Надзаголовок', 'eyebrow'),
            CKEditor::make('Текст', 'text'),
            Textarea::make('URL изображения или путь в хранилище', 'image'),
            Textarea::make('Результаты, по одному в строке', 'deliverables'),
            Textarea::make('Преимущества, по одному в строке', 'benefits'),
            Textarea::make('Этапы, по одному в строке', 'process'),
        ];
    }

    private static function newsArticle(bool $compact): array
    {
        $fields = [
            ID::make()->sortable(),
            Text::make('Slug', 'slug')->required(),
            Text::make('Заголовок', 'title')->required(),
            Text::make('Категория', 'category'),
            Date::make('Дата ISO', 'date_iso'),
            Number::make('Позиция', 'position')->sortable(),
            Switcher::make('Опубликовано', 'is_published'),
        ];

        return $compact ? $fields : [
            ...$fields,
            Text::make('Дата для показа', 'date'),
            Textarea::make('Анонс', 'preview'),
            Textarea::make('URL изображения или путь в хранилище', 'image'),
            Text::make('Время чтения', 'reading_time'),
            Textarea::make('Текст статьи', 'body'),
        ];
    }

    private static function promo(bool $compact): array
    {
        $fields = [
            ID::make()->sortable(),
            Text::make('Slug', 'slug')->required(),
            Text::make('Заголовок', 'title')->required(),
            Text::make('Бейдж', 'badge'),
            Number::make('Позиция', 'position')->sortable(),
            Switcher::make('Активно', 'is_active'),
        ];

        return $compact ? $fields : [
            ...$fields,
            Text::make('Акцент', 'highlight'),
            Text::make('Действует до', 'valid_until'),
            Textarea::make('Описание', 'description'),
            Textarea::make('Условия, по одному в строке', 'conditions'),
            Textarea::make('URL изображения или путь в хранилище', 'image'),
        ];
    }

    private static function review(bool $compact): array
    {
        $fields = [
            ID::make()->sortable(),
            Text::make('Имя', 'name')->required(),
            Text::make('Услуга', 'service'),
            Text::make('Заголовок', 'title'),
            Number::make('Позиция', 'position')->sortable(),
            Switcher::make('Опубликовано', 'is_published'),
        ];

        return $compact ? $fields : [
            ...$fields,
            Text::make('Дата', 'date'),
            Textarea::make('Текст', 'text'),
            Textarea::make('Ответ администратора', 'admin_reply'),
            Textarea::make('URL изображения или путь в хранилище', 'image'),
        ];
    }

    private static function faq(bool $compact): array
    {
        return [
            ID::make()->sortable(),
            Text::make('Вопрос', 'question')->required(),
            Textarea::make('Ответ', 'answer')->required(),
            Number::make('Позиция', 'position')->sortable(),
            Switcher::make('Опубликовано', 'is_published'),
        ];
    }

    private static function vacancy(bool $compact): array
    {
        $fields = [
            ID::make()->sortable(),
            Text::make('Заголовок', 'title')->required(),
            Text::make('Занятость', 'employment'),
            Text::make('Локация', 'location'),
            Text::make('Зарплата', 'salary'),
            Number::make('Позиция', 'position')->sortable(),
            Switcher::make('Активно', 'is_active'),
        ];

        return $compact ? $fields : [
            ...$fields,
            Textarea::make('Описание', 'description'),
            Textarea::make('Требования, по одному в строке', 'requirements'),
            Textarea::make('Обязанности, по одной в строке', 'responsibilities'),
        ];
    }

    private static function lead(bool $compact): array
    {
        $fields = [
            ID::make()->sortable(),
            Text::make('Источник', 'source'),
            Text::make('Канал', 'channel'),
            Text::make('Имя', 'name'),
            Text::make('Контакт', 'contact')->required(),
            Text::make('Статус', 'status'),
        ];

        return $compact ? $fields : [
            ...$fields,
            Text::make('Услуга', 'service'),
            Textarea::make('Сообщение', 'message'),
            Json::make('Данные', 'payload'),
        ];
    }
}
