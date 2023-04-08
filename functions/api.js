const https = require('https');

exports.handler = async function(event, context) {
  try {
    const url = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json';
    const response = await new Promise((resolve, reject) => {
      https.get(url, function(res) {
        let data = '';
        res.on('data', function(chunk) {
          data += chunk;
        });
        res.on('end', function() {
          console.log("success");
          const result = {
            statusCode: 200,
            body: JSON.stringify(JSON.parse(data))
          };
          resolve(result);
        });
      }).on('error', function(error) {
        console.log(error);
        const result = {
          statusCode: 500,
          body: JSON.stringify({ error: 'Something went wrong!' })
        };
        reject(result);
      });
    });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: response.body
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({ error: 'Something went wrong!' })
    };
  }
};
