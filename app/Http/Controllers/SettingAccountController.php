<?php
namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class SettingAccountController extends Controller
{

    //Show the form to change the user's password.

    public function index()
    {
        return view('users.account_settings');
    }

    //  * Update the user's password.

    public function update(Request $request)
    {

        $user = Auth::user();

        if (!Hash::check($request->current_password, $user->getAuthPassword())) {
            return response()->json(['status' => 'failed', 'message' => 'كلمة المرور الحالية غير صحيحة ']);
        }
        if (
            #Update the new Password
            User::whereId($user->id)->update([
                'password' => Hash::make($request->new_password)
            ])) {

            return response()->json(['status' => 'success','message' =>  'تم تغيير كلمة المرور بنجاح']);
        } else {
            return response()->json(['status' => 'failed', 'لم يتم تغيير كلمة السر! حاول مرة أخرى.']);
        }

    }




    function show()
    {
        $user = Auth::user();
        
        return response()->json(['user'=>$user]);
    }
}


