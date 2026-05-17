<?php

declare(strict_types=1);

namespace App\MoonShine\Support;

use MoonShine\UI\Fields\Date;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Json;
use MoonShine\UI\Fields\Number;
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
        $fields = [
            ID::make()->sortable(),
            Text::make('Site name', 'site_name')->required(),
            Text::make('Phone', 'phone'),
            Text::make('Phone href', 'phone_href'),
        ];

        return $compact ? $fields : [
            ...$fields,
            Textarea::make('Emails, one per line', 'emails'),
            Text::make('Schedule', 'schedule'),
            Textarea::make('Address', 'address'),
            Textarea::make('Map src', 'map_src'),
            Url::make('Telegram', 'telegram_url'),
            Url::make('MAX', 'max_url'),
            Url::make('LinkedIn', 'linkedin_url'),
            Url::make('Behance', 'behance_url'),
            Url::make('Pinterest', 'pinterest_url'),
            Text::make('SEO title', 'seo_title'),
            Textarea::make('SEO description', 'seo_description'),
        ];
    }

    private static function menuItem(bool $compact): array
    {
        return [
            ID::make()->sortable(),
            Text::make('Label', 'label')->required(),
            Text::make('Href', 'href')->required(),
            Number::make('Position', 'position')->sortable(),
            Switcher::make('Active', 'is_active'),
        ];
    }

    private static function page(bool $compact): array
    {
        $fields = [
            ID::make()->sortable(),
            Text::make('Slug', 'slug')->required(),
            Text::make('Title', 'title')->required(),
            Text::make('Template', 'template'),
            Switcher::make('Published', 'is_published'),
        ];

        return $compact ? $fields : [
            ...$fields,
            Text::make('SEO title', 'seo_title'),
            Textarea::make('SEO description', 'seo_description'),
        ];
    }

    private static function pageBlock(bool $compact): array
    {
        $fields = [
            ID::make()->sortable(),
            Number::make('Page ID', 'page_id')->required(),
            Text::make('Type', 'type')->required(),
            Text::make('Title', 'title'),
            Number::make('Position', 'position')->sortable(),
            Switcher::make('Active', 'is_active'),
        ];

        return $compact ? $fields : [
            ...$fields,
            Text::make('Eyebrow', 'eyebrow'),
            Textarea::make('Subtitle', 'subtitle'),
            Textarea::make('Text', 'text'),
            Textarea::make('Image URL or storage path', 'image'),
            Text::make('Link label', 'link_label'),
            Text::make('Link href', 'link_href'),
        ];
    }

    private static function project(bool $compact): array
    {
        $fields = [
            ID::make()->sortable(),
            Text::make('Slug', 'slug')->required(),
            Text::make('Title', 'title')->required(),
            Text::make('Category', 'category')->required(),
            Number::make('Position', 'position')->sortable(),
            Switcher::make('Published', 'is_published'),
        ];

        return $compact ? $fields : [
            ...$fields,
            Text::make('Location', 'location'),
            Text::make('Year', 'year'),
            Textarea::make('Description', 'description'),
            Textarea::make('Image URL or storage path', 'image'),
            Textarea::make('Before image', 'before_image'),
            Textarea::make('After image', 'after_image'),
            Switcher::make('Featured', 'is_featured'),
        ];
    }

    private static function service(bool $compact): array
    {
        $fields = [
            ID::make()->sortable(),
            Text::make('Slug', 'slug')->required(),
            Text::make('Title', 'title')->required(),
            Text::make('Price', 'price'),
            Text::make('Timeline', 'timeline'),
            Number::make('Position', 'position')->sortable(),
            Switcher::make('Published', 'is_published'),
        ];

        return $compact ? $fields : [
            ...$fields,
            Text::make('Eyebrow', 'eyebrow'),
            Textarea::make('Text', 'text'),
            Textarea::make('Image URL or storage path', 'image'),
            Textarea::make('Deliverables, one per line', 'deliverables'),
            Textarea::make('Benefits, one per line', 'benefits'),
            Textarea::make('Process, one per line', 'process'),
        ];
    }

    private static function newsArticle(bool $compact): array
    {
        $fields = [
            ID::make()->sortable(),
            Text::make('Slug', 'slug')->required(),
            Text::make('Title', 'title')->required(),
            Text::make('Category', 'category'),
            Date::make('ISO date', 'date_iso'),
            Number::make('Position', 'position')->sortable(),
            Switcher::make('Published', 'is_published'),
        ];

        return $compact ? $fields : [
            ...$fields,
            Text::make('Display date', 'date'),
            Textarea::make('Preview', 'preview'),
            Textarea::make('Image URL or storage path', 'image'),
            Text::make('Reading time', 'reading_time'),
            Textarea::make('Body', 'body'),
        ];
    }

    private static function promo(bool $compact): array
    {
        $fields = [
            ID::make()->sortable(),
            Text::make('Slug', 'slug')->required(),
            Text::make('Title', 'title')->required(),
            Text::make('Badge', 'badge'),
            Number::make('Position', 'position')->sortable(),
            Switcher::make('Active', 'is_active'),
        ];

        return $compact ? $fields : [
            ...$fields,
            Text::make('Highlight', 'highlight'),
            Text::make('Valid until', 'valid_until'),
            Textarea::make('Description', 'description'),
            Textarea::make('Conditions, one per line', 'conditions'),
            Textarea::make('Image URL or storage path', 'image'),
        ];
    }

    private static function review(bool $compact): array
    {
        $fields = [
            ID::make()->sortable(),
            Text::make('Name', 'name')->required(),
            Text::make('Service', 'service'),
            Text::make('Title', 'title'),
            Number::make('Position', 'position')->sortable(),
            Switcher::make('Published', 'is_published'),
        ];

        return $compact ? $fields : [
            ...$fields,
            Text::make('Date', 'date'),
            Textarea::make('Text', 'text'),
            Textarea::make('Admin reply', 'admin_reply'),
            Textarea::make('Image URL or storage path', 'image'),
        ];
    }

    private static function faq(bool $compact): array
    {
        return [
            ID::make()->sortable(),
            Text::make('Question', 'question')->required(),
            Textarea::make('Answer', 'answer')->required(),
            Number::make('Position', 'position')->sortable(),
            Switcher::make('Published', 'is_published'),
        ];
    }

    private static function vacancy(bool $compact): array
    {
        $fields = [
            ID::make()->sortable(),
            Text::make('Title', 'title')->required(),
            Text::make('Employment', 'employment'),
            Text::make('Location', 'location'),
            Text::make('Salary', 'salary'),
            Number::make('Position', 'position')->sortable(),
            Switcher::make('Active', 'is_active'),
        ];

        return $compact ? $fields : [
            ...$fields,
            Textarea::make('Description', 'description'),
            Textarea::make('Requirements, one per line', 'requirements'),
            Textarea::make('Responsibilities, one per line', 'responsibilities'),
        ];
    }

    private static function lead(bool $compact): array
    {
        $fields = [
            ID::make()->sortable(),
            Text::make('Source', 'source'),
            Text::make('Channel', 'channel'),
            Text::make('Name', 'name'),
            Text::make('Contact', 'contact')->required(),
            Text::make('Status', 'status'),
        ];

        return $compact ? $fields : [
            ...$fields,
            Text::make('Service', 'service'),
            Textarea::make('Message', 'message'),
            Json::make('Payload', 'payload'),
        ];
    }
}
