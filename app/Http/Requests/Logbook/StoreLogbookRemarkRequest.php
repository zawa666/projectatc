<?php

namespace App\Http\Requests\Logbook;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

class StoreLogbookRemarkRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'sector_code' => ['required', 'exists:sectors,code'],
            'log_time' => [
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
            'remarks' => ['required', 'string'],
            'status' => ['required', 'in:normal,unserviceable,reported,accident,ser-incident'],
            'log_date' => ['required', 'date']
        ];
    }
}