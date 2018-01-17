'use strict';

import request from 'request';
import async from 'async';

var _queue = async.queue(
	this.executeRequest.bind(this),
	this.options.concurrentRequests
);

var $ = module.exports = {

	queue: function(callback) {
		async.whilst(function() {
			return _queue.paused;
		}, function(callback) {
			setTimeout(function() { callback(null); }, 500);
		}, function() {
			callback();
		});
	},

	get: function(config, callback) {
		this.queue(() => {
			request.get(config, callback);
		});
	},

	post: function (config, callback) {
		this.queue(() => {
				request.post(config, callback);
		});
	}
};

$._queue.pause();
