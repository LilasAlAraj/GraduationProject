<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
     */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    protected function validateLogin(Request $request)
    {

        $messages = [
            "username.required" => "Username is required",
            "username.exists" => "Wrong password or this account not approved yet.",
            "password.required" => "Password is required",
            "password.min" => "Password must be at least 8 characters",
        ];
        $table = $this->username();

        $request->validate([
            'username' => "required|exists:users,$table",
            'password' => 'required|min:8',
        ], $messages);
    }

    public function username()
    {

        $login = request()->input('username');
        if (filter_var($login, FILTER_VALIDATE_EMAIL)) {
            $field = 'email';
        } else {
            $field = 'phone';
        }

        return $field;
    }

    protected function credentials(Request $request)
    {
        return [$this->username() => $request->username, 'password' => $request->password,'status'=>'مفعل'];
    }

}
