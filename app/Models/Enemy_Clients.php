<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Enemy_Clients extends Model
{
    use HasFactory;
    protected $table='enemy_client';
    protected $fillable = [
        'enemy_Client_name',
        'enemy_Client_phone',
        'case_id'
    ];

    public function case()
    {
        return $this->belongsToMany(Cases::class,'enemy_clients_of_cases');
    }
}
