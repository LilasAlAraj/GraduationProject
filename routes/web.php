<?php

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

    return view('test');
});

Auth::routes();

//------عرض الداشبورد الخاصة بالعميل------//

Route::get('home', 'App\Http\Controllers\HomeController@indexDashboardClient')->name('dashboard.client');


Route::group(['middleware' => 'admin'], function () {


    //------تعديل حالة الحساب من قيد الانتظار الى مفعل وبالعكس------//

    Route::post('users/update_status', 'App\Http\Controllers\UserController@update_account_status');

    //------القيام باسترجاع القضايا------//

    Route::get('cases/ir', 'App\Http\Controllers\IRCasesController@index');

    Route::get('cases/ir/search', 'App\Http\Controllers\IRCasesController@search');

    //------تعديل حالة القضية------//

    Route::post('/status_update/{id}', 'App\Http\Controllers\CasesController@Status_Update')->name('Status_Update');

    //-------تعديل تفاصيل القضية من التماس ووقائع-----//

    Route::post('/updateDetails', 'App\Http\Controllers\CasesController@updateDetails')->name('updateDetails');

    //------إضافة توصية إلى النظام من قبل الادمن------//

    Route::post('recommendation', 'App\Http\Controllers\RecommendationController@store');

    //-------تعديل التوصية-----//
    Route::put('recommendation', 'App\Http\Controllers\RecommendationController@update');

    //-------حذف توصية-----//
    Route::delete('recommendation', 'App\Http\Controllers\RecommendationController@destroy');

    //-------عرض الداشبورد الخاصة بالمحامي-----//

    Route::get('dashboard/lawyer', 'App\Http\Controllers\HomeController@indexDashboardLawyer');

    //------عرض الداشبورد الخاصة بالادمن------//

    Route::get('dashboard/supervisor', 'App\Http\Controllers\HomeController@indexDashboardSupervisor');

});

