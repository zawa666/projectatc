<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LogbookRemark extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'sector_code',
        'log_time',
        'remarks',
        'status',
        'log_date'
    ];

    protected $casts = [
        'log_date' => 'date',
        'log_time' => 'datetime'
    ];

    public function sector(): BelongsTo
    {
        return $this->belongsTo(Sector::class, 'sector_code', 'code');
    }
}