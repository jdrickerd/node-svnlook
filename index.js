/*jslint node: true */
'use strict';

var exec = require('child_process').exec;
var os = require('os');
var xml2js = require('xml2js');

var xmlToJson = function (dataXml, callback) {
	xml2js.parseString(dataXml,
		{
			explicitRoot: false,
			explicitArray: false
		},
		function (err, json) { callback(err, json); }
	);
};

var execute = function (cmd, options, callback) {
	options = options || {};
	if (options.shell === undefined && os.platform === 'win32') {
		options.shell = 'start "" /B ';  // windows only - this makes it so a cmd window won't pop up when running as a service or through pm2
	}
	options.cwd = options.cwd || process.cwd();
	var execOptions = {
		cwd: options.cwd,
		shell: options.shell,
		maxBuffer: options.maxBuffer || (5 * 1024 * 1024) // defaults to 5MB
	};
	if (options.params) {
		cmd += ' ' + options.params.join(' ');
	}
	exec(cmd, execOptions, function (err, stdo) {
		if (typeof callback === 'function') {
			callback(err, options.stdoutAsBuffer ? stdo : stdo.toString());
		}
	});
};

var executeSvnlook = function (params, options, callback) {
	options = options || {};
	var cmd = 'svnlook ' + params.join(' ');
	execute(cmd, options, callback);
};

var executeSvnlookXml = function (params, options, callback) {
	executeSvnlook(params.concat(['--xml']), options, function (err, data) {
		if (!err) {
			xmlToJson(data, function (err2, json) {
				callback(err2, json);
			});
		} else {
			callback(err, null);
		}
	});
};

var addExtraOptions = function (validOptionsArray, options, addRevProp) {
	if (options) {
		options.params = options.params || [];
		validOptionsArray.forEach(function (validOption) {
			switch (validOption) {
				case 'revision':
					if (options.revision) {
						options.params.push('--revision', options.revision.toString());
						if (addRevProp) {
							options.params.push('--revprop');
						}
					}
					break;
				case 'transaction':
					if (options.transaction) {
						options.params.push('--transaction', options.transaction.toString());
					}
					break;
				case 'limit':
					if (options.limit) {
						options.params.push('--limit', options.limit.toString());
					}
					break;
				case 'extensions':
					if (options.extensions) {
						if (options.extensions) {
							options.params.push('--extensions', options.extensions.toString());
						}
						else {
							options.params.push('--extensions', '--unified');
						}
					}
					break;
			}
		});
	}
	return options;
};

/** Print the author of a revision or transaction in the repository.
 * @function author
 * @param {string} repoPath - Path to repository
 * @param {object} [options] - Options object
 * @param {function} [callback] - Complete callback
 */
var author = function (repoPath, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}
	options = options || {};
	addExtraOptions(['revision', 'transaction'], options);
	executeSvnlook(['author', repoPath], options, callback);
};
exports.author = author;

/** Print the contents of a file.
 * @function cat
 * @param {string} repoPath - Path to repository
 * @param {string} target - Path in repo to target
 * @param {object} [options] - Options object
 * @param {function} [callback] - Complete callback
 */
var cat = function (repoPath, target, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}
	options = options || {};
	addExtraOptions(['revision', 'transaction'], options);
	executeSvnlook(['cat', repoPath, target], options, callback);
};
exports.cat = cat;

/** Print the paths that were changed in a particular revision or transaction.
 * @function changed
 * @param {string} repoPath - Path to repository
 * @param {object} [options] - Options object
 * @param {function} [callback] - Complete callback
 */
var changed = function (repoPath, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}
	options = options || {};
	addExtraOptions(['revision', 'transaction'], options);
	executeSvnlook(['changed', repoPath], options, callback);
};
exports.changed = changed;

/** Print the datestamp of a revision or transaction in a repository.
 * @function date
 * @param {string} repoPath - Path to repository
 * @param {object} [options] - Options object
 * @param {function} [callback] - Complete callback
 */
var date = function (repoPath, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}
	options = options || {};
	addExtraOptions(['revision', 'transaction'], options);
	executeSvnlook(['date', repoPath], options, callback);
};
exports.date = date;

/** Print GNU-style differences of changed files and properties in a repository.
 * @function diff
 * @param {string} repoPath - Path to repository
 * @param {object} [options] - Options object
 * @param {function} [callback] - Complete callback
 */
var diff = function (repoPath, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}
	options = options || {};
	addExtraOptions(['revision', 'transaction', 'extensions'], options);
	executeSvnlook(['diff', repoPath], options, callback);
};
exports.diff = diff;

/** Print the directories that were themselves changed (property edits) or whose file children were changed.
 * @function dirsChanged
 * @param {string} repoPath - Path to repository
 * @param {object} [options] - Options object
 * @param {function} [callback] - Complete callback
 */
var dirsChanged = function (repoPath, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}
	options = options || {};
	addExtraOptions(['revision', 'transaction'], options);
	executeSvnlook(['dirs-changed', repoPath], options, callback);
};
exports.dirsChanged = dirsChanged;

