<?php

namespace App\Http\Controllers;

use App\Models\BaseNumber;
use App\Models\Cases;
use App\Models\Client_of_Cases;
use App\Models\Enemy_Clients;
use App\Models\Enemy_Clients_of_Cases;
use App\Models\Enemy_Lawyers;
use App\Models\Enemy_Lawyers_of_Cases;
use App\Models\Lawyer_of_Cases;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CasesController extends Controller
{

    public function index()
    {
        return view('cases.view');
    }

    public function create()
    {
        return view('cases.add');
    }
    public function view_case()
    {
        return view('cases.view_case');
    }

    public function checkBaseNumbers($Base_Numbers)
    {
        foreach ($Base_Numbers as $Base_Number) {
            $number = $Base_Number['number'];

            $date = $Base_Number['date'];

            $b_exit = BaseNumber::where('number', '=', $number)->where('date', '=', $date)->exists();

            if ($b_exit) {

                $message = "رقم الأساس " . $number . "\\" . $date . " هذا موجود من قبل";

                return response()->json(['status' => 'failed', 'message' => $message]);
            }
        }
    }

    public function addBaseNumbers($case_id, $Base_Numbers)
    {
        foreach ($Base_Numbers as $Base_Number) {

            BaseNumber::create([

                'number' => $Base_Number['number'],

                'date' => $Base_Number['date'],

                'case_id' => $case_id,
            ]);

        }
    }

    public function addDefendentLawyers($DefendentLawyers, $case_id)
    {
        $List_Enemy_Lawyers = $DefendentLawyers;

        if (!is_null($List_Enemy_Lawyers)) {

            foreach ($List_Enemy_Lawyers as $List_Enemy_Lawyer) {

                $Enemy_Lawyers = new Enemy_Lawyers();

                $Enemy_Lawyers->name = $List_Enemy_Lawyer['enemy_Lawyer_name'];

                $Enemy_Lawyers->number_phone = $List_Enemy_Lawyer['enemy_Lawyer_phone'];

                $Enemy_Lawyers->save();

                $enemy_Lawyer_of_case = new Enemy_Lawyers_of_Cases();

                $enemy_Lawyer_of_case->enemy_lawyer_id = $Enemy_Lawyers->id;

                $enemy_Lawyer_of_case->case_id = $case_id;

                $enemy_Lawyer_of_case->save();
            }
        }
    }

    public function addDefendentClients($DefendentClients, $case_id)
    {

        $List_Enemy_Clients = $DefendentClients;

        if (!is_null($List_Enemy_Clients)) {

            foreach ($List_Enemy_Clients as $List_Enemy_Client) {

                $Enemy_Clients = new Enemy_Clients();

                $Enemy_Clients->name = $List_Enemy_Client['enemy_Client_name'];

                $Enemy_Clients->phone_number = $List_Enemy_Client['enemy_Client_phone'];

                $Enemy_Clients->save();
                $enemy_CLient_of_case = new Enemy_Clients_of_Cases();

                $enemy_CLient_of_case->enemy_client_id = $Enemy_Clients->id;

                $enemy_CLient_of_case->case_id = $case_id;

                $enemy_CLient_of_case->save();

            }

        }
    }

    public function addPlaintaiffClients($PlaintaiffClients, $case_id)
    {
        $List_Clients = $PlaintaiffClients;

        foreach ($List_Clients as $List_Client) {

            Client_of_Cases::create([

                'user_id' => $List_Client,

                'case_id' => $case_id,
            ]);
        }

    }

    public function addPlaintaiffLawyer($PlaintaiffLawyers, $case_id)
    {
        $List_Lawyers = $PlaintaiffLawyers;

        foreach ($List_Lawyers as $List_Lawyer) {

            Lawyer_of_Cases::create([

                'user_id' => $List_Lawyer,

                'case_id' => $case_id,
            ]);
        }
    }
    public function store(Request $request)
    {
        $Base_Numbers = $request->Base_Numbers;

        $returned = $this->checkBaseNumbers($Base_Numbers);
        if (!is_null($returned)) {
            return $returned;
        }

        $validator = Validator::make($request->all(),
            [
                'court_id' => 'required|exists:court,id',

                'case_room' => 'required|string',

                'title' => 'required|string',
            ], [

                'court_id.required' => 'يرجى إدخال المحكمة',

                'court_id.exists' => 'معرف المحكمة غير صحيح',

                'case_room.required' => 'يرجى إدخال الغرفة',

                'case_room.string' => ' الغرفة يجب أن تكون سلسلة نصية',

                'title.required' => 'يرجى إدخال العنوان',

                'title.string' => 'العنوان يجب أن يكون سلسلة نصية',
            ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => $validator->errors()]);
        }

        $case = new Cases;

        $case->court_id = $request['court_id'];

        $case->case_room = $request['case_room'];

        $case->title = $request['title'];

        $case->Status = 'جارٍ العمل عليها';

        $case->Value_Status = '3';

        $case->save();

        $case->index();

        $case_id = Cases::latest()->first()->id;

        /******أرقام الأساس */

        $this->addBaseNumbers($case_id, $Base_Numbers);

        //-----المحاميين الخصم -------------------//

        $this->addDefendentLawyers($request->DefendentLawyers, $case_id);

        //------------------الخصم-------------------//

        $this->addDefendentClients($request->DefendentClients, $case_id);

        /*--------------العميل--------------*/
        $this->addPlaintaiffClients($request->PlaintaiffClients, $case_id);

        /*--------------وكيل العميل--------------*/

        $this->addPlaintaiffLawyer($request->PlaintaiffLawyers, $case_id);

        // ------- 📩 اشعار اضافة قضية -----------

        return response()->json(['status' => 'success', 'message' => 'تم إضافة القضية بنجاح'], 200);

    }

    public function show($id)
    {
        $casesArray = [];
        $i = 0;

        if ($id == 'all') {

            $cases = Cases::get();

            foreach ($cases as $case) {
                $baseNumbers = $case->baseNumbers;

                $enemyClients = $case->enemy_clients;

                $enemyLawyers = $case->enemy_lawyers;

                $court = $case->court;

                $sessions = $case->sessions;

                $decisions = $case->decisions;

                $attachments = $case->attachments;

                $lawyers = $case->lawyers;

                $clients = $case->clients;

                if (Auth::user()->role_name === 'زبون') {
                    foreach ($clients as $client) {
                        if (Auth::user()->id == $client->id) {
                            $casesArray[$i++] = ['case' => $case, 'plaintiff_names' => $clients, 'plaintiff_lawyers' => $lawyers,

                                'case_numbers' => $baseNumbers, 'defendant_names' => $enemyClients, 'defendant_lawyers' => $enemyLawyers,

                                'court' => $court, 'sessions' => $sessions, 'decisions' => $decisions, 'attachments' => $attachments]
                            ;
                            break;

                        }
                    }

                } else if (Auth::user()->role_name === 'محامي') {
                    foreach ($lawyers as $lawyer) {
                        if (Auth::user()->id == $lawyer->id) {
                            $casesArray[$i++] = ['case' => $case, 'plaintiff_names' => $clients, 'plaintiff_lawyers' => $lawyers,

                                'case_numbers' => $baseNumbers, 'defendant_names' => $enemyClients, 'defendant_lawyers' => $enemyLawyers,

                                'court' => $court, 'sessions' => $sessions, 'decisions' => $decisions, 'attachments' => $attachments]
                            ;
                            break;
                        }
                    }

                } else {
                    $casesArray[$i++] = ['case' => $case, 'plaintiff_names' => $clients, 'plaintiff_lawyers' => $lawyers,

                        'case_numbers' => $baseNumbers, 'defendant_names' => $enemyClients, 'defendant_lawyers' => $enemyLawyers,

                        'court' => $court, 'sessions' => $sessions, 'decisions' => $decisions, 'attachments' => $attachments]
                    ;
                }
            }

        } else {

            $archivedCase = Cases::withTrashed()->where('id', $id)->first();

            $case = Cases::where('id', $id)->first();

            if (is_null($case)) {
                $case = $archivedCase;
            }

            $baseNumbers = $case->baseNumbers;

            $enemyClients = $case->enemy_clients;

            $enemyLawyers = $case->enemy_lawyers;

            $court = $case->court;

            $sessions = $case->sessions;

            $decisions = $case->decisions;

            $attachments = $case->attachments;

            $lawyers = $case->lawyers;

            $clients = $case->clients;

            if (Auth::user()->role_name === 'زبون') {
                foreach ($clients as $client) {
                    if (Auth::user()->id == $client->id) {
                        $casesArray[$i++] = ['case' => $case, 'plaintiff_names' => $clients, 'plaintiff_lawyers' => $lawyers,

                            'case_numbers' => $baseNumbers, 'defendant_names' => $enemyClients, 'defendant_lawyers' => $enemyLawyers,

                            'court' => $court, 'sessions' => $sessions, 'decisions' => $decisions, 'attachments' => $attachments]
                        ;
                        break;

                    }
                }

            } else if (Auth::user()->role_name === 'محامي') {
                foreach ($lawyers as $lawyer) {
                    if (Auth::user()->id == $lawyer->id) {
                        $casesArray[$i++] = ['case' => $case, 'plaintiff_names' => $clients, 'plaintiff_lawyers' => $lawyers,

                            'case_numbers' => $baseNumbers, 'defendant_names' => $enemyClients, 'defendant_lawyers' => $enemyLawyers,

                            'court' => $court, 'sessions' => $sessions, 'decisions' => $decisions, 'attachments' => $attachments]
                        ;
                        break;
                    }
                }

            } else {
                $casesArray[$i++] = ['case' => $case, 'plaintiff_names' => $clients, 'plaintiff_lawyers' => $lawyers,

                    'case_numbers' => $baseNumbers, 'defendant_names' => $enemyClients, 'defendant_lawyers' => $enemyLawyers,

                    'court' => $court, 'sessions' => $sessions, 'decisions' => $decisions, 'attachments' => $attachments]
                ;
            }

        }
        return response()->json(['cases' => $casesArray]);

    }

    public function edit($id)
    {

        return view('cases.edit');
    }

    public function update(Request $request)
    {

        $case_id = $request->case_id;

        $case = Cases::findorfail($case_id);

        $validator = Validator::make($request->all(),
            [

                'court_id' => 'required|integer|exists:court,id',

                'case_room' => 'required|string',

                'title' => 'required|string',
            ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => $validator->errors()]);
        }

        $case->update([

            'court_id' => $request->court_id,

            'case_room' => $request->case_room,

            'title' => $request->title,

        ]);

        $Base_Numbers = $case->baseNumbers;

        /////base numbers
        // هون مسحنا كل أرقام الأساس القديمة لنضمن عدم حدوث أي مشكلة بالقديم

        foreach ($Base_Numbers as $Base_Number) {
            $Base_Number->delete();
        }

        ///هون ضفنا كل الأرقام اللي جاية من المستخدم

        $returned = $this->checkBaseNumbers($request->Base_Numbers);
        if (!is_null($returned)) {
            return $returned;
        }

        $this->addBaseNumbers($case_id, $request->Base_Numbers);

        ////// defendent lawyers

        // هون مسحنا كل محاميين الخصم القديمة لنضمن عدم حدوث أي مشكلة بالقديم

        $enemy_lawyers = $case->enemy_lawyers;

        foreach ($enemy_lawyers as $enemy_lawyer) {
            $enemy_lawyer->delete();
        }
        ///هون ضفنا كل المحاميين الخصم اللي جاية من المستخدم

        $this->addDefendentLawyers($request->DefendentLawyers, $case_id);

        ////////// defendent clients //

        // هون مسحنا كل الأشخاص الخصم القديمة لنضمن عدم حدوث أي مشكلة بالقديم

        $enemy_clients = $case->enemy_clients;

        foreach ($enemy_clients as $enemy_client) {
            $enemy_client->delete();
        }

        ///هون ضفنا كل الأشخاص الخصم اللي جاية من المستخدم

        $this->addDefendentClients($request->DefendentClients, $case_id);

        ///////////clients

        // هون مسحنا ربط كل الزبائن  القديمة لنضمن عدم حدوث أي مشكلة بالقديم

        $Clients = $case->clients_case;

        foreach ($Clients as $Client) {
            $Client->delete();
        }
        ///هون ضفنا كل الزبائن اللي جاية من المستخدم

        $this->addPlaintaiffClients($request->PlaintaiffClients, $case_id);

