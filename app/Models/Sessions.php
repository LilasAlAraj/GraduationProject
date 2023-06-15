<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sessions extends Model
{
    use HasFactory;
    protected $fillable = [
        'date',
        'number',
        'description',
        'delay_date',
        'delay_reasons',
        'case_id'
    ];

    public function case()
    {
        return $this->belongsTo(Cases::class);
    }

    public function attachments(): HasMany
    {
        return $this->hasMany(session_attachment::class,'session_id');
    }
}
