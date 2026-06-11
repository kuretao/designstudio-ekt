<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    protected $guarded = [];

    protected static function booted(): void
    {
        static::saving(static function (Faq $faq): void {
            if (blank($faq->question_ru) && filled($faq->question)) {
                $faq->question_ru = $faq->question;
            }

            if (blank($faq->answer_ru) && filled($faq->answer)) {
                $faq->answer_ru = $faq->answer;
            }

            if (blank($faq->question) && filled($faq->question_ru)) {
                $faq->question = $faq->question_ru;
            }

            if (blank($faq->answer) && filled($faq->answer_ru)) {
                $faq->answer = $faq->answer_ru;
            }
        });
    }

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
        ];
    }

    public function questionRu(): string
    {
        return $this->question_ru ?: $this->question;
    }

    public function questionEn(): ?string
    {
        return filled($this->question_en) ? $this->question_en : null;
    }

    public function answerRu(): string
    {
        return $this->answer_ru ?: $this->answer;
    }

    public function answerEn(): ?string
    {
        return filled($this->answer_en) ? $this->answer_en : null;
    }
}
