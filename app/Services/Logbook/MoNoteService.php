<?php

namespace App\Services\Logbook;

use App\Repositories\Logbook\MoNoteRepositoryInterface;
use Carbon\Carbon;

class MoNoteService
{
    protected $repository;

    public function __construct(MoNoteRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function getAllNotes($perPage = 10)
    {
        return $this->repository->getAllPaginated($perPage);
    }

    public function getTodayNote()
    {
        return $this->repository->getTodayNote();
    }

    public function createNote(array $data)
    {
        return $this->repository->create($data);
    }

    public function markNoteAsRead($noteId, $sectorCode)
    {
        return $this->repository->markAsRead($noteId, $sectorCode);
    }
}