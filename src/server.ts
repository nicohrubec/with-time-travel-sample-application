import "./instrument";

import { createServer } from 'node:http';
import * as Sentry from '@sentry/node';

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
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



  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
