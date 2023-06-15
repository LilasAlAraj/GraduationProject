<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {

            if (Auth::user()->role_name === 'مدير') {
                return $next($request);
            } else if (Auth::user()->role_name === 'سكرتاريا') {
                return redirect()->back()->withErrors(['Unauthorized']);
                //->route('/dashboard/secretaria');
            } else if (Auth::user()->role_name === 'محامي') {
                return redirect()->route('/dashboard/lawyer');
            } else {
                return redirect()->route('home');
            }

        }else{
            return redirect()->route('login');

        }
    }
}
