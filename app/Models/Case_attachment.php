<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Case_attachment extends Model
{
    use HasFactory;
    public function case()
    {
        return $this->belongsTo(Cases::class,'case_id');
    }
}
