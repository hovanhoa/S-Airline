// $(document).ready(function () {
//     $.post("/admin/listInfo", function (data) {
//         console.log("data");
//     });
// });


// $("#tab-faculty").DataTable({
//     responsive: true,
//     lengthChange: false,
//     autoWidth: false,
//     language: {
//         url: "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Vietnamese.json",
//     },
//     dom: 'Bfrtip',
//     buttons: [
//         'copy', 'csv', 'excel', 'pdf', 'print'
//     ]
// });


$(".btn-editCustomer").click(function (e) {
    // console.log("ád");
    var name = $(this).data("name");
    var address = $(this).data("address");
    var phone = $(this).data("phone");
    var email = $(this).data("email");
    var password = $(this).data("password");
    var sex = $(this).data("sex");
    var nationality = $(this).data("nationality");
    var birthday = $(this).data("birthday");
    console.log("asdsa"+sex, nationality);

    $("#editCustomerModal input[name='name']").val(name);
    $("#editCustomerModal input[name='address']").val(address);
    $("#editCustomerModal input[name='phone']").val(phone);
    $("#editCustomerModal input[name='email']").val(email);
    $("#editCustomerModal input[name='sex']").val(sex);
    $("#editCustomerModal input[name='nationality']").val(nationality);
    $("#editCustomerModal input[name='password']").val(password);
    $("#editCustomerModal input[name='birthday']").val(birthday);

    $("#editCustomerModal").modal("show");
});

// $(".btn-submit").click(function (e) {
//     var status = $(this).data("id");

//     $("#deleteFacultyModal input[name='id']").val(id);

//     $("#deleteFacultyModal").modal("show");
// });

$("#changePass").click(function (e) {

    var phone = $(this).data("phone");

    var password = $(this).data("password");


    // $("#editCustomerModal input[name='name']").val(name);
    // $("#editCustomerModal input[name='address']").val(address);
    // $("#editCustomerModal input[name='phone']").val(phone);
    // $("#editCustomerModal input[name='email']").val(email);
    // $("#editCustomerModal input[name='sex']").val(sex);
    $("#editPasswordModal input[name='password']").val(password);
    $("#editPasswordModal input[name='phone']").val(phone);

    $("#editPasswordModal").modal("show");
});

function checkPasswordMatch() {
    var password = $("#newPassword").val();
    var confirmPassword = $("#confirmPassword").val();

    if (password != confirmPassword)
        $("#divCheckPasswordMatch").html("Mật khẩu không khớp!");
    else if(password.length <= 8)
        $("#divCheckPasswordMatch").html("Mật khẩu phải có độ dài lớn hơn hoặc bằng 8!");
    else
        $("#divCheckPasswordMatch").html("");
    
}

function checkPasswordMatch2() {
    var password = $("#newPassword").val();
    var confirmPassword = $("#confirmPassword").val();

    if (password != confirmPassword & confirmPassword != "")
        $("#divCheckPasswordMatch").html("Mật khẩu không khớp!");
    else if(password.length <= 8)
        $("#divCheckPasswordMatch").html("Mật khẩu phải có độ dài lớn hơn hoặc bằng 8!");
    else
        $("#divCheckPasswordMatch").html("");
    
}
// function checkPassword() {
//     var password = $("#password").val();
//     var confirmPassword = $("#password_").val();
//     // confirmPassword=bcrypt.hashSync(confirmPassword, 10);
//     if (password != confirmPassword)
//         $("#divCheckPassword").html("Mật khẩu không đúng!");
//     else
//         $("#divCheckPassword").html("");
// }
// $(document).ready(function () {
//    $("#newPassword").keyup(checkPasswordMatch);
//    $("#password_").keyup(checkPassword);
// });
// Toast function
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
        const toast = document.createElement("div");

        // Auto remove toast
        const autoRemoveId = setTimeout(function() {
            main.removeChild(toast);
        }, duration + 1000);

        // Remove toast when clicked
        toast.onclick = function(e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };

        const icons = {
            success: "fas fa-check-circle",
            info: "fas fa-info-circle",
            warning: "fas fa-exclamation-circle",
            error: "fas fa-exclamation-circle"
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
        main.appendChild(toast);
    }
}
function showErrorToast() {
    console.log("toast error");
    toast({
        title: "Thay đổi thất bại!",
        message: "Bạn đã nhập sai mật khẩu hiện tại.",
        type: "error",
        duration: 5000
    });
}

function showSuccessToast() {
    console.log("toast error");
    toast({
        title: "Thành công!",
        // message: "Bạn đã nhập sai mật khẩu hiện tại.",
        type: "success",
        duration: 5000
    });
}

var name = $("input[name='checkStatus']").val();
// var password_ = $("input[name='checkStatus']").val();
// console.log(":ád");
if(name == "failed password") {
    console.log();
    showErrorToast();
    // $("#editPasswordModal").modal("show");
}
else if(name == "password"){
    showSuccessToast();
}
