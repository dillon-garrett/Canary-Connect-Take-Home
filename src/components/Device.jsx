import React, { useState } from 'react';
import { XYPlot, LineSeries } from 'react-vis';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

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

  const humidData = [];
  for (let i = 0; i < readings.humidity.length - 1; i += 1) {
    const obj = { index: 0, humidity: 0 };
    obj.index = i;
    obj.humidity = readings.humidity[i];
    humidData.push(obj);
  }

  const xTick = [...Array(humidData.length).keys()];
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
  ];
  return (
    <section className="device" id={id}>
      {text}
      <button type="button" className="get-graph-data" onClick={handleClick}>
        Click Me
      </button>
      <VictoryChart domainPadding={20}>
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']}
        />
        <VictoryAxis dependentAxis tickFormat={x => `$${x / 1000}k`} />
        <VictoryBar data={data} x="quarter" y="earnings" />
      </VictoryChart>
      {/* <XYPlot height={300} width={300} />
      <LineSeries data={data} /> */}
    </section>
  );
};

export default Device;