////////// lawyers
        // هون مسحنا ربط كل المحاميين  القديمة لنضمن عدم حدوث أي مشكلة بالقديم

        $lawyers = $case->lawyers_case;

        foreach ($lawyers as $lawyer) {
            $lawyer->delete();
        }
        ///هون ضفنا كل المحاميين اللي جاية من المستخدم

        $this->addPlaintaiffLawyer($request->PlaintaiffLawyers, $case_id);

        return response()->json(['status' => 'success', 'message' => 'تم تعديل القضية بنجاح'], 200);

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
        $id = $request->case_id;

        $case = Cases::where('id', '=', $id)->first();

        $id_Archive = $request->id_Archive;

        if ($id_Archive != 2) {

            if ($case->deleteIndex() && $case->forceDelete()) {
                //remove all attachments files from storage
                $path = 'Attachments\Case_' . $request->case_id;

                $this->deleteDirectory($path);

                return response()->json(['status' => 'success', 'message' => 'تم حذف القضية بنجاح.']);
            } else {
                return response()->json(['status' => 'failed', 'message' => 'حدث خطأ أثناء الحذف. الرجاء إعادة المحاولة']);
            }
        } else {

            if ($case->delete()) {
                return response()->json(['status' => 'success', 'message' => 'تم أرشفة القضية بنجاح.']);
            } else {
                return response()->json(['status' => 'failed', 'message' => 'حدث خطأ أثناء الأرشفة. الرجاء إعادة المحاولة']);
            }

        }
    }

    public function updateDetails(Request $request)
    {
        $id = $request->id;

        $case = Cases::where('id', '=', $id)->first();

        $case->update(['claim' => $request->claim, 'facts' => $request->facts]);

        $case->updateIndex();

        return response()->json(['status' => 'success', 'message' => 'تم تعديل تفاصيل القضية بنجاح']);

    }

    public function Status_Update(Request $request)
    {
        $id = $request->id;

        $cases = Cases::where('id', '=', $id)->first();

        if ($request->Value_Status === '1') {

            $cases->update
                ([
                'Status' => 'رابحة',

                'Value_Status' => $request->Value_Status,
            ]);

        } elseif ($request->Value_Status === '2') {

            $cases->update
                ([
                'Status' => 'خاسرة',

                'Value_Status' => $request->Value_Status,
            ]);
        } elseif ($request->Value_Status === '3') {

            $cases->update
                ([
                'Status' => 'جارِ العمل عليها',

                'Value_Status' => $request->Value_Status,
            ]);
        } else {

            $cases->update
                ([
                'Status' => 'معلقة',

                'Value_Status' => $request->Value_Status,
            ]);
        }

        return response()->json(['status' => 'success', 'message' => 'تم تعديل حالة القضية بنجاح']);

    }

    public function unArchiveCasesCount()
    {
        $num_unarchived_cases = Cases::all()->count();

        return response()->json(['num_unarchived_cases' => $num_unarchived_cases]);
    }

    public function totalCasesCount()
    {
        $unArchived_cases = Cases::all()->count();

        $archived_cases = Cases::onlyTrashed()->count();

        $num_cases = $unArchived_cases + $archived_cases;

        return response()->json(['num_cases' => $num_cases]);

    }

    public function totalCasesCountAssignedForLawyer()
    {

        $LawyerID = Auth::user()->id;

        $unArchived_cases = Cases::whereHas('lawyers', function ($query) use ($LawyerID) {

            $query->where('user_id', '=', $LawyerID);

        })->count();

        $archived_cases = Cases::onlyTrashed()->whereHas('lawyers', function ($query) use ($LawyerID) {

            $query->where('user_id', '=', $LawyerID);

        })->count();

        $num_assigned_cases = $unArchived_cases + $archived_cases;

        return response()->json(['num_assigned_cases' => $num_assigned_cases]);
    }

    public function winnedCaseCount()
    {
        $winnedCase = Cases::where('Value_Status', 1)->count()

         + Cases::onlyTrashed()->where('Value_Status', 1)->count();

        return $winnedCase;

    }

    public function lostCaseCount()
    {
        $lostCase = Cases::where('Value_Status', 2)->count()

         + Cases::onlyTrashed()->where('Value_Status', 2)->count();

        return $lostCase;

    }

    public function runningCaseCount()
    {
        $runningCase = Cases::where('Value_Status', 3)->count()

         + Cases::onlyTrashed()->where('Value_Status', 3)->count();

        return $runningCase;
    }
    public function blockedCaseCount()
    {
        $blockedCase = Cases::where('Value_Status', 4)->count()

         + Cases::onlyTrashed()->where('Value_Status', 4)->count();

        return $blockedCase;

    }

    public function getCasesStatistics()
    {
        $winnedCase = $this->winnedCaseCount();

        $lostCase = $this->lostCaseCount();

        $runningCase = $this->runningCaseCount();

        $blockedCase = $this->blockedCaseCount();

        return response()->json(['winnedCase' => $winnedCase, 'lostCase' => $lostCase, 'runningCase' => $runningCase, 'blockedCase' => $blockedCase]);
    }

    public function latestCases()
    {
        $casesArray = [];

        $i = 0;
        $cases = [];

        if (Auth::user()->role_name === 'محامي') {
            $id = Auth::user()->id;
            $cases = Cases::whereHas('lawyers', function ($query) use ($id) {
                $query->where('user_id', '=', $id);
            })->limit(4)->get();
        } else {
            $cases = Cases::latest()->limit(4)->get();
        }
        foreach ($cases as $case) {

            $clients = $case->clients;

            $casesArray[$i++] = ['case' => $case, 'plaintiff_names' => $clients];

        }
        return response()->json(['cases' => $casesArray]);

    }

    public function getCountCases()
    {
        if (Auth::check()) {
            if (Auth::user()->role_name === 'محامي') {
                $cases = Cases::whereHas('lawyers_case')->count();

                return response()->json(['cases' => $cases]);

            } elseif (Auth::user()->role_name === 'زبون') {
                $cases = Cases::whereHas('clients_case')->count();

                return response()->json(['cases' => $cases]);
            } elseif (Auth::user()->role_name === 'مدير' || Auth::user()->role_name === 'سكرتاريا') {
                $cases = Cases::all()->Count();

                return response()->json(['cases' => $cases]);
            }

        }
    }
    // public function MarkAsRead_all (Request $request)
    // {

    //     $userUnreadNotification= auth()->user()->unreadNotifications;

    //     if($userUnreadNotification) {

    //         $userUnreadNotification->markAsRead();

    //         $userUnreadNotification->save();

    //         session()->flash('mark_as_read');

    //         return back();
    //     }

    // }

}
