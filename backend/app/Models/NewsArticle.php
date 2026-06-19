<?php

namespace App\Models;

use App\Support\HasTranslations;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class NewsArticle extends Model
{
    use HasTranslations;

    protected $guarded = [];

    protected array $translatable = [
        'title',
        'category',
        'preview',
        'body',
        'date',
        'reading_time',
    ];

    protected function casts(): array
    {
        return [
            'date_iso' => 'date',
            'is_published' => 'boolean',
        ];
    }

    public function getEffectiveImageAttribute(): ?string
    {
        if (! empty($this->image_file)) {
            return Storage::disk('public')->url($this->image_file);
        }

        return $this->image ?: null;
    }
}
