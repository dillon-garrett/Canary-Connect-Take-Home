const fetchGraphData = (proxy, url, setHumidity, setTemp, setAirQuality, setReadingToDisplay) => {
  fetch(proxy + url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
    //   mode: 'no-cors'
  })
    .then(res => res.json())
    .then(response => {
      // initializing arrays to set state
      const humidArr = [];
      const tempArr = [];
      const airArr = [];
      response.forEach(el => {
        // since the graph payload type needs to be formatted as an array of objects, initializing object to push to array
        const obj = {};
        // determining which reading to grab from the API
        if (el.type === 'humidity') {
          // grabbing the created at and value props
          obj.createdAt = el.createdAt;
          obj.value = el.value;
          humidArr.push(obj);
        }
        if (el.type === 'temperature') {
          // grabbing the created at and value props
          obj.createdAt = el.createdAt;
          obj.value = el.value;
          tempArr.push(obj);
        }
        if (el.type === 'airquality') {
          // grabbing the created at and value props
          obj.createdAt = el.createdAt;
          obj.value = el.value;
          airArr.push(obj);
        }
      });
      // setting the custom hooks to be used upon submission
      setHumidity(humidArr);
      setTemp(tempArr);
      setAirQuality(airArr);
      // set the defualt display to be temperature
      setReadingToDisplay(tempArr);
    })
    .catch(() => {
      throw new Error('error in fetching device readings');
    });
};

export default fetchGraphData;
