/*jslint node: true */
/*jshint esnext: true */
'use strict';

const config = require('./config.json');
const Wreck = require('wreck');

var utils = {};

utils.mapUri = function(request, callback) {
    request.method = 'post';
    var token = encode64(config.username + ":" + config.password);
    var uri = config.uri + createKidQuery(config.kids);
    console.log('[proxy uri] ' + uri);
    console.log('[proxy token] ' + token);
    callback(null, config.uri, {
        'Authorization': 'Basic ' + token,
        'BabyConnect': token,
        'User-Agent': 'Baby Connect 4.8.2i (iPhone; iPhone OS 8.1.3; en_US)'
    });
};

utils.handleResponse = function(err, res, request, reply, settings, ttl) {
    request.method = 'get';
    Wreck.read(res, {
        json: true
    }, function(err, payload) {
        reply(payload);
    });
};

function createKidQuery(lookup) {
    return '&kids=' + lookup.reduce(function(total, kid) {
        total.push(kid.id);
        return total;
    }, []);
}

function encode64(str) {
    return new Buffer(str).toString('base64');
}

module.exports = utils;
