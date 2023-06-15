<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Courts extends Model
{
    protected $table = 'court';
    protected $fillable = ['name', 'place'];

    // إذا كنت بحاجة إلى تحديد علاقات أخرى، يمكنك تحديدها هنا.
}
