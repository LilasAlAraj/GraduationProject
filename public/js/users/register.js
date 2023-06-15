
(() => {
    'use strict';
    feather.replace({ 'aria-hidden': 'true' });

})();

//////////////////////الوقت
function updateTime() {
    var now = new Date();
    // jQuery('#time').val(now.toString());
    document.getElementById("time").innerHTML = now.toString();
}

setInterval(updateTime, 1000);

/********************* */

function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^09[0-9]{8}$/;
    return phoneRegex.test(phoneNumber);
}

$(document).ready(function () {

    document.getElementById('content').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
    $('#register-form').validate({
        rules: {
            first_name: {
                required: true
            }, last_name: {
                required: true
            }, father_name: {
                required: true
            }, mother_name: {
                required: true
            }, date_of_birth: {
                required: true
            }, place_of_birth: {
                required: true
            }, current_address: {
                required: true
            }, phone: {
                required: true,
                number: true,
                minlength: 10
            },
            password: {
                required: true,
                minlength: 8
            }, confirm_password: {
                required: true,
                minlength: 8
            }, email: {
                email: true
            }, rule: {
                required: true
            }
        },
        messages: {
            first_name: {
                required: "الرجاء إدخال الاسم الأول",
            }, last_name: {
                required: "الرجاء إدخال الاسم الأخير",
            }, mother_name: {
                required: "الرجاء إدخال اسم الأم",
            }, father_name: {
                required: "الرجاء إدخال اسم الأب",
            }, date_of_birth: {
                required: "الرجاء اختيار تاريخ الولادة",
            }, place_of_birth: {
                required: "الرجاء اختيار مكان الولادة",
            }, current_address: {
                required: "الرجاء إدخال العنوان الحالي",
            },
            phone: {
                required: "الرجاء إدخال رقم هاتفك",
                number: "الرجاء إدخال رقم هاتف صحيح",
                minlength: "الرجاء إدخال على الأقل 10 خانات"
            },
            password: {
                required: "الرجاء إدخال كلمة المرور الخاصة بك",
                minlength: "الرجاء إدخال على الأقل 8 محارف"
            }, confirm_password: {
                required: "الرجاء تأكيد كلمة المرور الخاصة بك",
                minlength: "الرجاء إدخال على الأقل 8 محارف"
            }, email: {
                email: "الرجاء إدخال بريد إلكتروني صحيح"
            }, rule: {
                required: "الرجاء اختيار دور الفرد",
            }
        },
        submitHandler: function (form) {
            var first_name = $('#first_name').val();
            var last_name = $('#last_name').val();
            var father_name = $('#father_name').val();
            var mother_name = $('#mother_name').val();
            var phone = $('#phone').val();
            var current_address = $('#current_address').val();
            var place_of_birth = $('#place_of_birth').val();
            var date_of_birth = $('#date_of_birth').val();
            var email = $('#email').val();
            var password = $('#password').val();
            var confirm_password = $('#confirm_password').val();
            var role = $('input[name="rule"]:checked').val();
            var status = 'مفعل';
            if (role == undefined) {
                role = 'زبون'
            }



            $('.error').html("")

            //chech passwords matching
            if (password != confirm_password) {

                $('.error').html("كلمتا السر غير متطابقتين");
            } else {
                // Perform register
                console.log(date_of_birth);
                if (isValidPhoneNumber(phone)) {
                    $.ajaxSetup({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        }
                    });
                    $.ajax({
                        url: 'http://127.0.0.1:8000/users/register',
                        type: "POST",
                        data: {
                            "first_name": first_name,
                            "last_name": last_name,
                            "father_name": father_name,
                            "mother_name": mother_name,
                            "phone": phone,
                            "current_address": current_address,
                            "date_of_birth": date_of_birth,
                            "place_of_birth": place_of_birth,
                            "email": email,
                            "password": password,
                            "confirm_password": confirm_password,
                            "role_name": role,
                            "status": status
                        },
                        success: function (response) {
                            if (response.status == 'success') {
                                document.getElementById('message-text').innerHTML = response.message;
                                $('#messageBackdrop').modal('show');
                                $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
                                document.getElementById('closeModal').onclick = function () {
                                    window.location.href = 'http://127.0.0.1:8000/cases';
                                    if (role === 'زبون')
                                        window.location.href = 'http://127.0.0.1:8000/users/clients'
                                    else
                                        window.location.href = 'http://127.0.0.1:8000/users/members'
                                }

                            } else {
                                messages = '';

                                if (response.message.phone != null)

                                    $('.error').html(response.message.phone);
                                console.log(response)

                            }
                        },

                        error: function (response) {
                            // If the login is unsuccessful, display the error message
                            // $('#error').html(response.responseJSON.errors.phone[0]);
                            console.log(response)
                        }
                    });
                } else {

                    $('.error').show()
                    $('.error').html("رقم الهاتف غير صحيح\nالرجاء إدخال 09********");
                }

            }
        }
    });
});
