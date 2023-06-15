<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('base_number', function (Blueprint $table) {
            $table->id();
            $table->integer('number');
            $table->integer('date');
            $table->unsignedBigInteger('case_id');
            $table->foreign('case_id')->references('id')->on('cases')->onDelete('cascade');
            $table->timestamps();
            $table->unique(['number', 'date'])->together(); // تحديد الفرادة على الرقم والعام
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('base_number');
    }
};
