const https = require('https');

exports.handler = function(event, context) {
  const url = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json';
  https.get(url, function(response) {
    let data = '';
    response.on('data', function(chunk) {
        console.log("i do not know what this does")
      data += chunk;
    });
    response.on('end', function() {
        console.log("success");
console.log(response.data);
      return {
        statusCode: 200,
        body: JSON.stringify(response.data)
      };
    });
  }).on('error', function(error) {
    console.log(error);
    console.log('there is an error')
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  });
};
