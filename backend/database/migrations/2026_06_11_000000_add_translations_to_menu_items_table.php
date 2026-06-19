<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('menu_items', function (Blueprint $table): void {
            $table->string('label_ru')->nullable()->after('label');
            $table->string('label_en')->nullable()->after('label_ru');
            $table->text('description_ru')->nullable()->after('description');
            $table->text('description_en')->nullable()->after('description_ru');
        });

        $translations = $this->translations();

        DB::table('menu_items')
            ->orderBy('id')
            ->get(['id', 'href', 'label', 'description'])
            ->each(static function (object $item) use ($translations): void {
                $translation = $translations[$item->href] ?? [];

                DB::table('menu_items')
                    ->where('id', $item->id)
                    ->update([
                        'label_ru' => $item->label,
                        'label_en' => $translation['label_en'] ?? null,
                        'description_ru' => $item->description,
                        'description_en' => $translation['description_en'] ?? null,
                        'updated_at' => now(),
                    ]);
            });
    }

    public function down(): void
    {
        Schema::table('menu_items', function (Blueprint $table): void {
            $table->dropColumn([
                'label_ru',
                'label_en',
                'description_ru',
                'description_en',
            ]);
        });
    }

    private function translations(): array
    {
        return [
            '/o-nas' => ['label_en' => 'About Us'],
            '/portfolio' => ['label_en' => 'Portfolio'],
            '/services' => ['label_en' => 'Services'],
            '/kontakty' => ['label_en' => 'Contacts'],
            '/akcii-i-skidki' => ['label_en' => 'Promotions'],
            '/novosti' => ['label_en' => 'News'],
            '/blog' => ['label_en' => 'Blog'],
            '/otzyvy-o-nas' => ['label_en' => 'Reviews'],
            '/karera' => ['label_en' => 'Careers'],
            '/partneram' => ['label_en' => 'Partners'],
            '/nagrady-i-diplomy' => ['label_en' => 'Awards and Diplomas'],
            '/politika-konfidencialnosti' => ['label_en' => 'Privacy Policy'],
            '/user/agreement' => ['label_en' => 'User Agreement'],
            '/arhitekturnoe-proektirovanie' => [
                'label_en' => 'Architectural Design',
                'description_en' => 'Concept, facades, building massing, and working documentation for contractors.',
            ],
            '/eskiznyj-proekt' => ['label_en' => 'Concept Design'],
            '/rabochaya-dokumentaciya' => ['label_en' => 'Working Documentation'],
            '/dizajn-interyera' => [
                'label_en' => 'Interior Design',
                'description_en' => 'Residential and commercial interiors, procurement, and author supervision.',
            ],
            '/dizajn-interyera-chastnyh-prostranstv' => ['label_en' => 'Private Interior Design'],
            '/dizajn-interera-kommercheskogo-prostranstva' => ['label_en' => 'Commercial Interior Design'],
            '/komplektaciya-ob-ekta' => ['label_en' => 'Project Procurement'],
            '/avtorskij-nadzor' => ['label_en' => 'Author Supervision'],
            '/3d-vizualizaciya' => [
                'label_en' => '3D Visualization',
                'description_en' => 'Renders, architectural and interior visualization, and interactive 360° tours.',
            ],
            '/arhitekturnaya-3d-vizualizaciya' => ['label_en' => 'Architectural 3D Visualization for Residential Developments'],
            '/arhitekturnaya-3d-vizualizaciya-kottedzhej' => ['label_en' => 'Architectural 3D Visualization for Cottages'],
            '/interernaya-3d-vizualizaciya' => ['label_en' => 'Interior 3D Visualization'],
            '/virtualnyj-3d-tur-360' => ['label_en' => 'Virtual 3D Tours 360°'],
            '/landshaftnyj-dizajn' => [
                'label_en' => 'Landscape Design',
                'description_en' => 'Master plan, engineering solutions, planting, and implementation supervision.',
            ],
            '/landshaftnoe-proektirovanie-i-genplan' => ['label_en' => 'Landscape Planning and Master Plan'],
            '/proektirovanie-inzhenernyh-sistem' => ['label_en' => 'Engineering Systems Design'],
            '/ozelenenie-i-dendroplan' => ['label_en' => 'Planting Plan and Dendrology'],
            '/avtorskij-nadzor-i-realizaciya' => ['label_en' => 'Author Supervision and Implementation'],
        ];
    }
};
