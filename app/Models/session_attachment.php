<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class session_attachment extends Model
{
    use HasFactory;
    public function session()
    {
        return $this->belongsTo(Sessions::class,'session_id');
    }
}
