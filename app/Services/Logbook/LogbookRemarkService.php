<?php

namespace App\Services\Logbook;

use App\Repositories\Logbook\LogbookRemarkRepositoryInterface;
use Carbon\Carbon;

class LogbookRemarkService
{
    protected $repository;

    public function __construct(LogbookRemarkRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function getAllRemarks($perPage = 10)
    {
        return $this->repository->getAllPaginated($perPage);
    }

    public function createRemark(array $data)
    {
        if (!$this->validateTimeBuffer($data['log_time'])) {
            throw new \Exception('Input time must be within 30 minutes of current time.');
        }

        return $this->repository->create($data);
    }

    public function getRemarksByDateAndSector($date, $sectorCode)
    {
        return $this->repository->getByDateAndSector($date, $sectorCode);
    }

    protected function validateTimeBuffer($time)
    {
        $now = Carbon::now();
        $inputTime = Carbon::parse($time);
        
        return $now->diffInMinutes($inputTime) <= 30;
    }
}