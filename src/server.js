const express = require('express');
const app = express();
const port = 3000; // Chọn cổng mà máy chủ sẽ lắng nghe

// Định nghĩa route cho yêu cầu GET đến đường dẫn '/api/content'
app.get('/api/content', (req, res) => {
    res.send('Hello, GET request accepted for /api/content!');
});

// Khởi động máy chủ
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});