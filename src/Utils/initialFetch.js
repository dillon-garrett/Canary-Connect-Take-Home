const initialFetch = (url, proxy, setDevices) => {
  fetch(proxy + url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
    //   mode: 'no-cors'
  })
    .then(res => res.json())
    .then(response => {
      // creating a device object to pass the name of the device and its id
      const deviceObj = {};
      response.forEach(el => {
        deviceObj[el.name] = el.id;
      });
      setDevices(deviceObj);
    })
    .catch(() => {
      throw new Error('error in fetch request');
    });
};

export default initialFetch;
