const axios = require("axios");

module.exports = () =>
  axios.create({
    baseURL: "//localhost:3000/",
    timeout: 1000,
    headers: {
      authorization: "Bearer " + localStorage.getItem("token")
    }
  });
