import React from 'react';
import 'whatwg-fetch';
import { renderHook } from '@testing-library/react-hooks';
import fetchMock from 'fetch-mock';
import { act } from 'react-test-renderer';
import fetchGraphData from '../src/Utils/fetchGraphData';
import initialFetch from '../src/Utils/initialFetch';

// describe('initialFetch', () => {
//   beforeAll(() => {
//     global.fetch = fetch;
//   });
//   afterAll(() => {
//     fetchMock.restore();
//   });
// it('should return data with a successful request', async () => {
//   const setDevices = x => x;
//   const { result } = renderHook(() => initialFetch('test.com', 'proxy', setDevices));
//   fetchMock.mock('test.com', {
//     returnedData: 'foo'
//   });
//   await act(async () => {
//     result.current.initialFetch('test.com', 'proxy', setDevices);
//   });
//   expect(result.current.data).toBe({
//     returnedData: 'foo'
//   });
// });
// });
