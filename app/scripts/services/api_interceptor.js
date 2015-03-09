'use strict';

angular
  .module('pjApp')
  .factory('ApiInterceptor', function(_, str, $q, ENV, AccessToken) {

    /* */
    var isApiUrl = function(url) {
      return url && url.indexOf(ENV.API) === 0;
    };

    /* */
    var walkKeys = function(obj, callback) {
      if (_.isArray(obj)) {
        return obj.map(function(item) {
          return walkKeys(item, callback);
        });
      }

      if (_.isObject(obj)) {
        return _.keys(obj).reduce(function(acc, key) {
          acc[callback.call(this, key)] = walkKeys(obj[key], callback);
          return acc;
        }, {});
      }

      return obj;
    };

    /* */
    var interceptRequest = function(config) {
      var token = AccessToken.get();

      if (token) {
        config.headers.Authorization = ['Bearer', token].join(' ');
      }

      return _.extend(config, {
        data: walkKeys(config.data, str.underscored),
        params: walkKeys(config.params, str.underscored)
      });
    };

    /* */
    var interceptResponse = function(resp) {
      return _.extend(resp, {data: walkKeys(resp.data, str.camelize)});
    };

    /* */
    return {
      request: function(config) {
        return isApiUrl(config.url) ? interceptRequest(config) : config;
      },
      response: function(resp) {
        return isApiUrl(resp.config.url) ? interceptResponse(resp) : resp;
      },
      responseError: function(err) {
        return $q.reject(isApiUrl(err.config.url) ? interceptResponse(err) : err);
      }
    };
  });
