[![Build Status](https://travis-ci.org/then/all.png?branch=master)](https://travis-ci.org/then/all)
<a href="http://promises-aplus.github.com/promises-spec"><img src="http://promises-aplus.github.com/promises-spec/assets/logo-small.png" align="right" />
# all

  Wait for multiple promises to be resolved

## Installation

  Server:

    $ npm install then-all

  Client:

    $ component install then/all

## API

```javascript
var all = require('all');
all(get('foo'), get('bar'))
  .then(function (arr) {
    var foo = arr[0];
    var bar = arr[1];
  });
all([get('foo'), get('bar')])
  .then(function (arr) {
    var foo = arr[0];
    var bar = arr[1];
  });
```

## License

  MIT
