exports.handler = async function(event, context) {
    const url = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  };