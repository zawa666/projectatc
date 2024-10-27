<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('logbook_remarks', function (Blueprint $table) {
            $table->id();
            $table->string('sector_code');
            $table->foreign('sector_code')->references('code')->on('sectors');
            $table->time('log_time');
            $table->string('remarks');
            $table->enum('status', ['normal', 'unserviceable', 'reported', 'accident', 'ser-incident']);
            $table->date('log_date');
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['status', 'log_date'], 'idx_status');
        });
    }

    public function down()
    {
        Schema::dropIfExists('logbook_remarks');
    }
};