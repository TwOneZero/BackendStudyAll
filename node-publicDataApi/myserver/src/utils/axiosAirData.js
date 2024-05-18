const axios = require("axios");
const serviceKey = require("../keys/key");

const axiosAirdata = async (stationName, cb) => {
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

  try {
    const json = await axios.get(fullUrl); // Promise 리턴됨
    cb(undefined, { air: json.data });
  } catch (error) {
    console.log(error);
  }
};

module.exports = axiosAirdata;
