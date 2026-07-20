<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('village_name')->default('Desa Karangpapak');
            $table->string('district')->nullable();
            $table->string('regency')->nullable();
            $table->string('province')->nullable();
            $table->string('postal_code', 20)->nullable();
            $table->text('address')->nullable();
            $table->text('vision')->nullable();
            $table->text('mission')->nullable();
            $table->longText('history')->nullable();
            $table->longText('description')->nullable();
            $table->string('head_name')->nullable();
            $table->string('head_title')->nullable();
            $table->string('hero_image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};