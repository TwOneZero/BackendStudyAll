const path = require("path"); // npm core library 이어서 npm으로 설치할 필요 없음
const express = require("express"); // import express from 'express'=> es6 문법은 nodejs 에서 안 쓰임
const hbs = require("hbs");

const app = express();

const publicDirPath = path.join(__dirname, "../public"); // app 에 static 파일을 넘겨주기 위함
//template 경로
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs"); //hbs 를 view engine 으로 씀
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirPath)); //인자로 들어온 걸 express 에 던져줌

// console.log(__dirname); // node 에 내장된 디렉토리 절대경로 변수
// console.log(__filename); //파일 까지

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

app.get("/", (req, res) => {
  res.render("index", {
    title: "미세먼지 정보 앱",
    name: "이원영",
    email: "123123google.com",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "무엇을 도와드릴까요?",
    name: "삼원영",
    email: "google.com",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "앱 정보",
    name: "사원영",
    email: "@@@@google.com",
    message: "About Page,,,hbs 연습중ㅎㅎ",
  });
});

app.get("/air", (req, res) => {
  res.send({
    forecast: "현재는 쌀쌀",
    location: "서울",
  });
});

app.listen(5000, () => {
  console.log("connected!");
}); // port number - > 5000
