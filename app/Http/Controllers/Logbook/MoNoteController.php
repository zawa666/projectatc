<?php

namespace App\Http\Controllers\Logbook;

use App\Http\Controllers\Controller;
use App\Http\Requests\Logbook\StoreMoNoteRequest;
use App\Services\Logbook\MoNoteService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MoNoteController extends Controller
{
    protected $moNoteService;

    public function __construct(MoNoteService $moNoteService)
    {
        $this->moNoteService = $moNoteService;
    }

    public function index()
    {
        return Inertia::render('Logbook/Notes/Index', [
            'notes' => $this->moNoteService->getAllNotes()
        ]);
    }

    public function store(StoreMoNoteRequest $request)
    {
        $note = $this->moNoteService->createNote($request->validated());

        return redirect()->back()->with('message', 'Note created successfully');
    }

    public function show($id)
    {
        $note = $this->moNoteService->getTodayNote();

        return Inertia::render('Logbook/Notes/Show', [
            'note' => $note
        ]);
    }
}