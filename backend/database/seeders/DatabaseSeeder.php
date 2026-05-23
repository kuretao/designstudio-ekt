<?php

namespace Database\Seeders;

use App\Models\Faq;
use App\Models\MenuItem;
use App\Models\NewsArticle;
use App\Models\Page;
use App\Models\PageBlock;
use App\Models\Project;
use App\Models\Promo;
use App\Models\Review;
use App\Models\Service;
use App\Models\SiteSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use MoonShine\Laravel\Models\MoonshineUser;
use MoonShine\Laravel\Models\MoonshineUserRole;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $role = MoonshineUserRole::query()->firstOrCreate(
            ['id' => MoonshineUserRole::DEFAULT_ROLE_ID],
            ['name' => 'Admin'],
        );

        MoonshineUser::query()->updateOrCreate([
            'email' => env('ADMIN_EMAIL', 'admin@example.com'),
        ], [
            'moonshine_user_role_id' => $role->id,
            'name' => env('ADMIN_NAME', 'Admin'),
            'password' => Hash::make(env('ADMIN_PASSWORD', 'password')),
        ]);

        SiteSetting::query()->updateOrCreate(['id' => 1], [
            'site_name' => '3D Smart Design Studio',
            'phone' => '+7 (987) 942-12-42',
            'phone_href' => 'tel:+79879421242',
            'emails' => "3dsmartdesign@bk.ru - обсуждение проекта\ninfo@3dsmartdesign.ru - реклама, сотрудничество",
            'schedule' => 'Пн-Пт 9:00-20:00, Сб-Вс 10:00-19:00',
            'address' => 'Работаем в Самаре и удаленно с другими городами и странами',
            'map_src' => 'https://www.openstreetmap.org/export/embed.html?bbox=49.92%2C53.12%2C50.30%2C53.30&layer=mapnik&marker=53.1959%2C50.1002',
            'telegram_url' => 'https://t.me/+79879421242',
            'max_url' => 'https://max.ru/',
            'linkedin_url' => 'https://www.linkedin.com/in/3dsmartdesignstudio',
            'behance_url' => 'https://www.behance.net/3dsmartdesign',
            'pinterest_url' => 'https://ru.pinterest.com/3D_SMART_DESIGN_STUDIO/',
            'seo_title' => '3D Smart Design Studio',
            'seo_description' => 'Студия концептуального дизайна. Интерьеры, архитектура, ландшафт.',
        ]);

        collect([
            ['/o-nas', 'О нас'],
            ['/portfolio', 'Портфолио'],
            ['/services', 'Услуги'],
            ['/kontakty', 'Контакты'],
            ['/akcii-i-skidki', 'Акции'],
            ['/novosti', 'Новости'],
            ['/blog', 'Блог'],
            ['/otzyvy-o-nas', 'Отзывы'],
            ['/karera', 'Карьера'],
            ['/partneram', 'Партнерам'],
        ])->each(fn (array $item, int $index) => MenuItem::query()->updateOrCreate(
            ['href' => $item[0]],
            ['label' => $item[1], 'position' => $index + 1, 'is_active' => true],
        ));

        $projects = collect([
            ['kp-pavlovy-ozera', 'КП "Павловы Озера"', 'Интерьеры', 'Москва', '2026', 'Авторский интерьер загородного дома: мягкая неоклассика, продуманная кухня-гостиная, приватные спальни и спокойная палитра натуральных материалов.', 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=2200&q=90'],
            ['river-park', 'ЖК "River Park"', 'Интерьеры', 'Самара', '2025', 'Квартира с открытой кухней-гостиной, скрытым хранением, световыми сценариями и визуализацией до начала ремонтных работ.', 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2200&q=90'],
            ['landshaftnyj-proekt', 'Ландшафтный проект', 'Ландшафт', 'Висловка', '2025', 'Благоустройство участка с маршрутами, вечерней подсветкой, зонами отдыха и растениями, подобранными под климат и уход.', 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=2200&q=90'],
            ['ofisnoe-prostranstvo', 'Офисное пространство', 'Интерьеры', 'Белгородская область', '2026', 'Коммерческий интерьер с понятной навигацией, рабочими зонами, переговорными и визуальным языком бренда.', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=90'],
            ['villa-austria', 'Villa Austria', 'Архитектура', 'Вена', '2024', 'Архитектурная визуализация виллы: фасады, посадка на участок, вечерний свет, окружение и презентационные ракурсы.', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=2200&q=90'],
            ['kp-greenwood-2', 'КП GreenWood-2', 'Архитектура', 'Москва', '2025', 'Концепция частного дома с выразительной геометрией, панорамным остеклением и подготовкой материалов для согласования.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90'],
        ]);

        $projects->each(fn (array $project, int $index) => Project::query()->updateOrCreate(
            ['slug' => $project[0]],
            [
                'title' => $project[1],
                'category' => $project[2],
                'location' => $project[3],
                'year' => $project[4],
                'description' => $project[5],
                'image' => $project[6],
                'before_image' => $index < 2 ? 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85' : null,
                'after_image' => $index < 2 ? 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85' : null,
                'position' => $index + 1,
                'is_featured' => $index < 3,
                'is_published' => true,
            ],
        ));

        collect([
            ['dizajn-interyera', 'Дизайн интерьера', 'Квартиры, дома, офисы', 'Проект под ключ для квартир, коттеджей и коммерческих помещений: планировка, 3D-визуализация, чертежи, спецификации и сопровождение реализации.', $projects[1][6], 'от 650 ₽/м²', '3-12 недель'],
            ['dizajn-interera-kommercheskogo-prostranstva', 'Дизайн коммерческого пространства', 'Офисы, шоурумы, рестораны', 'Создаем интерьеры, которые работают на поток, бренд и продажи: от сценариев движения посетителей до мебели, света и технической документации.', $projects[3][6], 'от 1 500 ₽/м²', '4-10 недель'],
            ['komplektaciya-ob-ekta', 'Комплектация объекта', 'Материалы, мебель, поставки', 'Подбираем материалы, мебель, освещение и оборудование, готовим ведомости, контролируем бюджет и помогаем проекту не рассыпаться на этапе закупок.', $projects[0][6], 'индивидуально', 'на протяжении ремонта'],
            ['3d-vizualizaciya', '3D визуализация', 'Фотореалистичные рендеры', 'Создаем реалистичные изображения для согласований, презентаций, девелопмента и маркетинга.', $projects[0][6], 'от 10 000 ₽', 'от 5 дней'],
            ['arhitekturnaya-3d-vizualizaciya', 'Архитектурная 3D визуализация', 'Коттеджи и жилые комплексы', 'Преобразуем чертежи в продающий образ: фасады, посадка на участок, дворы, благоустройство, дневные и вечерние сцены.', $projects[5][6], 'от 40 000 ₽', '5-7 дней'],
            ['landshaftnyj-dizajn', 'Ландшафтный дизайн', 'Благоустройство участков', 'Проектируем участки под ключ: зонирование, дорожки, озеленение, дренажные решения, освещение, террасы и сценарии отдыха.', $projects[2][6], 'от 1 500 ₽/м²', '3-8 недель'],
        ])->each(fn (array $service, int $index) => Service::query()->updateOrCreate(
            ['slug' => $service[0]],
            [
                'title' => $service[1],
                'eyebrow' => $service[2],
                'text' => $service[3],
                'image' => $service[4],
                'price' => $service[5],
                'timeline' => $service[6],
                'deliverables' => "обмерный план и ТЗ\n3D-визуализация\nрабочие чертежи\nподбор материалов",
                'benefits' => "понятный бюджет\nпоэтапная оплата\nконтроль реализации\nпомощь с подрядчиками",
                'process' => "бриф\nпланировка\nвизуальная концепция\nчертежи\nсопровождение",
                'position' => $index + 1,
                'is_published' => true,
            ],
        ));

        $homePage = Page::query()->updateOrCreate(
            ['slug' => 'home'],
            ['title' => 'Главная', 'template' => 'content', 'is_published' => true],
        );

        PageBlock::query()->updateOrCreate(
            ['page_id' => $homePage->id, 'position' => 1],
            [
                'type' => 'hero',
                'eyebrow' => 'Студия дизайна интерьера и архитектуры в Самаре',
                'title' => 'Дизайн с умом.',
                'subtitle' => 'Создаем интерьеры, архитектуру, 3D-визуализацию и ландшафтные проекты: от концепции до рабочей документации, комплектации и сопровождения.',
                'link_label' => 'Обсудить проект',
                'link_href' => '/kontakty',
                'is_active' => true,
            ],
        );

        collect([
            ['o-nas', 'О нас', 'about'],
            ['partneram', 'Партнерам', 'content'],
            ['blog', 'Блог', 'blog'],
            ['user/agreement', 'Пользовательское соглашение', 'legal'],
            ['politika-konfidencialnosti', 'Политика конфиденциальности', 'legal'],
        ])->each(function (array $data): void {
            $page = Page::query()->updateOrCreate(
                ['slug' => $data[0]],
                ['title' => $data[1], 'template' => $data[2], 'is_published' => true],
            );

            PageBlock::query()->updateOrCreate(
                ['page_id' => $page->id, 'position' => 1],
                [
                    'type' => 'hero',
                    'eyebrow' => '3D Smart Design',
                    'title' => $data[1],
                    'subtitle' => 'Редактируемый блок страницы из MoonShine.',
                    'text' => 'Этот текст можно заменить в админ-панели. Дизайн остается на Next, а содержание приходит из Laravel API.',
                    'is_active' => true,
                ],
            );
        });

        collect([
            ['s-novym-2026-godom-i-rozhdestvom', 'С Новым 2026 годом и Рождеством', '15 декабря 2025', '2025-12-15', 'Студия', 'Поздравляем клиентов и партнеров, подводим итоги сезона и готовим новые проектные направления.'],
            ['odin-klik-vsya-kvartira-virtualnyj-tur-360', 'Один клик - вся квартира: виртуальный тур 360°', '20 августа 2025', '2025-08-20', 'Услуги', 'Как интерактивный тур помогает продавать, согласовывать планировки и показывать объект удаленно.'],
            ['top-5-oshibok-pri-remonte-v-samare', 'Топ-5 ошибок при ремонте в Самаре', '15 августа 2025', '2025-08-15', 'Советы', 'Неполная смета, экономия на материалах, ремонт без проекта и другие ошибки, которые дорого исправлять.'],
        ])->each(fn (array $article, int $index) => NewsArticle::query()->updateOrCreate(
            ['slug' => $article[0]],
            [
                'title' => $article[1],
                'date' => $article[2],
                'date_iso' => $article[3],
                'category' => $article[4],
                'preview' => $article[5],
                'image' => 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=2200&q=90',
                'reading_time' => '3 мин',
                'body' => $article[5]."\n\nМатериал редактируется в MoonShine и отдается во фронтенд через Laravel API.",
                'position' => $index + 1,
                'is_published' => true,
            ],
        ));

        Promo::query()->updateOrCreate(['slug' => 'interior-start'], [
            'badge' => 'Пакет',
            'title' => 'Старт дизайн-проекта',
            'highlight' => 'планировка + мудборд',
            'valid_until' => 'до 31.12.2026',
            'description' => 'Быстрый вход в проект для квартир и домов.',
            'conditions' => "обмер и техническое задание\nдо 3 планировочных решений\nколлажи по ключевым зонам",
            'image' => $projects[1][6],
            'position' => 1,
            'is_active' => true,
        ]);

        Review::query()->updateOrCreate(['name' => 'Анна и Дмитрий'], [
            'date' => '2025',
            'service' => 'Дизайн интерьера',
            'title' => 'Проект получился точным и спокойным',
            'text' => 'Команда помогла собрать понятную планировку, материалы и визуализации до начала ремонта.',
            'admin_reply' => 'Спасибо за доверие. Такие проекты особенно ценны, когда интерьер становится удобным каждый день.',
            'image' => $projects[1][6],
            'position' => 1,
            'is_published' => true,
        ]);

        collect([
            ['Сколько длится разработка проекта?', 'Эскизная концепция занимает 2-4 недели, полный дизайн-проект обычно 8-14 недель.'],
            ['Можно заказать только визуализацию?', 'Да. Для точного результата понадобятся планы, чертежи, референсы и список нужных ракурсов.'],
            ['Работаете удаленно?', 'Да. Мы ведем проекты в Самаре и удаленно: используем видео-брифы, облачные доски и подробные чертежи.'],
        ])->each(fn (array $faq, int $index) => Faq::query()->updateOrCreate(
            ['question' => $faq[0]],
            ['answer' => $faq[1], 'position' => $index + 1, 'is_published' => true],
        ));
    }
}
