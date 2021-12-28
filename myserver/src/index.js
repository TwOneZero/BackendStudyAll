const path = require("path"); // npm core library 이어서 npm으로 설치할 필요 없음
const express = require("express"); // import express from 'express'=> es6 문법은 nodejs 에서 안 쓰임
const hbs = require("hbs"); //view template engine
const bodyParser = require("body-parser");
const airdata = require("./utils/airdata");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//Heroku 에 올릴거라서 port 번호를 변수화
const port = process.env.PORT || 5000;

const publicDirPath = path.join(__dirname, "../public"); // app 에 static 파일을 넘겨주기 위함
//template 경로
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs"); //hbs 를 view engine 으로 씀
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirPath)); //인자로 들어온 걸 express 에 던져줌

app.get("/", (req, res) => {
  res.render("index", {
    title: "미세먼지 정보 앱",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "무엇을 도와드릴까요?",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "앱 정보",
    message: "About Page,,,hbs 연습중ㅎㅎ",
  });
});

app.post("/air", (req, res) => {
  airdata(req.body.location, (error, { air } = {}) => {
    if (error) {
      return res.send({ error });
    }
    console.log("========");
    const airItem = air.response.body.items;
    console.log(air.response.body.items);
    return res.render("air", {
      title: "미세먼지 정보",
      location: req.body.location,
      time: airItem[0].dataTime,
      pm10: airItem[0].pm10Value,
      pm25: airItem[0].pm25Value,
    });
  });
});

app.listen(port, () => {
  console.log(`connected! Running at ${port}`);
});
