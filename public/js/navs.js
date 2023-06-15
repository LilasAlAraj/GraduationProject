function updateTime() {
    var now = new Date();
    // jQuery('#time').val(now.toString());
    document.getElementById("time").innerHTML = now.toString();
}

setInterval(updateTime, 1000);

function setNavAuth(role) {
    setCaseNavAuth(role);
    setTaskNavAuth(role);
    setClientNavAuth(role);
    setMemberNavAuth(role);
    setSettingsAuth(role);
    setDashboardNavAuth(role);
}

function setDashboardNavAuth(role) {
    let location;
    if (role == 1) {
        location = "http://127.0.0.1:8000/dashboard/supervisor";
    } else if (role == 2) {
        location = "http://127.0.0.1:8000/dashboard/secretaria";
    } else if (role == 3) {
        location = "http://127.0.0.1:8000/dashboard/lawyer";
    }

    if (role != 4) {
        document.getElementById("dashboardNav").innerHTML =
            '<li class="mb-1 nav-item">' +
            '<a href="' +
            location +
            '" class="nav-link d-inline-flex  collapse-items">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-monitor align-text-bottom" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>' +
            "لوحة القيادة" +
            "</a>" +
            "</li>";
    }
}

function setSettingsAuth(role) {
    if (role == 2 || role == 1) {
        document.getElementById("courtSettingsNav").innerHTML =
            '<a href="http://127.0.0.1:8000/courts" class="nav-link d-inline-flex  collapse-items">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers align-text-bottom" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>' +
            "المحاكم" +
            "</a>";
    } else if (role == 1) {
        document.getElementById("role_permessionSettingsNav").innerHTML =
            '<a href="(هون منحط الرابط لما بدنا)" class="nav-link d-inline-flex  collapse-items">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sliders align-text-bottom" aria-hidden="true"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>' +
            "أدوار المستخدمين وصلاحياتهم" +
            "</a>";
    }

    if (role == 1 || role == 2) {
        document.getElementById("recommendationsNav").innerHTML =
            '<a href="http://127.0.0.1:8000/recommendations" class="nav-link d-inline-flex  collapse-items">' +
            '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>' +
            " التوصيات" +
            "</a>";
    }
}
function setMemberNavAuth(role) {
    if (role == 1 || role == 2) {
        document.getElementById("membersLi").innerHTML =
            '<li class="mb-1 nav-item ">' +
            "<button " +
            'class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"' +
            'data-bs-toggle="collapse" data-bs-target="#member-collapse" aria-expanded="false">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users align-text-bottom" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>' +
            "أفراد المكتب" +
            "</button>" +
            '<div class="collapse" id="member-collapse">' +
            '<ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small ">' +
            "<li>" +
            '<a href="http://127.0.0.1:8000/users/members/create" class="nav-link d-inline-flex  collapse-items">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus align-text-bottom" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>' +
            "إضافة فرد جديد" +
            "</a>" +
            "</li>" +
            '<li><a href="http://127.0.0.1:8000/users/members" class="nav-link d-inline-flex  collapse-items">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-check align-text-bottom" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>' +
            "عرض الأفراد" +
            "</a></li>" +
            "</ul>" +
            "</div>" +
            "</li>";
    }
}

function setClientNavAuth(role) {
    if (role == 1 || role == 2) {
        document.getElementById("clientsLi").innerHTML =
            '<li class="mb-1 nav-item ">' +
            "<button " +
            'class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"' +
            'data-bs-toggle="collapse" data-bs-target="#client-collapse" aria-expanded="false">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users align-text-bottom" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>' +
            "العملاء" +
            "</button>" +
            '<div class="collapse" id="client-collapse">' +
            '<ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small ">' +
            "<li>" +
            '<a href="http://127.0.0.1:8000/users/clients/create" class="nav-link d-inline-flex  collapse-items">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus align-text-bottom" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>' +
            "إضافة عميل جديد" +
            "</a>" +
            "</li>" +
            '<li><a href="http://127.0.0.1:8000/users/clients" class="nav-link d-inline-flex  collapse-items">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-check align-text-bottom" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>' +
            "عرض العملاء" +
            "</a></li>" +
            "</ul>" +
            "</div>" +
            "</li>";
    }
}

