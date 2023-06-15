<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Enemy_Lawyers extends Model
{
    use HasFactory;
    protected $table='enemy_lawyer';

    protected $fillable = [
        'enemy_Lawyer_name',
        'enemy_Lawyer_phone',
        'case_id'
    ];

    public function case()
    {
        return $this->belongsToMany(Cases::class,'enemy_lawyer_of_cases');
    }
}
