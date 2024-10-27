<?php

namespace App\Http\Controllers\Logbook;

use App\Http\Controllers\Controller;
use App\Http\Requests\Logbook\StoreLogbookPositionRequest;
use App\Services\Logbook\LogbookPositionService;
use App\Services\Logbook\MoNoteService;
use App\Models\Sector;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LogbookPositionController extends Controller
{
    protected $positionService;
    protected $moNoteService;

    public function __construct(
        LogbookPositionService $positionService,
        MoNoteService $moNoteService
    ) {
        $this->positionService = $positionService;
        $this->moNoteService = $moNoteService;
    }

    public function index(Request $request)
    {
        $date = $request->get('date', now()->toDateString());
        $sectorCode = $request->get('sector_code');

        return Inertia::render('Logbook/Positions/Index', [
            'positions' => $sectorCode 
                ? $this->positionService->getPositionsByDateAndSector($date, $sectorCode)
                : $this->positionService->getAllPositions(),
            'sectors' => Sector::where('is_active', true)->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Logbook/Positions/Create', [
            'todayNote' => $this->moNoteService->getTodayNote(),
            'sectors' => Sector::where('is_active', true)->get()
        ]);
    }

    public function store(StoreLogbookPositionRequest $request)
    {
        try {
            $position = $this->positionService->createPosition($request->validated());
            return redirect()->route('logbook.positions.index')
                ->with('message', 'Position logged successfully');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()]);
        }
    }
}