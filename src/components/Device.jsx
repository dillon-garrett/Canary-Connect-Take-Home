import React, { useState } from 'react';
import { XYPlot, LineSeries } from 'react-vis';

const Device = props => {
  const { text, id, proxy } = props;
  const url = `https://fullstack-challenge-api.herokuapp.com/devices/${id}/readings`;
  const sample = { humidity: [], temperature: [], airquality: [] };
  const [readings, setReadings] = useState(sample);

  const handleClick = () => {
    fetch(proxy + url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
      //   mode: 'no-cors'
    })
      .then(res => res.json())
      .then(response => {
        const readingsObj = { humidity: [], temperature: [], airquality: [] };
        response.forEach(el => {
          if (el.type === 'humidity') readingsObj.humidity.push(el.value);
          if (el.type === 'temperature') readingsObj.temperature.push(el.value);
          if (el.type === 'airquality') readingsObj.airquality.push(el.value);
        });
        setReadings(readingsObj);
      })
      .catch(() => {
        throw new Error('error in fetching device readings');
      });
  };

  const data = [];
  for (let i = 0; i < readings.humidity.length - 1; i += 1) {
    const obj = {};
    obj[i] = readings.humidity[i];
    data.push(obj);
  }
  return (
    <section className="device" id={id}>
      {text}
      <button type="button" className="get-graph-data" onClick={handleClick}>
        Click Me
      </button>
      <XYPlot height={300} width={300} />
      <LineSeries data={data} />
    </section>
  );
};

export default Device;
