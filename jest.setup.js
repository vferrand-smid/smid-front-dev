import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
// Polyfill for Request and Response
global.Request = require('whatwg-fetch').Request;
global.Response = require('whatwg-fetch').Response;
require('dotenv').config({ path: './.env.test' });
