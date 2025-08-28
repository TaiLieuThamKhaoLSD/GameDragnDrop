// login.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const fullname = document.getElementById('fullname').value.trim();
        
        // Kiểm tra độ dài username (tối thiểu 3 ký tự)
        if (username.length < 3) {
            alert('Username phải từ 3 ký tự!');
            return;
        }
        
        // Kiểm tra điều kiện chuyển hướng
        if (username === 'LanAnhT02' && fullname === 'Lan Anh') {
            // Lưu thông tin vào localStorage
            localStorage.setItem('currentUser', JSON.stringify({
                username: username,
                fullname: fullname
            }));
            
            // Chuyển hướng sang giao diện 2 (desktop)
            window.location.href = 'gui2.html';
        } else {
            // Lưu thông tin vào localStorage
            localStorage.setItem('currentUser', JSON.stringify({
                username: username,
                fullname: fullname
            }));
            
            // Chuyển hướng sang giao diện 1 (mobile)
            window.location.href = 'gui1.html';
        }
    });
});