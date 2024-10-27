<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('mo_note_reads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mo_note_id')->constrained();
            $table->string('sector_code');
            $table->boolean('is_read')->default(false);
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
            
            $table->index(['mo_note_id', 'sector_code', 'is_read'], 'idx_verification');
        });
    }

    public function down()
    {
        Schema::dropIfExists('mo_note_reads');
    }
};