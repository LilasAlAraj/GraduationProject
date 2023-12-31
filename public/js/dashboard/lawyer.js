(() => {
    'use strict'

    feather.replace({ 'aria-hidden': 'true' })
})()




function setNumNextTasks() {

    let num_next_tasks = 10;

    /*
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: "http://127.0.0.1:8000/login",
            type: "get",

            success: function (response) {
                num_next_tasks = response.data.num_next_tasks;
            },

            error: function (response) {
                console.log(response.responseJSON);
            }
        });
    */
    document.getElementById('num_next_tasks').innerHTML = num_next_tasks;
}




function setTotalNumAssignedCases() {

    let num_assigned_cases = 0;
    $.ajax({
        url: "http://127.0.0.1:8000/cases/lawyer",
        type: "get",
        success: function (response) {
            num_assigned_cases = response.num_assigned_cases;
            document.getElementById('num_assigned_cases').innerHTML = num_assigned_cases;
        },
        error: function (response) {
            console.log(response.responseJSON);
        }
    });
}



function setNumNextTasks() {
    let num_next_tasks = 0;
    $.ajax({
        url: "http://127.0.0.1:8000/tasks/all/count",
        type: "get",
        success: function (response) {
            num_next_tasks = response.num_next_tasks;
            document.getElementById('num_next_tasks').innerHTML = num_next_tasks;
        },
        error: function (response) {
            console.log(response.responseJSON);
        }
    });
}




function fillCasesTable() {
    let data;
    $.ajax({
        url: 'http://127.0.0.1:8000/cases/latest',
        type: 'get',
        success: function (response) {

            data = response.cases;
            console.log(data);
            // عرض الصفوف
            table = $('#cases-body-table');
            table.empty();
            for (var i = 0; i < data.length; i++) {
                const case_ = data[i];
                addCaseRow(table, case_, i + 1)
            }



            var table = document.getElementById("cases-table");
            if (table.rows.length == 1) {

                var headerRow = table.rows[0];
                var numColumns = headerRow.cells.length;
                var row = table.insertRow(1);
                var cell = row.insertCell(0);
                cell.colSpan = numColumns;
                cell.innerHTML = "لا يوجد أي قضايا مضافة حديثاً";
                cell.style.textAlign = 'center'

            }

        },
        error: function (response) {
            console.log(response);
        }
    });

}


function addCaseRow(table, case_, num) {


    var plaintiff_names = '';
    for (var j = 0; j < case_.plaintiff_names.length; j++) {
        plaintiff_names += case_.plaintiff_names[j].first_name + ' ' + case_.plaintiff_names[j].father_name + ' ' + case_.plaintiff_names[j].last_name;
        if (j !== case_.plaintiff_names.length - 1)
            plaintiff_names += "\n____________\n";
    }
    const row = $('<tr>').append(
        $('<td>').append($('<b>').append(num)),
        $('<td>').append(case_.case.title),
        $('<td>').append(plaintiff_names)
    );
    row.addClass('clickable-row')
    row.click(function () {
        window.location = "http://127.0.0.1:8000/cases/view/" + case_.case.id
    });
    row.attr('title', 'اضغط لعرض تفاصيل هذه القضية كاملة');

    table.append(row);

}



function nextTasksSearch() {
    $('#getTasksForDate').validate(
        {
            submitHandler: function (form) {

                $('#errorNextTask').html()

                var date = $('#date').val();


                $.ajax({
                    url: 'http://127.0.0.1:8000/tasks/filter',
                    type: 'get',
                    data: {
                        'search_key': '3',
                        'date': date,
                    },
                    success: function (response) {

                        data = response;
                        // عرض الصفوف
                        var table = document.getElementById("tasks-table");
                        if (table.rows.length === 2)
                            table.rows[1].remove();
                        body = $('#tasks-body-table');
                        body.text('');
                        for (var i = 0; i < data.length; i++) {
                            addTaskRow(data[i], body, i + 1)
                        }



                        if (table.rows.length === 1) {

                            var headerRow = table.rows[0];
                            var numColumns = headerRow.cells.length;
                            var row = table.insertRow(1);
                            var cell = row.insertCell(0);
                            cell.colSpan = numColumns;
                            cell.innerHTML = "لا يوجد أي مهام لليوم ";
                            cell.style.textAlign = 'center'

                        }

                    },
                    error: function (response) {
                        console.log(response);

                    }
                });



            }
        }
    )
}



function fillTasksTable() {
    let data;
    $.ajax({
        url: 'http://127.0.0.1:8000/tasks/filter',
        type: 'get',
        data: {
            'search_key': '4'
        },
        success: function (response) {

            data = response;
            // عرض الصفوف
            table = $('#tasks-body-table');
            table.empty();
            for (var i = 0; i < data.length; i++) {
                addTaskRow(data[i], table,i + 1)
            }



            var table = document.getElementById("tasks-table");
            if (table.rows.length == 1) {

                var headerRow = table.rows[0];
                var numColumns = headerRow.cells.length;
                var row = table.insertRow(1);
                var cell = row.insertCell(0);
                cell.colSpan = numColumns;
                cell.innerHTML = "لا يوجد أي مهام لليوم ";
                cell.style.textAlign = 'center'

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('حدث خطأ: ' + textStatus + ' ' + errorThrown);
        }
    });

}


function addTaskRow(data,table, num) {

    const task = data.task;
    const lawyers = data.lawyers;
    var lawyersString = '';
    for (var j = 0; j < lawyers.length; j++) {


        lawyersString += lawyers[j].first_name + ' ' + lawyers[j].last_name;
        if (j < lawyers.length - 1)
            lawyersString += '<hr>';
    }



    const status = document.createElement('span');
    status.id = 'status-' + task.id;
    status.classList.add('badge', 'state');

    if (task.Value_Status === 1) {
        status.classList.add('text-bg-info');
        status.innerHTML = 'قيد التنفيذ'
    } else if (task.Value_Status === 2) {
        status.innerHTML = 'ملغاة'
        status.classList.add('text-bg-danger');
    } else if (task.Value_Status === 3) {
        status.innerHTML = 'مكتملة'
        status.classList.add('text-bg-success');
    } else if (task.Value_Status === 4) {
        status.innerHTML = 'مؤجلة'
        status.classList.add('text-bg-dark');
    }

    var row = $('<tr>').append(

        $('<td>').text(num),
        $('<td>').text(task.name),
        $('<td>').text(task.priority),
        $('<td>').text(task.start_date),
        $('<td>').text(task.end_date),
        $('<td>').append(lawyersString),
        $('<td>').append(status)

    );

    table.append(row);

}



$(document).ready(function () {

    // setNumUnarchivedCases();
    // setNumArchivedCases();
     setTotalNumAssignedCases();
    // setNumClients();
    // set_Cases_Chart()
    fillCasesTable();
    fillTasksTable();
    setNumNextTasks();

    document.getElementById('content').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
});







/*************************** */



//////////import report
var button = document.getElementById("import");
button.addEventListener("click", function () {
    var makepdf = '<h1>' + new Date() + '</h1>' +
        '<ul style="font-size: 1000; font-weight: bolder; padding:50px">' +
        '<li\>' +
        '					<h4 style="text-align: left;" dir="rtl">' +
        '						القضايا الرابحة: ' + '5' +
        '					</h4 >' +
        '			</li >' +
        '         <li>' +
        '           <h4>' +
        '             This is an example of generating' +
        '           pdf from HTML during runtime' +
        '        </h4>' +
        '     </li>' +
        '		</ul > ';

    html2pdf().from(makepdf).save();

});
