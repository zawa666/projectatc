// database/migrations/[timestamp]_create_members_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nik')->unique();
            $table->string('no_telp');
            $table->string('email')->unique();
            $table->string('spesialisasi');
            $table->enum('lokasi', ['palembang', 'jambi']);
            $table->string('photo')->nullable(); // Path to photo file
            $table->string('medex_file')->nullable(); // Path to medex PDF
            $table->date('medex_expired')->nullable();
            $table->string('ielp_file')->nullable(); // Path to IELP PDF
            $table->date('ielp_expired')->nullable();
            $table->string('license_file')->nullable(); // Path to license PDF
            $table->date('license_expired')->nullable();
            $table->timestamps();
            $table->softDeletes(); // Untuk soft delete data
        });
    }

    public function down()
    {
        Schema::dropIfExists('members');
    }
};