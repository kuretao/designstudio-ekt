<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Lead\Pages;

use App\MoonShine\Resources\Lead\LeadResource;
use MoonShine\AssetManager\InlineCss;
use MoonShine\Contracts\AssetManager\AssetElementContract;
use MoonShine\Contracts\Core\TypeCasts\DataWrapperContract;
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\FormPage;
use MoonShine\UI\Components\FlexibleRender;
use MoonShine\UI\Components\Layout\Box;
use MoonShine\UI\Components\Layout\Grid;
use MoonShine\UI\Components\Layout\Column;
use MoonShine\UI\Fields\Json;
use MoonShine\UI\Fields\Select;
use MoonShine\UI\Fields\Text;
use MoonShine\UI\Fields\Textarea;

/**
 * @extends FormPage<LeadResource>
 */
class LeadFormPage extends FormPage
{
    /**
     * @return list<AssetElementContract>
     */
    protected function assets(): array
    {
        return [
            ...parent::assets(),
            InlineCss::make((string) file_get_contents(public_path('css/lead-admin.css'))),
        ];
    }

    private const STATUS_LABELS = [
        'new'         => 'Новая',
        'in_progress' => 'В работе',
        'processed'   => 'Обработана',
        'closed'      => 'Закрыта',
    ];

    /**
     * @return list<ComponentContract|FieldContract>
     */
    protected function fields(): iterable
    {
        $item = $this->getResource()->getItem();

        return [
            FlexibleRender::make($this->buildHeaderHtml($item)),

            Box::make('Контактные данные', [
                Grid::make([
                    Column::make([
                        Text::make('Имя клиента', 'name'),
                        Text::make('Контакт (телефон / email)', 'contact')->required(),
                    ])->columnSpan(6),
                    Column::make([
                        Text::make('Источник', 'source'),
                        Text::make('Канал привлечения', 'channel'),
                    ])->columnSpan(6),
                ]),
            ]),

            Box::make('Детали запроса', [
                Text::make('Услуга / направление', 'service'),
                Textarea::make('Сообщение от клиента', 'message'),
                Json::make('Дополнительные данные (payload)', 'payload'),
            ]),

            Box::make('Управление заявкой', [
                Select::make('Статус', 'status')
                    ->options([
                        'new'         => '🔵 Новая',
                        'in_progress' => '🟡 В работе',
                        'processed'   => '🟢 Обработана',
                        'closed'      => '⚫ Закрыта',
                    ])
                    ->default('new'),
            ]),
        ];
    }

    private function buildHeaderHtml(mixed $item): string
    {
        if (!$item || !$item->exists) {
            return <<<HTML
            <div class="lead-header-card">
                <div class="lead-header-left">
                    <div class="lead-header-eyebrow">Новая запись</div>
                    <div class="lead-header-name">Создание заявки</div>
                </div>
            </div>
            HTML;
        }

        $status      = $item->status ?? 'new';
        $statusLabel = self::STATUS_LABELS[$status] ?? $status;
        $name        = $item->name
            ? e($item->name)
            : '<em style="opacity:0.65;font-weight:400;font-style:italic">Имя не указано</em>';
        $contact     = $item->contact ? e($item->contact) : '';
        $source      = e($item->source ?? '—');
        $channel     = e($item->channel ?? '—');
        $createdAt   = $item->created_at?->format('d.m.Y, H:i') ?? '—';
        $updatedAt   = $item->updated_at?->format('d.m.Y, H:i') ?? '—';

        $contactHtml = $contact
            ? "<div class=\"lead-header-contact\">📞 {$contact}</div>"
            : '';

        return <<<HTML
        <div class="lead-header-card">
            <div class="lead-header-left">
                <div class="lead-header-eyebrow">Заявка&nbsp;#{$item->id} &nbsp;·&nbsp; {$source} / {$channel}</div>
                <div class="lead-header-name">{$name}</div>
                {$contactHtml}
            </div>
            <div class="lead-header-right">
                <div class="lead-header-status">{$statusLabel}</div>
                <div class="lead-header-date">Создана: {$createdAt}</div>
                <div class="lead-header-date">Изменена: {$updatedAt}</div>
            </div>
        </div>
        HTML;
    }

    protected function rules(DataWrapperContract $item): array
    {
        return [];
    }
}
