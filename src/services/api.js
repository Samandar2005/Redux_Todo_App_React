import mockData from './data.json';

/**
 * Mock an asynchronous fetch of todos from the JSON
 * @return {Promise}
 */
export function fetchTodos() {
  return new Promise(resolve => {
    return setTimeout(() => {
      return resolve(mockData.data);
    }, Math.floor(Math.random() * (1000 - 300))) + 300;
  });
}
