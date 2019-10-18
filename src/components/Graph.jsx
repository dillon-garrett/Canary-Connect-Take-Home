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
  // custom hook for setting the styles and display data for the graph
  const [colorScheme, setColorScheme] = useState('');
  const [chartTitle, setChartTitle] = useState('');
  const [isHorizontal, setIsHorizontal] = useState(false);
  // styling options for graph. There should be as many tick values as there are data points
  const tickValues = [];
  // array for data points for "created at" Simplified data string
  const tickFormatX = [];
  // prop to be used to describe the y axis data
  let tickFormatY = '';

  // hook used to set color styling and graph details upon component mount
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

  // iteration to grab the number of tickValues for the X axis and to simplify the x axis createdAt string
  for (let i = 0; i < readingToDisplay.length; i += 1) {
    tickValues.push(i + 1);
    let str = '';
    if (readingToDisplay[i].createdAt) {
      str += readingToDisplay[i].createdAt.slice(6, 10);
      // commented out below is for formatting time of day
      //   str += readingToDisplay[i].createdAt.slice(11, 13);
      tickFormatX.push(str);
    }
  }
  return (
    // graphing library with passed in props to render each graph differently
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
      {/* props set earlier from custom hooks based upon graph type submitted */}
      <VictoryLabel text={chartTitle} x={175} y={30} textAnchor="middle" />
      <VictoryAxis tickValues={tickValues} tickFormat={tickFormatX} />
      <VictoryAxis dependentAxis tickFormat={x => `${x}${tickFormatY}`} />
      <VictoryStack colorScale={colorScheme}>
        <VictoryBar data={readingToDisplay} height={150} x="createdAt" y="value" />
      </VictoryStack>
    </VictoryChart>
  );
};

export default Graph;
