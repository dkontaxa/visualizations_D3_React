const https = require('https');

exports.handler = function(event, context) {
  const url = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json';
  https.get(url, function(response) {
    let data = '';
    response.on('data', function(chunk) {
      data += chunk;
    });
    response.on('end', function() {
        console.log("success");
      return {
        statusCode: 200,
        body: JSON.stringify(response.data)
      };
    });
  }).on('error', function(error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  });
};
