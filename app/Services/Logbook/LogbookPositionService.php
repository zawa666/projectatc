<?php

namespace App\Services\Logbook;

use App\Repositories\Logbook\LogbookPositionRepositoryInterface;
use Carbon\Carbon;

class LogbookPositionService
{
    protected $repository;

    public function __construct(LogbookPositionRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function getAllPositions($perPage = 10)
    {
        return $this->repository->getAllPaginated($perPage);
    }

    public function createPosition(array $data)
    {
        // Determine shift based on time
        $data['shift'] = $this->determineShift($data['start_time'], $data['sector_code']);
        
        return $this->repository->create($data);
    }

    public function getPositionsByDateAndSector($date, $sectorCode)
    {
        return $this->repository->getByDateAndSector($date, $sectorCode);
    }

    protected function determineShift($time, $sectorCode)
    {
        $hour = Carbon::parse($time)->format('H');
        
        // This is simplified. You'll need to adjust based on your sector's shift patterns
        if ($hour >= 6 && $hour < 13) {
            return 'pagi';
        } elseif ($hour >= 13 && $hour < 19) {
            return 'siang';
        } else {
            return 'malam';
        }
    }

    public function validateTimeBuffer($inputTime)
    {
        $now = Carbon::now();
        $inputTime = Carbon::parse($inputTime);
        
        return $now->diffInMinutes($inputTime) <= 30;
    }
}