<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kontak extends Model
{
    protected $fillable = [
        'office_name',
        'address',
        'phone',
        'email',
        'whatsapp',
        'facebook',
        'instagram',
        'youtube',
        'maps_embed',
    ];
}