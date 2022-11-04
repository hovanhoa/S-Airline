var form = document.querySelector('form');
var submit_btn = document.getElementById('submit');

submit_btn.addEventListener("click", function (event) {
    var inputFields = form.querySelectorAll('input');
    var flag = 0;
    for (var i = 0; i < inputFields.length; i++) {
        inputField = inputFields[i];
        var mess = inputField.parentElement.querySelector("#mess");
        if (inputField.value.length == 0) {
            mess.style.display = "block";
            flag = 1;
        }
        else {
            mess.style.display = "none";
        }
        if (inputField.name == "phone" || inputField.name == "id_number") {
            var mess2 = inputField.parentElement.querySelector("#mess2");
            if (mess.style.display == "none") {
                if (inputField.value.length < 9) {
                    mess2.style.display = "block";
                    flag = 1;
                }
                else {
                    mess2.style.display = "none";
                }
            }
        }
    }
    if (flag == 0) {
        form.querySelector('#check_form').style.display="none";
        form.querySelector('#submit_form').style.display="block";
    }
})
