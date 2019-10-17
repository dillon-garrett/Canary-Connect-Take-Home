import React, { useState, useEffect } from 'react';
import Graph from './Graph';

const Device = props => {
  const { text, id, proxy } = props;
  const url = `https://fullstack-challenge-api.herokuapp.com/devices/${id}/readings`;
  const [humidity, setHumidity] = useState([]);
  const [temp, setTemp] = useState([]);
  const [airQuality, setAirQuality] = useState([]);
  const [readingType, setReadingType] = useState('humidity');
  const [yAxisDisplay, setYAxisDisplay] = useState('');
  const [readingToDisplay, setReadingToDisplay] = useState([]);
  const [isGraphHidden, setIsGraphHidden] = useState(false);

  const handleSubmit = event => {
    setYAxisDisplay(readingType);
    if (readingType === 'humidity') setReadingToDisplay(humidity);
    if (readingType === 'temperature') setReadingToDisplay(temp);
    if (readingType === 'airQuality') setReadingToDisplay(airQuality);
    setIsGraphHidden(false);
    event.preventDefault();
  };

  const handleChange = event => {
    setReadingType(event.target.value);
  };

  const hideGraph = () => {
    if (isGraphHidden === false) setIsGraphHidden(true);
  };

  useEffect(() => {
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
  }, []);

  return (
    <section className="device" id={id}>
      {text}
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <div>
          Select Device Reading:
          <select>
            <option value="humidity">Humidity</option>
            <option value="temperature">Temperature</option>
            <option value="airQuality">Air Quality</option>
          </select>
        </div>
        <input type="submit" value="submit" className="button" />
      </form>
      <button type="submit" onClick={hideGraph} className="button">
        Hide Graph
      </button>
      {readingToDisplay.length > 0 && isGraphHidden === false && (
        <Graph yAxisDisplay={yAxisDisplay} readingToDisplay={readingToDisplay} />
      )}
    </section>
  );
};

export default Device;
