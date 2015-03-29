var url = require('url');

const NASNE_JSON_API_URL = {
  protocol: 'http:'
};

const NASNE_JSON_PORT = {
  'status': 64210,
  'schedule': 64220
}

var getJsonUrlObject = function(args) {
  var args = args || {};
  var result = {};
  var jsonType;
  for (var key in NASNE_JSON_API_URL) {
    result[key] = NASNE_JSON_API_URL[key];
  }
  for (var key in args) {
    result[key] = args[key];
  }

  if (!result.port && result.pathname) {
    jsonType = result.pathname.split('/')[1];
    if (NASNE_JSON_PORT[jsonType]) {
      result.port = NASNE_JSON_PORT[jsonType];
    }
  }
  return result;
};

module.exports = function(args) {
  return url.format(getJsonUrlObject(args));
};