
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internalError,
  '/notImplemented': jsonHandler.notImplemented,
  404: jsonHandler.notFound,
};

const onRequest = (request, response) => {
  const parseURL = url.parse(request.url);
  const types = request.headers.accept.split(',');
  const params = query.parse(parseURL.query);
  if (urlStruct[parseURL.pathname]) {
    urlStruct[parseURL.pathname](request, response, types, params);
  } else {
    urlStruct[404](request, response, types);
  }
};


http.createServer(onRequest).listen(port);
console.log(`Listening on port:${port}`);
