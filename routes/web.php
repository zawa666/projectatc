<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\Logbook\MoNoteController;
use App\Http\Controllers\Logbook\LogbookPositionController;
use App\Http\Controllers\Logbook\LogbookRemarkController;
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
    Route::prefix('logbook')->name('logbook.')->group(function () {
        // Main Logbook page
        Route::get('/', function () {
            return Inertia::render('Logbook/Index');
        })->name('index');

        // MO Notes
        Route::prefix('notes')->name('notes.')->group(function () {
            Route::get('/', [MoNoteController::class, 'index'])->name('index');
            Route::post('/', [MoNoteController::class, 'store'])->name('store');
            Route::get('/{note}', [MoNoteController::class, 'show'])->name('show');
            // Tambahan untuk MO Notes
            Route::post('/{note}/read', [MoNoteController::class, 'markAsRead'])->name('mark-read');
            Route::get('/date/{date}', [MoNoteController::class, 'getByDate'])->name('by-date');
        });

        // Positions
        Route::prefix('positions')->name('positions.')->group(function () {
            Route::get('/', [LogbookPositionController::class, 'index'])->name('index');
            Route::get('/create', [LogbookPositionController::class, 'create'])->name('create');
            Route::post('/', [LogbookPositionController::class, 'store'])->name('store');
            // Tambahan untuk Positions
            Route::get('/date/{date}', [LogbookPositionController::class, 'getByDate'])->name('by-date');
            Route::get('/sector/{sector}', [LogbookPositionController::class, 'getBySector'])->name('by-sector');
            Route::get('/member/{member}', [LogbookPositionController::class, 'getByMember'])->name('by-member');
        });

        // Remarks
        Route::prefix('remarks')->name('remarks.')->group(function () {
            Route::get('/', [LogbookRemarkController::class, 'index'])->name('index');
            Route::post('/', [LogbookRemarkController::class, 'store'])->name('store');
            // Tambahan untuk Remarks
            Route::get('/date/{date}', [LogbookRemarkController::class, 'getByDate'])->name('by-date');
            Route::get('/sector/{sector}', [LogbookRemarkController::class, 'getBySector'])->name('by-sector');
            Route::get('/status/{status}', [LogbookRemarkController::class, 'getByStatus'])->name('by-status');
        });

        // Export routes
        Route::prefix('export')->name('export.')->group(function () {
            Route::get('/positions', [LogbookPositionController::class, 'export'])->name('positions');
            Route::get('/remarks', [LogbookRemarkController::class, 'export'])->name('remarks');
            Route::get('/mo-notes', [MoNoteController::class, 'export'])->name('mo-notes');
        });
    });

    // Search routes (existing)
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

    // Schedule routes (existing)
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

    // Member Data routes (existing)
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

    // Document route (existing)
    Route::get('/document', function () {
        return Inertia::render('Document/Index');
    })->name('document');

    // Profile routes (existing)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';