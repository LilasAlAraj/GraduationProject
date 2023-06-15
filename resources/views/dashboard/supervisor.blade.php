<!doctype html>
<html lang="ar" dir="rtl">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description"
        content="ليبرا هو بيتك القانوني.. وأكثر! يقوم بإدارة مكتبك وعملائك.. ويقوم بتنظيم الملفات والمهام.">
    <meta name="keywords"
        content="law firms management system, law, cases management system, cases, tasks, lawyers, lawyer, court">
    <meta name="author" content="Lilas">
    <meta name="generator" content="Lilas">
    <title>Libra</title>
    <meta name="csrf-token" content="{{ csrf_token() }}" />


    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous">
    </script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Reem+Kufi&family=Tilt+Prism&display=swap" rel="stylesheet">


    <link href="../../css/navs.css" rel="stylesheet">

    <link href="../../css/dashboard.rtl.css" rel="stylesheet">
</head>

<body>
    <div id="spinner">
        <div id="in-spinner">
            <div class="bounceImg" id="imgcontainer">
                <img src="{{ asset('Img/Logo.jpg') }}" alt="Avatar" id="avatar">
            </div>
            <div class="bounce" id="bounce1"></div>
            <div class="bounce" id="bounce2"></div>
            <div class="bounce" id="bounce3"></div>
        </div>
    </div>
    <div id="content" style="display: none">
        <header class="navbar sticky-top sticky-top flex-md-nowrap p-0 shadow"
            style="background-color:  rgb(7, 48, 78);">
            <button class="navbar-toggler position-absolute d-md-none collapsed" type="button"
                data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="http://127.0.0.1:8000">
                <div class="imgcontainer">

                    <img src="../../Img/Logo.jpg" alt="Avatar" class="avatar">
                </div>
            </a>
            <div class="d-flex justify-content-between w-100">
                <div class="navbar-nav">
                    <div class="nav-item text-nowrap ">
                        <p class=" px-3 m-2" id="time">time</p>
                    </div>
                </div>
                <div class="navbar-nav" style="">
                    <div class="nav-item text-nowrap ">

                        <a class="nav-link px-3"href="{{ route('logout') }}"
                            onclick="event.preventDefault();
                                 document.getElementById('logout-form').submit();">
                            تسجيل الخروج
                        </a>

                        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                            @csrf
                        </form>
                    </div>
                </div>
            </div>
        </header>

        <div class="container-fluid">
            <div class="row">

                <nav id="sidebarMenu" class="col-md-3 col-lg-2 col-sm-12 d-md-block  sidebar collapse">
                    <div class="position-sticky pt-3  sidebar-sticky ">
                        <ul class=" nav nav-pills flex-column mb-auto ">
                            <li class="mb-1 nav-item" id="homeNav">
                                <a href="http://127.0.0.1:8000/home" class="nav-link d-inline-flex  collapse-items">
                                    <span data-feather="home" class="align-text-bottom"></span>
                                    الصفحة الرئيسية
                                </a>
                            </li>
                            <div id="dashboardNav">

                            </div>
                            <li class="mb-1 nav-item ">
                                <button
                                    class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                                    data-bs-toggle="collapse" data-bs-target="#cases-collapse" aria-expanded="false">
                                    <span data-feather="file" class="align-text-bottom"></span>
                                    القضايا
                                </button>

                                <div class="collapse collapse-items" id="cases-collapse">
                                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small ">
                                        <li id="addNewCaseNav">

                                        </li>

                                        <li id="viewCaseNav">
                                            <a href="http://127.0.0.1:8000/cases"
                                                class="nav-link d-inline-flex  collapse-items">
                                                <span data-feather="file-text" class="align-text-bottom"></span>
                                                عرض القضايا
                                            </a>
                                        </li>

                                        <li id="retreiveCaseNav">

                                        </li>
                                        <li id="archiveCaseNav">

                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <div id="tasksLi">
                            </div>

                            <div id="clientsLi">
                            </div>

                            <div id="membersLi">
                            </div>

                            <li class="mb-1 nav-item ">
                                <button
                                    class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                                    data-bs-toggle="collapse" data-bs-target="#settings-collapse"
                                    aria-expanded="false">
                                    <span data-feather="settings" class="align-text-bottom"></span>
                                    الإعدادات
                                </button>

                                <div class="collapse" id="settings-collapse">
                                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small ">
                                        <li id="courtSettingsNav">
                                        </li>
                                        <li id="recommendationsNav">
                                        </li>
                                        <li id="role_permessionSettingsNav">
                                        </li>

                                        <li><a href="http://127.0.0.1:8000/account/setting"
                                                class="nav-link d-inline-flex  collapse-items">
                                                <span data-feather="tool" class="align-text-bottom"></span>
                                                إعدادات حسابي
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>

                <main class="col-md-9 col-lg-10 col-sm-12">
                    <div class="chartjs-size-monitor">
                        <div class="chartjs-size-monitor-expand">
                            <div class=""></div>
                        </div>
                        <div class="chartjs-size-monitor-shrink">
                            <div class=""></div>
                        </div>
                    </div>
                    <div
                        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">

                        <h2>لوحة القيادة</h2>

                        <div class="btn-toolbar mb-2 mb-md-0">
                            <div class="btn-group me-2">
                                <button type="button" class="btn btn-sm btn-outline-secondary"
                                    id="import">تصدير</button>
                            </div>

                        </div>

                    </div>

                    <div class="container">
                        <div class="row ">
                            <div class="col-12 mb-2"
                                style="font-size: small; font-weight: bolder; color: rgb(7, 48, 78);">
                                إحصاءات هامة </div>
                        </div>
                        <div class="row">
                            <div class="col-3">
                                <div class="card text-white bg-light mb-3" style="width: 100%">
                                    <div class="card-header" id="num_clients"></div>
                                    <div class="card-body">
                                        <div class="container m-3 d-flex justify-content-between">
                                            <h5 class="card-title"> <span data-feather="users"
                                                    class="align-text-bottom card-title-img"></span>
                                            </h5>
                                            <p class="card-text">
                                                العملاء
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="card text-white bg-light mb-3" style="width: 100%">
                                    <div class="card-header" id="num_cases"></div>
                                    <div class="card-body">
                                        <div class="container m-3  d-flex justify-content-between">
                                            <h5 class="card-title"> <span data-feather="file-text"
                                                    class="align-text-bottom card-title-img"></span>
                                            </h5>
                                            <p class="card-text">
                                                القضايا الكلية
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="card text-white bg-light mb-3" style="width: 100%">
                                    <div class="card-header" id="num_arc_cases"></div>
                                    <div class="card-body">
                                        <div class="container m-3  d-flex justify-content-between">

                                            <h5 class="card-title"> <span data-feather="archive"
                                                    class="align-text-bottom card-title-img"></span>
                                            </h5>
                                            <p class="card-text">
                                                القضايا المؤرشفة
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="card text-white bg-light mb-3" style="width: 100%">
                                    <div class="card-header" id="num_unarchived_cases"></div>
                                    <div class="card-body">
                                        <div class="container m-3 d-flex justify-content-between ">

                                            <h5 class="card-title"> <span data-feather="star"
                                                    class="align-text-bottom card-title-img"></span>
                                            </h5>
                                            <p class="card-text">
                                                القضايا الغير مؤرشفة
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <div class="row  chart">
                            <div class="col-lg-6 col-sm-12 col-md-6">
                                <div class="col-12"
                                    style="font-size: small; font-weight: bolder ; color: rgb(7, 48, 78);">
                                    نسبة إحصائية القضايا
                                </div>
                                <div class="col-12 ">
                                    <canvas id="casesChart" title="Cases Chart"></canvas>
                                </div>

                            </div>

                            <div class="col-lg-6 col-sm-12 col-md-6">
                                <div class="col-12"
                                    style="font-size: small; font-weight: bolder; color: rgb(7, 48, 78);">
                                    القضايا المضافة حديثاً
                                </div>
                                <div class="col-12 ">

                                    <div class="container ">

                                        <table class="table table-striped table-hover " id="cases-table">
                                            <thead>
                                                <tr>
                                                    <th> #</th>
                                                    <th>عنوان القضية</th>
                                                    <th>اسم الموكل</th>
                                                </tr>
                                            </thead>
                                            <tbody style="cursor: pointer;" id="cases-body-table">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                    <hr style="width: 100%; font-weight: 300;">

                    <div class="container">

                        <div class="row">
                            <div class="d-flex justify-content-between">
                                <div style="font-size: small; font-weight: bolder; color: rgb(7, 48, 78);">
                                    مهام اليوم
                                </div>
                                <form id='getTasksForDate' class="d-inline">

                                    <label for="date"
                                        style="font-size: small; font-weight: bolder; color: rgb(7, 48, 78);">
                                        تاريخ اليوم
                                    </label>
                                    <input type="date" name="date" id="date" class="h-100"
                                        style="border-radius: 5px;">
                                    <button type="submit" class="btn"
                                        style="background-color:  rgb(7, 48, 78); color:#fff;"
                                        onclick="nextTasksSearch()">بحث</button>
                                </form>
                            </div>
                        </div>
                        <br>
                        <div class="row ">

                            <table class="table  table-striped table-hover" id="tasks-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>الاسم</th>
                                        <th>الأولوية</th>
                                        <th>تاريخ البدء</th>
                                        <th>تاريخ الانتهاء</th>
                                        <th>اسم المسؤول</th>
                                        <th> الحالة</th>

                                    </tr>
                                </thead>
                                <tbody id="tasks-body-table"></tbody>
                            </table>
                        </div>
                    </div>
                    <hr>

                    <div class="container">


                        <div class="row ">


                            <div class="d-flex justify-content-between">
                                <div style="font-size: small; font-weight: bolder; color: rgb(7, 48, 78);">
                                    طلبات العضوية قيد الانتظار
                                </div>

                                <button class="btn" style="background-color:  rgb(7, 48, 78); color:#fff;"
                                    onclick="fillMembershipRequestTable()">
                                    <span data-feather="rotate-cw" class="align-text-bottom"></span>

                                </button>

                            </div>
                            <div class="row ">
                                <table class="table table-striped table-hover " id="membership-request-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>الاسم</th>
                                            <th>الدور</th>
                                            <th>العمليات</th>
                                        </tr>
                                    </thead>
                                    <tbody id="membership-request-body-table">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                </main><footer class="text-center">
                            <p>جميع الحقوق محفوظة © <span id="year"></span> <span class="logo">Libra</span></p>
                        </footer>
            </div>
        </div>

        <!--popup message-->




        <div class="modal fade" id="messageBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
            tabindex="-1" aria-labelledby="messageBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style="height: fit-content; ">
                <div class="modal-content">
                    <div class="modal-header" style=" background-color: rgb(87, 126, 155);">
                        <h1 class="modal-title fs-5" id="messageBackdropLabel" style=" color:white;">
                            رسالة
                        </h1>
                        <button type="button" class="btn-close m-0" data-bs-dismiss="modal" id="closeModal"
                            aria-label="Close"></button>

                    </div>
                    <div class=" modal-body">
                        <p id="message-text">
                        </p>
                    </div>

                </div>
            </div>
        </div>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js"
        integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"
        integrity="sha384-zNy6FEbO50N+Cg5wap8IKA4M/ZnLJgzc6w2NqACZaK0u0FXfOWRRJOnQtpZun8ha" crossorigin="anonymous">
    </script>

    <!-- html2pdf CDN-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js"></script>






    <script src="../../js/users/auth.js"></script>
    <script src="../../js/navs.js"></script>
    <script src="../../js/dashboard/supervisor.js"></script>




</body>

</html>
