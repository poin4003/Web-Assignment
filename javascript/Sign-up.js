
// Lấy tất cả các input, textarea, select, radio, checkbox trong form
var formElements = document.querySelectorAll("#registrationForm input, #registrationForm textarea, #registrationForm select");

// Thêm sự kiện invalid cho mỗi trường
formElements.forEach(function (element) {
    element.addEventListener("invalid", function () {
        // Kiểm tra nếu là radio, checkbox, hoặc select
        if (element.type === "radio" || element.type === "checkbox" || element.tagName === "SELECT") {
            // Nếu là radio hoặc checkbox và nằm trong class=frame, thì áp dụng cho class=frame
            if ((element.type === "radio" || element.type === "checkbox") && element.closest(".frame")) {
                element.closest(".frame").style.borderColor = "#800009";
            } else if (element.tagName === "SELECT") {
                // Áp dụng cho phần tử select khi không được chọn
                if (!element.value) {
                    element.style.borderColor = "#800009";
                } else {
                    element.style.borderColor = "#ccc";
                }
            } else {
                // Ngược lại, áp dụng cho element chính
                element.style.borderColor = "#800009";
            }
        } else {
            // Áp dụng cho các trường input text và textarea
            element.style.borderColor = "#800009";
        }
    });

    // Thêm sự kiện input để xử lý khi người dùng đã nhập đúng
    element.addEventListener("input", function () {
        // Kiểm tra nếu trường này đã nhập đúng thì đổi màu viền về #ccc
        if (element.validity.valid) {
            element.style.borderColor = "#ccc";
        }
    });
});

// Thêm sự kiện input cho mỗi frame để kiểm tra khi tất cả các trường con đã nhập đúng
var frames = document.querySelectorAll(".frame");
frames.forEach(function (frame) {
    frame.addEventListener("input", function () {
        var isValid = Array.from(frame.querySelectorAll("input, select")).every(function (element) {
            return element.validity.valid;
        });

        if (isValid) {
            frame.style.borderColor = "#ccc";
        }
    });
});

function loadHomePage() {
    // Sử dụng window.location.href để chuyển hướng trang hiện tại sang index.html
    window.location.href = '../index.html';
}

document.getElementById("registrationForm").addEventListener("submit", function (event) {
    // Hiển thị thông báo thành công với alert
    alert("Sign Up Success!");
});






