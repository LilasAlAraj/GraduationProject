(() => {
    'use strict'

    feather.replace({ 'aria-hidden': 'true' })
})()



function setNumClients() {

    let num_clients = 0;

    $.ajax({
        url: "http://127.0.0.1:8000/clients/count",
        type: "get",

        success: function (response) {
            console.log (response);
            num_clients = response.num_clients;
            document.getElementById('num_clients').innerHTML = num_clients;

        },

        error: function (response) {
            console.log(response);
        }
    });

}

function setNumUnarchivedCases() {

    let num_unarchived_cases = 0;


    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: "http://127.0.0.1:8000/cases/unarchive/count",
        type: "get",

        success: function (response) {
            num_unarchived_cases = response.num_unarchived_cases;
            document.getElementById('num_unarchived_cases').innerHTML = num_unarchived_cases;

        },
        error: function (response) {
            console.log(response.responseJSON);
        }
    });
}



function setNumArchivedCases() {
    let num_arc_cases = 0;
    $.ajax({
        url: "http://127.0.0.1:8000/cases/archive/count",
        type: "get",
        success: function (response) {
            num_arc_cases = response.num_arc_cases;
            document.getElementById('num_arc_cases').innerHTML = num_arc_cases;
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
            document.getElementById('next_tasks').innerHTML = num_next_tasks;
        },
        error: function (response) {
            console.log(response.responseJSON);
        }
    });
}




function setCasesChart(winning, losing, running, blocked) {

    var casesValues = []
    var types = ['قضايا رابحة', 'قضايا خاسرة', 'قضايا جارٍ العمل عليها', 'قضايا معلقة'];
    var barColors = [
        "#52b462",
        "#b45d52",
        "#52a0b4",
        "#1b1b1b"

    ];


    casesValues[0] = winning;
    casesValues[1] = losing;
    casesValues[2] = running;
    casesValues[3] = blocked;





    new Chart("casesChart", {
        type: "doughnut",
        data: {
            labels: types,
            datasets: [{
                backgroundColor: barColors,
                data: casesValues
            }]
        },
        options: {
            title: {
                display: true,
                text: "إحصائيات القضايا"
            }
        }
    });

}

function set_Cases_Chart() {


    let winning = 0, losed = 0, running = 0, blocked = 0;



    $.ajax({
        url: "http://127.0.0.1:8000/cases/statistics",
        type: "get",

        success: function (response) {

            console.log(response)
            winning = response.winnedCase;
            losed = response.lostCase;
            running = response.runningCase;
            blocked = response.blockedCase;
            setCasesChart(winning, losed, running, blocked)

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
            console.log(response);

            data = response.cases;
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

                        console.log(response)
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
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('حدث خطأ: ' + textStatus + ' ' + errorThrown);
        }
    });

}


function addTaskRow(data, table, num) {

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

    setNumUnarchivedCases();
    setNumArchivedCases();
    setNumClients();
    setNumNextTasks();
    set_Cases_Chart()
    fillCasesTable();
    fillTasksTable();

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
