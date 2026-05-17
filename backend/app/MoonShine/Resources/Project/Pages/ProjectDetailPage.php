<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Project\Pages;

use App\MoonShine\Resources\Project\ProjectResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\DetailPage;

/**
 * @extends DetailPage<ProjectResource>
 */
class ProjectDetailPage extends DetailPage
{
    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return CmsFieldSets::for('project');
    }
}
