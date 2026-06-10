<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Partner extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function getEffectiveLogoAttribute(): ?string
    {
        if (! empty($this->logo_file)) {
            return Storage::disk('public')->url($this->logo_file);
        }

        return $this->logo ?: null;
    }
}
