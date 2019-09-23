/* eslint-disable no-console */
'use strict';
Object.defineProperty( exports, '__esModule', { value: true } );
// browser, nodejs, extension
function constructNodejsPlugin( pluginObjFct, acc ) {
	return function( b ) {
		const pluginObj = pluginObjFct( b, { type: 'nodejs' } );
		const pre = pluginObj.pre,
			post = pluginObj.post;
		pluginObj.pre = function() {
			this.cache = [];
			pre.call( this, arguments );
		};
		pluginObj.post = function() {
			post.call( this, arguments );
			console.log( this.cache );
			acc.push( ...this.cache );
		};
		return pluginObj;
	};
}
exports.constructNodejsPlugin = constructNodejsPlugin;
function constructBrowsersPlugin( pluginObjFct, acc ) {
	return function( b ) {
		const pluginObj = pluginObjFct( b, { type: 'browser' } );
		const pre = pluginObj.pre,
			post = pluginObj.post;
		pluginObj.pre = function() {
			this.cache = [];
			pre.call( this, arguments );
		};
		pluginObj.post = function() {
			post.call( this, arguments );
			console.log( this.cache );
			acc.push( ...this.cache );
		};
		return pluginObj;
	};
}
exports.constructBrowsersPlugin = constructBrowsersPlugin;
function constructExtensionPlugin( pluginObjFct, acc ) {
	return function( b ) {
		const pluginObj = pluginObjFct( b, { type: 'extension' } );
		const pre = pluginObj.pre,
			post = pluginObj.post;
		pluginObj.pre = function() {
			this.cache = [];
			pre.call( this, arguments );
		};
		pluginObj.post = function() {
			post.call( this, arguments );
			console.log( 111, this.file.opts, this.cache );
			acc.push( ...this.cache );
		};
		return pluginObj;
	};
}
exports.constructExtensionPlugin = constructExtensionPlugin;
