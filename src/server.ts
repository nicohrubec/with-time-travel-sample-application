import "./instrument";

import { createServer } from 'node:http';
import * as Sentry from '@sentry/node';


const hostname = '127.0.0.1';
const port = 3000;

Sentry.withDebugger(() => {
  const a = 'a';
  let b = 5;
  console.log('First call!');
  console.log('Second call!');
  b += 1;
  const c = ['d', 'e', 'f'];
  const d = {'a': 'b'};
  Sentry.captureException(new Error());
})

const server = createServer((req, res) => {
  /*
  try {
    for (let i = 0; i < 3; i ++) {
      console.log('i ==', i);
      if (i == 2) {
        throw new Error();
      }
    }
  } catch (e) {
    Sentry.captureException(e);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Unexpected exception!');
    throw e;
  }

   */
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
