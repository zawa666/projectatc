<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MemberController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Semua route yang memerlukan autentikasi
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Logbook routes
    Route::get('/logbook', function () {
        return Inertia::render('Logbook/Index');
    })->name('logbook');

    // Search routes
    Route::prefix('search')->name('search.')->group(function () {
        Route::get('/daily', function () {
            return Inertia::render('Search/Daily');
        })->name('daily');

        Route::get('/date', function () {
            return Inertia::render('Search/Date');
        })->name('date');

        Route::get('/note', function () {
            return Inertia::render('Search/Note');
        })->name('note');
    });

    // Schedule routes
    Route::prefix('schedule')->name('schedule.')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Schedule/Index');
        })->name('index');

        Route::get('/actual', function () {
            return Inertia::render('Schedule/Actual');
        })->name('actual');

        Route::get('/change', function () {
            return Inertia::render('Schedule/Change');
        })->name('change');
    });

    // Member Data routes
    Route::prefix('member-data')->name('member-data.')->group(function () {
        Route::get('/', [MemberController::class, 'index'])->name('index');
        Route::post('/', [MemberController::class, 'store'])->name('store');
        Route::put('/{member}', [MemberController::class, 'update'])->name('update');
        Route::delete('/{member}', [MemberController::class, 'destroy'])->name('destroy');
        Route::post('/{id}/restore', [MemberController::class, 'restore'])->name('restore');
        Route::get('/file/{type}/{filename}', [MemberController::class, 'showFile'])
            ->where('type', 'photo|medex|ielp|license')
            ->name('file');
    });

    // Document route
    Route::get('/document', function () {
        return Inertia::render('Document/Index');
    })->name('document');

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';