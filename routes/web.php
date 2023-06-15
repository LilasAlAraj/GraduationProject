<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
 */

Route::get('/', function () {

//     $client = ClientBuilder::create()->build();
//         var_dump($client);
// //     $client = ClientBuilder::create()
// //         ->setHosts(['localhost:9200'])
// //         ->setBasicAuthentication('Lilas', '123456789')
// //         ->build();

// // // Info API
// //     $response = $client->info();
// //     dump($response->tagline);
    return view('test');
});
if (Auth::check()) {
    dump(Auth::user()->id);
}

Auth::routes();

Route::get('cases/archive', 'App\Http\Controllers\CaseArchiveController@index');
Route::get('cases/archive/all', 'App\Http\Controllers\CaseArchiveController@showAll');
Route::post('cases/archive/restore', 'App\Http\Controllers\CaseArchiveController@restore');

Route::group(['middleware' => 'admin'], function () {

    Route::delete('cases/archive', 'App\Http\Controllers\CaseArchiveController@destroy');

    Route::post('/status_update/{id}', 'App\Http\Controllers\CasesController@Status_Update')->name('Status_Update');

    Route::post('/updateDetails', 'App\Http\Controllers\CasesController@updateDetails')->name('updateDetails');

});

Route::get('home', 'App\Http\Controllers\HomeController@indexDashboardClient')->name('home');
//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::resource('sessions', 'App\Http\Controllers\SessionController'); // 🌷جلسات القضية
Route::get('/sessionsOfCase', 'App\Http\Controllers\CasesController@index');

//Dashboard
Route::get('dashboard/lawyer', 'App\Http\Controllers\HomeController@indexDashboardLawyer');
Route::get('dashboard/secretaria', 'App\Http\Controllers\HomeController@indexDashboardSecretaria')->name('DashboardSecretaria');
Route::get('dashboard/supervisor', 'App\Http\Controllers\HomeController@indexDashboardSupervisor');

//Requirements For Dashboards
Route::get('users/clients/count', 'App\Http\Controllers\UserController@clientCount');
Route::get('cases/unarchive/count', 'App\Http\Controllers\CasesController@unArchiveCasesCount');
Route::get('cases/archive/count', 'App\Http\Controllers\CaseArchiveController@archivedCasesCount');
Route::get('cases/total/count', 'App\Http\Controllers\CasesController@totalCasesCount');
Route::get('cases/statistics', 'App\Http\Controllers\CasesController@getCasesStatistics');
Route::get('cases/latest', 'App\Http\Controllers\CasesController@latestCases');
Route::get('cases/lawyer', 'App\Http\Controllers\CasesController@totalCasesCountAssignedForLawyer');
Route::get('tasks/all/count', 'App\Http\Controllers\TaskController@num_next_tasks');
//Count Of caes For member Or Client

Route::get('cases/count', 'App\Http\Controllers\CasesController@getCountCases');
//Recommendations

Route::get('recommendations/ir', 'App\Http\Controllers\IRRecomendationController@index');
Route::get('recommendations/ir/search', 'App\Http\Controllers\IRRecomendationController@search');
Route::get('recommendations', 'App\Http\Controllers\RecommendationController@index');
Route::get('recommendations/all', 'App\Http\Controllers\RecommendationController@all');
Route::get('recommendation/{id}', 'App\Http\Controllers\RecommendationController@show');
Route::post('recommendation', 'App\Http\Controllers\RecommendationController@store');
Route::put('recommendation', 'App\Http\Controllers\RecommendationController@update');
Route::delete('recommendation', 'App\Http\Controllers\RecommendationController@destroy');

//Role of user
Route::get('user/role', 'App\Http\Controllers\UserController@roleName');

//membershipRequest
Route::get('users/requests', 'App\Http\Controllers\UserController@membershipRequest');
//processMembershipRequest
Route::put('users/requests/process', 'App\Http\Controllers\UserController@processMembershipRequest');

//Filters of case
Route::get('cases/filter', 'App\Http\Controllers\FilterController@casesFilter');

//Filters of users
Route::get('users/filter', 'App\Http\Controllers\FilterController@usersFilter');

//courts
Route::post('court', 'App\Http\Controllers\CourtController@store');
Route::get('courts', 'App\Http\Controllers\CourtController@index');
Route::get('court/all', 'App\Http\Controllers\CourtController@show');
Route::delete('court', 'App\Http\Controllers\CourtController@destroy');

//decisions
Route::post('decision', 'App\Http\Controllers\DecisionController@store');
Route::get('decision/{id}', 'App\Http\Controllers\DecisionController@show');
Route::put('decision/update', 'App\Http\Controllers\DecisionController@update');
Route::delete('decision/', 'App\Http\Controllers\DecisionController@destroy');

