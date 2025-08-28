// gui1.js
document.addEventListener('DOMContentLoaded', function() {
    // Hiển thị thông tin người dùng
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('userInfo').textContent = 
            `Xin chào ${currentUser.fullname} (${currentUser.username})`;
    }

    // Logic kéo thả
    const draggables = document.querySelectorAll('.draggable');
    const dropZone = document.getElementById('dropZone');
    const dropArea = document.getElementById('dropArea');
    const submitBtn = document.getElementById('submitBtn');

    let draggedItems = [];

    // Thêm event listeners cho các phần tử có thể kéo
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.dataset.item);
            this.classList.add('opacity-50');
        });

        draggable.addEventListener('dragend', function() {
            this.classList.remove('opacity-50');
        });
    });

    // Cho phép thả
    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('bg-blue-50');
    });

    dropZone.addEventListener('dragleave', function() {
        this.classList.remove('bg-blue-50');
    });

    // Xử lý thả
    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('bg-blue-50');
        
        const itemId = e.dataTransfer.getData('text/plain');
        const itemElement = document.querySelector(`[data-item="${itemId}"]`);
        
        if (itemElement && !document.querySelector(`#dropArea [data-item="${itemId}"]`)) {
            const clonedItem = itemElement.cloneNode(true);
            clonedItem.classList.remove('draggable');
            clonedItem.classList.add('m-2');
            clonedItem.setAttribute('style', 'position: relative;');
            
            // Thêm vị trí ngẫu nhiên để tạo hiệu ứng thả
            const rect = dropArea.getBoundingClientRect();
            const x = Math.random() * (rect.width - 100);
            const y = Math.random() * (rect.height - 50);
            clonedItem.style.left = x + 'px';
            clonedItem.style.top = y + 'px';
            
            dropArea.appendChild(clonedItem);
            
            // Lưu thông tin vị trí
            draggedItems.push({
                id: itemId,
                x: x,
                y: y
            });
        }
    });

    // Xử lý submit
    submitBtn.addEventListener('click', function() {
        if (draggedItems.length > 0) {
            // Lưu dữ liệu vào localStorage
            const gameData = {
                user: currentUser,
                items: draggedItems,
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem('gameData', JSON.stringify(gameData));
            
            alert('Đã gửi kết quả thành công!');
            
            // Có thể thêm chuyển hướng hoặc reset giao diện ở đây
        } else {
            alert('Vui lòng kéo ít nhất 1 đối tượng vào khu vực thả!');
        }
    });
});