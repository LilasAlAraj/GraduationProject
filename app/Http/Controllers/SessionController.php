<?php

namespace App\Http\Controllers;

use App\Models\Sessions;
use App\Models\session_attachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SessionController extends Controller
{

    public function show($id)
    {
        $sesssion = Sessions::where('id', $id)->first();

        $attachments = $sesssion->attachments;

        $sesssion['attachments'] = $attachments;

        return response()->json($sesssion);

    }

    public function store(Request $request)
    {

        $number = $request->number;

        $date = $request->date;

        $s_exit = Sessions::where('number', '=', $number)->where('date', '=', $date)->exists();

        if ($s_exit) {

            $message = "رقم الجلسة " . $number . "\\" . $date . " هذه موجود من قبل";

            return response()->json(['status' => 'failed', 'message' => $message]);
        }

        $validator = Validator::make($request->all(),
            [
                'case_id' => 'required|exists:cases,id',

                'number' => 'required',

                'date' => 'required|date',

                'description' => 'required|string',

            ], [

                'number.required' => 'يرجى إدخال  رقم الجلسة',

                'date.required' => 'يرجى إدخال تاريخ الجلسة',

                'date.date' => ' تاريخ الجلسة يجب أن يكون تاريخ صحيح',

                'description.required' => 'يرجى إدخال التفاصيل الخاصة بالجلسة',

                'description.string' => 'التفاصيل يجب أن تكون نصية',
            ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'failed', 'message' => $validator->errors()]);
        }

        Sessions::create([

            'case_id' => $request->case_id,

            'number' => $request->number,

            'date' => $request->date,

            'description' => $request->description,
        ]);
        $id = Sessions::latest()->first()->id;

        if ($request->hasFile('atachments')) {
            $files = $request->file('atachments');

            foreach ($files as $file) {

                $file_name = $file->getClientOriginalName();

                $attachment = new session_attachment();

                $attachment->file_name = $file_name;

                $attachment->session_number = $request->number;

                $attachment->session_id = $id;

                $attachment->save();

                // move pic
                //  $fileName = $request->file_name->getClientOriginalName();

                $file->move(public_path('Attachments/Case_' . $request->case_id .'/Session_' .$id), $file_name);
            }
        }
        return response()->json(['status' => 'success', 'message' => 'تم إضافة الجلسة بنجاح', 'id' => $id], 200);

    }

    public function update(Request $request)
    {

        $id = $request->id;

        $session = Sessions::find($id);

        if (!$session) {
            return response()->json(['status' => 'error', 'message' => 'Session not found'], 404);
        }
        $number = $request->number;

        $date = $request->date;

        $s_exit = Sessions::where('number', '=', $number)->where('date', '=', $date)->where('id', '!=', $id)->exists();

        if ($s_exit) {

            $message = "رقم الجلسة " . $number . "\\" . $date . " هذه موجود من قبل";

            return response()->json(['status' => 'failed', 'message' => $message]);
        }
        $validator = Validator::make($request->all(),
            [

                'number' => 'required|',

                'date' => 'required|date',

                'description' => 'required|string',

            ], [

                'number.required' => 'يرجى إدخال  رقم الجلسة',

                'number.unique' => ' رقم الجلسة يجب أن يكون فريد',

                'date.required' => 'يرجى إدخال تاريخ الجلسة',

                'date.date' => ' تاريخ الجلسة يجب أن يكون تاريخ صحيح',

                'description.required' => 'يرجى إدخال التفاصيل الخاصة بالجلسة',

                'description.string' => 'التفاصيل يجب أن تكون نصية',
            ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'failed', 'message' => $validator->errors()]);
        }

        $session->update([

            'date' => $request->date,

            'description' => $request->description,

            'number' => $request->number,
        ]);

        return response()->json(['status' => 'success', 'message' => 'تم تحديث الجلسة بنجاح'], 200);

    }

    private function deleteDirectory($directory)
    {
        if (!is_dir($directory)) {
            return;
        }

        $files = array_diff(scandir($directory), array('.', '..'));

        foreach ($files as $file) {
            $path = $directory . '/' . $file;

            if (is_dir($path)) {
                $this->deleteDirectory($path);
            } else {
                unlink($path);
            }
        }

        rmdir($directory);
    }
    public function destroy(Request $request)
    {

        $session = Sessions::find($request->id);
        $id = $session->id;
        $case_id=$session->case_id;
        if ($session->delete()) {
            $path = 'Attachments\Case_' .$case_id .'\Session_' . $id;

            $this->deleteDirectory($path);
            return response()->json(['status' => 'success', 'message' => 'تم الحذف بنجاح'], 200);
        } else {
            return response()->json(['status' => 'failed', 'message' => 'حدث خطأ أثناء الحذف! أعد المحاولة'], 500);
        }

    }
}
