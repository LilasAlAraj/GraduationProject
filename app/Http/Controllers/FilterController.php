<?php

namespace App\Http\Controllers;

use App\Models\Cases;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FilterController extends Controller
{

    public function casesFilter(Request $request)
    {

        $search_key = $request->search_key; // الخاص بالبحث  key من اجل تحديد  id عبارةعن

        // search_key=1 بحث حسب نوع القضية
        // search_key=2 بحث حسب تاريخ القضية
        //  search_key=3 بحث حسب رقم القضية
        // search_key=4  بحث حسب الدعوى
        // search_key=5 بحث حسب المحكمة
        // search_key=6  بحث حسب اسم المحامي
        // search_key=7 بحث حسب اسم موكل
        $casesArray = [];

        $i = 0;
        
        if ($search_key == 1) { //--------في حالة البحث بنوع القضية -------//
            {

                $cases = Cases::where('value_status', '=', $request->value_status)->get();

                $type = $request->type; // منشان يثبت نوع البحث ضمن السيرش

                // return view('reports.cases_report',compact('type'))->withDetails($cases);

            }

        } else if ($search_key == 2) 
        { // ------في حالة البحث بتاريخ القضية -----//

            //  $cases = Cases::where('date', '=', $request->date)->get();
            $from_year = $request->from_year;

            $to_year = $request->to_year;

            $cases = Cases::whereHas('baseNumbers', function ($query) use ($from_year, $to_year) 
            {
                $query->whereBetween('date', [$from_year, $to_year]);

            })->get();

        } 
        else if ($search_key == 3)
         { // -------في حالة البحث برقم القضية---------//

            $year = $request->year;

            $number = $request->number;

            $cases = Cases::whereHas('baseNumbers', function ($query) use ($number, $year)

            {
                $query->where('date', $year)->where('number', $number);

            })->get();

        }
         else if ($search_key == 4)
          { 
            //------ (موضوع الدعوى )البحث حسب العنوان ---------//

            $cases = Cases::select('*')->where('title', '=', $request->title)->get();

        } 
        else if ($search_key == 5)
         { 
            //--------البحث حسب  اسم المحكمة --------//

            $cases = Cases::select('*')->where('court_id', '=', $request->court_id)->get();

        } 
        else if ($search_key == 6)
         { 
            //-------------في حالة البحث عن جميع القضايا حسب اسم محامي موكل --------

            $lawyerName = $request->lawyerName;

            $cases = Cases::whereHas('lawyers', function ($query) use ($lawyerName)
             {

                $query->where('user_id', '=', $lawyerName);

            })

                ->get();

        }
         else if ($search_key == 7) 
         { 
            //-------في حالة البحث عن جميع القضايا حسب اسم موكل معين ----------

            $plaintiff_name = $request->plaintiff_name;

            $names = explode(" ", $plaintiff_name); // تقسيم اسم المستخدم إلى أجزاء

            $cases = Cases::select('*')->whereHas('clients', function ($query) use ($names)
             {

                if (count($names) == 3)
                 {
                    $query->where('first_name', '=', $names[0])

                        ->where('father_name', '=', $names[1])

                        ->where('last_name', '=', $names[2]);

                } 
                else if
                 (count($names) == 2) 

                 {
                    $query->where('first_name', '=', $names[0])

                        ->where('father_name', '=', $names[1])

                        ->orWhere('last_name', '=', $names[1]);
                }
                 else 
                 
                {
                    $query->where('first_name', '=', $names[0]);
                }

            })

                ->get();

        }
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

            } else if (Auth::user()->role_name === 'محامي') 
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

            }
             else
           {
                $casesArray[$i++] = ['case' => $case, 'plaintiff_names' => $clients, 'plaintiff_lawyers' => $lawyers,

                    'case_numbers' => $baseNumbers, 'defendant_names' => $enemyClients, 'defendant_lawyers' => $enemyLawyers,
                    
                    'court' => $court, 'sessions' => $sessions, 'decisions' => $decisions, 'attachments' => $attachments]
                ;
            }
        }
        return response()->json(['cases' => $casesArray]);

    }

    public function usersFilter(Request $request)
    {
        $search_key = $request->search_key; // الخاص بالبحث  key من اجل تحديد  id عبارةعن

        $name = $request->name;
        
        $names = explode(" ", $name); // تقسيم اسم المستخدم إلى أجزاء

        $users = [];
        if ($search_key == 1)
         { //-------في حالة البحث ياسم العميل او المدعي او الزبون-------//
            if (count($names) == 3) 
            {
                $users = User::where('role_name', 'زبون')

                    ->where('first_name', $names[0])

                    ->where('father_name', $names[1])

                    ->where('last_name', $names[2])->get();

            } 
            else if (count($names) == 2)
            
            {
                $users = User::where('first_name', $names[0])

                    ->where(function ($query) use ($names) 
                    {
                        $query->where('father_name', $names[1])

                            ->orWhere('last_name', $names[1]);

                    })

                    ->where('role_name', 'زبون')

                    ->get();

            }
             else 
             
             {
                $users = User::where('role_name', 'زبون')

                    ->where('first_name', $names[0])->get();
            }
            return response()->json(['clients' => $users]);

        } 
        else if ($search_key == 2) 

        { //--------في حالة البحث باسم المحامي -------//

            if (count($names) == 3) 
            {
                $users = User::where('first_name', $names[0])

                    ->where('father_name', $names[1])

                    ->where('last_name', $names[2])

                    ->where(function ($query) 
                    
                    {
                        $query->where('role_name', 'محامي')

                            ->orWhere('role_name', 'سكرتاريا');

                    })
                    ->get();

            }  
            else if (count($names) == 2) 

            {
                $users = User::where('first_name', $names[0])

                    ->where(function ($query) use ($names)
                     {
                        $query->where('father_name', $names[1])

                            ->orWhere('last_name', $names[1]);
                    })

                    ->where(function ($query)
                     {

                        $query->where('role_name', 'محامي')

                            ->orWhere('role_name', 'سكرتاريا');

                    })
                    ->get();
            } 
            else 
            {
                $users = User::where('first_name', $names[0])

                    ->where(function ($query)
                    
                    {
                        $query->where('role_name', 'محامي')

                            ->orWhere('role_name', 'سكرتاريا');
                    })

                    ->get();
            }
            return response()->json(['users' => $users]);

        }

    }
}
