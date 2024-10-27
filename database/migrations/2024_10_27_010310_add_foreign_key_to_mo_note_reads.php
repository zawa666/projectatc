<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('mo_note_reads', function (Blueprint $table) {
            $table->foreign('sector_code')
                  ->references('code')
                  ->on('sectors')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('mo_note_reads', function (Blueprint $table) {
            $table->dropForeign(['sector_code']);
        });
    }
};