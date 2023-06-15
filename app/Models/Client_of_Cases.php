<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client_of_Cases extends Model
{
    use HasFactory;
    protected $table = 'client_of_case';

    protected $fillable = [
        'user_id', 'case_id',

    ];
}
