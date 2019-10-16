import React, { useState } from 'react';
import { XYPlot, LineSeries } from 'react-vis';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

const Device = props => {
  const { text, id, proxy } = props;
  const url = `https://fullstack-challenge-api.herokuapp.com/devices/${id}/readings`;
  //   const sample = { humidity: [], temperature: [], airquality: [] };
  const [humidity, setHumidity] = useState([]);
  const [temp, setTemp] = useState([]);
  const [airQuality, setAirQuality] = useState([]);

  const handleClick = () => {
    fetch(proxy + url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
      //   mode: 'no-cors'
    })
      .then(res => res.json())
      .then(response => {
        // const readingsObj = { humidity: [], temperature: [], airquality: [] };
        const humidArr = [];
        const tempArr = [];
        const airArr = [];
        response.forEach(el => {
          const obj = {};
          if (el.type === 'humidity') {
            obj.createdAt = el.createdAt;
            obj.value = el.value;
            humidArr.push(obj);
          }
          if (el.type === 'temperature') {
            obj.createdAt = el.createdAt;
            obj.value = el.value;
            tempArr.push(obj);
          }
          if (el.type === 'airquality') {
            obj.createdAt = el.createdAt;
            obj.value = el.value;
            airArr.push(obj);
          }
        });
        setHumidity(humidArr);
        setTemp(tempArr);
        setAirQuality(airArr);
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
      {humidity.length > 0 && (
        <VictoryChart domainPadding={20}>
          <VictoryAxis tickValues={[1, 2, 3, 4, 5]} tickFormat={humidity.createdAt} />
          <VictoryAxis dependentAxis tickFormat={x => `${x}unit`} />
          <VictoryBar data={humidity} x="createdAt" y="value" />
        </VictoryChart>
      )}
      {/* <XYPlot height={300} width={300} />
      <LineSeries data={data} /> */}
    </section>
  );
};

export default Device;
