<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lawyer_of_Cases extends Model
{
    use HasFactory;

    protected $table='lawyer_of_case';
    protected $fillable = [
        'user_id','case_id'

    ];

}
