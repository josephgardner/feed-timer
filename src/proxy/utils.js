/*jslint node: true */
/*jshint esnext: true */
'use strict';

const config = require('./config.json');
const Wreck = require('wreck');
const Storage = require('node-persist');

init();
var utils = {};

utils.mapUri = function(request, callback) {
    request.method = 'post';
    var token = encode64(config.username + ":" + config.password);
    var uri = config.uri + createKidQuery(config.kids);
    console.log('[proxy uri] ' + uri);
    callback(null, uri, {
        'Authorization': 'Basic ' + token,
        'BabyConnect': token,
        'User-Agent': 'Baby Connect 4.8.2i (iPhone; iPhone OS 8.1.3; en_US)'
    });
};

utils.handleResponse = function(err, res, request, reply, settings, ttl) {
    request.method = 'get';
    var map = getKidMap();
    Wreck.read(res, {
        json: 'force'
    }, function(err, payload) {
        payload.list.forEach(function(item) {
            map[item.Kid].last = item.ms.toString();
            map[item.Kid].item = item;
        });
        setKidMap(map);
        reply(payload);
    });
};

function init() {
    Storage.initSync();
}

function getKidMap() {
    return Storage.getItem('kid-map.json');
}

function setKidMap(map) {
    Storage.setItem('kid-map.json', map);
}

function createKidQuery(kids) {
    var map = getKidMap();
    return '&kids=' + kids.reduce(function(total, kid) {
        total.push(kid.id + ',' + map[kid.id].last);
        return total;
    }, []);
}

function encode64(str) {
    return new Buffer(str).toString('base64');
}

module.exports = utils;
