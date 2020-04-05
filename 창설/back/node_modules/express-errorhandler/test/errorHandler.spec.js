var errorHandler = require('../lib/errorHandler');
var express = require('express');
var silentLogger = {
    error: function () {}
};
var expect = require('unexpected')
    .clone()
    .installPlugin(require('unexpected-express'))
    .addAssertion('to yield response', function (expect, subject, value) {
        var handler = subject.handler || function (req, res, next) {
            next(subject.error || new Error('DefaultMockError'));
        };
        var errorHandlerInstance = subject.errorHandler || errorHandler({
            logger: silentLogger
        });
        var app = express()
            .use(handler)
            .use(errorHandlerInstance);

        return expect(app, 'to yield exchange', {
            request: subject.request || 'GET /',
            response: value
        });
    });


describe('errorHandler', function () {
    it('should not handle non errors', function () {
        return expect({
            handler: function (req, res) {
                return res.send('foobar');
            }
        }, 'to yield response', 'foobar');
    });

    it('should include the message when it differs from the error name', function () {
        return expect({
            handler: function (req, res, next) {
                var err = new Error('hey there');
                err.name = 'TheErrorName';
                return next(err);
            }
        }, 'to yield response', {
            body: {
                error: 'TheErrorName',
                message: 'hey there'
            }
        });
    });

    it('should not include the message when it is identical to the error name', function () {
        return expect({
            handler: function (req, res, next) {
                var err = new Error('TheErrorName');
                err.name = 'TheErrorName';
                return next(err);
            }
        }, 'to yield response', {
            body: {
                error: 'TheErrorName',
                message: undefined
            }
        });
    });

    describe('without any config options', function () {
        it('should not include the stack trace in the JSON response', function () {
            return expect({
                error: new Error('Error')
            }, 'to yield response', {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: {
                    error: 'Error'
                }
            });
        });
    });

    describe('abort a response stream', function () {
        it('should interrupt a stream that errors after the first output has been sent', function () {
            // We inject a new set of headers in the middle of the
            // response, to make sure to mess up the chunked encoding
            // of the original response.
            return expect({
                handler: function (req, res, next) {
                    res.contentType('text/html');
                    res.write('<div>foobar <span>qux');
                    next(new Error('foobar'));
                }
            }, 'to yield response', {
                locals: {
                    errorInfo: /"headersAlreadySent":true/
                },
                headers: {
                    'Transfer-Encoding': 'chunked'
                },
                rawBody: expect.it('when decoded as', 'ascii', 'to match', new RegExp(
                    "HTTP\/1.1 500 Let's ruin that response!\r\n" +
                    "Content-Type: text\/plain\r\n" +
                    "Transfer-Encoding: chunked\r\n" +
                    "\r\n" +
                    "0\r\n" +
                    "\r\n$"
                ))
            });
        });
        it('should interrupt a stream that errors after headers but before the first output has been sent', function () {
            // This will result in the HTTP/1.1 200 OK response
            // originally qued by express being written after our
            // HTTP/1.1 500 ...
            return expect({
                handler: function (req, res, next) {
                    res.writeHead(200, {
                        'Content-Type': 'text/html',
                        'Transfer-Encoding': 'chunked'
                    });
                    next(new Error('foobar'));
                }
            }, 'to yield response', {
                locals: {
                    errorInfo: /"headersAlreadySent":true/
                },
                rawBody: expect.it('when decoded as', 'ascii', 'to match', /HTTP\/1.1 200 OK\r\n/)
            });
        });
    });

    describe('with includeStackTrace:true', function () {
        var errorHandlerInstance;
        beforeEach(function () {
            errorHandlerInstance = errorHandler({
                logger: silentLogger,
                includeStackTrace: true
            });
        });

        it('should include the stack trace in the JSON response', function () {
            var err = new Error('theErrorMessage');
            return expect({
                error: err,
                errorHandler: errorHandlerInstance
            }, 'to yield response', {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: {
                    error: 'Error',
                    stack: err.stack.split(/\r\n?|\n\r?/).map(function (str) {
                        return str.trim();
                    })
                }
            });
        });

        it('should map a regular Error instance to a 500 Internal Server Error, but keep the stack trace', function () {
            var err = new Error('theErrorMessage');
            return expect({
                error: err,
                errorHandler: errorHandlerInstance
            }, 'to yield response', {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                statusCode: 500,
                body: {
                    error: 'Error',
                    stack: err.stack.split(/\r\n?|\n\r?/).map(function (str) {
                        return str.trim();
                    })
                }
            });
        });

        it('should map a fs Error to a 500 Internal Server Error, but keep the stack trace', function () {
            var err = null;
            try {
                err = require('fs').statSync('i/do/not/exist');
            } catch (e) {
                err = e;
            }

            expect(err, 'to be an', Error);

            return expect({
                error: err,
                errorHandler: errorHandlerInstance
            }, 'to yield response', {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                statusCode: 500,
                body: {
                    error: 'InternalServerError',
                    errorData: {
                        code: 'ENOENT',
                        path: 'i/do/not/exist',
                        syscall: 'stat'
                    },
                    stack: {
                        0: /Error: ENOENT[,:] no such file or directory/
                    }
                }
            });
        });

        it('should map a string to a 500 Internal Server Error', function () {
            var app = express()
                .use(function (req, res, next) {
                    next('oh no');
                })
                .use(errorHandlerInstance);

            return expect({
                error: 'oh no',
                errorHandler: errorHandlerInstance
            }, 'to yield response', {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                statusCode: 500,
                body: {
                    error: 'InternalServerError',
                    stack: {
                        0: 'InternalServerError: oh no'
                    }
                }
            });
        });

        it('should map an object to a 500 Internal Server Error', function () {
            return expect({
                error: { foo: 'bar' },
                errorHandler: errorHandlerInstance
            }, 'to yield response', {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                statusCode: 500,
                body: {
                    error: 'InternalServerError',
                    stack: {
                        0: "InternalServerError: { foo: 'bar' }"
                    }
                }
            });
        });
    });
});
