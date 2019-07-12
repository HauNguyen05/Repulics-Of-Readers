/**
 * Created by trungquandev.com's author on 11/03/2019.
 * server.js
 */

let express = require("express");
let multer = require("multer");
let path = require("path");

let app = express();

// Route này trả về cái form upload cho client
app.get("/upload", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/file.html`));
});

// Khởi tạo biến cấu hình cho việc lưu trữ file upload
let diskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Định nghĩa nơi file upload sẽ được lưu lại
    callback(null, "./upload");
  },
  filename: (req, file, callback) => {
    let filename = `${file.originalname}`;
    callback(null, filename);
  }
});

// Khởi tạo middleware uploadFile với cấu hình như ở trên,
// Bên trong hàm .single() truyền vào name của thẻ input, ở đây là "file"
let uploadFile = multer({storage: diskStorage}).single("file");

// Route này Xử lý khi client thực hiện hành động upload file
app.post("/upload", (req, res) => { 
  // Thực hiện upload file, truyền vào 2 biến req và res
  uploadFile(req, res, (error) => {
    // Nếu có lỗi thì trả về lỗi cho client.
    if (error) {
      return res.send(`Error when trying to upload: ${error}`);
    }
    // Không có lỗi thì lại render cái file về cho client.
    // Đồng thời file đã được lưu vào thư mục uploads
    res.sendFile(path.join(`${__dirname}/upload/${req.file.filename}`));
  });
});
 
app.listen(3000, "localhost", () => {
  console.log(`Hello, I'm running at localhost:3000/`);
});

app.get('/get', function (req, res) {
    res.sendFile('view/get.html', { root: __dirname });
  
  })
  
  app.get('/info', function (req, res) {
    // Prepare output in JSON format
    response = {
      first_name: req.query.first_name,
      phone: req.query.phone,
    }; 
    res.end(JSON.stringify(response));
  })
  app.get('/', function (req, res) {
    res.sendFile('view/index.html', { root: __dirname });
  
  })