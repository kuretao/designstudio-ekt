<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UiText extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function valueRu(): string
    {
        return (string) ($this->value_ru ?? '');
    }

    public function valueEn(): ?string
    {
        return filled($this->value_en) ? $this->value_en : null;
    }
}
