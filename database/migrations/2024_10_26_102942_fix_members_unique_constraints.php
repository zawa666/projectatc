<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('members', function (Blueprint $table) {
            // Drop existing unique indexes if they exist
            $table->dropUnique('members_nik_unique');
            $table->dropUnique('members_email_unique');

            // Add new composite unique indexes
            $table->unique(['nik', 'deleted_at'], 'members_nik_deleted_at_unique');
            $table->unique(['email', 'deleted_at'], 'members_email_deleted_at_unique');
        });
    }

    public function down()
    {
        Schema::table('members', function (Blueprint $table) {
            $table->dropUnique('members_nik_deleted_at_unique');
            $table->dropUnique('members_email_deleted_at_unique');

            $table->unique('nik', 'members_nik_unique');
            $table->unique('email', 'members_email_unique');
        });
    }
};