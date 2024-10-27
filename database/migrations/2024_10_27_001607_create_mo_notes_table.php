<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('mo_notes', function (Blueprint $table) {
            $table->id();
            $table->text('note');
            $table->enum('shift', ['pagi', 'siang', 'pagi-siang']);
            $table->date('note_date');
            $table->timestamps();
            
            $table->index('note_date');
        });
    }

    public function down()
    {
        Schema::dropIfExists('mo_notes');
    }
};