<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('vacancies', function (Blueprint $table): void {
            $table->string('title_ru')->nullable()->after('title');
            $table->string('title_en')->nullable()->after('title_ru');
            $table->string('employment_ru')->nullable()->after('employment');
            $table->string('employment_en')->nullable()->after('employment_ru');
            $table->string('location_ru')->nullable()->after('location');
            $table->string('location_en')->nullable()->after('location_ru');
            $table->string('salary_ru')->nullable()->after('salary');
            $table->string('salary_en')->nullable()->after('salary_ru');
            $table->longText('description_ru')->nullable()->after('description');
            $table->longText('description_en')->nullable()->after('description_ru');
            $table->longText('requirements_ru')->nullable()->after('requirements');
            $table->longText('requirements_en')->nullable()->after('requirements_ru');
            $table->longText('responsibilities_ru')->nullable()->after('responsibilities');
            $table->longText('responsibilities_en')->nullable()->after('responsibilities_ru');
        });

        $translations = $this->translations();

        DB::table('vacancies')
            ->orderBy('id')
            ->get([
                'id',
                'title',
                'employment',
                'location',
                'salary',
                'description',
                'requirements',
                'responsibilities',
            ])
            ->each(static function (object $vacancy) use ($translations): void {
                $translation = $translations[$vacancy->title] ?? [];

                DB::table('vacancies')
                    ->where('id', $vacancy->id)
                    ->update([
                        'title_ru' => $vacancy->title,
                        'title_en' => $translation['title_en'] ?? null,
                        'employment_ru' => $vacancy->employment,
                        'employment_en' => $translation['employment_en'] ?? null,
                        'location_ru' => $vacancy->location,
                        'location_en' => $translation['location_en'] ?? null,
                        'salary_ru' => $vacancy->salary,
                        'salary_en' => $translation['salary_en'] ?? null,
                        'description_ru' => $vacancy->description,
                        'description_en' => $translation['description_en'] ?? null,
                        'requirements_ru' => $vacancy->requirements,
                        'requirements_en' => $translation['requirements_en'] ?? null,
                        'responsibilities_ru' => $vacancy->responsibilities,
                        'responsibilities_en' => $translation['responsibilities_en'] ?? null,
                        'updated_at' => now(),
                    ]);
            });
    }

    public function down(): void
    {
        Schema::table('vacancies', function (Blueprint $table): void {
            $table->dropColumn([
                'title_ru',
                'title_en',
                'employment_ru',
                'employment_en',
                'location_ru',
                'location_en',
                'salary_ru',
                'salary_en',
                'description_ru',
                'description_en',
                'requirements_ru',
                'requirements_en',
                'responsibilities_ru',
                'responsibilities_en',
            ]);
        });
    }

    private function translations(): array
    {
        return [
            'Дизайнер интерьера' => [
                'title_en' => 'Interior Designer',
                'employment_en' => 'Hybrid / remote',
                'location_en' => 'Samara or another city',
                'salary_en' => 'from 90,000 RUB + project bonus',
                'description_en' => 'For residential projects: layouts, concepts, 3D task setting, and confident client communication.',
                'requirements_en' => "portfolio of completed or deeply developed interiors\nunderstanding of ergonomics, materials, and construction details\ncalm, precise client communication",
                'responsibilities_en' => "manage a project from brief to working documentation\nassemble moodboards and concept solutions\nprepare tasks for visualizers and adjacent specialists",
            ],
            '3D-визуализатор интерьеров' => [
                'title_en' => 'Interior 3D Visualizer',
                'employment_en' => 'Remote',
                'location_en' => 'Any city',
                'salary_en' => 'piecework, from 3,500 RUB per view',
                'description_en' => 'We need someone with careful lighting, materials, and attention to atmosphere, not just geometry.',
                'requirements_en' => "3ds Max + Corona/V-Ray or a comparable stack\nclean scenes and clear file organization\na feel for natural materials, light, and composition",
                'responsibilities_en' => "create photorealistic interior views\nwork from designer briefs and references\nprepare quick previews and final renders",
            ],
            'Архитектор-проектировщик' => [
                'title_en' => 'Architectural Designer',
                'employment_en' => 'Project-based',
                'location_en' => 'Samara / remote',
                'salary_en' => 'discussed per project',
                'description_en' => 'For cottages and small commercial properties: facades, planning logic, and working solutions.',
                'requirements_en' => "confident work in Archicad/Revit or AutoCAD\nunderstanding of structural and engineering logic\nportfolio of private homes or commercial properties",
                'responsibilities_en' => "develop planning and facade concepts\nprepare drawing sets for approval\ncoordinate with visualizers and designers",
            ],
            'Менеджер дизайн-проектов' => [
                'title_en' => 'Design Project Manager',
                'employment_en' => 'Hybrid',
                'location_en' => 'Samara',
                'salary_en' => 'from 80,000 RUB',
                'description_en' => 'A person who keeps timelines, documents, and communication steady so designers can focus on design.',
                'requirements_en' => "experience in design, renovation, architecture, or a related field\nstructure and tactful persistence\nability to turn chaos into a clear action list",
                'responsibilities_en' => "manage project schedules and stage control\ncollect inputs from clients and the team\nprepare statuses, invoices, and simple project documentation",
            ],
            'Специалист по комплектации' => [
                'title_en' => 'Procurement Specialist',
                'employment_en' => 'Hybrid / part-time',
                'location_en' => 'Samara',
                'salary_en' => 'fixed pay + bonus',
                'description_en' => 'For selecting materials, furniture, lighting, and suppliers without random decisions or missed deadlines.',
                'requirements_en' => "knowledge of the finishing materials and furniture market\nattention to SKUs, timelines, and prices\nability to suggest alternatives without losing the visual idea",
                'responsibilities_en' => "select items for the concept and budget\nmaintain tables, alternatives, and order statuses\ncommunicate with showrooms, suppliers, and contractors",
            ],
        ];
    }
};
