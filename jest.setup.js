import '@testing-library/jest-dom';

// Robust mock for fetch in Jest/jsdom environment
global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    blob: () => Promise.resolve(new Blob()),
    headers: new Headers(),
  })
);

global.Request = jest.fn().mockImplementation((input) => ({
  url: input,
}));

global.Response = jest.fn().mockImplementation((body, init) => ({
  body,
  ...init,
}));

global.Headers = jest.fn().mockImplementation(() => ({
  append: jest.fn(),
  get: jest.fn(),
  set: jest.fn(),
}));

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn();
