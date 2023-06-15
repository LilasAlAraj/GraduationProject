let lawyerCounter = 0;

// إضافة حقل جديد لاسم محامي
function addLawyerField(selected) {

    const lawyersContainer = document.getElementById('lawyers');
    const lawyerNewField = document.createElement('div');
    lawyerNewField.id = 'lawyer' + lawyerCounter;
    lawyerNewField.innerHTML = '<label for="lawyer_name-${lawyerCounter}"><b>اسم المحامي</b></label>'
        + '<select  id="lawyer_name-' + lawyerCounter + '"  name="lawyer_names[]" required>'
    getLawyers('lawyer_name-' + lawyerCounter, selected)
    lawyersContainer.appendChild(lawyerNewField);
    lawyerCounter++;
}// حذف حقل محامي
function deleteLawyerField() {
    if (lawyerCounter !== 1) {
        const lawyersContainer = document.getElementById('lawyers');
        const FieldToRemove = document.getElementById('lawyer' + (lawyerCounter - 1));
        lawyersContainer.removeChild(FieldToRemove);
        lawyerCounter--;
    }
}

function getLawyers(lawyerList, selected) {
    $.ajax({
        url: "http://127.0.0.1:8000/lawyers",
        type: "Get",
        success: function (response) {
            const LawyerList = document.getElementById(lawyerList);
            LawyerList.innerHTML = '<option disabled selected>اختر اسم المحامي</option>'
            for (var i = 0; i < response.lawyers.length; i++) {
                option = document.createElement('option');
                option.value = response.lawyers[i].id;
                option.innerHTML = response.lawyers[i].first_name + ' ' + response.lawyers[i].last_name;

                if (option.value == selected)
                    option.selected = true;
                LawyerList.append(option)
            }


        },

        error: function (response) {
            // If the login is unsuccessful, display the error message
            // $('#error').html(response.responseJSON.errors.phone[0]);
            $('#error').html(response.responseJSON);
        }
    });

}


function collectData() {
    data = [];



    const lawyersValue = document.getElementsByName('lawyer_names[]');


    lawyers = []
    for (var i = 0, k = 0; i < lawyersValue.length; i++) {
        if (lawyersValue[i].value != '') {
            lawyers[k++] = lawyersValue[i].value;
        }
    }


    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;
    const priority = document.getElementById('priority').value;

    data["lawyers"] = lawyers;
    data["name"] = name;
    data["description"] = description;
    data["start_date"] = start_date;
    data["end_date"] = end_date;
    data["priority"] = priority;

    console.log(data);
    return data;


}



function getCourts() {
    $.ajax({
        url: "http://127.0.0.1:8000/court/all",
        type: "Get",
        success: function (response) {
            courts = document.getElementById('court');
            for (var i = 0; i < response.length; i++) {
                option = document.createElement('option');
                option.value = response[i].id;
                option.innerHTML = response[i].name + '/' + response[i].place;
                courts.append(option)
            }
        },

        error: function (response) {
            // If the login is unsuccessful, display the error message
            // $('#error').html(response.responseJSON.errors.phone[0]);
            $('#error').html(response.responseJSON);
        }
    });

}
