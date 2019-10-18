import React, { useState, useEffect } from 'react';
import Device from '../components/Device';

const MainContainer = () => {
  const [devices, setDevices] = useState({});
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
        const deviceObj = {};
        response.forEach(el => {
          deviceObj[el.name] = el.id;
        });
        setDevices(deviceObj);
      })
      .catch(() => {
        throw new Error('error in fetch request');
      });
  }, []);

  const deviceRender = [];
  for (const x in devices) {
    deviceRender.push(<Device text={x} id={devices[x]} key={devices[x]} proxy={proxy} />);
  }
  return <article id="main-container">{deviceRender}</article>;
};

export default MainContainer;
