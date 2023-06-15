let role ;//= 1; //1->supervisor , 2->secretaria, 3->lawyer, 4->client


function fetchUserRole (){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://127.0.0.1:8000/user/role",
            type: "get",
            success: function (response) {
                role = response.role;
                resolve(role);
            },
            error: function (response) {
                reject(response.responseJSON);
            },
        });
    });
};
