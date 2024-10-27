<?php

namespace App\Repositories\Logbook;

use App\Models\MoNote;
use App\Models\MoNoteRead;
use Carbon\Carbon;

class MoNoteRepository implements MoNoteRepositoryInterface
{
    protected $model;
    protected $moNoteRead;

    public function __construct(MoNote $model, MoNoteRead $moNoteRead)
    {
        $this->model = $model;
        $this->moNoteRead = $moNoteRead;
    }

    public function getAllPaginated($perPage = 10)
    {
        return $this->model->with('noteReads')
            ->orderBy('note_date', 'desc')
            ->paginate($perPage);
    }

    public function getTodayNote()
    {
        return $this->model->where('note_date', Carbon::today())
            ->with('noteReads')
            ->first();
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function findById($id)
    {
        return $this->model->with('noteReads.sector')->find($id);
    }

    public function markAsRead($noteId, $sectorCode)
    {
        return $this->moNoteRead->create([
            'mo_note_id' => $noteId,
            'sector_code' => $sectorCode,
            'is_read' => true,
            'read_at' => Carbon::now()
        ]);
    }
}