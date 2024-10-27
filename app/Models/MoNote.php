<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MoNote extends Model
{
    protected $fillable = [
        'note',
        'shift',
        'note_date'
    ];

    protected $casts = [
        'note_date' => 'date'
    ];

    public function noteReads(): HasMany
    {
        return $this->hasMany(MoNoteRead::class);
    }
}