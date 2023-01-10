# node-svnlook


[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/node-svnlook)
[![Build Status](https://app.travis-ci.com/jdrickerd/node-svnlook.svg?branch=master)](https://app.travis-ci.com/jdrickerd/node-svnlook)
[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/node-svnlook)

A NodeJs wrapper for the svnlook utility. Contains all the methods exposed by the command line svnlook tool.

```
npm install node-svnlook --save
```

Example usage

```
var svnlook = require('node-svnlook');

svnlook.changed('/my/svn/repo', 
	{	// optional options object - can be passed to any command not just changed
		shell: "sh", 			// override shell used to execute command
		cwd: process.cwd(),		// override working directory command is executed
		revision: 33050,		// provide --revision to commands that accept it
		transaction: ax9,		// provide --transaction to commands that accept it
		params: [ '--copy-info' ] // extra parameters to pass
	},
    function(err, output) {
        console.log(output);
    });
```

## Functions

<dl>
<dt><a href="#author">author(repoPath, [options], [callback])</a></dt>
<dd><p>Print the author of a revision or transaction in the repository.</p>
</dd>
<dt><a href="#cat">cat(repoPath, target, [options], [callback])</a></dt>
<dd><p>Print the contents of a file.</p>
</dd>
<dt><a href="#changed">changed(repoPath, [options], [callback])</a></dt>
<dd><p>Print the paths that were changed in a particular revision or transaction.</p>
</dd>
<dt><a href="#date">date(repoPath, [options], [callback])</a></dt>
<dd><p>Print the datestamp of a revision or transaction in a repository.</p>
</dd>
<dt><a href="#diff">diff(repoPath, [options], [callback])</a></dt>
<dd><p>Print GNU-style differences of changed files and properties in a repository.</p>
</dd>
<dt><a href="#dirsChanged">dirsChanged(repoPath, [options], [callback])</a></dt>
<dd><p>Print the directories that were themselves changed (property edits) or whose file children were changed.</p>
</dd>
<dt><a href="#filesize">filesize(repoPath, target, [options], [callback])</a></dt>
<dd><p>Print the size (in bytes) of a versioned file.</p>
</dd>
<dt><a href="#history">history(repoPath, target, [options], [callback])</a></dt>
<dd><p>Print information about the history of a path in the repository (or the root directory if no path is supplied).</p>
</dd>
<dt><a href="#info">info(repoPath, [options], [callback])</a></dt>
<dd><p>Returns object with the author, date, log message size, and log message.</p>
</dd>
<dt><a href="#lock">lock(repoPath, target, [options], [callback])</a></dt>
<dd><p>If a lock exists on a path in the repository, describe it.</p>
</dd>
<dt><a href="#log">log(repoPath, [options], [callback])</a></dt>
<dd><p>Print the log message.</p>
</dd>
<dt><a href="#propget">propget(propName, repoPath, target, [options], [callback])</a></dt>
<dd><p>List the value of a property on a path in the repository.</p>
</dd>
<dt><a href="#proplist">proplist(repoPath, target, [options], [callback])</a></dt>
<dd><p>List the properties of a path in the repository.</p>
</dd>
<dt><a href="#tree">tree(repoPath, target, [options], [callback])</a></dt>
<dd><p>Print the tree.</p>
</dd>
<dt><a href="#uuid">uuid(repoPath, [options], [callback])</a></dt>
<dd><p>Print the repository&#39;s UUID.</p>
</dd>
<dt><a href="#youngest">youngest(repoPath, [options], [callback])</a></dt>
<dd><p>Print the youngest revision number.</p>
</dd>
</dl>

<a name="author"></a>

## author(repoPath, [options], [callback])
Print the author of a revision or transaction in the repository.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| repoPath | <code>string</code> | Path to repository |
| [options] | <code>object</code> | Options object |
| [callback] | <code>function</code> | Complete callback |

<a name="cat"></a>

## cat(repoPath, target, [options], [callback])
Print the contents of a file.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| repoPath | <code>string</code> | Path to repository |
| target | <code>string</code> | Path in repo to target |
| [options] | <code>object</code> | Options object |
| [callback] | <code>function</code> | Complete callback |

<a name="changed"></a>

## changed(repoPath, [options], [callback])
Print the paths that were changed in a particular revision or transaction.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| repoPath | <code>string</code> | Path to repository |
| [options] | <code>object</code> | Options object |
| [callback] | <code>function</code> | Complete callback |

<a name="date"></a>

## date(repoPath, [options], [callback])
Print the datestamp of a revision or transaction in a repository.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| repoPath | <code>string</code> | Path to repository |
| [options] | <code>object</code> | Options object |
| [callback] | <code>function</code> | Complete callback |

<a name="diff"></a>

## diff(repoPath, [options], [callback])
Print GNU-style differences of changed files and properties in a repository.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| repoPath | <code>string</code> | Path to repository |
| [options] | <code>object</code> | Options object |
| [callback] | <code>function</code> | Complete callback |

<a name="dirsChanged"></a>

## dirsChanged(repoPath, [options], [callback])
Print the directories that were themselves changed (property edits) or whose file children were changed.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| repoPath | <code>string</code> | Path to repository |
| [options] | <code>object</code> | Options object |
| [callback] | <code>function</code> | Complete callback |

<a name="filesize"></a>

## filesize(repoPath, target, [options], [callback])
Print the size (in bytes) of a versioned file.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| repoPath | <code>string</code> | Path to repository |
| target | <code>string</code> | Path in repo to target |
| [options] | <code>object</code> | Options object |
| [callback] | <code>function</code> | Complete callback |

<a name="history"></a>

## history(repoPath, target, [options], [callback])
Print information about the history of a path in the repository (or the root directory if no path is supplied).

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| repoPath | <code>string</code> | Path to repository |
| target | <code>string</code> | Path in repo to target |
| [options] | <code>object</code> | Options object |
| [callback] | <code>function</code> | Complete callback |

<a name="info"></a>

## info(repoPath, [options], [callback])
Returns object with the author, date, log message size, and log message.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| repoPath | <code>string</code> | Path to repository |
| [options] | <code>object</code> | Options object |
| [callback] | <code>function</code> | Complete callback |

<a name="lock"></a>

## lock(repoPath, target, [options], [callback])
If a lock exists on a path in the repository, describe it.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| repoPath | <code>string</code> | Path to repository |
| target | <code>string</code> | Path in repo to target |
| [options] | <code>object</code> | Options object |
| [callback] | <code>function</code> | Complete callback |

<a name="log"></a>

## log(repoPath, [options], [callback])
Print the log message.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| repoPath | <code>string</code> | Path to repository |
| [options] | <code>object</code> | Options object |
| [callback] | <code>function</code> | Complete callback |

<a name="propget"></a>

## propget(propName, repoPath, target, [options], [callback])
List the value of a property on a path in the repository.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| propName | <code>string</code> | Property name |
| repoPath | <code>string</code> | Path to repository |
| target | <code>string</code> | Path in repo to target |
| [options] | <code>object</code> | Options object |
| [callback] | <code>function</code> | Complete callback |

<a name="proplist"></a>

## proplist(repoPath, target, [options], [callback])
List the properties of a path in the repository.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| repoPath | <code>string</code> | Path to repository |
| target | <code>string</code> | Path in repo to target |
| [options] | <code>object</code> | Options object |
| [callback] | <code>function</code> | Complete callback |

<a name="tree"></a>

## tree(repoPath, target, [options], [callback])
Print the tree.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| repoPath | <code>string</code> | Path to repository |
| target | <code>string</code> | Path in repo to target |
| [options] | <code>object</code> | Options object |
| [callback] | <code>function</code> | Complete callback |

<a name="uuid"></a>

## uuid(repoPath, [options], [callback])
Print the repository's UUID.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| repoPath | <code>string</code> | Path to repository |
| [options] | <code>object</code> | Options object |
| [callback] | <code>function</code> | Complete callback |

<a name="youngest"></a>

## youngest(repoPath, [options], [callback])
Print the youngest revision number.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| repoPath | <code>string</code> | Path to repository |
| [options] | <code>object</code> | Options object |
| [callback] | <code>function</code> | Complete callback |



## Attributions
This project relied heavily on the design of [node-svn-ultimate](https://github.com/peteward44/node-svn-ultimate).