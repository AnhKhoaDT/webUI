document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn không cho gửi biểu mẫu ngay lập tức

        // Lấy dữ liệu từ các trường nhập liệu
        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        // Kiểm tra tính hợp lệ
        if (!fullname || !email || !phone || !message) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        // Tạo dữ liệu để gửi
        const data = {
            fullname,
            email,
            phone,
            message
        };

        // Gửi dữ liệu tới máy chủ
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Thông tin đã được gửi thành công!');
                form.reset(); // Xóa biểu mẫu
            } else {
                alert('Gửi thông tin không thành công: ' + data.message);
            }
        })
        .catch((error) => {
            console.error('Lỗi:', error);
            alert('Đã xảy ra lỗi. Vui lòng thử lại sau!');
        });
    });
});
