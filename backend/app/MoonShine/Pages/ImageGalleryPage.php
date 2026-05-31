<?php

declare(strict_types=1);

namespace App\MoonShine\Pages;

use App\MoonShine\Support\ImageGallery;
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\Laravel\Pages\Page;
use MoonShine\UI\Components\FlexibleRender;

#[\MoonShine\MenuManager\Attributes\SkipMenu]
class ImageGalleryPage extends Page
{
    public function getBreadcrumbs(): array
    {
        return ['#' => $this->getTitle()];
    }

    public function getTitle(): string
    {
        return $this->title ?: 'Галерея';
    }

    /**
     * @return list<ComponentContract>
     */
    protected function components(): iterable
    {
        return [
            FlexibleRender::make($this->buildGalleryHtml()),
        ];
    }

    private function buildGalleryHtml(): string
    {
        $images = ImageGallery::items();
        $totalSize = (int) $images->sum('size');
        $directories = $images
            ->pluck('directory')
            ->map(static fn (string $directory): string => $directory !== '' ? $directory : 'Корень')
            ->unique()
            ->sort()
            ->values();

        $directoryChips = $directories->isNotEmpty()
            ? $directories->map(static fn (string $directory): string => '<span class="gallery-page__chip">' . e($directory) . '</span>')->implode('')
            : '<span class="gallery-page__chip">Папок пока нет</span>';

        $cards = $images->isNotEmpty()
            ? $images->map(fn (array $image): string => $this->imageCard($image))->implode('')
            : $this->emptyState();

        $imagesCount = $images->count();
        $directoriesCount = $directories->count();
        $formattedSize = $this->formatSize($totalSize);

        return <<<HTML
        <section class="gallery-page">
            <div class="gallery-page__hero">
                <div class="gallery-page__intro">
                    <p class="gallery-page__eyebrow">Медиафайлы</p>
                    <h1>Галерея изображений</h1>
                    <p>Все изображения из публичного хранилища, которые можно выбрать в формах услуг, новостей, акций и других разделов.</p>
                </div>

                <div class="gallery-page__stats" aria-label="Статистика галереи">
                    <div class="gallery-page__stat">
                        <span>{$imagesCount}</span>
                        <strong>изображений</strong>
                    </div>
                    <div class="gallery-page__stat">
                        <span>{$directoriesCount}</span>
                        <strong>папок</strong>
                    </div>
                    <div class="gallery-page__stat">
                        <span>{$formattedSize}</span>
                        <strong>общий размер</strong>
                    </div>
                </div>
            </div>

            <div class="gallery-page__folders">
                {$directoryChips}
            </div>

            <div class="gallery-page__grid">
                {$cards}
            </div>
        </section>
        HTML;
    }

    /**
     * @param array{
     *     path: string,
     *     url: string,
     *     name: string,
     *     directory: string,
     *     size: int,
     *     updatedAt: int,
     *     updatedAtLabel: string
     * } $image
     */
    private function imageCard(array $image): string
    {
        $name = e($image['name']);
        $path = e($image['path']);
        $url = e($image['url']);
        $directory = e($image['directory'] !== '' ? $image['directory'] : 'Корень');
        $meta = e($this->formatSize((int) $image['size']) . ' · ' . $image['updatedAtLabel']);

        return <<<HTML
        <article class="gallery-page-card">
            <a class="gallery-page-card__preview" href="{$url}" target="_blank" rel="noopener">
                <img src="{$url}" alt="{$name}" loading="lazy">
            </a>
            <div class="gallery-page-card__body">
                <strong title="{$name}">{$name}</strong>
                <span>{$directory}</span>
                <code title="{$path}">{$path}</code>
                <small>{$meta}</small>
            </div>
        </article>
        HTML;
    }

    private function emptyState(): string
    {
        return <<<HTML
        <div class="gallery-page__empty">
            <strong>В галерее пока нет изображений</strong>
            <span>Загрузите файл в любом поле изображения, и он появится здесь.</span>
        </div>
        HTML;
    }

    private function formatSize(int $bytes): string
    {
        if ($bytes <= 0) {
            return '0 Б';
        }

        $units = ['Б', 'КБ', 'МБ', 'ГБ'];
        $index = min((int) floor(log($bytes, 1024)), count($units) - 1);
        $value = $bytes / (1024 ** $index);

        return number_format($value, $index === 0 ? 0 : 1, ',', ' ') . ' ' . $units[$index];
    }
}
