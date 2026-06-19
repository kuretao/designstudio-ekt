<?php

namespace App\Models;

use App\Support\HasTranslations;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Partner extends Model
{
    use HasTranslations;

    protected $guarded = [];

    protected array $translatable = [
        'name',
        'note',
    ];

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
