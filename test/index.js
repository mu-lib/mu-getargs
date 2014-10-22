"use strict";

var assert = require('should'),
    getargs = require('../');

describe("mu-getargs args validation", function () {

    describe("run without an argument", function () {
        it("should throw an error", function () {
            getargs.bind(null).should.throwError();
        });
    });

    describe("run with a non-string (number)", function () {
        it("should throw an error", function () {
            getargs.bind(null, 123).should.throwError();
        });
    });

    describe("run with a non-string (null)", function () {
        it("should throw an error", function () {
            getargs.bind(null, null).should.throwError();
        });
    });

    describe("run with a non-string (undefined)", function () {
        it("should throw an error", function () {
            getargs.bind(null, undefined).should.throwError();
        });
    });

    describe("called with nothing", function () {
        it("should throw an error", function () {
            getargs.bind().should.throwError();
        });
    });

    describe("called with a non-string (number)", function () {
        it("should throw an error", function () {
            getargs.bind(123).should.throwError();
        });
    });

});

describe("mu-getargs()", function () {

    describe("1,true,3", function () {
        it("should parse args correctly", function () {
            assert.deepEqual(getargs("1,true,3"), [ 1, true, 3 ]);
        });
    });

    describe(" 1  , '2' , 3  ,false,5 ", function () {
        it("should parse args correctly", function () {
            assert.deepEqual(getargs(" 1  , '2' , 3  ,false,5 "), [ 1, "2", 3, false, 5]);
        });
    });

    describe("'1',two,\"3\"", function () {
        it("should parse args correctly", function () {
            assert.deepEqual(getargs("'1',two,\"3\""), [ "1", "two", "3" ]);
        });
    });

    describe("'1', 2, \"3\"", function () {
        it("should parse args correctly", function () {
            assert.deepEqual(getargs("'1', 2, \"3\""), [ "1", 2, "3" ]);
        });
    });

    describe("'1,true',3,\"4\"", function () {
        it("should parse args correctly", function () {
            assert.deepEqual(getargs("'1,true',3,\"4\""), [ "1,true", 3, "4" ]);
        });
    });

    describe(" '1, 2 ',  3,\"4\", 5 ", function () {
        it("should parse args correctly", function () {
            assert.deepEqual(getargs(" '1, 2 ',  3,\"4\", 5 "), [ "1, 2 ", 3, "4", 5 ]);
        });
    });

    describe("1,key=2,3", function () {
        it("should parse args correctly", function () {
            var expected = [1, 2, 3];
            expected["key"] = expected[1];

            var actual = getargs("1,key=2,3");

            assert.deepEqual(actual, expected);
        });
    });

    describe("1,'quoted=key,value'='test',key=false", function () {
        it("should parse args correctly", function () {
            var expected = [1, "test", false];
            expected["quoted=key,value"] = expected[1];
            expected["key"] = expected[2];

            var actual = getargs("1,'quoted=key,value'='test',key=false");

            assert.deepEqual(actual, expected);
        });
    });

    describe("/:foo?/(:bar/:baz)?, foo.bar.baz", function () {
        it("should parse args correctly", function () {
            var expected = [ "/:foo?/(:bar/:baz)?", "foo.bar.baz" ],
                actual = getargs("/:foo?/(:bar/:baz)?, foo.bar.baz");

            assert.deepEqual(actual, expected);
        });
    });

    describe("[data-type][type='button'], #foo .bar:nth-child(1)", function () {
        it("should parse args correctly", function () {
            var expected = [ "[data-type][type='button']", "#foo .bar:nth-child(1)" ],
                actual = getargs("\"[data-type][type='button']\", #foo .bar:nth-child(1)");

            assert.deepEqual(actual, expected);
        });
    });

});

describe("mu-getargs.call()", function () {

    describe("1,true,3", function () {
        it("should parse args correctly", function () {
            assert.deepEqual(getargs.call("1,true,3"), [ 1, true, 3 ]);
        });
    });

    describe(" 1  , '2' , 3  ,false,5 ", function () {
        it("should parse args correctly", function () {
            assert.deepEqual(getargs.call(" 1  , '2' , 3  ,false,5 "), [ 1, "2", 3, false, 5]);
        });
    });

    describe("'1',two,\"3\"", function () {
        it("should parse args correctly", function () {
            assert.deepEqual(getargs.call("'1',two,\"3\""), [ "1", "two", "3" ]);
        });
    });

    describe("'1', 2, \"3\"", function () {
        it("should parse args correctly", function () {
            assert.deepEqual(getargs.call("'1', 2, \"3\""), [ "1", 2, "3" ]);
        });
    });

    describe("'1,true',3,\"4\"", function () {
        it("should parse args correctly", function () {
            assert.deepEqual(getargs.call("'1,true',3,\"4\""), [ "1,true", 3, "4" ]);
        });
    });

    describe(" '1, 2 ',  3,\"4\", 5 ", function () {
        it("should parse args correctly", function () {
            assert.deepEqual(getargs.call(" '1, 2 ',  3,\"4\", 5 "), [ "1, 2 ", 3, "4", 5 ]);
        });
    });

    describe("1,key=2,3", function () {
        it("should parse args correctly", function () {
            var expected = [1, 2, 3];
            expected["key"] = expected[1];

            var actual = getargs.call("1,key=2,3");

            assert.deepEqual(actual, expected);
        });
    });

    describe("1,'quoted=key,value'='test',key=false", function () {
        it("should parse args correctly", function () {
            var expected = [1, "test", false];
            expected["quoted=key,value"] = expected[1];
            expected["key"] = expected[2];

            var actual = getargs.call("1,'quoted=key,value'='test',key=false");

            assert.deepEqual(actual, expected);
        });
    });

    describe("/:foo?/(:bar/:baz)?, foo.bar.baz", function () {
        it("should parse args correctly", function () {
            var expected = [ "/:foo?/(:bar/:baz)?", "foo.bar.baz" ],
                actual = getargs.call("/:foo?/(:bar/:baz)?, foo.bar.baz");

            assert.deepEqual(actual, expected);
        });
    });

    describe("[data-type][type='button'], #foo .bar:nth-child(1)", function () {
        it("should parse args correctly", function () {
            var expected = [ "[data-type][type='button']", "#foo .bar:nth-child(1)" ],
                actual = getargs.call("\"[data-type][type='button']\", #foo .bar:nth-child(1)");

            assert.deepEqual(actual, expected);
        });
    });

});
