<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sector extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'code';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'code',
        'name',
        'unit',
        'shift_patterns',
        'has_night_shift',
        'is_active'
    ];

    protected $casts = [
        'shift_patterns' => 'json',
        'has_night_shift' => 'boolean',
        'is_active' => 'boolean'
    ];

    public function moNoteReads(): HasMany
    {
        return $this->hasMany(MoNoteRead::class, 'sector_code', 'code');
    }

    public function logbookPositions(): HasMany
    {
        return $this->hasMany(LogbookPosition::class, 'sector_code', 'code');
    }

    public function logbookRemarks(): HasMany
    {
        return $this->hasMany(LogbookRemark::class, 'sector_code', 'code');
    }
}