<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vacancy extends Model
{
    protected $guarded = [];

    protected static function booted(): void
    {
        static::saving(static function (Vacancy $vacancy): void {
            foreach ([
                'title',
                'employment',
                'location',
                'salary',
                'description',
                'requirements',
                'responsibilities',
            ] as $field) {
                $ruField = $field . '_ru';

                if (blank($vacancy->{$ruField}) && filled($vacancy->{$field})) {
                    $vacancy->{$ruField} = $vacancy->{$field};
                }

                if (blank($vacancy->{$field}) && filled($vacancy->{$ruField})) {
                    $vacancy->{$field} = $vacancy->{$ruField};
                }
            }
        });
    }

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function localizedField(string $field, string $locale): ?string
    {
        $localized = $field . '_' . $locale;

        return filled($this->{$localized})
            ? $this->{$localized}
            : (filled($this->{$field}) ? $this->{$field} : null);
    }

    public function fieldRu(string $field): ?string
    {
        return $this->localizedField($field, 'ru');
    }

    public function fieldEn(string $field): ?string
    {
        return filled($this->{$field . '_en'}) ? $this->{$field . '_en'} : null;
    }
}
