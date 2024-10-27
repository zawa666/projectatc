<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use App\Repositories\Logbook\MoNoteRepositoryInterface;
use App\Repositories\Logbook\MoNoteRepository;
use App\Repositories\Logbook\LogbookPositionRepositoryInterface;
use App\Repositories\Logbook\LogbookPositionRepository;
use App\Repositories\Logbook\LogbookRemarkRepositoryInterface;
use App\Repositories\Logbook\LogbookRemarkRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Bind interfaces to implementations for Logbook system
        $this->app->bind(MoNoteRepositoryInterface::class, MoNoteRepository::class);
        $this->app->bind(LogbookPositionRepositoryInterface::class, LogbookPositionRepository::class);
        $this->app->bind(LogbookRemarkRepositoryInterface::class, LogbookRemarkRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Existing Vite prefetch configuration
        Vite::prefetch(concurrency: 3);
    }
}