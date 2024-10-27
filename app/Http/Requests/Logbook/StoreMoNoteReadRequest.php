<?php

namespace App\Http\Requests\Logbook;

use Illuminate\Foundation\Http\FormRequest;

class StoreMoNoteReadRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'mo_note_id' => ['required', 'exists:mo_notes,id'],
            'sector_code' => ['required', 'exists:sectors,code'],
            'is_read' => ['boolean'],
            'read_at' => ['nullable', 'date']
        ];
    }
}