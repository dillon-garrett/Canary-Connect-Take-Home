import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Device from '../src/components/Device';
import Graph from '../src/components/Graph';
import 'isomorphic-fetch';

describe('React Component Tests', () => {
  let container = null;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders device text props correctly', () => {
    act(() => {
      render(<Device text="Figgis Agency" />, container);
    });
    expect(container.textContent.slice(0, 13)).toBe('Figgis Agency');
  });

  it('renders graph text props correctly', () => {
    act(() => {
      render(
        <Graph yAxisDisplay="humidity" readingToDisplay={[{ '2019-09-16T18:31:11.776Z': 30 }]} />,
        container
      );
    });
    const tSpan = container.querySelector('tspan');
    expect(tSpan.textContent).toBe('Humidity Ratings in 2018');
  });


//   it('renders user data', async () => {
//     const fakeData = [
//       {
//         type: 'temperature',
//         deviceId: 'HyqVV8p8B',
//         value: 30,
//         createdAt: '2019-09-16T18:31:11.776Z',
//         updatedAt: '2019-09-16T18:31:11.779Z',
//         id: 'Sy_lrIaIB'
//       }
//     ];

//     jest.spyOn(global, 'fetch').mockImplementation(() =>
//       Promise.resolve({
//         json: () => Promise.resolve(fakeData)
//       })
//     );

//     await act(async () => {
//       render(
//         <Graph
//           yAxisDisplay="temperature"
//           readingToDisplay={[{ '2019-09-16T18:31:11.776Z': 30 }]}
//         />,
//         container
//       );
//     });

//     expect(container.querySelector('yAxisDisplay').textContent).toBe('temperature');
//     expect(container.querySelector('readingsToDisplay').textContent).toBe([
//       { '2019-09-16T18:31:11.776Z': 30 }
//     ]);
//     expect(container.textContent).toContain(fakeData.address);

//     // remove the mock to ensure tests are completely isolated
//     global.fetch.mockRestore();
//   });
});
