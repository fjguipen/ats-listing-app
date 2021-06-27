import { IndexedDB, IDBStores } from '../../libs/IndexedDB';

const API = 'https://front-test-api.herokuapp.com/api';

export const cacheResponse = async (key, data, expiration) => {
  await IndexedDB.set(
    IDBStores.REQUESTS,
    {
      idbKey: key,
      data
    },
    expiration
  );
};

export const handleFetch = async ({
  path,
  method,
  body,
  headers = {},
  expiration
}) => {
  const options = {
    headers: new Headers({
      ...headers
    }),
    method,
    body: (body && JSON.stringify(body)) || undefined
  };

  const endpointURL = API + path;
  const cached = await IndexedDB.get(IDBStores.REQUESTS, endpointURL);
  if (cached) {
    return JSON.parse(cached.data);
  }

  const response = await fetch(endpointURL, options);
  if (response?.status === 200) {
    const data = await response.json();
    if (expiration) {
      cacheResponse(endpointURL, JSON.stringify(data), expiration);
    }
    return data;
  } else {
    throw new Error('Request failed');
  }
};
