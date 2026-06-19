<?php

namespace App\Models;

use App\Support\HasTranslations;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasTranslations;

    protected $guarded = [];

    protected array $translatable = [
        'name',
        'date',
        'service',
        'title',
        'text',
        'admin_reply',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
        ];
    }
}
