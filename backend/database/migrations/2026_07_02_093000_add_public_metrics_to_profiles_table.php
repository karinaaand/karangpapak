<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->unsignedInteger('population_total')->nullable()->after('hero_image');
            $table->unsignedInteger('families_total')->nullable()->after('population_total');
            $table->unsignedInteger('umkm_total')->nullable()->after('families_total');
            $table->decimal('budget_realization_percent', 5, 2)->nullable()->after('umkm_total');
            $table->string('service_banner_title')->nullable()->after('budget_realization_percent');
            $table->text('service_banner_description')->nullable()->after('service_banner_title');
        });
    }

    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn([
                'population_total',
                'families_total',
                'umkm_total',
                'budget_realization_percent',
                'service_banner_title',
                'service_banner_description',
            ]);
        });
    }
};