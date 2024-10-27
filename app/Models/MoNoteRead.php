<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MoNoteRead extends Model
{
    protected $fillable = [
        'mo_note_id',
        'sector_code',
        'is_read',
        'read_at'
    ];

    protected $casts = [
        'is_read' => 'boolean',
        'read_at' => 'datetime'
    ];

    public function moNote(): BelongsTo
    {
        return $this->belongsTo(MoNote::class);
    }

    public function sector(): BelongsTo
    {
        return $this->belongsTo(Sector::class, 'sector_code', 'code');
    }

    public function logbookPositions(): HasMany
    {
        return $this->hasMany(LogbookPosition::class);
    }
}