<?php

namespace App\Repositories\Logbook;

use App\Models\LogbookRemark;

class LogbookRemarkRepository implements LogbookRemarkRepositoryInterface
{
    protected $model;

    public function __construct(LogbookRemark $model)
    {
        $this->model = $model;
    }

    public function getAllPaginated($perPage = 10)
    {
        return $this->model->with('sector')
            ->orderBy('log_date', 'desc')
            ->orderBy('log_time', 'desc')
            ->paginate($perPage);
    }

    public function getByDateAndSector($date, $sectorCode)
    {
        return $this->model->with('sector')
            ->where('log_date', $date)
            ->where('sector_code', $sectorCode)
            ->orderBy('log_time')
            ->get();
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function findById($id)
    {
        return $this->model->with('sector')->find($id);
    }
}