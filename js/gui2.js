// gui2.js
document.addEventListener('DOMContentLoaded', function() {
    // Hiển thị thông tin người dùng
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('userInfo').textContent = 
            `Xin chào ${currentUser.fullname} (${currentUser.username}) - Giao diện Desktop`;
    }

    // Hiển thị kết quả
    displayResults();

    // Hàm hiển thị kết quả
    function displayResults() {
        const gameData = JSON.parse(localStorage.getItem('gameData'));
        const noDataMessage = document.getElementById('noDataMessage');
        const resultsContent = document.getElementById('resultsContent');
        const timestamp = document.getElementById('timestamp');
        const itemsList = document.getElementById('itemsList');

        if (gameData) {
            noDataMessage.classList.add('hidden');
            resultsContent.classList.remove('hidden');
            
            timestamp.textContent = new Date(gameData.timestamp).toLocaleString('vi-VN');
            
            // Hiển thị danh sách items
            itemsList.innerHTML = '';
            gameData.items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'p-3 rounded-lg text-white text-center font-medium';
                
                // Áp dụng màu tương ứng với item
                const colors = {
                    'item1': 'bg-blue-500',
                    'item2': 'bg-green-500',
                    'item3': 'bg-red-500',
                    'item4': 'bg-yellow-500',
                    'item5': 'bg-purple-500',
                    'item6': 'bg-pink-500'
                };
                
                itemElement.className += ' ' + (colors[item.id] || 'bg-gray-500');
                itemElement.textContent = `${item.id} (x: ${Math.round(item.x)}, y: ${Math.round(item.y)})`;
                
                itemsList.appendChild(itemElement);
            });
        }
    }

    // Tự động cập nhật khi có dữ liệu mới (có thể thêm nếu cần)
    window.addEventListener('storage', function(e) {
        if (e.key === 'gameData') {
            displayResults();
        }
    });
});