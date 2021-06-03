
const express = require('express');
const next = require('next');
const proxyMiddleware = require('http-proxy-middleware');


const devProxy = {
  '/api/qna': {
    target: 'http://localhost:9030',
    pathRewrite: { '/api/qna': '' },
    changeOrigin: true,
    secure: false,
  },
};

const port = parseInt(process.env.PORT, 10) || 3500;
const env = process.env.NODE_ENV;
const dev = env !== 'production';
const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
});
const handle = app.getRequestHandler();

let server;

app
  .prepare()
  .then(() => {
    server = express();

    if (devProxy) {
      Object.keys(devProxy).forEach((context) => {
        server.use(proxyMiddleware(context, devProxy[context]));
      });
    }

    server.all('*', (req, res) => handle(req, res));

    server.listen(port, err => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on port ${port} [${env}]`);
    });
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server');
    console.log(err);
  });
