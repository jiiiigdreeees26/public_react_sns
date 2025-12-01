import 'web-streams-polyfill/polyfill'; // ReadableStream, WritableStream, TransformStream
import { TextEncoder, TextDecoder } from 'util';
import 'whatwg-fetch'; // fetch, Request, Response

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// MSW のサーバーセットアップ
import { server } from './src/test/server.js';
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Jest-DOM（オプション）
import '@testing-library/jest-dom';