//attachments of case
Route::post('case/attachment', 'App\Http\Controllers\CaseAttachmentController@store');
Route::get('case/attachment/download', 'App\Http\Controllers\CaseAttachmentController@get_file');
Route::delete('case/attachment/delete', 'App\Http\Controllers\CaseAttachmentController@destroy');

//attachments of session
Route::post('session/attachment', 'App\Http\Controllers\SessionAttachmentController@store');
Route::get('session/attachment/download', 'App\Http\Controllers\SessionAttachmentController@get_file');
Route::delete('session/attachment/delete', 'App\Http\Controllers\SessionAttachmentController@destroy');

//sessions
Route::post('session', 'App\Http\Controllers\SessionController@store');
Route::get('session/{id}', 'App\Http\Controllers\SessionController@show');
Route::put('session/update', 'App\Http\Controllers\SessionController@update');
Route::delete('session/', 'App\Http\Controllers\SessionController@destroy');

// // archive
// Route::get('cases/archive', 'App\Http\Controllers\CaseArchiveController@index');
// Route::get('cases/archive/all', 'App\Http\Controllers\CaseArchiveController@showAll');
// Route::delete('cases/archive', 'App\Http\Controllers\CaseArchiveController@destroy');
// Route::post('cases/archive/restore', 'App\Http\Controllers\CaseArchiveController@restore');

//account setting
Route::get('account/setting', 'App\Http\Controllers\SettingAccountController@index');
Route::post('account/change_password', 'App\Http\Controllers\SettingAccountController@update');
Route::get('account', 'App\Http\Controllers\SettingAccountController@show');

Route::get('cases/ir', 'App\Http\Controllers\IRCasesController@index');
Route::get('cases/ir/search', 'App\Http\Controllers\IRCasesController@search');
Route::resource('cases', 'App\Http\Controllers\CasesController'); // 🌷القضية

Route::get('cases/view/{id}', 'App\Http\Controllers\CasesController@view_case');

//clients and members

Route::post('users/register', 'App\Http\Controllers\UserController@store');
Route::post('users/update', 'App\Http\Controllers\UserController@update');
Route::get('users/client/{id}/edit/', 'App\Http\Controllers\UserController@editClient');
Route::get('users/member/{id}/edit', 'App\Http\Controllers\UserController@editMember');
Route::get('users/clients', 'App\Http\Controllers\UserController@clientsIndex');
Route::post('users/update_status', 'App\Http\Controllers\UserController@update_account_status');
Route::get('users/clients/create', 'App\Http\Controllers\UserController@clientsCreate');
Route::get('users/clients/{id}', 'App\Http\Controllers\UserController@clientIndex');
Route::get('users/members/create', 'App\Http\Controllers\UserController@membersCreate');
Route::get('users/members/{id}', 'App\Http\Controllers\UserController@memberIndex');
Route::get('users/members', 'App\Http\Controllers\UserController@membersIndex');
Route::get('users/{getclients}', 'App\Http\Controllers\UserController@show');
Route::get('users/{getmembers}', 'App\Http\Controllers\UserController@show');
Route::delete('users/{id}', 'App\Http\Controllers\UserController@destroy');
Route::get('members', 'App\Http\Controllers\UserController@membersCreate');
Route::get('clients', 'App\Http\Controllers\UserController@clientsCreate');
Route::get('lawyers', 'App\Http\Controllers\UserController@getAllLawyers');
Route::get('clients/{name}', 'App\Http\Controllers\UserController@getAllClientWithName');

Route::get('/status_show/{id}', 'App\Http\Controllers\CasesController@show')->name('Status_show'); // حالة القضية (رابحة -خاسرة -جاري العمل عليها - مفتوحة )🌷

Route::post('/status_update/{id}', 'App\Http\Controllers\CasesController@Status_Update')->name('Status_Update'); // 🌷تغيير حالة القضية
Route::post('/updateDetails', 'App\Http\Controllers\CasesController@updateDetails')->name('updateDetails'); // 🌷تغيير حالة القضية

//tasks
Route::get('task/create', 'App\Http\Controllers\TaskController@create');
Route::post('task', 'App\Http\Controllers\TaskController@store');
Route::delete('task/{id}', 'App\Http\Controllers\TaskController@destroy');
Route::get('tasks', 'App\Http\Controllers\TaskController@index');
Route::get('tasks/filter', 'App\Http\Controllers\TaskController@filter');
Route::put('tasks/{id}', 'App\Http\Controllers\TaskController@update');
Route::get('tasks/{id}', 'App\Http\Controllers\TaskController@show');
Route::get('tasks/{id}/edit', 'App\Http\Controllers\TaskController@edit');
Route::put('tasks/{id}/status/edit', 'App\Http\Controllers\TaskController@updateStatus');
Route::get('/tasks/{userId}', 'App\Http\Controllers\TaskController@taskDisplay');
