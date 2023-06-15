<!DOCTYPE html>
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
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <title>Libra</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous">
    </script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Reem+Kufi&family=Tilt+Prism&display=swap" rel="stylesheet">

    <link href="../../css/navs.css" rel="stylesheet">
    <link href="../../css/style.css" rel="stylesheet">


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
                                        <li id="addNewPrivateCaseNav">

                                        </li>
                                        <li id="viewCaseNav">
                                            <a href="http://127.0.0.1:8000/cases"
                                                class="nav-link d-inline-flex  collapse-items">
                                                <span data-feather="file-text" class="align-text-bottom"></span>
                                                عرض القضايا
                                            </a>
                                        </li>
                                        <li id="viewPrivateCaseNav">

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
                    <form id="task-form">

                        <div class="container">

                            <div class="row ">
                                <div class="col-12">
                                    <h1>تعديل مهمة </h1>
                                </div>
                            </div>
                            <hr>
                        </div>

                        <div class="container">
                            <div class="row ">
                                <div class="col-6">
                                    <label for="name"><b>اسم المهمة</b></label>
                                    <input type="text" id="name" placeholder="اسم مختصر يشرح طبيعة المهمة"
                                        name="name" required>
                                </div>

                                <div class="col-6">
                                    <label for="priority"><b>الأولوية</b></label>
                                    <select id="priority" name="priority">
                                        <option disabled selected hidden>اختر الأولوية</option>
                                        <option value='عالية'> عالية</option>
                                        <option value='متوسطة'> متوسطة</option>
                                        <option value='منخفضة'> منخفضة</option>
                                    </select>

                                </div>


                            </div>
                            <div class="row">

                                <div class="col-12">
                                    <label for="description"><b>الوصف</b></label>

                                    <textarea class="form-control" placeholder="وصف مفصل لتفاصيل المهمة ومتطلباتها وأهدافها" id="description"
                                        name="description" rows="5" style="max-height:8em;" required></textarea>

                                </div>
                            </div>

                            <div class="row">
                                <div class="col-6">
                                    <label for="start_date"><b>تاريخ البدء</b></label>
                                    <input type="date" id="start_date" name="start_date" required>
                                </div>
                                <div class="col-6">
                                    <label for="end_date"><b>تاريخ الانتهاء</b> </label>
                                    <input type="date" id="end_date" name="end_date" required>
                                </div>
                            </div>

                            <div class=" col-12 frame">
                                <div class="lawyers" id="lawyers">
                                </div>
                                <hr>

                                <div class="container">
                                    <div class="row d-flex  justify-content-evenly">
                                        <button id="lawyer-pls-vs1" onclick="addLawyerField()" type="button">
                                            <span data-feather="plus" class="align-text-bottom "></span>
                                        </button>
                                        <button id="lawyer-delete-vs1" onclick="deleteLawyerField()" type="button">
                                            <span data-feather="minus" class="align-text-bottom "></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" id="add_btn" onclick="editTask()">تعديل</button>

                        </div>


                        <!--<div id="error" class="error"></div>-->
                    </form>

                </main>
                <footer class="text-center">
                    <p>جميع الحقوق محفوظة © <span id="year"></span> <span class="logo">Libra</span></p>
                </footer>
            </div>
        </div>


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
    <script src="../../js/users/auth.js"></script>
    <script src="../../js/tasks/taskSet.js"></script>
    <script src="../../js/tasks/edit.js"></script>

    <script src="../../js/navs.js"></script>
</body>

</html>
