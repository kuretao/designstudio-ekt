<?php

declare(strict_types=1);

namespace App\MoonShine\Resources\Project\Pages;

use App\MoonShine\Resources\Project\ProjectResource;
use App\MoonShine\Support\CmsFieldSets;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Pages\Crud\IndexPage;

/**
 * @extends IndexPage<ProjectResource>
 */
class ProjectIndexPage extends IndexPage
{
    protected bool $isLazy = true;

    /**
     * @return list<FieldContract>
     */
    protected function fields(): iterable
    {
        return CmsFieldSets::for('project', 'index');
    }
}