Route::group(['middleware' => 'role'], function () {

    /*إعدادات إضافة مستخدم جديد إلى النظام والقيام بعملية الحذف والاضافة والتعديل */

    //------رض طلبات العضوية الى النظام------//

    Route::get('users/requests', 'App\Http\Controllers\UserController@membershipRequest');

    //-----قبول أو رفض طلبات العضوية-------//

    Route::put('users/requests/process', 'App\Http\Controllers\UserController@processMembershipRequest');

    //-------إضافة مستخدم ضمن النظام--------//

    Route::post('users/register', 'App\Http\Controllers\UserController@store');

    //-------عرض صفحة تعديل اعدادت  مستخدم ضمن النظام--------//

    Route::post('users/update', 'App\Http\Controllers\UserController@update');

    //-------تعديل اعدادت  مستخدم(عميل مكتب) ضمن النظام--------//

    Route::get('users/client/{id}/edit/', 'App\Http\Controllers\UserController@editClient');

    //-------تعديل اعدادت  مستخدم(فرد مكتب) ضمن النظام--------//

    Route::get('users/member/{id}/edit', 'App\Http\Controllers\UserController@editMember');

    //------- عرض  صفحة العملاء ضمن النظام--------//

    Route::get('users/clients', 'App\Http\Controllers\UserController@clientsIndex');

    //------- عرض  صفحة الأفراد ضمن النظام--------//

    Route::get('users/members', 'App\Http\Controllers\UserController@membersIndex');

    //-------عرض صفحة لانشاء مستخدم(عميل مكتب) ضمن النظام--------//

    Route::get('users/clients/create', 'App\Http\Controllers\UserController@clientsCreate');

    //-------عرض صفحة لانشاء مستخدم(فرد مكتب) ضمن النظام--------//

    Route::get('users/members/create', 'App\Http\Controllers\UserController@membersCreate');

    //------- عرض (عميل مكتب) ضمن النظام--------//

    Route::get('users/clients/{id}', 'App\Http\Controllers\UserController@clientIndex');

    //------- عرض (فرد مكتب) ضمن النظام--------//

    Route::get('users/members/{id}', 'App\Http\Controllers\UserController@memberIndex');

    //-------عرض العملاء ضمن النظام------//

    Route::get('users/{getclients}', 'App\Http\Controllers\UserController@show');

    //-------عرض الأفراد ضمن النظام------//

    Route::get('users/{getmembers}', 'App\Http\Controllers\UserController@show');

    //-------حذف مستخدم ضمن النظام------//

    Route::delete('users/{id}', 'App\Http\Controllers\UserController@destroy');

    //-------عرض المحاميين ضمن النظام------//

    Route::get('lawyers', 'App\Http\Controllers\UserController@getAllLawyers');

    //--------- القيام بعمليات البحث عللى المستخدمين ضمن النظام----------//

    Route::get('users/filter', 'App\Http\Controllers\FilterController@usersFilter');

    //-----  الداشبورد الخاصة بالسكرتاريا--------//

    Route::get('dashboard/secretaria', 'App\Http\Controllers\HomeController@indexDashboardSecretaria')->name('dashboard.secretaria');

    //-----تعديل حالة القضية  --------//

    Route::post('/status_update/{id}', 'App\Http\Controllers\CasesController@Status_Update')->name('Status_Update');

     //------أرشفة القضية--------//

     Route::get('cases/archive', 'App\Http\Controllers\CaseArchiveController@index');

     //------عرض جميع القضايا المؤرشفة-----//

     Route::get('cases/archive/all', 'App\Http\Controllers\CaseArchiveController@showAll');

     //-----إعادة القضايا من حالتها المؤرشفة ليتم عرضها ضمن النظام------//

     Route::post('cases/archive/restore', 'App\Http\Controllers\CaseArchiveController@restore');

     //------أرشفة القضية--------//
     Route::delete('cases/archive', 'App\Http\Controllers\CaseArchiveController@destroy');

    //-----  عرض الصفحة لإنشاء قضية جديدة--------//

    Route::get('cases/create', 'App\Http\Controllers\CasesController@create');

    //----- تخزين البيانات الخاصة بقضية معينه ضمن الداتابيز-------//

    Route::post('cases/store', 'App\Http\Controllers\CasesController@store');

    //----- عرض الصفحة الخاصة بتعديل القضية--------//

    Route::get('cases/edit/{id}', 'App\Http\Controllers\CasesController@edit');

    //----- تعديل بيانات القضية--------//

    Route::put('cases/update/{id}', 'App\Http\Controllers\CasesController@update');

    //---------إضافة محكمة-------//

    Route::post('court', 'App\Http\Controllers\CourtController@store');

    //-----عرض القضايا المخزنة ------//

    Route::get('courts', 'App\Http\Controllers\CourtController@index');

    //-----حذف قضية ------//

    Route::delete('court', 'App\Http\Controllers\CourtController@destroy');

    //------إدارة الجلسات الخاصة بالقضية من حيث الاضافة والتعديل والحذف-----//

    Route::resource('sessions', 'App\Http\Controllers\SessionController');

    //-----عرض صفحة تعديل القراار------//

    Route::put('decision/update', 'App\Http\Controllers\DecisionController@update');

    //------حذف قرار-----//

    Route::delete('decision/', 'App\Http\Controllers\DecisionController@destroy');

    //----إضافة قرار-------//

    Route::post('decision', 'App\Http\Controllers\DecisionController@store');

    //------عرض صفحة تعديل الجلسة-----//

    Route::put('session/update', 'App\Http\Controllers\SessionController@update');

    //-----حذف جلسة------//

    Route::delete('session/', 'App\Http\Controllers\SessionController@destroy');

    //-----إضافة جلسة------//

    Route::post('session', 'App\Http\Controllers\SessionController@store');

    //------عرض صفجة إنشاء مهمة-----//

    Route::get('task/create', 'App\Http\Controllers\TaskController@create');

    //------إنشاء مهمة-----//

    Route::post('task', 'App\Http\Controllers\TaskController@store');

    //-----حذف مهمة------//

    Route::delete('task/{id}', 'App\Http\Controllers\TaskController@destroy');

    //------تعديل حالة المهمة-----//

    Route::put('tasks/{id}/status/edit', 'App\Http\Controllers\TaskController@updateStatus');

    //-----عرض صفحة تعديل المهمة------//

    Route::put('tasks/{id}', 'App\Http\Controllers\TaskController@update');

    //-----تعديل المهمة------//

    Route::get('tasks/{id}/edit', 'App\Http\Controllers\TaskController@edit');

});

Route::group(['middleware' => 'lawyer'], function () {

    //------عرض الداشبورد الخاصة بالادمن------//

    Route::get('dashboard/lawyer', 'App\Http\Controllers\HomeController@indexDashboardLawyer')->name('dashboard.lawyer');;

});

//------القيام بعمليات البحث الذكي على التوصيات المضافة----//
Route::get('recommendations/ir', 'App\Http\Controllers\IRRecomendationController@index');

Route::get('recommendations/ir/search', 'App\Http\Controllers\IRRecomendationController@search');

/*
من أجل القيام بالاحصائيات على عدد القضايا المخزنة ضمن النظام حسب حالتها
سواء كانت رابحة او خاسرة او معلقة او جاري العمل عليها
وايضا بالنسبة للقضايا المؤرشفة وايضا القيام بعمليات احصائية على مستخدمي النظام
 */

