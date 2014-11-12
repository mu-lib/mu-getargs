[![Version](http://img.shields.io/npm/v/mu-getargs.svg)](https://www.npmjs.org/package/mu-getargs)
[![Version](http://img.shields.io/bower/v/mu-getargs.svg)](https://github.com/mu-lib/mu-getargs)
[![Build Status](https://api.travis-ci.org/mu-lib/mu-getargs.svg?branch=master)](https://travis-ci.org/mu-lib/mu-getargs)
[![Coverage Status](https://img.shields.io/coveralls/mu-lib/mu-getargs/master.svg)](https://coveralls.io/r/mu-lib/mu-getargs)

# mu-getargs

Parse a string as function arguments. Can also parse named arguments.

`getargs(str)`

0. `str {String}` - The string to parse.

**Note:** If the `this` value of the function is defined, it will be used as the string (see examples). Thus it is
possible to use this function to extend the String prototype: `String.prototype.parseArgs = getargs`.

## Installation

- Node:
    0. `npm install mu-getargs`
    0. `var getargs = require('mu-getargs');`
- AMD (install with bower):
    0. `bower install mu-getargs`
    0. `require(['mu-getargs/dist/getargs'], function(getargs){ /* ... */ });`
   
Run tests with `npm test`.

Run coverage analysis with `npm run coverage` (coverage report is saved to `./coverage`).

## Examples

```Javascript
var str = "'hello',1,2,3,'world'",
    args = getargs(str);
console.log(args); // ["hello", 1, 2, 3, "world"]
```

**By setting the `this` value:**

```Javascript
var str = "'hello',1,2,3,'world'",
    args = getargs.call(str);
console.log(args); // ["hello", 1, 2, 3, "world"]
```

**With named arguments:**

```Javascript
var str = "foo='bar',1,2,3",
    args = getargs.call(str);
console.log(args); // ["bar", 1, 2, 3]
console.log(args.foo); // "bar"
```
