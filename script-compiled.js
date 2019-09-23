/* eslint-disable no-console */
'use strict';

Object.defineProperty( exports, '__esModule', { value: true } );
// browser, nodejs, extension
function constructNodejsPlugin( pluginObjFct, acc ) {
	window.logger( [ 'script.js:5:0:21:1', ...arguments ] );

	return function( b ) {
		window.logger( [ 'script.js:6:8:20:2', ...arguments ] );

		const pluginObj = pluginObjFct( b, { type: 'nodejs' } );
		const pre = pluginObj.pre,
			post = pluginObj.post;
		pluginObj.pre = function() {
			window.logger( [ 'script.js:10:18:13:3', ...arguments ] );

			this.cache = [];
			pre.call( this, arguments );
		};
		pluginObj.post = function() {
			window.logger( [ 'script.js:14:19:18:3', ...arguments ] );

			post.call( this, arguments );
			console.log( this.cache );
			acc.push( ...this.cache );
		};
		return pluginObj;
	};
}
exports.constructNodejsPlugin = constructNodejsPlugin;
function constructBrowsersPlugin( pluginObjFct, acc ) {
	window.logger( [ 'script.js:23:0:39:1', ...arguments ] );

	return function( b ) {
		window.logger( [ 'script.js:24:8:38:2', ...arguments ] );

		const pluginObj = pluginObjFct( b, { type: 'browser' } );
		const pre = pluginObj.pre,
			post = pluginObj.post;
		pluginObj.pre = function() {
			window.logger( [ 'script.js:28:18:31:3', ...arguments ] );

			this.cache = [];
			pre.call( this, arguments );
		};
		pluginObj.post = function() {
			window.logger( [ 'script.js:32:19:36:3', ...arguments ] );

			post.call( this, arguments );
			console.log( this.cache );
			acc.push( ...this.cache );
		};
		return pluginObj;
	};
}
exports.constructBrowsersPlugin = constructBrowsersPlugin;
function constructExtensionPlugin( pluginObjFct, acc ) {
	window.logger( [ 'script.js:41:0:57:1', ...arguments ] );

	return function( b ) {
		window.logger( [ 'script.js:42:8:56:2', ...arguments ] );

		const pluginObj = pluginObjFct( b, { type: 'extension' } );
		const pre = pluginObj.pre,
			post = pluginObj.post;
		pluginObj.pre = function() {
			window.logger( [ 'script.js:46:18:49:3', ...arguments ] );

			this.cache = [];
			pre.call( this, arguments );
		};
		pluginObj.post = function() {
			window.logger( [ 'script.js:50:19:54:3', ...arguments ] );

			post.call( this, arguments );
			console.log( 111, this.file.opts, this.cache );
			acc.push( ...this.cache );
		};
		return pluginObj;
	};
}
exports.constructExtensionPlugin = constructExtensionPlugin;
