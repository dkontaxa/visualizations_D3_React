const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const url = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json';
  const response = await fetch(url);
  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};