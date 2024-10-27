<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('logbook_positions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('member_id')->constrained();
            $table->string('sector_code');
            $table->foreign('sector_code')->references('code')->on('sectors');
            $table->foreignId('mo_note_read_id')->nullable()->constrained('mo_note_reads');
            $table->time('start_time');
            $table->time('end_time');
            $table->enum('shift', ['pagi', 'siang', 'malam']);
            $table->enum('position', ['controller', 'assistant']);
            $table->date('log_date');
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['log_date', 'sector_code', 'member_id'], 'idx_dashboard');
            $table->index(['member_id', 'log_date'], 'idx_personal');
        });
    }

    public function down()
    {
        Schema::dropIfExists('logbook_positions');
    }
};