<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LogbookPosition extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'member_id',
        'sector_code',
        'mo_note_read_id',
        'start_time',
        'end_time',
        'shift',
        'position',
        'log_date'
    ];

    protected $casts = [
        'log_date' => 'date',
        'start_time' => 'datetime',
        'end_time' => 'datetime'
    ];

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }

    public function sector(): BelongsTo
    {
        return $this->belongsTo(Sector::class, 'sector_code', 'code');
    }

    public function moNoteRead(): BelongsTo
    {
        return $this->belongsTo(MoNoteRead::class);
    }
}