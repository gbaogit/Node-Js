const http = require("http");
const fs = require("fs");
const path = require("path");

// Khởi tạo server
const server = http.createServer((req, res) => {
  const url = req.url;
  var html_path = null;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    // html_path = path.join(__dirname, "./slash.html");
    res.write("<html>");
    res.write("<head><title>Assignment 1</title>");
    res.write("</head>");
    res.write("<body><p>This is my page</p>");
    res.write("</body>");
    res.write("<html>");
  } else if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    html_path = path.join(__dirname, "./slash_user.html");
  }

  if (html_path) {
    fs.readFile(html_path, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.write("Internal Server Error");
        return res.end();
      } else {
        res.write(data);
        return res.end();
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server is running on https://localhost:3000");
});
