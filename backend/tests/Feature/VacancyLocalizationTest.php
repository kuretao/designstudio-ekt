<?php

namespace Tests\Feature;

use App\Models\Vacancy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VacancyLocalizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_all_payload_contains_ru_and_en_vacancy_versions(): void
    {
        Vacancy::query()->create([
            'title_ru' => 'Дизайнер интерьера',
            'title_en' => 'Interior Designer',
            'employment_ru' => 'Удаленно',
            'employment_en' => 'Remote',
            'location_ru' => 'Самара',
            'location_en' => 'Samara',
            'salary_ru' => 'от 90 000 ₽',
            'salary_en' => 'from 90,000 RUB',
            'description_ru' => 'Описание вакансии.',
            'description_en' => 'Vacancy description.',
            'requirements_ru' => "портфолио\nопыт",
            'requirements_en' => "portfolio\nexperience",
            'responsibilities_ru' => "вести проект\nготовить ТЗ",
            'responsibilities_en' => "manage a project\nprepare briefs",
            'position' => 1,
            'is_active' => true,
        ]);

        $this->getJson('/api/v1/all')
            ->assertOk()
            ->assertJsonPath('vacancies.0.titleRu', 'Дизайнер интерьера')
            ->assertJsonPath('vacancies.0.titleEn', 'Interior Designer')
            ->assertJsonPath('vacancies.0.employmentRu', 'Удаленно')
            ->assertJsonPath('vacancies.0.employmentEn', 'Remote')
            ->assertJsonPath('vacancies.0.descriptionRu', 'Описание вакансии.')
            ->assertJsonPath('vacancies.0.descriptionEn', 'Vacancy description.')
            ->assertJsonPath('vacancies.0.requirementsRu.0', 'портфолио')
            ->assertJsonPath('vacancies.0.requirementsEn.0', 'portfolio')
            ->assertJsonPath('vacancies.0.responsibilitiesRu.0', 'вести проект')
            ->assertJsonPath('vacancies.0.responsibilitiesEn.0', 'manage a project');
    }
}
