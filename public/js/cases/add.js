

(() => {
    'use strict'
    feather.replace({ 'aria-hidden': 'true' })
        ;
})();

/********************* */

$(document).ready(function () {
    getCourts();
    addLawyerPlaintiffField();

    addBaseNumber();
    addClientPlaintiffField();
    addClientEnemyField();
    addLawyerEnemyField();
    document.getElementById('content').style.display='block';
    document.getElementById('spinner').style.display='none';

});


function add() {
    $('.error').css('color', 'red');
    $('.error').html('')
    $('#add-case-form').validate({
        rules: {
            case_tiltle: {
                required: true
            },
            court: {
                required: true
            }, case_room: {
                required: true
            }, "base-number[]": {
                required: true
            }, "year[]": {
                required: true
            }, "client_names[]": {
                required: true
            }, "lawyer_names[]": {
                required: true
            }, "clientEnemy_names[]": {
                required: true
            }
        },
        messages: {
            case_tiltle: {
                required: "الرجاء إدخال موضوع الدعوى"
            },
            court: {
                required: "الرجاء اختيار المحكمة"
            },
            case_room: {
                required: "الرجاء إدخال الغرفة"
            },
            "base-number[]": {
                required: "الرجاء إدخال رقم الأساس"
            },
            "year[]": {
                required: "الرجاء إدخال العام"
            },
            "client_names[]": {
                required: "الرجاء إدخال اسم المدعي"
            },
            "lawyer_names[]": {
                required: "الرجاء اختيار اسم محامي المدعي"
            },
            "clientEnemy_names[]": {
                required: "الرجاء إدخال  اسم المدعى عليه "
            }
        },
        submitHandler: function (form) {

            case_ = collectData();

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                url: "http://127.0.0.1:8000/cases",
                type: "POST",
                data: {
                    'court_id': case_.court_id,
                    'case_room': case_.case_room,
                    'title': case_.title,
                    'Base_Numbers': case_.Base_Numbers,
                    'DefendentLawyers': case_.DefendentLawyers,
                    'DefendentClients': case_.DefendentClients,
                    'PlaintaiffClients': case_.PlaintaiffClients,
                    'PlaintaiffLawyers': case_.PlaintaiffLawyers
                },
                success: function (response) {

                    console.log(response)
                    console.log(response.status)
                    console.log(response.message)
                    if (response.status === 'success') {
                        document.getElementById('message-text').innerHTML = response.message;
                        $('#messageBackdrop').modal('show');
                        $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
                        document.getElementById('closeModal').onclick = function () {
                            window.location.href = 'http://127.0.0.1:8000/cases';
                        }
                    } else {

                        document.getElementById('message-text').innerHTML = response.message;
                        $('#messageBackdrop').modal('show');
                        $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');

                    }
                },

                error: function (response) {

                    console.log(response);
                    $('.error').html(response.message);

                }
            });


        }
    });

}
