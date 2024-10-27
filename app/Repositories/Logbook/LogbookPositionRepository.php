<?php

namespace App\Repositories\Logbook;

use App\Models\LogbookPosition;
use Carbon\Carbon;

class LogbookPositionRepository implements LogbookPositionRepositoryInterface
{
    protected $model;

    public function __construct(LogbookPosition $model)
    {
        $this->model = $model;
    }

    public function getAllPaginated($perPage = 10)
    {
        return $this->model->with(['member', 'sector', 'moNoteRead.moNote'])
            ->orderBy('log_date', 'desc')
            ->orderBy('start_time', 'desc')
            ->paginate($perPage);
    }

    public function getByDateAndSector($date, $sectorCode)
    {
        return $this->model->with(['member', 'moNoteRead'])
            ->where('log_date', $date)
            ->where('sector_code', $sectorCode)
            ->orderBy('start_time')
            ->get();
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function findById($id)
    {
        return $this->model->with(['member', 'sector', 'moNoteRead'])->find($id);
    }
}