import { useEffect, useState } from 'react';

function Check() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = 'https://api.abuseipdb.com/api/v2/check';

    const querystring = new URLSearchParams({
      ipAddress: '118.25.6.39',
      maxAgeInDays: '90'
    });

    fetch(`${url}?${querystring}`, {
      headers: {
        Accept: "application/json",
        Key: "9caf023f75484c2315dc7cac2fa8f980e2728d1a0f69ccdc679f722c694185349e82b4be5e20c76c"
      }
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {(loading) ?
        <div>Loading...</div>
        : <p>{JSON.stringify(data, null, 4)}</p>
      }
    </>
  );
}

export default Check;
