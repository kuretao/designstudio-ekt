<?php

use App\Http\Controllers\Admin\ImageGalleryController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['name' => config('app.name'), 'status' => 'ok']);
});

Route::middleware(config('moonshine.auth.middleware', []))
    ->prefix(config('moonshine.prefix', 'admin'))
    ->group(static function (): void {
        Route::get('/image-gallery', ImageGalleryController::class)->name('admin.image-gallery');
    });
