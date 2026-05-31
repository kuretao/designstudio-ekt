<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\MoonShine\Support\ImageGallery;
use Illuminate\Http\JsonResponse;

class ImageGalleryController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'images' => ImageGallery::items(),
        ]);
    }
}
