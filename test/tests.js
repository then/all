function load(browser, server) {
  var i = 0;
  while (i < arguments.length) {
    try {
      if (typeof arguments[i] === 'string')
        return require(arguments[i++]);
      else if (arguments[i])
        return arguments[i++];
      else
        i++;
    } catch (ex) {}
  }
  throw new Error('Couldn\'t load: ' + JSON.stringify(Array.prototype.slice.call(arguments)));
}

function worseAssert(v) {
  if (!v) {
    throw new Error('Assertion Failed');
  }
}
var assert = load('better-assert', worseAssert);

var all = load(window.all, 'all', '../');
var Promise = load('promise', 'then-promise');
Promise.prototype.nodeify = nodeify;
function nodeify(cb) {
  this.then(function (res) {
      setTimeout(function () { cb(null, res); }, 0);
    }, function (err) {
      setTimeout(function () { cb(err); }, 0);
    });
};
var isPromise = load('is-promise', 'then-is-promise');
var isArray = load(Array.isArray, 'yields-isArray');
var a = {};
var b = {};
var c = {};

function prom(val) {
  return new Promise(function (resolver) {
    resolver.fulfill(val);
  });
}
var A = prom(a);
var B = prom(b);
var C = prom(c);

var rejection = {};
var rejected = new Promise(function (resolver) { resolver.reject(rejection); });

describe('an array', function () {
  describe('that is empty', function () {
    it('returns a promise for an empty array', function (done) {
      var res = all([]);
      assert(isPromise(res));
      res.then(function (res) {
        assert(isArray(res));
        assert(res.length === 0);
      })
      .nodeify(done);
    });
  });
  describe('of objects', function () {
    it('returns a promise for the array', function (done) {
      var res = all([a, b, c]);
      assert(isPromise(res));
      res.then(function (res) {
        assert(isArray(res));
        assert(res[0] === a);
        assert(res[1] === b);
        assert(res[2] === c);
      })
      .nodeify(done);
    });
  });
  describe('of promises', function () {
    it('returns a promise for an array containing the fulfilled values', function (done) {
      var res = all([A, B, C]);
      assert(isPromise(res));
      res.then(function (res) {
        assert(isArray(res));
        assert(res[0] === a);
        assert(res[1] === b);
        assert(res[2] === c);
      })
      .nodeify(done);
    });
  });
  describe('of mixed values', function () {
    it('returns a promise for an array containing the fulfilled values', function (done) {
      var res = all([A, b, C]);
      assert(isPromise(res));
      res.then(function (res) {
        assert(isArray(res));
        assert(res[0] === a);
        assert(res[1] === b);
        assert(res[2] === c);
      })
      .nodeify(done);
    });
  });
  describe('containing at least one rejected promise', function () {
    it('rejects the resulting promise', function (done) {
      var res = all([A, rejected, C]);
      assert(isPromise(res));
      res.then(function (res) {
        throw new Error('Should be rejected');
      },
      function (err) {
        assert(err === rejection);
      })
      .nodeify(done);
    });
  });
});
describe('multiple arguments', function () {
  describe('which are objects', function () {
    it('returns a promise for the array', function (done) {
      var res = all(a, b, c);
      assert(isPromise(res));
      res.then(function (res) {
        assert(isArray(res));
        assert(res[0] === a);
        assert(res[1] === b);
        assert(res[2] === c);
      })
      .nodeify(done);
    });
  });
  describe('which are promises', function () {
    it('returns a promise for an array containing the fulfilled values', function (done) {
      var res = all(A, B, C);
      assert(isPromise(res));
      res.then(function (res) {
        assert(isArray(res));
        assert(res[0] === a);
        assert(res[1] === b);
        assert(res[2] === c);
      })
      .nodeify(done);
    });
  });
  describe('which are mixed values', function () {
    it('returns a promise for an array containing the fulfilled values', function (done) {
      var res = all(A, b, C);
      assert(isPromise(res));
      res.then(function (res) {
        assert(isArray(res));
        assert(res[0] === a);
        assert(res[1] === b);
        assert(res[2] === c);
      })
      .nodeify(done);
    });
  });
  describe('containing at least one rejected promise', function () {
    it('rejects the resulting promise', function (done) {
      var res = all(A, rejected, C);
      assert(isPromise(res));
      res.then(function (res) {
        throw new Error('Should be rejected');
      },
      function (err) {
        assert(err === rejection);
      })
      .nodeify(done);
    });
  });
});
describe('single argument', function () {
  describe('which is an object', function () {
    it('returns a promise for an array containing just that object', function (done) {
      var res = all(a);
      assert(isPromise(res));
      res.then(function (res) {
        assert(isArray(res));
        assert(res[0] === a);
      })
      .nodeify(done);
    });
  });
  describe('which is a promise for an array', function () {
    it('returns a promise for an array containing the fulfilled values of the original array', function (done) {
      var res = new Promise(function (resolver) {
        resolver.fulfill([A, b, C]);
      });
      res = all(res);
      assert(isPromise(res));
      res.then(function (res) {
        assert(isArray(res));
        assert(res[0] === a);
        assert(res[1] === b);
        assert(res[2] === c);
      })
      .nodeify(done);
    });
  });
  describe('which is a promise for an object', function () {
    it('returns a promise for an array containing that object', function (done) {
      var res = all(A);
      assert(isPromise(res));
      res.then(function (res) {
        assert(isArray(res));
        assert(res[0] === a);
      })
      .nodeify(done);
    });
  });
  describe('which is a rejected promise', function () {
    it('rejects the resulting promise', function (done) {
      var res = all(rejected);
      assert(isPromise(res));
      res.then(function (res) {
        throw new Error('Should be rejected');
      },
      function (err) {
        assert(err === rejection);
      })
      .nodeify(done);
    });
  });
});
