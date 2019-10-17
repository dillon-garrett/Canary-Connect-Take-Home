import React, { useState, useEffect } from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
  VictoryLabel
} from 'victory';

const Graph = props => {
  const { yAxisDisplay, readingToDisplay } = props;
  const [colorScheme, setColorScheme] = useState('');
  const [chartTitle, setChartTitle] = useState('');
  const [isHorizontal, setIsHorizontal] = useState(false);
  const tickValues = [];
  const tickFormatX = [];
  let tickFormatY = '';

  useEffect(() => {
    if (yAxisDisplay === 'humidity') {
      tickFormatY = '%';
      setColorScheme('cool');
      setChartTitle('Humidity Ratings in 2018');
      setIsHorizontal(false);
    }
    if (yAxisDisplay === 'temperature') {
      tickFormatY = '°F';
      setColorScheme('warm');
      setChartTitle('Temperature Ratings in 2018');
      setIsHorizontal(false);
    }
    if (yAxisDisplay === 'airQuality') {
      setColorScheme('grayscale');
      setChartTitle('Air Quality Ratings in 2018');
      setIsHorizontal(true);
    }
  });

  for (let i = 0; i < readingToDisplay.length; i += 1) {
    tickValues.push(i + 1);
    let str = '';
    // console.log(readingToDisplay[i].createdAt.slice(6, 10), 'this is reading display')
    if (readingToDisplay[i].createdAt) {
      str += readingToDisplay[i].createdAt.slice(6, 10);
    //   str += readingToDisplay[i].createdAt.slice(11, 13);
      tickFormatX.push(str);
    }
  }
  return (
    <VictoryChart
      domainPadding={20}
      theme={VictoryTheme.material}
      animate={{
        duration: 1000,
        onLoad: { duration: 500 }
      }}
      style={{ labels: { fontSize: 5 } }}
      height={200}
      horizontal={isHorizontal}
    >
      <VictoryLabel text={chartTitle} x={175} y={30} textAnchor="middle" />
      <VictoryAxis tickValues={tickValues} tickFormat={tickFormatX} />
      <VictoryAxis dependentAxis tickFormat={x => `${x}${tickFormatY}`} />
      <VictoryStack colorScale={colorScheme}>
        <VictoryBar
          data={readingToDisplay}
          height={150}
          x="createdAt"
          y="value"
          //   height={100}
          //   width={100}
          //   labels={({ datum }) => `y: ${datum.y}`}
        />
      </VictoryStack>
    </VictoryChart>
  );
};

export default Graph;
