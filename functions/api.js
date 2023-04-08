const https = require('https');

exports.handler = async function(event, context,callback) {
  var data ;
  const url = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json';
  https.get(url, function(response) {
    response.on('data', function(chunk) {
      data += chunk;
    });
    response.on('end', function() {
        console.log("success");
    //   return {
    //     statusCode: 200,
    //     body: JSON.stringify(data)
    //   };
    return data;
    });
  }).on('error', function(error) {
    console.log(error);
    console.log('there is an error')
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  });
  console.log(data);

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(data),
  };

  callback(null, response);
};