/** Print the size (in bytes) of a versioned file.
 * @function filesize
 * @param {string} repoPath - Path to repository
 * @param {string} target - Path in repo to target
 * @param {object} [options] - Options object
 * @param {function} [callback] - Complete callback
 */
var filesize = function (repoPath, target, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}
	options = options || {};
	addExtraOptions(['revision', 'transaction'], options);
	executeSvnlook(['filesize', repoPath, target], options, callback);
};
exports.filesize = filesize;

/** Print information about the history of a path in the repository (or the root directory if no path is supplied).
 * @function history
 * @param {string} repoPath - Path to repository
 * @param {string} target - Path in repo to target
 * @param {object} [options] - Options object
 * @param {function} [callback] - Complete callback
 */
var history = function (repoPath, target, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}
	options = options || {};
	addExtraOptions(['revision', 'limit'], options);
	executeSvnlook(['history', repoPath, target], options, callback);
};
exports.history = history;

/** Returns object with the author, date, log message size, and log message.
 * @function info
 * @param {string} repoPath - Path to repository
 * @param {object} [options] - Options object
 * @param {function} [callback] - Complete callback
 */
var info = function (repoPath, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}
	options = options || {};
	addExtraOptions(['revision', 'transaction'], options);
	executeSvnlook(['info', repoPath], options, function (err, data) {
		if (!err) {
			var json = {};
			var parsedData = data.split(os.EOL);
			json.author = parsedData[0];
			json.date = parsedData[1];
			json.size = parsedData[2];
			json.message = parsedData[3];
			callback(err, json);
		} else {
			callback(err, null);
		}
	});
};
exports.info = info;

/** If a lock exists on a path in the repository, describe it.
 * @function lock
 * @param {string} repoPath - Path to repository
 * @param {string} target - Path in repo to target
 * @param {object} [options] - Options object
 * @param {function} [callback] - Complete callback
 */
var lock = function (repoPath, target, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}
	options = options || {};
	executeSvnlook(['lock', repoPath, target], options, function (err, data) {
		if (!err) {
			var json = {};
			var parsedData = data.split(os.EOL);
			parsedData.forEach((val) => {
				if (val.split(':')[1]) {
					json[val.split(':')[0]] = json[val.split(':')[1]];
				}
			});
			callback(err, json);
		} else {
			callback(err, null);
		}
	});
};
exports.lock = lock;

/** Print the log message.
 * @function log
 * @param {string} repoPath - Path to repository
 * @param {object} [options] - Options object
 * @param {function} [callback] - Complete callback
 */
var log = function (repoPath, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}
	options = options || {};
	addExtraOptions(['revision', 'transaction'], options);
	executeSvnlook(['log', repoPath], options, callback);
};
exports.log = log;

/** List the value of a property on a path in the repository.
 * @function propget
 * @param {string} propName - Property name
 * @param {string} repoPath - Path to repository
 * @param {string} target - Path in repo to target
 * @param {object} [options] - Options object
 * @param {function} [callback] - Complete callback
 * @alias pget
 * @alias pg
 */
var propget = function (propName, repoPath, target, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}
	options = options || {};
	addExtraOptions(['revision', 'transaction'], options, true);
	executeSvnlook(['propget', repoPath, propName, target], options, callback);
};
exports.propget = propget;
exports.pget = propget;
exports.pg = propget;

/** List the properties of a path in the repository.
 * @function proplist
 * @param {string} repoPath - Path to repository
 * @param {string} target - Path in repo to target
 * @param {object} [options] - Options object
 * @param {function} [callback] - Complete callback
 * @alias plist
 * @alias pl
 */
var proplist = function (repoPath, target, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}
	options = options || {};
	addExtraOptions(['revision', 'transaction'], options, true);
	executeSvnlookXml(['proplist', repoPath, target], options, callback);
};
exports.proplist = proplist;
exports.plist = proplist;
exports.pl = proplist;

/** Print the tree.
 * @function tree
 * @param {string} repoPath - Path to repository
 * @param {string} target - Path in repo to target
 * @param {object} [options] - Options object
 * @param {function} [callback] - Complete callback
 * @alias plist
 * @alias pl
 */
var tree = function (repoPath, target, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}
	options = options || {};
	addExtraOptions(['revision', 'transaction'], options);
	executeSvnlook(['tree', repoPath, target], options, callback);
};
exports.tree = tree;

/** Print the repository's UUID.
 * @function uuid
 * @param {string} repoPath - Path to repository
 * @param {object} [options] - Options object
 * @param {function} [callback] - Complete callback
 */
var uuid = function (repoPath, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}
	options = options || {};
	executeSvnlook(['uuid', repoPath], options, callback);
};
exports.uuid = uuid;

/** Print the youngest revision number.
 * @function youngest
 * @param {string} repoPath - Path to repository
 * @param {object} [options] - Options object
 * @param {function} [callback] - Complete callback
 */
var youngest = function (repoPath, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}
	options = options || {};
	executeSvnlook(['youngest', repoPath], options, callback);
};
exports.youngest = youngest;
