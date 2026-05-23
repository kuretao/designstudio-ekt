<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Lead\Pages;

use App\MoonShine\Resources\Lead\LeadResource;
use MoonShine\AssetManager\InlineCss;
use MoonShine\Contracts\AssetManager\AssetElementContract;
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\DetailPage;
use MoonShine\UI\Components\FlexibleRender;

/**
 * @extends DetailPage<LeadResource>
 */
class LeadDetailPage extends DetailPage
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
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return [];
    }

    /**
     * @return list<ComponentContract>
     */
    protected function topLayer(): array
    {
        $item = $this->getResource()->getItem();

        return [
            FlexibleRender::make($this->buildDetailHtml($item)),
            ...parent::topLayer(),
        ];
    }

    private function buildDetailHtml(mixed $item): string
    {
        if (!$item) {
            return '<p style="color:#94a3b8;padding:16px;">Запись не найдена.</p>';
        }

        $status      = $item->status ?? 'new';
        $statusLabel = self::STATUS_LABELS[$status] ?? $status;
        $name        = $item->name ? e($item->name) : null;
        $contact     = $item->contact ? e($item->contact) : null;
        $source      = $item->source ? e($item->source) : null;
        $channel     = $item->channel ? e($item->channel) : null;
        $service     = $item->service ? e($item->service) : null;
        $message     = $item->message ? e($item->message) : null;
        $createdAt   = $item->created_at?->format('d.m.Y, H:i') ?? '—';
        $updatedAt   = $item->updated_at?->format('d.m.Y, H:i') ?? '—';

        $headerName = $name
            ?? $contact
            ?? "Заявка #{$item->id}";

        $contactHtml = $contact
            ? "<div class=\"lead-header-contact\">📞 {$contact}</div>"
            : '';

        $infoCards = $this->buildInfoCards([
            'Имя клиента'  => $name,
            'Контакт'      => $contact,
            'Источник'     => $source,
            'Канал'        => $channel,
            'Услуга'       => $service,
        ]);

        $messageHtml = $message
            ? "<div class=\"lead-message-box\">{$message}</div>"
            : "<div class=\"lead-message-box lead-message-box-empty\">Сообщение не указано</div>";

        $payloadHtml = $this->buildPayloadHtml($item->payload);

        return <<<HTML
        <div class="lead-header-card">
            <div class="lead-header-left">
                <div class="lead-header-eyebrow">Заявка #{$item->id}</div>
                <div class="lead-header-name">{$headerName}</div>
                {$contactHtml}
            </div>
            <div class="lead-header-right">
                <div class="lead-header-status">{$statusLabel}</div>
                <div class="lead-header-date">Создана: {$createdAt}</div>
                <div class="lead-header-date">Изменена: {$updatedAt}</div>
            </div>
        </div>

        <div style="margin-bottom:24px;">
            <div class="lead-section-header">Сведения о клиенте</div>
            <div class="lead-info-grid">{$infoCards}</div>
        </div>

        <div style="margin-bottom:24px;">
            <div class="lead-section-header">Сообщение</div>
            {$messageHtml}
        </div>

        {$payloadHtml}
        HTML;
    }

    private function buildInfoCards(array $fields): string
    {
        $html = '';
        foreach ($fields as $label => $value) {
            $valueHtml = $value !== null
                ? "<div class=\"lead-info-card-value\">{$value}</div>"
                : "<div class=\"lead-info-card-empty\">Не указано</div>";
            $html .= <<<HTML
            <div class="lead-info-card">
                <div class="lead-info-card-label">{$label}</div>
                {$valueHtml}
            </div>
            HTML;
        }
        return $html;
    }

    private function buildPayloadHtml(mixed $payload): string
    {
        if (empty($payload)) {
            return '';
        }

        $rows = '';
        foreach ((array) $payload as $key => $value) {
            $k = e((string) $key);
            $v = is_null($value)
                ? '<span class="payload-null">null</span>'
                : '<span class="payload-value">' . e(is_array($value) ? json_encode($value, JSON_UNESCAPED_UNICODE) : (string) $value) . '</span>';
            $rows .= "<div><span class=\"payload-key\">\"{$k}\"</span>: {$v}</div>\n";
        }

        return <<<HTML
        <div style="margin-bottom:24px;">
            <div class="lead-section-header">Дополнительные данные</div>
            <div class="lead-payload-block">{$rows}</div>
        </div>
        HTML;
    }
}
