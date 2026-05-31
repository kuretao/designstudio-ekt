<?php

declare(strict_types=1);

namespace App\MoonShine\Support;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

final class ImageGallery
{
    private const IMAGE_EXTENSIONS = [
        'avif',
        'gif',
        'jpeg',
        'jpg',
        'png',
        'svg',
        'webp',
    ];

    /**
     * @return Collection<int, array{
     *     path: string,
     *     url: string,
     *     name: string,
     *     directory: string,
     *     size: int,
     *     updatedAt: int,
     *     updatedAtLabel: string
     * }>
     */
    public static function items(): Collection
    {
        $disk = Storage::disk('public');

        return collect($disk->allFiles())
            ->filter(static function (string $path): bool {
                $extension = Str::lower(pathinfo($path, PATHINFO_EXTENSION));

                return in_array($extension, self::IMAGE_EXTENSIONS, true);
            })
            ->map(static function (string $path) use ($disk): array {
                $timestamp = $disk->lastModified($path);

                return [
                    'path' => $path,
                    'url' => $disk->url($path),
                    'name' => basename($path),
                    'directory' => trim(dirname($path), '.'),
                    'size' => $disk->size($path),
                    'updatedAt' => $timestamp,
                    'updatedAtLabel' => date('d.m.Y H:i', $timestamp),
                ];
            })
            ->sortByDesc('updatedAt')
            ->values();
    }
}
