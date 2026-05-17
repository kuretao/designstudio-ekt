<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreLeadRequest;
use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\Lead;
use App\Models\MenuItem;
use App\Models\NewsArticle;
use App\Models\Page;
use App\Models\Project;
use App\Models\Promo;
use App\Models\Review;
use App\Models\Service;
use App\Models\SiteSetting;
use App\Models\Vacancy;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CmsController extends Controller
{
    public function bootstrap(): JsonResponse
    {
        $settings = SiteSetting::query()->first();

        return response()->json([
            'settings' => $this->settings($settings),
            'menuItems' => MenuItem::query()
                ->where('is_active', true)
                ->orderBy('position')
                ->get(['label', 'href']),
        ]);
    }

    public function all(): JsonResponse
    {
        return response()->json([
            'settings' => $this->settings(SiteSetting::query()->first()),
            'menuItems' => MenuItem::query()->where('is_active', true)->orderBy('position')->get(['label', 'href']),
            'pages' => Page::query()->where('is_published', true)->with(['blocks' => fn ($query) => $query->where('is_active', true)])->get()->map(fn (Page $page) => $this->pagePayload($page))->values(),
            'projects' => Project::query()->where('is_published', true)->orderBy('position')->get()->map(fn (Project $project) => $this->projectPayload($project))->values(),
            'services' => Service::query()->where('is_published', true)->orderBy('position')->get()->map(fn (Service $service) => $this->servicePayload($service))->values(),
            'news' => NewsArticle::query()->where('is_published', true)->orderBy('position')->get()->map(fn (NewsArticle $article) => $this->newsPayload($article))->values(),
            'promos' => Promo::query()->where('is_active', true)->orderBy('position')->get()->map(fn (Promo $promo) => $this->promoPayload($promo))->values(),
            'reviews' => Review::query()->where('is_published', true)->orderBy('position')->get()->map(fn (Review $review) => $this->reviewPayload($review))->values(),
            'faqs' => Faq::query()->where('is_published', true)->orderBy('position')->get()->map(fn (Faq $faq) => ['q' => $faq->question, 'a' => $faq->answer])->values(),
            'vacancies' => Vacancy::query()->where('is_active', true)->orderBy('position')->get(),
        ]);
    }

    public function page(string $slug): JsonResponse
    {
        $page = Page::query()
            ->where('slug', $slug)
            ->where('is_published', true)
            ->with(['blocks' => fn ($query) => $query->where('is_active', true)])
            ->firstOrFail();

        return response()->json($this->pagePayload($page));
    }

    public function projects(): JsonResponse
    {
        return response()->json(Project::query()->where('is_published', true)->orderBy('position')->get()->map(fn (Project $project) => $this->projectPayload($project))->values());
    }

    public function project(string $slug): JsonResponse
    {
        return response()->json($this->projectPayload(Project::query()->where('slug', $slug)->where('is_published', true)->firstOrFail()));
    }

    public function services(): JsonResponse
    {
        return response()->json(Service::query()->where('is_published', true)->orderBy('position')->get()->map(fn (Service $service) => $this->servicePayload($service))->values());
    }

    public function service(string $slug): JsonResponse
    {
        return response()->json($this->servicePayload(Service::query()->where('slug', $slug)->where('is_published', true)->firstOrFail()));
    }

    public function news(): JsonResponse
    {
        return response()->json(NewsArticle::query()->where('is_published', true)->orderBy('position')->get()->map(fn (NewsArticle $article) => $this->newsPayload($article))->values());
    }

    public function newsArticle(string $slug): JsonResponse
    {
        return response()->json($this->newsPayload(NewsArticle::query()->where('slug', $slug)->where('is_published', true)->firstOrFail()));
    }

    public function promos(): JsonResponse
    {
        return response()->json(Promo::query()->where('is_active', true)->orderBy('position')->get()->map(fn (Promo $promo) => $this->promoPayload($promo))->values());
    }

    public function reviews(): JsonResponse
    {
        return response()->json(Review::query()->where('is_published', true)->orderBy('position')->get()->map(fn (Review $review) => $this->reviewPayload($review))->values());
    }

    public function faqs(): JsonResponse
    {
        return response()->json(Faq::query()->where('is_published', true)->orderBy('position')->get()->map(fn (Faq $faq) => ['q' => $faq->question, 'a' => $faq->answer])->values());
    }

    public function storeLead(StoreLeadRequest $request): JsonResponse
    {
        $lead = Lead::query()->create([
            'source' => $request->string('source')->value() ?: 'site',
            'channel' => $request->input('channel'),
            'name' => $request->input('name'),
            'contact' => $request->input('contact'),
            'service' => $request->input('service'),
            'message' => $request->input('message'),
            'payload' => $request->input('payload'),
        ]);

        return response()->json(['id' => $lead->id, 'status' => 'ok'], 201);
    }

    private function settings(?SiteSetting $settings): array
    {
        return [
            'siteName' => $settings?->site_name ?? '3D Smart Design Studio',
            'phone' => $settings?->phone,
            'phoneHref' => $settings?->phone_href,
            'emails' => $this->lines($settings?->emails),
            'schedule' => $settings?->schedule,
            'address' => $settings?->address,
            'mapSrc' => $settings?->map_src,
            'seoTitle' => $settings?->seo_title,
            'seoDescription' => $settings?->seo_description,
            'messengers' => [
                'telegram' => $settings?->telegram_url,
                'max' => $settings?->max_url,
                'phoneHref' => $settings?->phone_href,
            ],
            'socials' => [
                'linkedin' => $settings?->linkedin_url,
                'behance' => $settings?->behance_url,
                'pinterest' => $settings?->pinterest_url,
            ],
        ];
    }

    private function pagePayload(Page $page): array
    {
        return [
            'id' => $page->slug,
            'slug' => $page->slug,
            'title' => $page->title,
            'template' => $page->template,
            'seoTitle' => $page->seo_title,
            'seoDescription' => $page->seo_description,
            'blocks' => $page->blocks->map(fn ($block) => [
                'type' => $block->type,
                'eyebrow' => $block->eyebrow,
                'title' => $block->title,
                'subtitle' => $block->subtitle,
                'text' => $block->text,
                'image' => $block->image,
                'linkLabel' => $block->link_label,
                'linkHref' => $block->link_href,
            ])->values(),
        ];
    }

    private function projectPayload(Project $project): array
    {
        return [
            'id' => $project->id,
            'slug' => $project->slug,
            'title' => $project->title,
            'category' => $project->category,
            'location' => $project->location,
            'year' => $project->year,
            'description' => $project->description,
            'image' => $project->image,
            'beforeImage' => $project->before_image,
            'afterImage' => $project->after_image,
            'isFeatured' => $project->is_featured,
        ];
    }

    private function servicePayload(Service $service): array
    {
        return [
            'id' => $service->slug,
            'slug' => $service->slug,
            'title' => $service->title,
            'eyebrow' => $service->eyebrow,
            'text' => $service->text,
            'image' => $service->image,
            'price' => $service->price,
            'timeline' => $service->timeline,
            'deliverables' => $this->lines($service->deliverables),
            'benefits' => $this->lines($service->benefits),
            'process' => $this->lines($service->process),
        ];
    }

    private function newsPayload(NewsArticle $article): array
    {
        return [
            'slug' => $article->slug,
            'title' => $article->title,
            'date' => $article->date,
            'dateIso' => $article->date_iso?->toDateString(),
            'category' => $article->category,
            'preview' => $article->preview,
            'image' => $article->image,
            'readingTime' => $article->reading_time,
            'body' => collect(preg_split('/\R{2,}/', (string) $article->body) ?: [])
                ->filter()
                ->map(fn (string $text) => ['type' => 'paragraph', 'text' => trim($text)])
                ->values(),
        ];
    }

    private function promoPayload(Promo $promo): array
    {
        return [
            'id' => $promo->slug,
            'slug' => $promo->slug,
            'badge' => $promo->badge,
            'title' => $promo->title,
            'highlight' => $promo->highlight,
            'validUntil' => $promo->valid_until,
            'description' => $promo->description,
            'conditions' => $this->lines($promo->conditions),
            'image' => $promo->image,
        ];
    }

    private function reviewPayload(Review $review): array
    {
        return [
            'name' => $review->name,
            'date' => $review->date,
            'service' => $review->service,
            'title' => $review->title,
            'text' => $review->text,
            'adminReply' => $review->admin_reply,
            'image' => $review->image,
        ];
    }

    private function lines(?string $value): array
    {
        return collect(preg_split('/\R/', (string) $value) ?: [])
            ->map(fn (string $line) => trim($line))
            ->filter()
            ->values()
            ->all();
    }
}
