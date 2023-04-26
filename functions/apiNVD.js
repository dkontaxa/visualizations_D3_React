const https = require("follow-redirects").https;

exports.handler = async function (event, context) {
  try {
    const options = {
      method: "GET",
      hostname: "services.nvd.nist.gov",
      path: "/rest/json/cves/2.0",
      headers: {
        api_key: "f26e3424-ad7d-4ed3-bd35-e97e9e6593ad",
        "Accept-Encoding": "identity",
      },
      maxRedirects: 20,
    };
    const response = await new Promise((resolve, reject) => {
      https
        .request(options, function (res) {
          let data = "";
          res.on("data", function (chunk) {
            data += chunk;
          });
          res.on("end", function () {
            console.log("success");
            var parsedData = JSON.parse(data).totalResults;
            console.log(parsedData);
            console.log(data.totalResults);
            console.log(data);

            const result = {
              statusCode: 200,
              body: JSON.stringify(JSON.parse(data).totalResults),
            };
            resolve(result);
          });
        })
        .on("error", function (error) {
          console.log(error);
          const result = {
            statusCode: 500,
            body: JSON.stringify({ error: "Something went wrong!" }),
          };
          reject(result);
        })
        .end();
    });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: response.body,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ error: "Something went wrong!" }),
    };
  }
};