function setTaskNavAuth(role) {
    addNewTask = "";
    if (role == 1 || role == 2)
        addNewTask =
            "<li>" +
            '<a href="http://127.0.0.1:8000/task/create" class="nav-link d-inline-flex  collapse-items">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle align-text-bottom" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>' +
            "إضافة مهمة جديدة" +
            "</a>" +
            "</li>";

    if (role != 4) {
        document.getElementById("tasksLi").innerHTML =
            '<li class="mb-1 nav-item ">' +
            "<button " +
            'class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"' +
            'data-bs-toggle="collapse" data-bs-target="#task-collapse" aria-expanded="false">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pen-tool align-text-bottom" aria-hidden="true"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>' +
            "المهام" +
            "</button>" +
            '<div class="collapse" id="task-collapse">' +
            '<ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small ">' +
            addNewTask +
            '<li><a href="http://127.0.0.1:8000/tasks" class="nav-link d-inline-flex  collapse-items">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-watch align-text-bottom" aria-hidden="true"><circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 13.5 13.5"></polyline><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path></svg>' +
            "عرض المهام" +
            "</a></li>" +
            "</ul>" +
            "</div>" +
            "</li>";
    }
}
function setCaseNavAuth(role) {
    if (role == 1) {
        document.getElementById("retreiveCaseNav").innerHTML =
            '<a href="http://127.0.0.1:8000/cases/ir" class="nav-link d-inline-flex collapse-items L-Affiliate-Tagged">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search align-text-bottom" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>' +
            "استرجاع القضايا المشابهة" +
            "</a>";
    }
    if (role == 1 || role == 2) {
        document.getElementById("addNewCaseNav").innerHTML =
            '<a href="http://127.0.0.1:8000/cases/create" class="nav-link d-inline-flex collapse-items L-Affiliate-Tagged">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-plus align-text-bottom" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>' +
            "إضافة قضية جديدة";
        ("</a>");

        document.getElementById("archiveCaseNav").innerHTML =
            '<a href="http://127.0.0.1:8000/cases/archive" class="nav-link d-inline-flex collapse-items L-Affiliate-Tagged">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-archive align-text-bottom" aria-hidden="true"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>' +
            " أرشيف القضايا";
        ("</a>");
    }
}

/*

الفرق بين الكودين هو كيفية تنفيذ الكود.

الأول:

$(document).ready(function () {
  setNavAuth();
});

يستخدم jQuery للتأكد من أن المستند HTML قد انتهى من التحميل والجاهزية (ready) قبل تنفيذ الكود الذي يتم إدخاله داخل دالة `$(document).ready()`. بمعنى آخر، يتم تأجيل تنفيذ الكود حتى يتم تحميل كل العناصر في المستند HTML.

الثاني:

(() => {
  setNavAuth();
})();

هو تعبير عن الدالة الفرعية (IIFE) والتي تقوم بتنفيذ الكود فور تحميل صفحة HTML بشكل فوري دون الحاجة إلى الانتظار حتى ينتهي التحميل. عندما يتم تحميل الصفحة HTML، يتم تنفيذ الدالة الفرعية فوراً ويتم تنفيذ الكود الذي تم إدخاله داخل الدالة.

وبالتالي، يمكن استخدام الكود الأول لتأجيل تنفيذ الكود حتى يتم تحميل كل العناصر في المستند HTML، في حين يمكن استخدام الثاني لتنفيذ الكود فوراً بعد تحميل صفحة HTML.

*/

(() => {
    // Create a new Date object
    const currentDate = new Date();
    // Get the current year
    const currentYear = currentDate.getFullYear();
    const year = document.getElementById("year");
    year.innerHTML = currentYear;

    // const screenHeigh = window.innerHeight;

    // const footer = document.querySelector('footer');
    // const footerHeigh = footer.offsetHeight;
    // footer.style.top = (screenHeigh - footerHeigh) + 'px';

    fetchUserRole()
        .then((role) => {
            setNavAuth(role);
        })
        .catch((error) => {
            console.log(error);
        });
})();