Route::get('clients/count', 'App\Http\Controllers\UserController@clientCount');

Route::get('cases/unarchive/count', 'App\Http\Controllers\CasesController@unArchiveCasesCount');

Route::get('cases/archive/count', 'App\Http\Controllers\CaseArchiveController@archivedCasesCount');

Route::get('cases/total/count', 'App\Http\Controllers\CasesController@totalCasesCount');

Route::get('cases/statistics', 'App\Http\Controllers\CasesController@getCasesStatistics');

Route::get('cases/latest', 'App\Http\Controllers\CasesController@latestCases');

Route::get('cases/lawyer', 'App\Http\Controllers\CasesController@totalCasesCountAssignedForLawyer');

Route::get('tasks/all/count', 'App\Http\Controllers\TaskController@num_next_tasks');

//-----من أجل إعادة عدد القضايا التي تخص كل فرد ضمن المكتب او الخاصة بالعميل ----//

Route::get('cases/count', 'App\Http\Controllers\CasesController@getCountCases');

//-----من أجل حساب الاحصائيات الخاصة بكل داشبورد لكل يوزر ضمن النظام----//

Route::get('court/all', 'App\Http\Controllers\CourtController@show');

Route::get('recommendations', 'App\Http\Controllers\RecommendationController@index');

Route::get('recommendations/all', 'App\Http\Controllers\RecommendationController@all');

Route::get('recommendation/{id}', 'App\Http\Controllers\RecommendationController@show');

//------ من أجل معرفة نوع الحساب الذي قام بتسجيل الدخول به إلى النظام------//

Route::get('user/role', 'App\Http\Controllers\UserController@roleName');

//------من أجل القيام بالبحث ضمن القضايا حسب عدة مفاتيح------//

Route::get('cases/filter', 'App\Http\Controllers\FilterController@casesFilter');

//------عرض القارا الخاصة بهذه القضية من قبل جميع المستخدمين--------//

Route::get('decision/{id}', 'App\Http\Controllers\DecisionController@show');

//-------من أجل الفيام بارسال  المرفق الخاص بقضية  ما  وحذفه ومشاهدته لدى حميع مستخدمي النظام-------//

Route::post('case/attachment', 'App\Http\Controllers\CaseAttachmentController@store');

Route::get('case/attachment/download', 'App\Http\Controllers\CaseAttachmentController@get_file');

Route::delete('case/attachment/delete', 'App\Http\Controllers\CaseAttachmentController@destroy');

//-------من أجل الفيام بارسال المرفق  الخاص بجلسة ما ضمن القضية وحذفه ومشاهدته لدى حميع مستخدمي النظام-------//
Route::post('session/attachment', 'App\Http\Controllers\SessionAttachmentController@store');

Route::get('session/attachment/download', 'App\Http\Controllers\SessionAttachmentController@get_file');

Route::delete('session/attachment/delete', 'App\Http\Controllers\SessionAttachmentController@destroy');

//------عرض الجلسة الخاصة بهذه القضيةلجميع المستخدمين ضمن النظام-------//

Route::get('session/{id}', 'App\Http\Controllers\SessionController@show');

//-------عرض معلومات الحساب وتعديل كلمة المرور--------//

Route::get('clients/{name}', 'App\Http\Controllers\UserController@getAllClientWithName');

Route::get('account/setting', 'App\Http\Controllers\SettingAccountController@index');

Route::post('account/change_password', 'App\Http\Controllers\SettingAccountController@update');

Route::get('account', 'App\Http\Controllers\SettingAccountController@show');

//------عرض القضايا الخاصة بكل يوزر ضمن النظام- مع عر حالة القضية------//

Route::resource('cases', 'App\Http\Controllers\CasesController');

Route::get('cases/view/{id}', 'App\Http\Controllers\CasesController@view_case');

Route::get('cases/show/{id}', 'App\Http\Controllers\CasesController@show');

Route::get('/status_show/{id}', 'App\Http\Controllers\CasesController@show')->name('Status_show');

//-------عرض صفحةالمهام  ------//

Route::get('tasks', 'App\Http\Controllers\TaskController@index');

//-------فلترة المهام حسب عدة مفاهيم-----//

Route::get('tasks/filter', 'App\Http\Controllers\TaskController@filter');

//-------عرض مهمة معينة ------//

Route::get('tasks/{id}', 'App\Http\Controllers\TaskController@show');

//--------عرض جلسات القضيه -------//

Route::get('/sessionsOfCase', 'App\Http\Controllers\CasesController@index');
