<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /* public function index()
    {

    return view('courts.view');

    }*/

    public function clientsIndex()
    {
        return view('users.clients.view_clients');
    }public function clientIndex()
    {
        return view('users.clients.view_client');
    }
    public function membersIndex()
    {
        return view('users.members.view_members');
    }
    public function memberIndex()
    {
        return view('users.members.view_member');
    }

    public function membersCreate()
    {
        return view('users.members.add_member');

    }public function clientsCreate()
    {
        return view('users.clients.add_client');

    }

    public function membershipRequest()
    {
        $user = User::where('status', '=', 'قيد الانتظار')->get();

        return response()->json($user);
    }

    public function processMembershipRequest(Request $request)
    {

        $user = User::find($request->userId);

        if (!$user) {
            return response()->json(['message' => 'لم يتم العثور على المستخدم'], 404);
        }

        if ($request->operation == 'approve') {
            $user->status = 'مفعل';
            $user->save();

            return response()->json(['status' => 'success', 'message' => 'تمت إضافة العضو بنجاح']);

        } elseif ($request->operation == 'deny') {
            $user->delete();
            return response()->json(['status' => 'success', 'message' => 'تمت رفض العضو بنجاح']);
        }

    }
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),
            [
                'first_name' => 'required|string',

                'last_name' => 'required|string',

                'mother_name' => 'string',

                'father_name' => 'string',

                'phone' => 'required|numeric|unique:users',

                'role_name' => 'required|string',

                'password' =>

                [

                    'required',

                    'string',

                    'min:8',

                    // 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
                ],
            ],

            [

                'first_name' . 'string' => 'يجب أن يكون الاسم الأول عبارة عن سلسة نصية',

                'first_name' . 'required' => 'يرجى إدخال الاسم الأول',

                'last_name' . 'string' => 'يجب أن يكون الاسم الأول عبارة عن سلسة نصية',

                'last_name' . 'required' => 'يرجى إدخال الاسم الأخير',

                'mother_name' . 'string' => 'يجب أن يكون الاسم الأول عبارة عن سلسة نصية',

                'father_name' . 'string' => 'يجب أن يكون الاسم الأول عبارة عن سلسة نصية',

                'phone.required' => 'يرجى إدخال رقم الهاتف',

                'phone.numeric' => 'يجب أن يكون رقم الهاتف قيمة رقمية',

                'phone.unique' => 'رقم الهاتف مسجل مسبقاً',

                'role_name' . 'required' => 'يرجى إدخال دور المستخدم',

                'password.required' => 'يرجى إدخال كلمة المرور',

                'password.string' => 'يجب أن تكون كلمة المرور سلسلة نصية',

                'password.min' => 'يجب أن تحتوي كلمة المرور على الأقل على 8 أحرف',

                // 'password.regex' => 'كلمة المرور يجب أن تحتوي على حرف كبير وحرف صغير ورقم على الأقل',

            ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'failed', 'message' => $validator->errors()]);
        }

        $password = Hash::make($request->input('password'));

        $user = new User;

        $user->password = $password;

        $user->phone = $request->input('phone');

        $user->email = $request->input('email');

        $user->role_name = $request->input('role_name');

        $user->first_name = $request->input('first_name');

        $user->last_name = $request->input('last_name');

        $user->mother_name = $request->input('mother_name');

        $user->father_name = $request->input('father_name');

        $user->place_of_birth = $request->input('place_of_birth');

        $user->current_address = $request->input('current_address');

        $user->date_of_birth = $request->input('date_of_birth');

        if ($user->role_name !== 'زبون') {
            $user->status = 'قيد الانتظار';

        } else {
            $user->status = 'مفعل';

        }
        $user->save();

        return response()->json(['status' => 'success', 'message' => 'تم الإضافة بنجاح'], 200);
    }

    public function show($id)
    {

        if ($id == 'getclients') {
            $clients = User::where('role_name', '=', 'زبون')->get();

            return response()->json(['clients' => $clients]);

        } else if ($id == 'getmembers') {
            $members = User::where('status', '=', 'مفعل')
                ->where(function ($query) {
                    $query->where('role_name', '=', 'محامي')->orWhere('role_name', '=', 'سكرتاريا');
                })
                ->get();
            return response()->json(['members' => $members]);

        } else {

            $user = User::find($id);

            return response()->json($user);
        }
    }

    public function editClient()
    {
        return view('users.clients.edit_client');
    }

    public function editMember()
    {
        return view('users.members.edit_member');
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'first_name' => 'required|string',

                'last_name' => 'required|string',

                'mother_name' => 'string',

                'father_name' => 'string',

                'phone' => 'required|numeric|unique:users',

            ],

            [

                'first_name' . 'string' => 'يجب أن يكون الاسم الأول عبارة عن سلسة نصية',

                'first_name' . 'required' => 'يرجى إدخال الاسم الأول',

                'last_name' . 'string' => 'يجب أن يكون الاسم الأول عبارة عن سلسة نصية',

                'last_name' . 'required' => 'يرجى إدخال الاسم الأخير',

                'mother_name' . 'string' => 'يجب أن يكون الاسم الأول عبارة عن سلسة نصية',

                'father_name' . 'string' => 'يجب أن يكون الاسم الأول عبارة عن سلسة نصية',

                'phone.required' => 'يرجى إدخال رقم الهاتف',

                'phone.numeric' => 'يجب أن يكون رقم الهاتف قيمة رقمية',

                'phone.unique' => 'رقم الهاتف مسجل مسبقاً',

            ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'failed', 'message' => $validator->errors()]);
        }
        $input = $request->all();

        $user = User::find($input['id']);

        $user->update($input);

        return response()->json(['status' => 'success', 'message' => 'تم التعديل بنجاح'], 200);
    }

    public function getAllLawyers()
    {
        $lawyers = User::select('first_name', 'last_name', 'id')->where('role_name', '=', 'محامي')->get();

        return response()->json(['lawyers' => $lawyers]);

    }

    public function getAllClientWithName(Request $request)
    {
        $clients = User::select('first_name', 'father_name', 'last_name', 'id')

            ->where('role_name', '=', "زبون")

            ->where('first_name', 'like', "$request->name%")

            ->orWhere('last_name', 'like', "$request->name%")

            ->orWhere('father_name', 'like', "$request->name%")

            ->get();

        return response()->json(['clients' => $clients]);
    }

    public function update_account_status(Request $request)
    {

        $userId = $request->id;

        $user = User::find($userId);

        if ($user) {

            if ($user->status === 'مفعل') {
                $user->update
                    ([

                    'status' => 'غير مفعل',
                ]);

                return response()->json(['status' => 'success', 'message' => 'تم تغيير حالة الحساب بنجاح']);

            } elseif ($user->status === 'غير مفعل') {
                $user->update

                    ([
                    'status' => 'مفعل',
                ]);

                return response()->json(['status' => 'success', 'message' => 'تم تغيير حالة الحساب بنجاح']);

            }

        }
    }
    public function destroy($id)
    {
        if (User::find($id)->forceDelete()) {

            return response()->json(['status' => 'success', 'message' => 'تم الحذف بنجاح']);

        } else {
            return response()->json(['status' => 'failed', 'message' => 'لم يتم الحذف ']);
        }

    }

    public function roleName()
    {

        $roleName = Auth::user()->role_name;

        $roleID = 0;

        if ($roleName === 'مدير') {
            $roleID = 1;

        } else if ($roleName === 'سكرتاريا') {
            $roleID = 2;
        } else if ($roleName === 'محامي') {
            $roleID = 3;
        } else if ($roleName === 'زبون') {
            $roleID = 4;
        }

        return response()->json(['role' => $roleID]);
    }

    public function isLoggedIn()
    {
        return response()->json(Auth::check());
    }
    public function clientCount()
    {
        $num_clients = User::where('role_name', '=', 'زبون')->count();

        return response()->json(['num_clients' => $num_clients]);
    }

}
