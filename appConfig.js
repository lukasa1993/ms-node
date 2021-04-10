import helmet      from 'helmet';
import healthcheck from 'maikai';
import metalogger  from 'metalogger';
import morgan      from 'morgan';

import external from './lib/routes/external/index.js';
import internal from './lib/routes/internal/index.js';

const log = metalogger();

function serviceRoutes(app) {
  app.use(healthcheck().express());

  app.use('/internal', internal); // attach to root route
  app.use('/external', external); // attach to sub-route
}

function setupErrorHandling(app) {
  // Custom formatting for error responses.
  app.use((err, req, res, next) => {
    if (err) {
      const out = {};
      if (err.isJoi || err.type === 'validation') { //validation error. No need to log these
        out.errors = err.details;
        res.status(400).json(out);
        return;
      } else {
        log.error(err);
        if (process.env.NODE_ENV === 'production') {
          out.errors = ['Internal server error'];
        } else {
          out.errors = [err.toString()];
        }
        res.status(500).json(out);
        return;
      }
    }
    return next();
  });
}

export default function (app, callback) {
  /** Adding security best-practices middleware
   * see: https://www.npmjs.com/package/helmet **/
  app.use(helmet());
  app.use(morgan(':remote-addr :method :url :status :response-time ms - :res[content-length]', { skip: req => req.originalUrl === '/health' }));

  //---- Mounting well-encapsulated application modules (so-called: "mini-apps")
  //---- See: http://expressjs.com/guide/routing.html and http://vimeo.com/56166857
  serviceRoutes(app);

  setupErrorHandling(app);

  if (typeof callback === 'function') {
    callback(app);

  }
};
