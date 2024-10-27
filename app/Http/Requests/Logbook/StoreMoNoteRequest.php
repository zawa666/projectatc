<?php

namespace App\Http\Requests\Logbook;

use Illuminate\Foundation\Http\FormRequest;

class StoreMoNoteRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Akan diganti dengan logic auth nanti
    }

    public function rules()
    {
        return [
            'note' => ['required', 'string'],
            'shift' => ['required', 'in:pagi,siang,pagi-siang'],
            'note_date' => ['required', 'date']
        ];
    }
}