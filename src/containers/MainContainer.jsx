import React, { useState, useEffect } from 'react';
import Device from '../components/Device';

const MainContainer = () => {
  const [devices, setDevices] = useState([]);
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const url = 'https://fullstack-challenge-api.herokuapp.com/devices';

  useEffect(() => {
    fetch(proxy + url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
      //   mode: 'no-cors'
    })
      .then(res => res.json())
      .then(response => {
        const arr = [];
        response.forEach(el => {
          //   arr.push(<Device text={el.name} id={`device-${el.name}`} />);
          arr.push(el.name);
          //   console.log(el.name);
          //   arr.push(
          //     <div>
          //       <Device text={el['name']} id={`device-${el['name']}`} />)
          //     </div>
          //   );
        });
        setDevices(arr);
      })
      .catch(() => {
        throw new Error('error in fetch request');
      });
  }, []);

  const deviceRender = devices.map((el, idx) => <Device text={el} key={`device-${el}-${idx}`} />);
  return <div>{deviceRender}</div>;
};

export default MainContainer;
