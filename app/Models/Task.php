<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'Value_Status',
        'Status',
        'priority',
    ];

    public function lawyers_task()
    {
        return $this->hasMany(User_Of_Task::class, 'task_id');
    }

    public function lawyers()
    {
        return $this->belongsToMany(User::class, 'users_of_tasks', 'task_id', 'user_id');
    }
}
