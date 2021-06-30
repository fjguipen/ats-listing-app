import { IndexedDB, IDBStores } from '../../libs/IndexedDB';

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

export const handleFetch = async (
  { path, method, headers = {}, expiration },
  variables
) => {
  const options = {
    headers: new Headers({
      'Content-Type': 'application/json',
      ...headers
    }),
    method,
    body: (variables && JSON.stringify(variables)) || undefined
  };

  const cached = await IndexedDB.get(IDBStores.REQUESTS, path);
  if (cached) {
    return JSON.parse(cached.data);
  }

  const response = await fetch(path, options);
  if (response?.status === 200) {
    const data = await response.json();
    if (expiration) {
      cacheResponse(path, JSON.stringify(data), expiration);
    }
    return data;
  } else {
    throw new Error('Request failed');
  }
};
