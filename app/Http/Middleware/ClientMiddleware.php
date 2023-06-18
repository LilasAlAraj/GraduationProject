<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ClientMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check() && Auth::user()->role_name === 'زبون')
        {
            return $next($request);
        }
      
        elseif (Auth::check() &&  Auth::user()->role_name ==='محامي')

        {
            return redirect()->route('dashboard.lawyer');
        }
        elseif (Auth::check() &&  Auth::user()->role_name ==='سكرتاريا')

        {
            return redirect()->route('dashboard.secretaria');
        }
       
}
}