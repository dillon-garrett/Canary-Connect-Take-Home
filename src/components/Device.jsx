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
    <section className="device" id={text.slice(0, 4)}>
      <article id="device-text">{text}</article>
      <form onSubmit={handleSubmit} onChange={handleChange} className="select-reading">
        <section id="select-device-reading">
          Select Device Reading:
          <select className="reading-type">
            <option value="humidity">Humidity</option>
            <option value="temperature">Temperature</option>
            <option value="airQuality">Air Quality</option>
          </select>
        </section>
        <input type="submit" value="Submit" className="button" />
      </form>
      {readingToDisplay.length > 0 && isGraphHidden === false && (
        <article>
          <Graph yAxisDisplay={yAxisDisplay} readingToDisplay={readingToDisplay} />
          <button type="submit" onClick={hideGraph} className="button">
            Hide Graph
          </button>
        </article>
      )}
      {readingToDisplay.length === 0 && yAxisDisplay !== '' && (
        <h1 id="empty-data">Sensor Reading Unavailable</h1>
      )}
    </section>
  );
};

export default Device;
