<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'village_name',
        'district',
        'regency',
        'province',
        'postal_code',
        'address',
        'vision',
        'mission',
        'history',
        'description',
        'head_name',
        'head_title',
        'hero_image',
        'logo_image',
        'video_url',
        'population_total',
        'families_total',
        'umkm_total',
        'budget_realization_percent',
        'service_banner_title',
        'service_banner_description',
    ];

    protected $casts = [
        'population_total' => 'integer',
        'families_total' => 'integer',
        'umkm_total' => 'integer',
        'budget_realization_percent' => 'decimal:2',
    ];

    protected $appends = ['hero_image_url', 'logo_image_url'];

    public function getLogoImageUrlAttribute(): ?string
    {
        if (! $this->logo_image) {
            return null;
        }

        return str_starts_with($this->logo_image, 'http')
            ? $this->logo_image
            : asset('storage/'.$this->logo_image);
    }

    public function getHeroImageUrlAttribute(): ?string
    {
        if (! $this->hero_image) {
            return null;
        }

        return str_starts_with($this->hero_image, 'http')
            ? $this->hero_image
            : asset('storage/'.$this->hero_image);
    }
}