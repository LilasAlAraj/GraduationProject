
(() => {
    'use strict'

    feather.replace({ 'aria-hidden': 'true' })

        ;
})();

/////////////////////

let data, caseItem;
let caseID;



$(document).ready(function () {
    getCourts();
    caseID = window.location.href.split('/');
    caseID = caseID[caseID.length - 2];
    // جلب البيانات من ملف JSON
    $.ajax({
        url: 'http://127.0.0.1:8000/cases/' + caseID,
        type: 'get',
        success: function (response) {
            console.log(response)
            data = response.cases[0];

            setCaseData();

            document.getElementById('content').style.display = 'block';
            document.getElementById('spinner').style.display = 'none';
        },
        error: function (response) {
            console.log(response)

        }
    });


}
);









function setCaseData() {

    caseItem = data.case;
    document.getElementById('case_tiltle').value = caseItem.title;
    document.getElementById('case_room').value = caseItem.case_room;
    document.getElementById('court').value = data.court.id;

    totalBaseNumbers = data.case_numbers.length;
    for (var i = 0; i < totalBaseNumbers; i++) {
        addBaseNumber();
        document.getElementById('base-number-' + i).value = data.case_numbers[i].number;
        document.getElementById('yearSelect-' + i).value = data.case_numbers[i].date;
    }



    totalClientName = data.plaintiff_names.length;
    for (var i = 0; i < totalClientName; i++) {
        addClientPlaintiffField();
        plaintiff_name = data.plaintiff_names[i].first_name + ' ' + data.plaintiff_names[i].father_name + ' ' + data.plaintiff_names[i].last_name
        document.getElementById('client_name-' + i).value = plaintiff_name;
        document.getElementById('client_name-' + i).setAttribute('data-id', data.plaintiff_names[i].id)

    }


    totalLawyerName = data.plaintiff_lawyers.length;
    for (var i = 0; i < totalLawyerName; i++) {
        addLawyerPlaintiffField(data.plaintiff_lawyers[i].id);
    }


    totalClientDefName = data.defendant_names.length;
    for (var i = 0; i < totalClientDefName; i++) {
        addClientEnemyField();
        document.getElementById('enemy_name-' + i).value = data.defendant_names[i].name;
        if (data.defendant_names[i].phone_number != null) {
            document.getElementById('enemy_phone-' + i).value = data.defendant_names[i].phone_number;
        }
    }

    totalLawyerDefName = data.defendant_lawyers.length;
    for (var i = 0; i < totalLawyerDefName; i++) {
        addLawyerEnemyField();
        document.getElementById('lawyerEnemy_name-' + i).value = data.defendant_lawyers[i].name;
        if (data.defendant_lawyers[i].number_phone != null) {
            document.getElementById('lawyerEnemy_phone-' + i).value = data.defendant_lawyers[i].number_phone;

        }
    }

}


function edit() {


    $('#edit_case-form').validate({
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
            }, "lawyerEnemy_names[]": {
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
            },
            "lawyerEnemy_names[]": {
                required: "الرجاء إدخال اسم محامي المدعى عليه"
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
                url: "http://127.0.0.1:8000/cases/" + caseID,
                type: "put",
                data: {
                    'case_id': caseID,
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
                            window.location.href = 'http://127.0.0.1:8000/cases/view/' + caseID;
                        }
                    } else {

                        document.getElementById('message-text').innerHTML = response.message;
                        $('#messageBackdrop').modal('show');
                        $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');

                    }
                },

                error: function (response) {
                    console.log(response)

                    $('.error').html(response.message);

                }
            });


        }
    });

}
