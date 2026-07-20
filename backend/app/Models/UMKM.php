<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UMKM extends Model
{
    protected $table = 'umkms';

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'owner_name',
        'category',
        'description',
        'address',
        'phone',
        'whatsapp',
        'image',
        'is_featured',
        'is_published',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
    ];

    protected $appends = ['image_url'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image) {
            return null;
        }

        return str_starts_with($this->image, 'http')
            ? $this->image
            : asset('storage/'.$this->image);
    }
}