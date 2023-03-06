const rfidPostConsume = async params => {
  const response = await fetch(
    `https://panthermaniaserver-production.up.railway.app/signup`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(params),
    },
  );
  const data = await response.json();
  return data;
};

const rfidGetConsume = async rfid => {
  const response = await fetch(
    `https://panthermaniaserver-production.up.railway.app/matchingrfid/${rfid}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  );
  const data = await response.json();
  return data;
};

export {rfidPostConsume, rfidGetConsume};
