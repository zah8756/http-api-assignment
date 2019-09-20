
const respondAny = (request, response, status, fileType, object) => {
  response.writeHead(status, { 'Content-Type': fileType });
  response.write(object);
  response.end();
};

const success = (request, response, fileType) => {
  const responseSource = {
    message: 'successful response',
  };

  if (fileType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseSource.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respondAny(request, response, 200, fileType, responseXML);
  }
  const responseJSON = JSON.stringify(responseSource);
  return respondAny(request, response, 200, fileType, responseJSON);
};

const badRequest = (request, response, fileType, parameters) => {
  if (parameters.valid !== true || !parameters.valid) {
    const responseSource = {
      id: 'badRequest',
      message: 'missing requirements',
    };

    if (fileType[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <id>${responseSource.id}</id>`;
      responseXML = `${responseXML} <message>${responseSource.message}</message>`;
      responseXML = `${responseXML} </response>`;
      return respondAny(request, response, 400, fileType, responseXML);
    }

    const responseJSON = JSON.stringify(responseSource);
    return respondAny(request, response, 400, fileType, responseJSON);
  }

  const responseSource = {
    message: 'valid requirements',
  };

  if (fileType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseSource.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respondAny(request, response, 200, fileType, responseXML);
  }

  const responseJSON = JSON.stringify(responseSource);
  return respondAny(request, response, 200, fileType, responseJSON);
};

const unauthorized = (request, response, fileType, parameters) => {
  if (!parameters.loggedIn || parameters.loggedIn !== true) {
    const responseSource = {
      id: 'unauthorized',
      message: 'Missing loggedIn query parameter set to yes',
    };
    if (fileType[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <id>${responseSource.id}</id>`;
      responseXML = `${responseXML} <message>${responseSource.message}</message>`;
      responseXML = `${responseXML} </response>`;
      return respondAny(request, response, 401, fileType, responseXML);
    }
    const responseJSON = JSON.stringify(responseSource);
    return respondAny(request, response, 401, fileType, responseJSON);
  }

  const responseSource = {
    message: 'you have access to this page',
  };

  if (fileType[0] === 'text/xml') {
    const responseXML = `<response> <message>${responseSource.message}</message> </response>`;
    return respondAny(request, response, 200, fileType, responseXML);
  }
  const responseJSON = JSON.stringify(responseSource);
  return respondAny(request, response, 200, fileType, responseJSON);
};

const forbidden = (request, response, fileType) => {
  const responseSource = {
    id: 'forbidden',
    message: 'you do not have access to this content',
  };

  if (fileType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${responseSource.id}</id>`;
    responseXML = `${responseXML} <message>${responseSource.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respondAny(request, response, 403, fileType, responseXML);
  }
  const responseJSON = JSON.stringify(responseSource);
  return respondAny(request, response, 403, fileType, responseJSON);
};

const internalError = (request, response, fileType) => {
  const responseSource = {
    id: 'internalError',
    message: 'internal server error. something went wrong',
  };

  if (fileType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${responseSource.id}</id>`;
    responseXML = `${responseXML} <message>${responseSource.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respondAny(request, response, 500, fileType, responseXML);
  }
  const responseJSON = JSON.stringify(responseSource);
  return respondAny(request, response, 500, fileType, responseJSON);
};

const notImplemented = (request, response, fileType) => {
  const responseSource = {
    id: 'notImplemented',
    message: 'A get request for this page has not been implemented yet.',
  };

  if (fileType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${responseSource.id}</id>`;
    responseXML = `${responseXML} <message>${responseSource.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respondAny(request, response, 501, fileType, responseXML);
  }
  const responseJSON = JSON.stringify(responseSource);
  return respondAny(request, response, 501, fileType, responseJSON);
};

const notFound = (request, response, fileType) => {
  const responseSource = {
    id: 'notFound',
    message: 'The page you are looking for was not found',
  };

  if (fileType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${responseSource.id}</id>`;
    responseXML = `${responseXML} <message>${responseSource.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respondAny(request, response, 404, fileType, responseXML);
  }
  const responseJSON = JSON.stringify(responseSource);
  return respondAny(request, response, 404, fileType, responseJSON);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internalError,
  notImplemented,
  notFound,
};
