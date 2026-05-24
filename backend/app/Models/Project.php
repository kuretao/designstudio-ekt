<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Project extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
        ];
    }

    public function getEffectiveImageAttribute(): ?string
    {
        return ! empty($this->image_file)
            ? Storage::disk('public')->url($this->image_file)
            : ($this->image ?: null);
    }

    public function getEffectiveBeforeImageAttribute(): ?string
    {
        return ! empty($this->before_image_file)
            ? Storage::disk('public')->url($this->before_image_file)
            : ($this->before_image ?: null);
    }

    public function getEffectiveAfterImageAttribute(): ?string
    {
        return ! empty($this->after_image_file)
            ? Storage::disk('public')->url($this->after_image_file)
            : ($this->after_image ?: null);
    }
}
