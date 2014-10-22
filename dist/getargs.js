(function () {
    if (typeof define === 'function' && define.amd) {
        define([], getargsFactory);
    } else if (typeof exports === 'object') {
        module.exports = getargsFactory();
    } else
        throw Error('Cannot find a module loader');
    function getargsFactory() {
        'use strict';
        var UNDEFINED, STR_SUBSTRING = String.prototype.substring, STR_SLICE = String.prototype.slice, RE_STRING = /^(["']).*\1$/, RE_BOOLEAN = /^(?:false|true)$/i, RE_BOOLEAN_TRUE = /^true$/i, RE_DIGIT = /^\d+$/;
        return function getargs(str) {
            str = str || this;
            if (!(typeof str == 'string' || str instanceof String))
                throw Error('First argument must be a string');
            var values = [];
            var from;
            var to;
            var index;
            var length;
            var quote = false;
            var key;
            var c;
            function extract(from, to) {
                if (from === to)
                    return;
                var value = STR_SUBSTRING.call(str, from, to);
                if (RE_STRING.test(value)) {
                    value = STR_SLICE.call(value, 1, -1);
                } else if (RE_BOOLEAN.test(value)) {
                    value = RE_BOOLEAN_TRUE.test(value);
                } else if (RE_DIGIT.test(value)) {
                    value = +value;
                }
                values.push(value);
                if (key !== UNDEFINED) {
                    values[key] = value;
                    key = UNDEFINED;
                }
            }
            for (index = from = to = 0, length = str.length; index < length; index++) {
                c = str.charAt(index);
                switch (c) {
                case '"':
                case '\'':
                    if (quote === c) {
                        quote = false;
                        to = index + 1;
                    } else if (quote === false) {
                        quote = c;
                        from = to = index;
                    }
                    break;
                case ' ':
                case '\t':
                    if (quote) {
                        to = index + 1;
                        break;
                    }
                    if (from === to) {
                        from = to = index + 1;
                    }
                    break;
                case '=':
                    if (quote) {
                        to = index + 1;
                        break;
                    }
                    if (from !== to) {
                        key = STR_SUBSTRING.call(str, from, to);
                        if (RE_STRING.test(key)) {
                            key = STR_SLICE.call(key, 1, -1);
                        }
                    }
                    from = index + 1;
                    break;
                case ',':
                    if (quote) {
                        to = index + 1;
                        break;
                    }
                    extract(from, to);
                    from = to = index + 1;
                    break;
                default:
                    to = index + 1;
                }
            }
            extract(from, to);
            return values;
        };
    }
}());