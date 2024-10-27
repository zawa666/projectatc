<?php

namespace App\Repositories\Logbook;

interface LogbookRemarkRepositoryInterface
{
    public function getAllPaginated($perPage = 10);
    public function getByDateAndSector($date, $sectorCode);
    public function create(array $data);
    public function findById($id);
}