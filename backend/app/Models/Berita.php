<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Berita extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'excerpt',
        'content',
        'thumbnail',
        'published_at',
        'is_published',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_published' => 'boolean',
    ];

    protected $appends = ['thumbnail_url'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getThumbnailUrlAttribute(): ?string
    {
        if (! $this->thumbnail) {
            return null;
        }

        return str_starts_with($this->thumbnail, 'http')
            ? $this->thumbnail
            : asset('storage/'.$this->thumbnail);
    }
}