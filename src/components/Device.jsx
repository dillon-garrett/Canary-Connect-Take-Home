import React, { useState, useEffect } from 'react';
import Graph from './Graph';
import fetchGraphData from '../Utils/fetchGraphData';

const Device = props => {
  const { text, id, proxy } = props;
  // uses the passed in id from props to hit the readings endpoint on the API
  const url = `https://fullstack-challenge-api.herokuapp.com/devices/${id}/readings`;
  // custom hooks for setting correct data for the graph
  const [humidity, setHumidity] = useState([]);
  const [temp, setTemp] = useState([]);
  const [airQuality, setAirQuality] = useState([]);
  // custom hook for pulling the type of graph from the dropdown menu
  // defaults to humidity since humidity is the first element of the dropdown
  const [readingType, setReadingType] = useState('humidity');
  // custom hook for passing props to the graph component
  // defaults to temperature since all the devices have temperature readings
  const [yAxisDisplay, setYAxisDisplay] = useState('temperature');
  // custom hook for passing the payload of data to the graph. format is an array of objects
  const [readingToDisplay, setReadingToDisplay] = useState([]);
  // custom hook for closing the graph upon click
  const [isGraphHidden, setIsGraphHidden] = useState(false);

  // submission event for setting the payload for the graph component
  const handleSubmit = event => {
    // sets the payload for graphing styling
    setYAxisDisplay(readingType);
    // custom hooks for payload. Each is an array composed of objects with created at and value
    if (readingType === 'humidity') setReadingToDisplay(humidity);
    if (readingType === 'temperature') setReadingToDisplay(temp);
    if (readingType === 'airQuality') setReadingToDisplay(airQuality);
    // overriding any previous hiding of the graph
    setIsGraphHidden(false);
    // preventing page rerender
    event.preventDefault();
  };

  // setting the type of graph from the dropdown menu
  const handleChange = event => {
    setReadingType(event.target.value);
  };

  // hides the graph upon click
  const hideGraph = () => {
    if (isGraphHidden === false) setIsGraphHidden(true);
  };

  // similar to the fetch in MainContainer, fetches the device readings in the background
  // so that when the type of graph the user wants to see is submitted, the fetch is already complete
  useEffect(() => {
    fetchGraphData(proxy, url, setHumidity, setTemp, setAirQuality, setReadingToDisplay);
  }, []);

  return (
    // grabbing the first few letters of the name for id
    <section className="device" id={text.slice(0, 4)}>
      {/* rendering of the text for each device */}
      <article id="device-text">{text}</article>
      {/* dropdown menu and functions for handling user input */}
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
      {/* conditional render to prevent graph from rendering until user input or if user chooses to hide graph */}
      {readingToDisplay.length > 0 && isGraphHidden === false && (
        <article>
          {/* passing the style payload and data payload as props */}
          <Graph yAxisDisplay={yAxisDisplay} readingToDisplay={readingToDisplay} />
          <button type="submit" onClick={hideGraph} className="button">
            Hide Graph
          </button>
        </article>
      )}
      {/* conditional render in case no data is available for a reading from the API */}
      {readingToDisplay.length === 0 && yAxisDisplay !== '' && (
        <h1 id="empty-data">Sensor Reading Unavailable</h1>
      )}
    </section>
  );
};

export default Device;
