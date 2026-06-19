<?php

namespace Tests\Feature;

use App\MoonShine\Support\CmsFieldSets;
use Tests\TestCase;

class CmsAdminFieldSetsTest extends TestCase
{
    public function test_translatable_admin_forms_expose_ru_and_en_fields(): void
    {
        $expectedColumns = [
            'page' => [
                'title_ru',
                'title_en',
                'body_ru',
                'body_en',
                'seo_title_ru',
                'seo_title_en',
                'seo_description_ru',
                'seo_description_en',
                'menu_label_ru',
                'menu_label_en',
            ],
            'page_block' => [
                'eyebrow_ru',
                'eyebrow_en',
                'title_ru',
                'title_en',
                'subtitle_ru',
                'subtitle_en',
                'text_ru',
                'text_en',
                'link_label_ru',
                'link_label_en',
            ],
            'project' => [
                'title_ru',
                'title_en',
                'category_ru',
                'category_en',
                'location_ru',
                'location_en',
                'description_ru',
                'description_en',
            ],
            'service' => [
                'title_ru',
                'title_en',
                'price_ru',
                'price_en',
                'timeline_ru',
                'timeline_en',
                'eyebrow_ru',
                'eyebrow_en',
                'text_ru',
                'text_en',
                'deliverables_ru',
                'deliverables_en',
                'benefits_ru',
                'benefits_en',
                'process_ru',
                'process_en',
            ],
            'news_article' => [
                'title_ru',
                'title_en',
                'category_ru',
                'category_en',
                'date_ru',
                'date_en',
                'preview_ru',
                'preview_en',
                'reading_time_ru',
                'reading_time_en',
                'body_ru',
                'body_en',
            ],
            'review' => [
                'name_ru',
                'name_en',
                'service_ru',
                'service_en',
                'title_ru',
                'title_en',
                'date_ru',
                'date_en',
                'text_ru',
                'text_en',
                'admin_reply_ru',
                'admin_reply_en',
            ],
            'promo' => [
                'title_ru',
                'title_en',
                'badge_ru',
                'badge_en',
                'highlight_ru',
                'highlight_en',
                'valid_until_ru',
                'valid_until_en',
                'description_ru',
                'description_en',
                'conditions_ru',
                'conditions_en',
            ],
            'award' => [
                'title_ru',
                'title_en',
                'issuer_ru',
                'issuer_en',
                'description_ru',
                'description_en',
            ],
        ];

        foreach ($expectedColumns as $resource => $columns) {
            $actualColumns = $this->fieldColumns(CmsFieldSets::for($resource));

            foreach ($columns as $column) {
                $this->assertContains(
                    $column,
                    $actualColumns,
                    sprintf('Missing [%s] field on [%s] admin form.', $column, $resource),
                );
            }
        }
    }

    private function fieldColumns(array $fields): array
    {
        return array_values(array_filter(array_map(
            static fn (mixed $field): ?string => is_object($field) && method_exists($field, 'getColumn')
                ? $field->getColumn()
                : null,
            $fields,
        )));
    }
}
