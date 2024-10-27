<?php

namespace App\Http\Requests\Logbook;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

class StoreLogbookPositionRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'member_id' => ['required', 'exists:members,id'],
            'sector_code' => ['required', 'exists:sectors,code'],
            'mo_note_read_id' => ['required', 'exists:mo_note_reads,id'],
            'start_time' => [
                'required',
                'date_format:H:i',
                function ($attribute, $value, $fail) {
                    // Validasi buffer 30 menit
                    $now = Carbon::now();
                    $inputTime = Carbon::createFromFormat('H:i', $value);
                    $diffInMinutes = abs($now->diffInMinutes($inputTime));
                    
                    if ($diffInMinutes > 30) {
                        $fail('Input time must be within 30 minutes of current time.');
                    }
                }
            ],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
            'shift' => ['required', 'in:pagi,siang,malam'],
            'position' => ['required', 'in:controller,assistant'],
            'log_date' => ['required', 'date']
        ];
    }
}