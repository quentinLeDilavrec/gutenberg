// puppeteer_environment.js
// const NodeEnvironment = require( 'jest-environment-node' );
/**
 * External dependencies
 */
const Environment = require( 'jest-environment-jsdom' );
const { join, dirname } = require( 'path' );
const { writeFileSync, mkdirSync } = require( 'fs' );

const dirName = '/tmp/behaviorlogs/';

const replacer = function( depth = Number.MAX_SAFE_INTEGER ) {
	let objects, stack, keys;
	return function( key, value ) {
		//  very first iteration
		if ( key === '' ) {
			keys = [ 'root' ];
			objects = [ { keys: 'root', value } ];
			stack = [];
			return value;
		}

		//  From the JSON.stringify's doc: "The object in which the key was found is
		//  provided as the replacer's this parameter."
		//  Thus one can control the depth
		while ( stack.length && this !== stack[ 0 ] ) {
			stack.shift();
			keys.pop();
		}
		// console.log( keys.join('.') );

		const type = typeof value;
		if ( type === 'boolean' || type === 'number' || type === 'string' ) {
			return value;
		}
		if ( type === 'function' ) {
			return `[Function, ${ value.length + 1 } args]`;
		}
		if ( value === null ) {
			return 'null';
		}
		if ( ! value ) {
			return undefined;
		}
		if ( stack.length >= depth ) {
			if ( Array.isArray( value ) ) {
				return `[Array(${ value.length })]`;
			}
			return '[Object]';
		}
		const found = objects.find( ( o ) => o.value === value );
		if ( ! found ) {
			keys.push( key );
			stack.unshift( value );
			objects.push( { keys: keys.join( '.' ), value } );
			return value;
		}
		// actually, here's the only place where the keys keeping is useful
		return `[Duplicate: ${ found.keys }]`;
	};
};

const myCallPrinter = ( call ) => {
	return '' + call[ 0 ] + ( call.length > 1 ? ' ' + JSON.stringify( call.slice( 1 ), replacer( 0 ) ) + '\n' : '\n' );
};

function nthOccIndex( s, c, n ) {
	let i = 0;
	let count = 0;
	while ( true ) {
		if ( s[ i ] === c ) {
			count++;
		}
		if ( count === n ) {
			return i;
		}
		if ( i >= s.length ) {
			return -1;
		}
		i++;
	}
}

class BehaviorEnvironment extends Environment {
	// eslint-disable-next-line no-useless-constructor
	constructor( config, x ) {
		super( config, x );
	}

	async setup() {
		this.global.logger = [];
		await super.setup();
	}

	async teardown() {
		if ( this.global.logger.length > 0 ) {
			const testPath = this.global.jasmine.testPath;
			const outPath = join( dirName, testPath.slice( nthOccIndex( testPath, '/', 4 ) + 1 ) );
			mkdirSync( dirname( outPath ), { recursive: true } );
			writeFileSync(
				outPath,
				this.global.logger.map( myCallPrinter ).join( '' ),
				'utf-8' );
			this.global.logger = [];
		}
		await super.teardown();
	}

	runScript( script ) {
		// this.global.logger = [];
		const tmp = super.runScript( script );
		// if ( this.global.logger.length > 0 ) {
		// }
		return tmp;
	}
}

module.exports = BehaviorEnvironment;
