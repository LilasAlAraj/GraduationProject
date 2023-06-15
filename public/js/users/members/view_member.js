(() => {
    'use strict'

    feather.replace({ 'aria-hidden': 'true' })

})();
/********************* */

let data, member;



$(document).ready(function () {

    memberID = window.location.href.split('/');
    memberID = memberID[memberID.length - 1];
    // جلب البيانات من ملف JSON
    $.ajax({
        url: 'http://127.0.0.1:8000/users/' + memberID,
        dataType: 'json',
        success: function (response) {


            member = response


            setMemberData();


            document.getElementById('content').style.display = 'block';
            document.getElementById('spinner').style.display = 'none';
        },
        error: function (response) {
            console.log(response);
        }
    });



}
);




function setMemberData() {

    // ضبط الاسم
    document.getElementById('name').append(member.first_name + ' ' + member.last_name)
    // ضبط رقم الهاتف
    document.getElementById('phone_number').append(member.phone)
    // ضبط اسم الأب
    document.getElementById('father_name').append(member.father_name)
    // ضبط اسم الأم
    document.getElementById('mother_name').append(member.mother_name)
    // ضبط تاريخ الولادة
    document.getElementById('date_of_birth').append(member.date_of_birth)
    // ضبط مكان الولادة
    document.getElementById('place_of_birth').append(member.place_of_birth)
    // ضبط العنوان الحالي
    document.getElementById('current_address').append(member.current_address)
    // ضبط الدور الحالي
    document.getElementById('rule').append(member.role_name)
    document.getElementById('status').append(member.status)
    if (member.status === 'مفعل')
        document.getElementById('status').classList.add('text-bg-success')
    else
        document.getElementById('status').classList.add('text-bg-danger')

    if (member.email != null) {
        b = document.createElement('b')
        b.innerHTML = 'البريد الإلكتروني: '
        document.getElementById('email').append(b, member.email)
    }


}
