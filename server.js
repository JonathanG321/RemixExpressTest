import { createRequestHandler } from '@remix-run/express';
import { installGlobals } from '@remix-run/node';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';

installGlobals();

const viteDevServer =
  process.env.NODE_ENV === 'production'
    ? undefined
    : await import('vite').then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

const remixHandler = createRequestHandler({
  build: viteDevServer
    ? () => viteDevServer.ssrLoadModule('virtual:remix/server-build')
    : await import('./build/server/index.js'),
});

const app = express();

app.post('/cron-job-test', async (req, res) => {
  res.status(202);
  res.send();
  async function delay(timeMs) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, timeMs);
    });
  }

  for (let i = 1; i <= 20; i++) {
    console.log('test ' + i);
    await delay(30000);
  }

  console.log('test complete');
});

app.post('/api/v1/test', async (req, res) => {
  res.status(200).end()
});

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');

// handle asset requests
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  // Vite fingerprints its assets so we can cache forever.
  app.use('/assets', express.static('build/client/assets', { immutable: true, maxAge: '1y' }));
}

app.use(morgan('dev'));

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static('build/client', { maxAge: '1h' }));

// handle SSR requests
app.all('*', remixHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Express server listening at http://localhost:${port}`));
