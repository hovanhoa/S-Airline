// Đối tượng `Validator`
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];

        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                default: errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // Khi submit form
        formElement.onsubmit = function(e) {
                e.preventDefault();
                var isFormValid = true;
                // Lặp qua từng rules và validate
                options.rules.forEach(function(rule) {
                    var inputElement = formElement.querySelector(rule.selector);
                    var isValid = validate(inputElement, rule);
                    if (!isValid) {
                        isFormValid = false;
                    }
                });

                if (isFormValid) {
                    formElement.submit();
                    //Trường hợp submit với javascript
                    if (typeof options.onSubmit === 'function') {
                        var enableInputs = formElement.querySelectorAll('[name]');
                        var formValues = Array.from(enableInputs).reduce(function(values, input) {

                            switch (input.type) {
                                case 'radio':
                                    values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                    break;
                                case 'checkbox':
                                    if (!input.matches(':checked')) {
                                        values[input.name] = '';
                                        return values;
                                    }
                                    if (!Array.isArray(values[input.name])) {
                                        values[input.name] = [];
                                    }
                                    values[input.name].push(input.value);
                                    break;
                                case 'file':
                                    values[input.name] = input.files;
                                    break;
                                default:
                                    values[input.name] = input.value;
                            }
                            return values;
                        }, {});
                        options.onSubmit(formValues);
                    }
                    // Trường hợp submit với hành vi mặc định
                    else {
                        formElement.submit();
                    }
                }
            }
            // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(function(rule) {
            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function(inputElement) {
                // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function() {
                    validate(inputElement, rule);
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function() {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }
            });
        });
    }

}

// yêu cầu nhập
Validator.isRequired = function(selector, message) {
        return {
            selector: selector,
            test: function(value) {
                return value ? undefined : message || 'Vui lòng nhập trường này'
            }
        };
    }
    // yêu cầu input phải là email
Validator.isEmail = function(selector, message) {
        return {
            selector: selector,
            test: function(value) {
                var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return regex.test(value) ? undefined : message || 'Trường này phải là email';
            }
        };
    }
    //yêu cầu phải nhập số điện thoại
Validator.isPhone = function(selector, message) {
        return {
            selector: selector,
            test: function(value) {
                var regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                return regex.test(value) ? undefined : message || 'Trường này phải là số điện thoại';
            }
        };
    }
    // yêu cầu độ dài tối thiểu mà input cần nhập
Validator.minLength = function(selector, min, message) {
        return {
            selector: selector,
            test: function(value) {
                return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
            }
        };
    }
    // yêu cầu phải đủ số kí tự yêu cầu của mã otp là num
Validator.isOtp = function(selector, num, message) {
        return {
            selector: selector,
            test: function(value) {
                return value.length == num ? undefined : message || `Vui lòng nhập đúng ${num} kí tự của mã OTP`;
            }
        };
    }
    //yêu cầu nhập lại mật khẩu phải giống mật khẩu
Validator.isConfirmed = function(selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}

var passField = document.querySelectorAll(".input-pass input");

if (passField.length === 1) {
    var showBtn = document.querySelector("span i.fa-eye");

    showBtn.onclick = (() => {
        if (passField[0].type === "password") {
            passField[0].type = "text";
            showBtn.classList.add("hide-btn");
        } else {
            passField[0].type = "password";
            showBtn.classList.remove("hide-btn");
        }
    });
} else if (passField.length === 2) {
    var showBtn = document.querySelector("span i.fa-eye");
    var showBtnConfirm = document.querySelector("span i.eye-confirm");

    showBtn.onclick = (() => {
        if (passField[0].type === "password") {
            passField[0].type = "text";
            showBtn.classList.add("hide-btn");
        } else {
            passField[0].type = "password";
            showBtn.classList.remove("hide-btn");
        }
    });
    showBtnConfirm.onclick = (() => {
        if (passField[1].type === "password") {
            passField[1].type = "text";
            showBtnConfirm.classList.add("hide-btn");
        } else {
            passField[1].type = "password";
            showBtnConfirm.classList.remove("hide-btn");
        }
    });
}

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

function showSuccessToast() {
    console.log("toast success");
    toast({
        title: "Thành công!",
        message: "Bạn đã đăng nhập thành công",
        type: "success",
        duration: 5000
    });
}

function showLoginSuccessToast() {
    console.log("toast success");
    toast({
        title: "Đăng nhập thành công!",
        message: "Bạn đã đăng nhập thành công",
        type: "success",
        duration: 5000
    });
}

function showRegisterSuccessToast() {
    console.log("toast success");
    toast({
        title: "Đăng ký thành công!",
        message: "Bạn đã đăng ký tài khoản thành công",
        type: "success",
        duration: 5000
    });
}

function showResetPassSuccessToast() {
    console.log("toast success");
    toast({
        title: "Thành công!",
        message: "Bạn đã đặt lại mật khẩu mới thành công",
        type: "success",
        duration: 5000
    });
}

function showErrorToast() {
    console.log("toast error");
    toast({
        title: "Thất bại!",
        message: "Bạn đã nhập sai tên đăng nhặp hoặc mật khẩu.",
        type: "error",
        duration: 5000
    });
}

function showLoginErrorToast() {
    console.log("toast error");
    toast({
        title: "Đăng nhập thất bại!",
        message: "Bạn đã nhập sai tên đăng nhặp hoặc mật khẩu.",
        type: "error",
        duration: 5000
    });
}

function showLoginPhoneErrorToast() {
    console.log("toast error");
    toast({
        title: "Đăng nhập thất bại!",
        message: "Tài khoản không tồn tại.",
        type: "error",
        duration: 5000
    });
}

function showLoginPassErrorToast() {
    console.log("toast error");
    toast({
        title: "Đăng nhập thất bại!",
        message: "Bạn đã nhập mật khẩu không chính xác.",
        type: "error",
        duration: 5000
    });
}

function showRegisterErrorToast() {
    console.log("toast error");
    toast({
        title: "Đăng ký thất bại!",
        message: "Số điện thoại bạn đăng ký đã tồn tại.",
        type: "error",
        duration: 5000
    });
}

function showForgotErrorToast() {
    console.log("toast error");
    toast({
        title: "Thất bại!",
        message: "Số điện thoại bạn nhập không tồn tại.",
        type: "error",
        duration: 5000
    });
}

function showOtpErrorToast() {
    console.log("toast error");
    toast({
        title: "Thất bại!",
        message: "Bạn đã nhập sai mã OTP.",
        type: "error",
        duration: 5000
    });
}