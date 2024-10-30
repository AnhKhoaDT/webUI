document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const rememberMeCheckbox = document.getElementById('remember-me');
    const forgotPasswordLink = document.getElementById('forgot-password');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Ngăn không cho gửi biểu mẫu ngay lập tức

        // Lấy dữ liệu từ các trường nhập liệu
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const rememberMe = rememberMeCheckbox.checked;

        // Kiểm tra tính hợp lệ
        if (!username || !password) {
            alert('Vui lòng điền tên đăng nhập và mật khẩu!');
            return;
        }

        // Gửi yêu cầu đăng nhập tới máy chủ
        const data = { username, password };

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Đăng nhập thành công!');

                if (rememberMe) {
                    // Lưu thông tin vào localStorage để duy trì đăng nhập
                    localStorage.setItem('loggedInUser', username);
                } else {
                    // Lưu thông tin tạm thời vào sessionStorage
                    sessionStorage.setItem('loggedInUser', username);
                }

                window.location.href = 'home.html'; // Chuyển đến trang chủ
            } else {
                alert('Đăng nhập không thành công: ' + data.message);
            }
        })
        .catch((error) => {
            console.error('Lỗi:', error);
            alert('Đã xảy ra lỗi. Vui lòng thử lại sau!');
        });
    });

    // Xử lý sự kiện "Quên mật khẩu"
    forgotPasswordLink.addEventListener('click', () => {
        const email = prompt('Vui lòng nhập email để nhận liên kết đặt lại mật khẩu:');
        if (email) {
            fetch('/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Liên kết đặt lại mật khẩu đã được gửi đến email của bạn!');
                } else {
                    alert('Không thể gửi email: ' + data.message);
                }
            })
            .catch((error) => {
                console.error('Lỗi:', error);
                alert('Đã xảy ra lỗi. Vui lòng thử lại sau!');
            });
        }
    });
});
