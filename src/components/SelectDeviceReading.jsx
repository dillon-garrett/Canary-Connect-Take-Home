import React from 'react';

const SelectDeviceReading = props => {
  const { handleSubmit, handleChange } = props;

  return (
    <section id="select-reading-component">
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
    </section>
  );
};

export default SelectDeviceReading;
