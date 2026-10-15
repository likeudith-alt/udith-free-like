exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const uid = event.queryStringParameters?.uid;
  const server = event.queryStringParameters?.server || 'SG';

  if (!uid) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, error: 'UID is required' })
    };
  }

  if (!/^\d+$/.test(uid)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, error: 'UID must be numeric' })
    };
  }

  try {
    const apiKey = 'chamaa-freefire-likes-main-api-automate-perfect-100-service-sri-lanka';
    const apiUrl = 'http://freelikes.chamaa.dev/freelike?api_key=' +
                   apiKey + '&uid=' + uid + '&server_name=' + server;

    console.log('Calling API:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    console.log('API Response:', data);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        status: data.status || 0,
        PlayerNickname: data.PlayerNickname || 'Unknown',
        PlayerUID: data.PlayerUID || uid,
        Region: data.Region || server,
        LikesBeforeCommand: data.LikesBeforeCommand || 0,
        LikesAfterCommand: data.LikesAfterCommand || 0,
        LikesGivenByAPI: data.LikesGivenByAPI || 0,
        ContactOnTelegram: data.ContactOnTelegram || '',
        Developer: data.Devoloper || 'Chamaa'
      })
    };

  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'API request failed',
        message: error.message
      })
    };
  }
};