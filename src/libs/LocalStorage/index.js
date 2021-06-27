export class LocalStorage {
  static set(key, value, secondsToExpire) {
    const store = {
      data: value,
      expires: secondsToExpire
        ? new Date().getTime() + secondsToExpire * 1000
        : null
    };

    const data = JSON.stringify(store);
    window.localStorage.setItem(key, data);
  }

  static get(key) {
    try {
      let store = window.localStorage.getItem(key);
      store = JSON.parse(store);
      if (store.expires <= new Date().getTime()) {
        LocalStorage.remove(key);
        return null;
      }

      return store.data;
    } catch {
      return null;
    }
  }

  static remove(key) {
    window.localStorage.removeItem(key);
  }
}
