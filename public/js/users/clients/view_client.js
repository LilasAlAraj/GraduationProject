(() => {
    'use strict'

    feather.replace({ 'aria-hidden': 'true' })

})();

/********************* */

let data, client,clientID;



$(document).ready(function () {

    clientID = window.location.href.split('/');
    clientID = clientID[clientID.length - 1];
    // جلب البيانات من ملف JSON
    $.ajax({
        url: 'http://127.0.0.1:8000/users/'+clientID,
        dataType: 'json',
        success: function (response) {





            client =response


            setClientData();

            document.getElementById('content').style.display = 'block';
            document.getElementById('spinner').style.display = 'none';

        },
        error: function (response) {
            console.log(response);
        }
    });



}
);




function setClientData() {

    // ضبط الاسم
    document.getElementById('name').append(client.first_name + ' ' + client.last_name)
    // ضبط رقم الهاتف
    document.getElementById('phone_number').append(client.phone)
    // ضبط اسم الأب
    document.getElementById('father_name').append(client.father_name)
    // ضبط اسم الأم
    document.getElementById('mother_name').append(client.mother_name)
    // ضبط تاريخ الولادة
    document.getElementById('date_of_birth').append(client.date_of_birth)
    // ضبط مكان الولادة
    document.getElementById('place_of_birth').append(client.place_of_birth)
    // ضبط العنوان الحالي
    document.getElementById('current_address').append(client.current_address)
    document.getElementById('status').append(client.status)
    if (client.status === 'مفعل')
        document.getElementById('status').classList.add('text-bg-success')
    else
        document.getElementById('status').classList.add('text-bg-danger')



    if (client.email != null) {
        b = document.createElement('b')
        b.innerHTML='البريد الإلكتروني: '
        document.getElementById('email').append(b,client.email)
    }


}
