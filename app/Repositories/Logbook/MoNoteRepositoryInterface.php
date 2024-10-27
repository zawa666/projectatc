<?php

namespace App\Repositories\Logbook;

interface MoNoteRepositoryInterface
{
    public function getAllPaginated($perPage = 10);
    public function getTodayNote();
    public function create(array $data);
    public function findById($id);
    public function markAsRead($noteId, $sectorCode);
}