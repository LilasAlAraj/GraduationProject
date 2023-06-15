<?php

namespace App\Http\Controllers;

use App\Models\Sessions;
use App\Models\session_attachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class SessionAttachmentController extends Controller
{

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),
            [

                'file_name' => 'mimes:pdf,jpeg,png,jpg',

                'session_id' => 'required',
            ],
            [

                'session_id.required' => 'يرجى إدخال  معرف الجلسة',

            ]);

        if ($validator->fails()) {
              return response()->json(['status' => 'failed', 'message' => $validator->errors()]);
        }

        $file = $request->file('attachment');

        $file_name = $file->getClientOriginalName();

        $attachment = new session_attachment();

        $attachment->file_name = $file_name;

        $attachment->session_number = $request->number;

        $attachment->session_id = $request->session_id;

        $attachment->save();

        $id = session_attachment::latest()->first()->id;

        $case_id = Sessions::where('id', $attachment->session_id)->first()->case_id;

        $file->move(public_path('Attachments/Case_' . $case_id . '/Session_' . $request->session_id), $file_name);

        return response()->json(['status' => 'success', 'message' => 'تم اضافة المرفق بنجاح', 'id' => $id], 200);

    }

    public function destroy(Request $request)
    {
        $attachment = session_attachment::findOrFail($request->attachment_id);

        $session_id = $attachment->session_id;

        $case_id = $attachment->session->case->id;

        $file_name = $attachment->file_name;

        $path = 'Attachments\Case_' . $case_id . '\Session_' . $session_id . '\\';

        if ($attachment->delete()) {
            if (unlink(public_path($path . $file_name))) {

                if (count(scandir($path)) == 2) {
                    rmdir($path);
                }

                return response()->json(['status' => 'success', 'message' => 'تم الحذف بنجاح'], 200);
            } else {
                return response()->json(['status' => 'failed', 'message' => 'حدث خطأ أثناء الحذف من المحرك! أعد المحاولة'], 500);
            }

        } else {
            return response()->json(['status' => 'failed', 'message' => 'حدث خطأ أثناء الحذف من قاعدة البيانات! أعد المحاولة'], 500);
        }
    }
    public function get_file(Request $request)
    {

        $file = session_attachment::findOrFail($request->attachment_id);

        $session_id = $file->session_id;

        $case_id = $file->session->case->id;

        $file_name = $file->file_name;

        $path = 'Attachments\Case_' . $case_id . '\Session_' . $session_id . '\\' . $file_name;

        $download_link = asset($path);

        return Response::json(['download_link' => $download_link]);
    }
}
