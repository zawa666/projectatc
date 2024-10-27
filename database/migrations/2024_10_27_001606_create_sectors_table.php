<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('sectors', function (Blueprint $table) {
            $table->string('code')->primary();
            $table->string('name');
            $table->string('unit');
            $table->json('shift_patterns');
            $table->boolean('has_night_shift')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->index('name');
        });
    }

    public function down()
    {
        Schema::dropIfExists('sectors');
    }
};