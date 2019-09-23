
function getLocation( node, srcName ) { // TODO check if it is portable
	const loc = node.loc; // TODO look at this.file.opts.filename if it works
	// throw new Error( srcName );
	if ( loc ) {
		return ( ( srcName[ 0 ] !== '/' ) ? srcName : srcName.split( '/' ).slice( 3 ).join( '/' ) ) + ':' + loc.start.line + ':' + loc.start.column + ':' + loc.end.line + ':' + loc.end.column;
	}
	return ( ( srcName[ 0 ] !== '/' ) ? srcName : srcName.split( '/' ).slice( 3 ).join( '/' ) );
}
function transformerContainer( URL ) {
	const fs = require( 'fs' );

	return function( Babel ) {
		const btypes = Babel.types;
		function param2exp( param ) {
			if ( param.type === 'Identifier' ) {
				return param;
			} else if ( param.type === 'ObjectPattern' ) {
				const l = [];
				param.properties.forEach( ( x ) => {
					if ( x.type === 'RestElement' ) {
						l.push( btypes.SpreadElement( x.argument ) );
					} else if ( x.value.type === 'AssignmentPattern' ) {
						l.push( btypes.ObjectProperty( x.key, x.key ) );
					} else {
						l.push( btypes.ObjectProperty( x.key, param2exp( x.value ) ) );
					}
				} );
				return btypes.ObjectExpression( l );
			} else if ( param.type === 'ArrayPattern' ) {
				return btypes.ArrayExpression( param.elements.filter( ( x ) => x !== null ).map( param2exp ) );
			} else if ( param.type === 'RestElement' ) {
				return btypes.SpreadElement( param.argument );
			} else if ( param.type === 'AssignmentPattern' ) {
				return param.left;
			}
			throw param.type;
		}
		const pusherExpr = ( 0 ) ? ( ';console.log', ';global.logger.push' ) : ';window.logger';
		function makeLoggerExpr( currFile, ...params ) {
			// path, fnVal,
			// btypes.stringLiteral( path ),
			// fnVal,
			fs.appendFileSync( 'functions.txt', ( currFile || URL ) + '\n' );
			return btypes.expressionStatement(
				btypes.callExpression( btypes.identifier( pusherExpr ), [
					btypes.arrayExpression( [
						btypes.stringLiteral( currFile || URL ),
						...params,
					] ),
				] )
			);
		}
		// "^.+/packages/.+\\.[jt]sx?$": "<rootDir>/instrument_transformer.js",
		// eslint-disable-next-line no-console
		// throw 'nnenenenenen';
		return {
			name: 'log-functions-usage',
			visitor: {
				FunctionDeclaration( path ) {
					// TODO check if another logger call in same block or chidren which doesn't go though function declarations
					// TODO try to mark the outputed code so that it won't be instrumented 2 times
					// throw process.argv || 'briblabla';
					if ( 0 ) {
						throw 'caca2';
					}
					if ( process.argv &&
						process.argv[ 1 ] !== __dirname + '/bin/packages/build.js' &&
					process.argv[ 1 ] !== __dirname + '/node_modules/worker-farm/lib/child/index.js' &&
					process.argv[ 1 ] !== __dirname + '/node_modules/jest-worker/build/workers/processChild.js' ) {
						// console.log( 'aaaaaaaaaaaaaaaaaaaaaaaaaa' );
						// throw process.argv || 'briblabla';
						// eslint-disable-next-line no-console
						console.log( process.argv );
						return;
					}
					if ( this.file.opts.filename.includes( '/build-module/' ) ) {
						// eslint-disable-next-line no-console
						// console.log( process.argv, this.file.opts.filename );
						// throw process.argv, this.file.opts.filename;
					}
					// debugger;
					path.node.body.body.unshift(
						makeLoggerExpr(
							getLocation( path.node, this.file.opts.filename ),
							btypes.spreadElement( btypes.identifier( 'arguments' ) )
						)
					);
				},
				FunctionExpression( path ) {
					// // eslint-disable-next-line no-console
					// console.log( this.file.opts.filename );
					// if ( this.file.opts.filename.includes( '/build-module/' ) ) {
					// 	throw process.argv, this.file.opts.filename;
					// }
					// throw process.argv || 'briblabla';
					if ( 0 ) {
						throw 'caca2';
					}
					if ( process.argv &&
						process.argv[ 1 ] !== __dirname + '/bin/packages/build.js' &&
					process.argv[ 1 ] !== __dirname + '/node_modules/worker-farm/lib/child/index.js' &&
					process.argv[ 1 ] !== __dirname + '/node_modules/jest-worker/build/workers/processChild.js' &&
					process.argv[ 1 ] !== __dirname + '/packages/scripts/scripts/test-unit-js.js' ) {
						// console.log( 'aaaaaaaaaaaaaaaaaaaaaaaaaa' );
						// throw process.argv || 'briblabla';
						// eslint-disable-next-line no-console
						console.log( process.argv );
						return;
					}
					path.node.body.body.unshift(
						makeLoggerExpr(
							getLocation( path.node, this.file.opts.filename ),
							btypes.spreadElement( btypes.identifier( 'arguments' ) )
						)
					);
				},
				ArrowFunctionExpression( path ) {
					// path.getPathLocation(),
					// btypes.stringLiteral( name ),
					// // eslint-disable-next-line no-console
					// console.log( this.file.opts.filename );
					// if ( this.file.opts.filename.includes( '/build-module/' ) ) {
					// 	throw process.argv, this.file.opts.filename;
					// }
					// throw process.argv || 'briblabla';
					if ( 0 ) {
						throw 'caca2';
					}
					if ( process.argv &&
						process.argv[ 1 ] !== __dirname + '/bin/packages/build.js' &&
					process.argv[ 1 ] !== __dirname + '/node_modules/worker-farm/lib/child/index.js' &&
					process.argv[ 1 ] !== __dirname + '/node_modules/jest-worker/build/workers/processChild.js' &&
					process.argv[ 1 ] !== __dirname + '/packages/scripts/scripts/test-unit-js.js' ) {
						// console.log( 'aaaaaaaaaaaaaaaaaaaaaaaaaa' );
						// throw process.argv || 'briblabla';
						// eslint-disable-next-line no-console
						console.log( process.argv );
						return;
					}
					// console.log( this.file.opts.filename );
					// if ( getLocation( path.node, this.file.opts.filename ) === 'gutenberg/packages/editor/src/components/reusable-blocks-buttons/reusable-block-delete-button.js:48:15:70:2' ) {
					// 	console.log( path.node.params[ 1 ] );
					// 	path.node.params.map( param2exp );
					// 	throw path.node.type;
					// }
					const v = makeLoggerExpr(
						getLocation( path.node, this.file.opts.filename ),
						...path.node.params.map( param2exp )
					);
					if ( path.node.body.type === 'BlockStatement' ) {
						path.node.body.body.unshift( v );
					} else {
						path.node.body = btypes.blockStatement( [ v, btypes.returnStatement( path.node.body ) ] );
					}
				},
				ObjectMethod( path ) {
					// // eslint-disable-next-line no-console
					// console.log( this.file.opts.filename );
					// if ( this.file.opts.filename.includes( '/build-module/' ) ) {
					// 	throw process.argv, this.file.opts.filename;
					// }
					// throw process.argv || 'briblabla';
					if ( 0 ) {
						throw 'caca2';
					}
					if ( process.argv &&
						process.argv[ 1 ] !== __dirname + '/bin/packages/build.js' &&
					process.argv[ 1 ] !== __dirname + '/node_modules/worker-farm/lib/child/index.js' &&
					process.argv[ 1 ] !== __dirname + '/node_modules/jest-worker/build/workers/processChild.js' &&
					process.argv[ 1 ] !== __dirname + '/packages/scripts/scripts/test-unit-js.js' ) {
						// console.log( 'aaaaaaaaaaaaaaaaaaaaaaaaaa' );
						// throw process.argv || 'briblabla';
						// eslint-disable-next-line no-console
						console.log( process.argv );
						return;
					}
					path.node.body.body.unshift(
						makeLoggerExpr(
							getLocation( path.node, this.file.opts.filename ),
							btypes.spreadElement( btypes.identifier( 'arguments' ) )
						)
					);
				},
				ClassMethod( path ) {
					// // eslint-disable-next-line no-console
					// console.log( this.file.opts.filename );
					// if ( this.file.opts.filename.includes( '/build-module/' ) ) {
					// 	throw process.argv, this.file.opts.filename;
					// }
					// throw process.argv || 'briblabla';
					if ( 0 ) {
						throw 'caca2';
					}
					if ( process.argv &&
						process.argv[ 1 ] !== __dirname + '/bin/packages/build.js' &&
					process.argv[ 1 ] !== __dirname + '/node_modules/worker-farm/lib/child/index.js' &&
					process.argv[ 1 ] !== __dirname + '/node_modules/jest-worker/build/workers/processChild.js' &&
					process.argv[ 1 ] !== __dirname + '/packages/scripts/scripts/test-unit-js.js' ) {
						// console.log( 'aaaaaaaaaaaaaaaaaaaaaaaaaa' );
						// throw process.argv || 'briblabla';
						// eslint-disable-next-line no-console
						console.log( process.argv );
						return;
					}
					path.node.body.body.unshift(
						makeLoggerExpr(
							getLocation( path.node, this.file.opts.filename ),
							btypes.spreadElement( btypes.identifier( 'arguments' ) )
						)
					);
				},
				ClassPrivateMethod( path ) {
					// // eslint-disable-next-line no-console
					// console.log( this.file.opts.filename );
					// if ( this.file.opts.filename.includes( '/build-module/' ) ) {
					// 	throw process.argv, this.file.opts.filename;
					// }
					// throw process.argv || 'briblabla';
					if ( 0 ) {
						throw 'caca2';
					}
					if ( process.argv &&
						process.argv[ 1 ] !== __dirname + '/bin/packages/build.js' &&
					process.argv[ 1 ] !== __dirname + '/node_modules/worker-farm/lib/child/index.js' &&
					process.argv[ 1 ] !== __dirname + '/node_modules/jest-worker/build/workers/processChild.js' &&
					process.argv[ 1 ] !== __dirname + '/packages/scripts/scripts/test-unit-js.js' ) {
						// console.log( 'aaaaaaaaaaaaaaaaaaaaaaaaaa' );
						// throw process.argv || 'briblabla';
						// eslint-disable-next-line no-console
						console.log( process.argv );
						return;
					}
					path.node.body.body.unshift(
						makeLoggerExpr(
							getLocation( path.node, this.file.opts.filename ),
							btypes.spreadElement( btypes.identifier( 'arguments' ) )
						)
					);
				},
			},
		};
	};
}

module.exports = transformerContainer( 'wp' );
