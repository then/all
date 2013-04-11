var Promise = require('promise');
var isArray = Array.isArray || require('isArray');
var isPromise = require('is-promise');
module.exports = all;

function all() {
  var args;
  if (arguments.length === 1 && (isArray(arguments[0]) || isPromise(arguments[0])))
    args = arguments[0];
  else
    args = Array.prototype.slice.call(arguments);
  if (isPromise(args)) {
    return args.then(all);
  } else {
    return _all(args);
  }
}

function _all(arr) {
  return new Promise(function (resolve, reject) {
    var remaining = arr.length;
    if (remaining === 0) return resolve([]);
    var result = new Array(arr.length);
    function res(i, val) {
      if (isPromise(val)) {
          val.then(function (val) { res(i, val); }, reject);
      } else {
        result[i] = val;
        if (--remaining === 0) {
          resolve(result);
        }
      }
    }
    for (var i = 0; i < arr.length; i++) {
      res(i, arr[i]);
    }
  });
}
