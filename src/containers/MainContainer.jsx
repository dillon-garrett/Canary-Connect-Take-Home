import React, { useState, useEffect } from 'react';
import Device from '../components/Device';

const MainContainer = () => {
  const [devices, setDevices] = useState([]);
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const url = 'https://fullstack-challenge-api.herokuapp.com/devices';

  const arr = [];
  useEffect(() => {
    fetch(proxy + url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
      //   mode: 'no-cors'
    })
      .then(res => res.json())
      .then(response => {
        for (let el of response) {
            console.log(el['name'])
        //   arr.push(
        //     <div>
        //       <Device text={el['name']} id={`device-${el['name']}`} />)
        //     </div>
        //   );
        }
      })
      .catch(() => {
        throw new Error('error in fetch request');
      });
  }, []);

  //   console.log(arr, 'this is arr');
  //   arr.map(device => console.log(device, 'these are devices'))
  return (
    <div>
      <h1>Hello World</h1>
      {arr}
    </div>
  );
};

export default MainContainer;
