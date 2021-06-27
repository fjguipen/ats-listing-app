export const IDBStores = {
  REQUESTS: 'requests'
};

class IndexedDBC {
  static dbName = 'list-app';
  static version = 1;
  db;
  status;

  constructor() {
    if (!window.indexedDB) {
      this.status = 'unsopported';
      return;
    }
    this._init(IndexedDBC.version);
  }

  _init(version) {
    const connection = indexedDB.open(IndexedDBC.dbName, version);
    connection.onblocked = (e) => {
      // handle
      alert(
        'A new version of this page is ready. Please reload or close this tab!'
      );
    };
    connection.onupgradeneeded = (e) => {
      const db = e.target.result;
      this._addStores(db);
    };

    connection.onsuccess = (e) => {
      this.db = e.target.result;
      this.status = 'ready';
      this._setDatabase();
    };

    connection.onerror = (e) => {
      // handle
      alert('An error ocurred, database not setted');
    };
  }

  _addStores(db) {
    db.createObjectStore(IDBStores.REQUESTS, {
      keyPath: 'idbKey'
    });
  }

  _setDatabase(db) {
    this.db.onversionchange = function (e) {
      //handle
      this.db.close();
      alert(
        'A new version of this page is ready. Please reload or close this tab!'
      );
    };
  }

  _getObjectStore(storeName, mode) {
    const tx = this.db.transaction(storeName, mode);
    return tx.objectStore(storeName);
  }

  async get(storeName, key) {
    const store = this._getObjectStore(storeName, 'readonly');
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = (e) => {
        const data = e.target.result;

        if (!data) {
          return resolve(null);
        }

        if (data.expires <= new Date().getTime()) {
          this.remove(key).catch((err) => {
            // handle
          });
          return resolve(null);
        }

        resolve(e.target.result);
      };

      request.onerror = (e) => {
        // Handle
        resolve(null);
      };
    });
  }

  async set(storeName, data, secondsToExpire) {
    const store = this._getObjectStore(storeName, 'readwrite');
    return new Promise((resolve, reject) => {
      if (secondsToExpire) {
        data.expires = new Date().getTime() + secondsToExpire * 1000;
      }
      console.log(data);
      const request = store.put(data);
      request.onsuccess = (e) => {
        console.log('Storing data in IDB');
        resolve(data);
      };
      request.onerror = (e) => {
        // Handle
        resolve(null);
      };
    });
  }

  async update(storeName, data) {
    const store = this._getObjectStore(storeName, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.get(data.key);
      request.onsuccess = (e) => {
        const objectStore = e.target.result;
        if (!objectStore) {
          return reject(null);
        }
        const requestUpdate = objectStore.put(data);
        requestUpdate.onerror = (e) => {
          // handle
          resolve(null);
        };
        requestUpdate.onsuccess = (e) => {
          resolve(data);
        };
      };
      request.onerror = (e) => {
        // Handle
        reject(null);
      };
    });
  }

  async remove(storeName, key) {
    const store = this._getObjectStore(storeName, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.delete(key);
      request.onsuccess = (e) => {
        resolve(true);
      };
      request.onerror = (e) => {
        // Handle
        resolve(false);
      };
    });
  }

  async clear(storeName) {
    const store = this._getObjectStore(storeName, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = (e) => {
        resolve(true);
      };
      request.onerror = (e) => {
        // Handle
        resolve(false);
      };
    });
  }
}

export const IndexedDB = new IndexedDBC();
