const path = require("path"); // npm core library 이어서 npm으로 설치할 필요 없음
const express = require("express"); // import express from 'express'=> es6 문법은 nodejs 에서 안 쓰임
const app = express();

const publicDirPath = path.join(__dirname, "../public"); // app 에 static 파일을 넘겨주기 위함
app.use(express.static(publicDirPath)); //인자로 들어온 걸 express 에 던져줌

// console.log(__dirname); // node 에 내장된 디렉토리 절대경로 변수
// console.log(__filename);

//route handler
// app.get("/", (req, res) => {
//   res.send("안녕하세요");
// });
// app.get("/help", (req, res) => {
//   res.send("도움이 필요하십니까?");
// });
// app.get("/about", (req, res) => {
//   res.send("About...");
// });

app.get("/weather", (req, res) => {
  res.send({
    forecast: "현재는 쌀쌀",
    location: "서울",
  });
});

app.listen(5000, () => {
  console.log("connected!");
}); // port number - > 5000
