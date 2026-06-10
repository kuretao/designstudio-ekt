<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Award extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
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
