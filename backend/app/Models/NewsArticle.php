<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsArticle extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'date_iso' => 'date',
            'is_published' => 'boolean',
        ];
    }
}
