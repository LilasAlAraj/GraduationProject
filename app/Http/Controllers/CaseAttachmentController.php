<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use App\Models\Case_attachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class CaseAttachmentController extends Controller
{

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
             'file_name' => 'mimes:pdf,jpeg,png,jpg',
     
         ]);

        $file = $request->file('attachment');

        $file_name = $file->getClientOriginalName();

        $attachment = new Case_attachment();

        $attachment->file_name = $file_name;

        $attachment->case_id = $request->caseID;

        $attachment->save();

        $id = Case_attachment::latest()->first()->id;

        $file->move(public_path('Attachments/Case_' . $request->caseID), $file_name);

        return response()->json(['status' => 'success', 'message' => 'تم اضافة المرفق بنجاح', 'id' => $id]);

    }

    public function destroy(Request $request)
    {
        $attachment = Case_attachment::findOrFail($request->attachment_id);

        $case_id = $attachment->case_id;

        $file_name = $attachment->file_name;

        $path = 'Attachments\Case_' . $case_id . '\\';

        if ($attachment->delete())

         {
            if (unlink(public_path($path . $file_name))) 
            {

                if (count(scandir($path)) == 2) 
                {
                    rmdir($path);
                }

                return response()->json(['status' => 'success', 'message' => 'تم الحذف بنجاح'], 200);
            }
             else
             {
                return response()->json(['status' => 'failed', 'message' => 'حدث خطأ أثناء الحذف من المحرك! أعد المحاولة'], 500);
            }

        }
         else
        {
            return response()->json(['status' => 'failed', 'message' => 'حدث خطأ أثناء الحذف من قاعدة البيانات! أعد المحاولة'], 500);
        }
    }

    public function get_file(Request $request)
    {

        $file = Case_attachment::findOrFail($request->attachment_id);

        $case_id = $file->case_id;

        $file_name = $file->file_name;

        $path = 'Attachments\Case_' . $case_id . '\\' . $file_name;

        $download_link = asset($path);

        return Response::json(['download_link' => $download_link]);
    }

}
