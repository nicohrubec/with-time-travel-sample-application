import "./instrument";

import { createServer } from 'node:http';
import * as Sentry from '@sentry/node';
import * as inspector from "node:inspector";

const session = new inspector.Session();
session.connect();

session.post('Runtime.evaluate', { expression: '2 + 2' },
    (error, { result }) => console.log(result));

session.on('inspectorNotification', () => {
  console.log('Something happened!');
});


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
