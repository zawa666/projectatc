<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Member extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nama',
        'nik',
        'no_telp',
        'email',
        'spesialisasi',
        'lokasi',
        'photo',
        'medex_file',
        'medex_expired',
        'ielp_file',
        'ielp_expired',
        'license_file',
        'license_expired'
    ];

    protected $dates = [
        'medex_expired',
        'ielp_expired',
        'license_expired',
        'deleted_at'
    ];

    public function scopeSearch($query, $term)
    {
        return $query->where(function($query) use ($term) {
            $query->where('nama', 'like', "%{$term}%")
                  ->orWhere('nik', 'like', "%{$term}%")
                  ->orWhere('email', 'like', "%{$term}%")
                  ->orWhere('spesialisasi', 'like', "%{$term}%");
        });
    }
}