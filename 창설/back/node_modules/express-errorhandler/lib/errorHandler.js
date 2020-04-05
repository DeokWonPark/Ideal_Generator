var util = require('util');
var httpErrors = require('httperrors');

function extend(target, source) {
    Object.keys(source).forEach(function (prop) {
        target[prop] = source[prop];
    });

    return target;
}

function abortStreamingResponse(res) {
    /* If you encounter an error after initializing a streaming response,
     * it is not straight forward to abort it and cause the response to
     * be interpreted as an error in the browser.
     *
     * This was the only reliable way we found to interrupt the streaming
     * response in all cases.
     *
     * There's two cases that you have to consider when doing this:
     *
     * 1: You encounter an error before the headers are sent.
     * 2: You encounter an error after the headers are sent.
     *
     * Express will claim that the headers are sent (res.headersSent), even
     * before they are actually written to the socket. By writing something
     * that looks like a valid response header in addition to what Express
     * has already written, or has qued to be written, you will cause the
     * response to inevitable cause an invalid chunked encoding error.
     */
    res.connection.write(
        'HTTP/1.1 500 Let\'s ruin that response!\r\n' +
        'Content-Type: text/plain\r\n' +
        'Transfer-Encoding: chunked\r\n\r\n'
    );
    /* Call res.end in case someone hooked in on that, to
     * fx. disconnect an imap client.
     */
    res.end();
}

module.exports = function (config) {
    config = config || {};
    var logger = config.logger;
    var customReporter;

    // default logger to stderr.
    if (!logger) {
        logger = { error: console.log.bind(console) };
    }

    return function errorHandler(err, req, res, next) {
        if (typeof err !== 'object') {
            err = new httpErrors.InternalServerError(String(err));
        }
        if ('code' in err && !err.statusCode) {
            var originalStack = err.stack;
            err = new httpErrors.InternalServerError({data: err});
            err.stack = originalStack;
        } else if (!(err instanceof Error) && !err.stack) {
            err = new httpErrors.InternalServerError(util.inspect(err, false, Infinity));
        }
        var responseObj = {
            error: err.name || err.message
        };
        if (err.message && err.message !== err.name) {
            responseObj.message = err.message;
        }
        if (err.data) {
            responseObj.errorData = err.data;
        }
        var statusCode = err.statusCode || 500;
        if (statusCode === 400 || statusCode >= 500) {
            var body;
            // Avoid logging the password if this is a failed login:
            if (typeof req.body === 'object' && req.body) {
                body = extend({}, req.body);
                if ('password' in body) {
                    body.password = '<omitted>';
                }
            }
            logger.error(req.connection.remoteAddress, req.method, req.originalUrl, statusCode, err.stack, err.data, util.inspect(body), util.inspect(req.headers));
        }
        responseObj.stack = err.stack.split(/\n\s*/);

        if (res.headersSent) {
            responseObj.headersAlreadySent = true;
        }

        res.locals.errorInfo = JSON.stringify(responseObj);

        if (responseObj.headersAlreadySent) {
            responseObj.headersAlreadySent = undefined;
        }

        if (customReporter) {
            customReporter(err, req, res);
        }

        if (!config.includeStackTrace) {
            responseObj.stack = undefined;
        }

        var reportError = req.query.reportError;
        if (reportError === 'jsonInHtml' || (req.is('multipart/form-data') && req.headers['x-requested-with'] !== 'XMLHttpRequest')) {
            // From the Ext.Ajax.request (isUpload) docs: If the server is using JSON to send the return
            // object, then the Content-Type header must be set to "text/html" in order to tell the browser
            // to insert the text unchanged into the document body.
            res.writeHead(200, {'content-type': 'text/html; charset=UTF-8'});
            responseObj.statusCode = statusCode;
            res.end('<!DOCTYPE html>\n<html><head></head><body><div id="response">' +
                    JSON.stringify(responseObj).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') +
                    '</div></body></html>');
        } else {
            // If res.headersSent is true, Express has either written
            // the response headers to the socket, or qued them to be
            // written. Which means that we will get an exception if
            // we try to set the status code of the response etc. When
            // we need to handle an error after that moment we need to
            // corrupt the response already given to the client.
            //
            // For example when we cannot decode the latter part of a
            // mail that we already begun streaming.
            if (res.headersSent) {
                return abortStreamingResponse(res);
            }
            return res.status(statusCode).send(responseObj);
        }
    };
};
