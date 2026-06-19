<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UiTextPayloadTest extends TestCase
{
    use RefreshDatabase;

    public function test_cms_payload_contains_editable_ru_and_en_ui_texts(): void
    {
        $this->getJson('/api/v1/all')
            ->assertOk()
            ->assertJsonPath('uiTexts.header\.mainMenuAria.ru', 'Основное меню')
            ->assertJsonPath('uiTexts.header\.mainMenuAria.en', 'Main menu')
            ->assertJsonPath('uiTexts.quiz\.interior\.object\.option1\.label.ru', 'Квартира в новостройке')
            ->assertJsonPath('uiTexts.styleLab\.styles\.minimal\.label.en', 'Modern');
    }
}
