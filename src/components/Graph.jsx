import React, { useState } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

const Graph = props => {
  const { readingType, readingToDisplay } = props;
  const tickValues = [];
//   const tickFormatX = [];
  let tickFormatY = '';

  if (readingType === 'humidity') tickFormatY = '%';
  if (readingType === 'temperature') tickFormatY = '°F';

  for (let i = 1; i < readingToDisplay.length - 1; i += 1) {
    tickValues.push(i);
  }

  return (
    <VictoryChart domainPadding={20}>
      <VictoryAxis tickValues={tickValues} tickFormat={readingToDisplay.createdAt} />
      <VictoryAxis dependentAxis tickFormat={x => `${x}${tickFormatY}`} />
      <VictoryBar data={readingToDisplay} x="createdAt" y="value" />
    </VictoryChart>
  );
};

export default Graph;
