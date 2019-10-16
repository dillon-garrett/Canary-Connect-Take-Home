import React from 'react';

const Device = props => {
  const { text, id, proxy } = props;
  const url = `https://fullstack-challenge-api.herokuapp.com/devices/${id}/readings`;
  const readingsObj = { humidity: [], temperature: [], airquality: [] };

  const handleClick = () => {
    fetch(proxy + url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
      //   mode: 'no-cors'
    })
      .then(res => res.json())
      .then(response => {
        response.forEach(el => {
          if (el.type === 'humidity') readingsObj.humidity.push(el.value);
          if (el.type === 'temperature') readingsObj.temperature.push(el.value);
          if (el.type === 'airquality') readingsObj.airquality.push(el.value);
        });
        console.log(readingsObj, 'this is readingsObj');
      })
      .catch(() => {
        throw new Error('error in fetching device readings');
      });
  };
  return (
    <section className="device" id={id}>
      {text}
      <button type="button" className="get-graph-data" onClick={handleClick}>
        Click Me
      </button>
    </section>
  );
};

export default Device;
