import React, { useState, useEffect } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';

const Graph = props => {
  const { yAxisDisplay, readingToDisplay } = props;
  const [colorScheme, setColorScheme] = useState('');
  const tickValues = [];
  //   const tickFormatX = [];
  let tickFormatY = '';

  useEffect(() => {
    if (yAxisDisplay === 'humidity') {
      tickFormatY = '%';
      setColorScheme('cool');
    }
    if (yAxisDisplay === 'temperature') {
      tickFormatY = '°F';
      setColorScheme('warm');
    }
    if (yAxisDisplay === 'airQuality') {
      setColorScheme('green');
    }
  });

  for (let i = 1; i < readingToDisplay.length - 1; i += 1) {
    tickValues.push(i);
  }

  return (
    <VictoryChart
      domainPadding={20}
      theme={VictoryTheme.material}
      animate={{
        duration: 1000,
        onLoad: { duration: 500 }
      }}
    >
      <VictoryAxis tickValues={tickValues} tickFormat={readingToDisplay.createdAt} />
      <VictoryAxis dependentAxis tickFormat={x => `${x}${tickFormatY}`} />
      <VictoryStack colorScale={colorScheme}>
        <VictoryBar data={readingToDisplay} x="createdAt" y="value" />
      </VictoryStack>
    </VictoryChart>
  );
};

export default Graph;
