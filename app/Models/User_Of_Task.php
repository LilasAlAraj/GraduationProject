<?php

namespace App\Models;
use App\Models\Task;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User_Of_Task extends Model
{
    use HasFactory;

    protected $table = 'users_of_tasks';
    protected $fillable = [
        'user_id', 'task_id',

    ];

    public function user()
{
    return $this->belongsTo(User::class, 'user_id');
}

public function task()
{
    return $this->belongsTo(Task::class, 'task_id');
}

}
