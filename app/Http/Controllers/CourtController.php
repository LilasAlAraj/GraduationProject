<?php

namespace App\Http\Controllers;

use App\Models\Cases;
use App\Models\Courts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourtController extends Controller
{

    public function index()
    {
        return view('courts.view');
    }
    public function show()
    {
        $court = Courts::all();
        return response()->json($court);
    }

    public function store(Request $request)

    {
        $validator = Validator::make($request->all(),
        [

            'name' => 'required|string',

            'place' => 'required|string',
        ],
        [

            'name.required' => '  يرجى إدخال اسم المحكمة',

            'name.string' => ' الاسم يجب أن يكون سلسلة نصية',

            'place.required' => 'يرجى إدخال العنوان',

            'place.string' => 'العنوان يجب أن يكون سلسلة نصية',
        ]);

        if ($validator->fails())

       {
            return response()->json(['status' => 'error', 'message' => $validator->errors()]);
        }

        $input = $request->all();

        $b_exit = Courts::where('name', '=', $input['name'])->where('place', '=', $input['place'])->exists();

        if ($b_exit)
        {

            return response()->json(['status' => 'failed', 'message' => 'هذه المحكمة مضافة مسبقاً']);
        }

        else
        {

            $court = new Courts();

            $court->name = $request->name;

            $court->place = $request->place;

            $court->save();

            $id = Courts::latest()->first()->id;

            return response()->json(['status' => 'success', 'message' => 'تم إضافة المحكمة بنجاح', 'id' => $id]);
        }
    }

    public function destroy(Request $request)
    {

        $MyCases_id = Cases::where('court_id', $request->id)->pluck('court_id');

        if ($MyCases_id->count() == 0)
        {

            Courts::findOrFail($request->id)->delete();

            return response()->json(['status' => 'success', 'message' => 'تم حذف المحكمة بنجاح']);

        }
        else

        {

            return response()->json(['status' => 'failed', 'message' => 'لا يمكن حذف هذه المحكمة. هناك قضايا تتعلق بها!']);

        }

    }

}
