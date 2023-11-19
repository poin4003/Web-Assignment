var totalImages = 20;
var currentImageIndex = 1; // Đánh dấu vị trí hiện tại của ảnh
var autoLoadEnabled = fasle;
var autoLoadInterval;

function changeImage(action) {
    switch (action) {
        case 'first':
            currentImageIndex = 1;
                break;
        case 'prev':
            currentImageIndex--;
            break;
        case 'next':
            currentImageIndex++;
            break;
        case 'final':
            currentImageIndex = totalImages;
            break;
    }

    // Xử lý trường hợp khi vượt quá giới hạn
    if (currentImageIndex < 1) {
        currentImageIndex = totalImages;
    } else if (currentImageIndex > totalImages) {
        currentImageIndex = 1;
    }

    // Thay đổi nguồn ảnh
    document.getElementById("albumImage").src = "../image/Fish images/" + currentImageIndex + ".jpg";
    document.getElementById("imageName").innerHTML = currentImageIndex+"/20";
}

// Hàm sử lý sự kiện khi checkbox thay đổi 
function toggleAutoLoad() {
    autoLoadEnabled = !autoLoadEnabled;

    // Nếu tự động load được bật, thì thiết lập interval để thay đổi ảnh tự động
    if (autoLoadEnabled) {
        autoLoadInterval = setInterval(function () {
            changeImage('next');
        }, 2000); // Thay đổi ảnh mỗi 2 giây
    } else {
        // Nếu tự động load bị tắt, hủy interval nếu nó đã được thiết lập
        clearInterval(autoLoadInterval);
    }
}

function loadHomePage() {
    // Sử dụng window.location.href để chuyển hướng trang hiện tại sang index.html
    window.location.href = '../index.html';
}
