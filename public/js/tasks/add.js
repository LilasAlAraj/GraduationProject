
(() => {
    'use strict'

    feather.replace({ 'aria-hidden': 'true' })

})();


/********************* */


$(document).ready(function () {
    addLawyerField();
    addNewTask();


    document.getElementById('content').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
});

function addNewTask() {

    $('#task-form').validate(
        {

            rules: {
                name: {
                    required: true
                },
                description: {
                    required: true
                },
                start_date: {
                    required: true,

                },
                end_date: {
                    required: true,
                },
                priority: {
                    required: true,
                }
            },
            messages: {
                name: {
                    required: "الرجاء إدخال اسم المهمة"
                },
                description: {
                    required: "الرجاء إدخال وصف المهمة"
                },
                start_date: {
                    required: "الرجاء اختيار تاريخ البدء"
                },
                end_date: {
                    required: "الرجاء اختيار تاريخ الانتهاء"
                },
                priority: {
                    required: "الرجاء إدخال أولوية المهمة"

                }
            },
            submitHandler: function (form) {

                task = collectData();


                // Perform adding

                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({
                    url: "http://127.0.0.1:8000/task",
                    type: "post",
                    data: {
                        "lawyers": task.lawyers,
                        "name": task.name,
                        "description": task.description,
                        "start_date": task.start_date,
                        "end_date": task.end_date,
                        "priority": task.priority,

                    },
                    success: function (response) {
                        console.log(response)
                        if (response.status === 'success') {
                            document.getElementById('message-text').innerHTML = response.message;
                            $('#messageBackdrop').modal('show');
                            $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
                            document.getElementById('closeModal').onclick = function () {
                                window.location.href = 'http://127.0.0.1:8000/tasks';
                            }
                        }
                    },

                    error: function (response) {
                        // If the login is unsuccessful, display the error message
                        // $('#error').html(response.responseJSON.errors.phone[0]);
                        console.log(response)
                    }
                });


            }
        }
    )
}
