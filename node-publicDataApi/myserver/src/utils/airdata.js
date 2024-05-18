const request = require("request");
const serviceKey = require("../keys/key");

const airdata = (stationName, cb) => {
  const url =
    "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?";

  var ServiceKey = serviceKey.publicKey;

  var queryParams = encodeURIComponent("ServiceKey") + "=" + ServiceKey;
  queryParams +=
    "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("1");
  queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1");
  queryParams +=
    "&" + encodeURIComponent("dataTerm") + "=" + encodeURIComponent("DAILY");
  queryParams +=
    "&" + encodeURIComponent("ver") + "=" + encodeURIComponent("1.3");
  queryParams +=
    "&" +
    encodeURIComponent("stationName") +
    "=" +
    encodeURIComponent(stationName);
  queryParams +=
    "&" + encodeURIComponent("returnType") + "=" + encodeURIComponent("json");

  const fullUrl = url + queryParams;

  request(fullUrl, (error, { body }) => {
    const air = JSON.parse(body);
    cb(undefined, {
      air,
    });
  });
};

module.exports = airdata;
