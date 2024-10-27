<?php

namespace App\Http\Controllers\Logbook;

use App\Http\Controllers\Controller;
use App\Http\Requests\Logbook\StoreLogbookRemarkRequest;
use App\Services\Logbook\LogbookRemarkService;
use App\Models\Sector;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LogbookRemarkController extends Controller
{
    protected $remarkService;

    public function __construct(LogbookRemarkService $remarkService)
    {
        $this->remarkService = $remarkService;
    }

    public function index(Request $request)
    {
        $date = $request->get('date', now()->toDateString());
        $sectorCode = $request->get('sector_code');

        return Inertia::render('Logbook/Remarks/Index', [
            'remarks' => $sectorCode 
                ? $this->remarkService->getRemarksByDateAndSector($date, $sectorCode)
                : $this->remarkService->getAllRemarks(),
            'sectors' => Sector::where('is_active', true)->get()
        ]);
    }

    public function store(StoreLogbookRemarkRequest $request)
    {
        try {
            $remark = $this->remarkService->createRemark($request->validated());
            return redirect()->back()
                ->with('message', 'Remark added successfully');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()]);
        }
    }
}