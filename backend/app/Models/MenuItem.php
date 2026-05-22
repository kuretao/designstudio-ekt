<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MenuItem extends Model
{
    protected $guarded = [];

    protected $with = ['page'];

    protected static function booted(): void
    {
        static::saving(static function (MenuItem $menuItem): void {
            if ($menuItem->page_id === null) {
                return;
            }

            $page = Page::query()->find($menuItem->page_id);

            if ($page === null) {
                return;
            }

            if (blank($menuItem->label)) {
                $menuItem->label = $page->title;
            }

            if (blank($menuItem->href)) {
                $menuItem->href = '/' . ltrim($page->slug, '/');
            }
        });
    }

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class);
    }

    public function siteHref(): ?string
    {
        if ($this->page_id !== null) {
            $page = $this->relationLoaded('page')
                ? $this->getRelation('page')
                : $this->page()->first();

            if (! $page?->is_published) {
                return null;
            }

            return '/' . ltrim($page->slug, '/');
        }

        return filled($this->href) ? $this->href : null;
    }
}
