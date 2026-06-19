<?php

namespace App\Models;

use App\Support\HasTranslations;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class PageBlock extends Model
{
    use HasTranslations;

    protected $guarded = [];

    protected array $translatable = [
        'eyebrow',
        'title',
        'subtitle',
        'text',
        'link_label',
    ];

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
}
