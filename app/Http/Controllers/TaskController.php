<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User_Of_Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function index()
    {
        return view('tasks.view');
    }

    public function create()
    {
        return view('tasks.add');
    }

    public function show($id)
    {
        $taskList = [];
        $i = 0;

        if ($id == 'all')

        {

            $tasks = Task::all();

            foreach ($tasks as $task) {

                $lawyers = $task->lawyers;

                if (Auth::check() && Auth::user()->role_name === 'محامي')

                {
                    foreach ($lawyers as $lawyer)

                    {
                        if (Auth::user()->id == $lawyer->id)

                        {
                            $taskList[$i++] = ['task' => $task, 'lawyers' => $lawyers];

                            break;
                        }

                    }
                }

                else

                {
                    $taskList[$i++] = ['task' => $task, 'lawyers' => $lawyers];
                }

            }

        }
         else if ($id == 'next')

        {
            $tasks = Task::whereDate('start_date', '>', Carbon::today())->get();

            foreach ($tasks as $task)
           {

                $lawyers = $task->lawyers;

                if (Auth::check() && Auth::user()->role_name === 'محامي')
                {
                    foreach ($lawyers as $lawyer)
                    {
                        if (Auth::user()->id == $lawyer->id)
                        {
                            $taskList[$i++] = ['task' => $task, 'lawyers' => $lawyers];
                            break;
                        }

                    }
                }

                else

                {
                    $taskList[$i++] = ['task' => $task, 'lawyers' => $lawyers];
                }


            }
        }
        else

        {//مهمة محددة برقم

            $task = Task::where('id', $id)->first();

            $lawyers = $task->lawyers;

            if (Auth::check() && Auth::user()->role_name === 'محامي')

            {
                foreach ($lawyers as $lawyer)

                {
                    if (Auth::user()->id == $lawyer->id)

                    {
                        $taskList[$i++] = ['task' => $task, 'lawyers' => $lawyers];
                        break;
                    }

                }
            } else {
                $taskList[$i++] = ['task' => $task, 'lawyers' => $lawyers];
            }


        }

        return response()->json($taskList);
    }
    public function addLawyer($Lawyers, $case_id)
    {

        foreach ($Lawyers as $Lawyer) {

            User_Of_Task::create([

                'user_id' => $Lawyer,

                'task_id' => $case_id,
            ]);
        }
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),
         [
            'name' => 'required|string|max:255',

            'description' => 'required|string',

            'start_date' => 'required|date',

            'end_date' => 'required|date',

            'priority' => 'required|string',

            'lawyers' => 'required|array',

        ]);


        if ($validator->fails()) {
            return response()->json(['status' => 'failed', 'message' => $validator->errors()]);
        }


        $task = new Task;

        $task->name = $request['name'];

        $task->description = $request['description'];

        $task->start_date = $request['start_date'];

        $task->end_date = $request['end_date'];

        $task->Value_Status = '1';

        $task->Status = "قيد التنفيذ";

        $task->priority = $request['priority'];

        $task->save();

        $this->addLawyer($request->lawyers, $task->id);

        return response()->json(['status' => 'success', 'message' => 'تم إنشاء المهمة بنجاح', 'data' => $task]);
    }

    public function update(Request $request)
    {
        $id=$request->id;

        $task = Task::find($id);

        $validator = Validator::make($request->all(),
        [
            'name' => 'required|string|max:255',

            'description' => 'required|string',

            'start_date' => 'required|date',

            'end_date' => 'required|date',

            'priority' => 'required',
        ]);


        if ($validator->fails())

        {
            return response()->json(['status' => 'failed', 'message' => $validator->errors()]);
        }

        $task->name = $request['name'];

        $task->description = $request['description'];

        $task->start_date = $request['start_date'];

        $task->end_date = $request['end_date'];

        $task->priority = $request['priority'];

        $task->save();

        $lawyers = $task->lawyers_task;

        foreach ($lawyers as $lawyer)
        {
            $lawyer->delete();
        }
        $this->addLawyer($request->lawyers, $task->id);

        return response()
            ->json
            ([
            'status' => 'success',

            'message' => 'تم تعديل المهمة بنجاح',

            'data' => $task,
        ]);
    }

    public function destroy($id)
    {

        $task = Task::find($id);

        if ($task->delete())
        {
            return response()->json(['status' => 'success', 'message' => 'تم حذف المهمة بنجاح']);
        }

        else

        {
            return response()->json(['status' => 'failed', 'message' => 'حدث خطأ أثناء الحذف! الرجاء المحاولة مرة أخرى']);
        }

    }

    public function updateStatus($id, Request $request)
    {
        $task = Task::where('id', '=', $id)->first();

        if ($request->Value_Status === '1') {

            $task->update([
                'Status' => 'قيد التنفيذ',
                'Value_Status' => $request->Value_Status,
            ]);
        } elseif ($request->Value_Status === '2') {

            $task->update([
                'Status' => 'ملغاة',
                'Value_Status' => $request->Value_Status,
            ]);
        } elseif ($request->Value_Status === '3') {

            $task->update([
                'Status' => 'مكتملة',
                'Value_Status' => $request->Value_Status,
            ]);
        } else {

            $task->update([
                'Status' => 'مؤجلة',
                'Value_Status' => $request->Value_Status,
            ]);
        }

        return response()->json(['status' => 'success', 'message' => 'تم تعديل حالة المهمة بنجاح']);

    }

    public function edit()
    {

        return view('tasks.edit');
    }

    public function filter(Request $request)
    {
        $taskList = [];

        $i = 0;

        $tasks = [];

        if ($request->search_key == 1)

        {
            $status = $request->status;

            $priority = $request->priority;

            if (is_null($status) || is_null($priority))

            {
                $tasks = Task::whereDate('start_date', '>', Carbon::today())

                    ->where(function ($query) use ($priority, $status)

                    {
                        $query->where('Value_Status', $status)

                            ->orWhere('priority', $priority);
                    })->get();
            }

            else

            {
                $tasks = Task::whereDate('start_date', '>', Carbon::today())

                    ->where('Value_Status', $status)

                    ->where('priority', $priority)->get();
            }

        }

        else if ($request->search_key == 2)

        { //search for specific tasks
            $status = $request->status;

            $priority = $request->priority;
            if (is_null($status) || is_null($priority)) {

                $tasks = Task::where('Value_Status', $status)
                    ->orWhere('priority', $priority)->get();
            } else {
                $tasks = Task::where('Value_Status', $status)
                    ->where('priority', $priority)->get();
            }

        } else if ($request->search_key == 3) { //search for specific date tasks
            $date = explode('-', $request->date);
            $compareDate = Carbon::createFromDate($date[0], $date[1], $date[2]);
            $tasks = Task::whereDate('start_date', '=', $compareDate)->
                orWhereDate('end_date', '=', $date)->get();
        } else if ($request->search_key == 4) { // search for tasks that have  start or end date that equal to today date
            $tasks = Task::whereDate('start_date', '=', Carbon::today())->
                orWhereDate('end_date', '=', Carbon::today())->get();
        }

        foreach ($tasks as $task) {

            $lawyers = $task->lawyers;
            if (Auth::check() && Auth::user()->role_name === 'محامي') {
                foreach ($lawyers as $lawyer) {
                    if (Auth::user()->id == $lawyer->id) {
                        $taskList[$i++] = ['task' => $task, 'lawyers' => $lawyers];
                        break;
                    }

                }
            } else {
                $taskList[$i++] = ['task' => $task, 'lawyers' => $lawyers];
            }

        }
        return response()->json($taskList);

    }
    public function num_next_tasks()
    {
        $num_next_tasks = 0;

        $tasks = Task::whereDate('start_date', '>', Carbon::today())->get();
        if (Auth::user()->role_name === 'محامي') {
            foreach ($tasks as $task) {
                $lawyers = $task->lawyers;
                foreach ($lawyers as $lawyer) {
                    if ($lawyer->id === Auth::user()->id) {
                        $num_next_tasks++;
                    }
                }
            }
        } else {
            $num_next_tasks = $tasks->count();
        }
        return response()->json(['num_next_tasks' => $num_next_tasks]);
    }

    public function taskDisplay($userId)
    {
        $user = User::find($userId);

        if ($user->role_name === 'مدير' || $user->role_name === 'سكرتاريا')
        {
          $tasks = Task::all();
        }
        else
        {
           $tasks = $user->tasks;
        }
        $taskDetails = [];

       foreach ($tasks as $task)
    {
       $name= $task->name;

       $description= $task->description;

       $start_date= $task->start_date;

       $end_date= $task->end_date;

       $Status=$task->Status;

       $priority=$task->priority;

       $taskDetails[] =
       [
        'name' => $name,

        'description' => $description,

        'start_date' => $start_date,

        'end_date' => $end_date,

        'Status' => $Status,

        'priority' => $priority
    ];
    return response()->json($taskDetails);
    }
  }

}
