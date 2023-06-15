<?php

namespace App\Http\Controllers;

use App\Models\Cases;
use App\Models\Enemy_Clients;
use App\Models\Enemy_Lawyers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CaseArchiveController extends Controller
{
    public function index()
    {

        return view('cases.archive');
    }

    public function showAll()
    {
        //  null  يوجد تاريخ مو deleted_at   تعني رجعلي كل القضايا يلي بالداتا بيز يلي بحقل ال
        //يعني مو محذوفة

        $casesArray = [];

        $i = 0;

        $cases = Cases::onlyTrashed()->get();

        foreach ($cases as $case) 
        
        {
            $baseNumbers = $case->baseNumbers;

            $enemyClients = $case->enemy_clients;

            $enemyLawyers = $case->enemy_lawyers;

            $court = $case->court;

            $sessions = $case->sessions;

            $decisions = $case->decisions;

            $attachments = $case->attachments;

            $lawyers = $case->lawyers;

            $clients = $case->clients;

            if (Auth::user()->role_name === 'زبون') 
            {
                foreach ($clients as $client)
                
                 {
                    if (Auth::user()->id == $client->id) 
                    {
                        $casesArray[$i++] = ['case' => $case, 'plaintiff_names' => $clients, 'plaintiff_lawyers' => $lawyers,

                            'case_numbers' => $baseNumbers, 'defendant_names' => $enemyClients, 'defendant_lawyers' => $enemyLawyers,

                            'court' => $court, 'sessions' => $sessions, 'decisions' => $decisions, 'attachments' => $attachments]
                        ;
                        break;

                    }
                }

            } 
            else if (Auth::user()->role_name === 'محامي')
             {
                foreach ($lawyers as $lawyer) 
                {
                    if (Auth::user()->id == $lawyer->id)
                   {
                        $casesArray[$i++] = ['case' => $case, 'plaintiff_names' => $clients, 'plaintiff_lawyers' => $lawyers,

                            'case_numbers' => $baseNumbers, 'defendant_names' => $enemyClients, 'defendant_lawyers' => $enemyLawyers,

                            'court' => $court, 'sessions' => $sessions, 'decisions' => $decisions, 'attachments' => $attachments]
                        ;
                        break;
                    }
                }

            } else
            {
                $casesArray[$i++] = ['case' => $case, 'plaintiff_names' => $clients, 'plaintiff_lawyers' => $lawyers,

                    'case_numbers' => $baseNumbers, 'defendant_names' => $enemyClients, 'defendant_lawyers' => $enemyLawyers,

                    'court' => $court, 'sessions' => $sessions, 'decisions' => $decisions, 'attachments' => $attachments]
                ;
            }
        }

        return response()->json(['cases' => $casesArray]);
    }

    public function restore(Request $request)
    {
        $id = $request->case_id;

        if (Cases::withTrashed()->where('id', $id)->restore())
        {
            return response()->json(['status' => 'success', 'message' => 'تم إلغاء الأرشفة بنجاح']);
        } else {
            return response()->json(['status' => 'failed', 'message' => 'فشل إلغاء الأرشفة']);
        }

    }

    public function destroy(Request $request)
    {
        $case = Cases::withTrashed()->where('id', $request->case_id)->first();

        if ($case->deleteIndex() && $case->forceDelete())
        {
            return response()->json(['status' => 'success', 'message' => 'تم الحذف بنجاح']);
        } else {
            return response()->json(['status' => 'failed', 'message' => 'فشل الحذف ']);
        }

    }

    public function archivedCasesCount()
    {
        $num_arc_cases = Cases::onlyTrashed()->get()->count();

        return response()->json(['num_arc_cases' => $num_arc_cases]);
    }
}
