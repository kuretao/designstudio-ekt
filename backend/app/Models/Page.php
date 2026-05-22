<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
        ];
    }

    public function blocks(): HasMany
    {
        return $this->hasMany(PageBlock::class)->orderBy('position');
    }

    public function menuItems(): HasMany
    {
        return $this->hasMany(MenuItem::class);
    }

    public function menuItem(): HasOne
    {
        return $this->hasOne(MenuItem::class)->oldest('position');
    }
}
