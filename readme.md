[![Build Status](https://img.shields.io/travis/then/all/master.svg)](https://travis-ci.org/then/all)
<a href="https://jepso-ci.com/then/all"><img src="https://jepso-ci.com/then/all.svg" align="right" alt="jepso-ci status" /></a>
# ![then](http://promises-aplus.github.com/promises-spec/assets/logo-small.png)/all

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

![viewcount](https://viewcount.jepso.com/count/then/all.png)
