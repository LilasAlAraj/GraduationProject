<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BaseNumber extends Model
{
    use HasFactory;
    protected $table='base_number';
    protected $fillable = [
        'number',
        'date',
        'case_id',
    ];
    public function case()
    {
        return $this->belongsTo(Cases::class,'case_id');
    }
}
