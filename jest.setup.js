const createAsyncStorageMock = () => {
  let store = {};

  return {
    clear: jest.fn(async () => {
      store = {};
    }),
    getAllKeys: jest.fn(async () => Object.keys(store)),
    getItem: jest.fn(async key =>
      Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null,
    ),
    removeItem: jest.fn(async key => {
      delete store[key];
    }),
    setItem: jest.fn(async (key, value) => {
      store[key] = value;
    }),
    multiGet: jest.fn(async keys =>
      keys.map(key => [
        key,
        Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null,
      ]),
    ),
    multiSet: jest.fn(async entries => {
      entries.forEach(([key, value]) => {
        store[key] = value;
      });
    }),
  };
};

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: createAsyncStorageMock(),
}));
