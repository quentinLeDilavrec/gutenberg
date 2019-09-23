/* eslint-disable no-nested-ternary */
/* eslint-disable @wordpress/no-unused-vars-before-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable camelcase */
'use strict';
Object.defineProperty( exports, '__esModule', { value: true } );
console.log( 'user extended plugin' );
const type_1 = require( 'behavior-code-processing' );// npm i git+https://git@github.com/quentinLeDilavrec/behavior-code-processing.git`
function getLocation( node, srcName ) {
	const loc = node.loc; // TODO look at this.file.opts.filename if it works
	if ( loc ) {
		return srcName + ':' + loc.start.line + ':' + loc.start.column + ':' + loc.end.line + ':' + loc.end.column;
	}

	console.error( "current node don't possess a location" );
	return srcName;
}
function default_1( { types: t }, behaviorContext ) {
	const fs = require( 'fs' );
	const makeLoggerExpr = type_1.makeLoggerExprGen( ';global.logger.push' ); //';window.logger'
	return {
		pre( state ) {
			this.counter = 0;
		},
		visitor: ( behaviorContext.type === 'extension' ?
			{
				// @ts-ignore
				'ArrowFunctionExpression|FunctionDeclaration|FunctionExpression|ObjectMethod|ClassMethod|ClassPrivateMethod'( path ) {
					// @ts-ignore
					const loc = getLocation( path.node, this.file.opts.filename );
					console.log( 963, loc );
					// @ts-ignore
					this.store( loc, path );
				},
			} :
			behaviorContext.type === 'nodejs' ?
				{
					ArrowFunctionExpression( path ) {
						const loc = getLocation( path.node, this.file.opts.filename );
						this.cache.push( [ loc, path ] );
						this.counter++;
						const v = makeLoggerExpr( loc, ...path.node.params.map( type_1.param2exp ) );
						if ( path.node.body.type === 'BlockStatement' ) {
							path.node.body.body.unshift( v );
						} else {
							path.node.body = t.blockStatement( [ v, t.returnStatement( path.node.body ) ] );
						}
					},
					// @ts-ignore
					'FunctionDeclaration|FunctionExpression|ObjectMethod|ClassMethod|ClassPrivateMethod'( path ) {
						// @ts-ignore
						const loc = getLocation( path.node, this.file.opts.filename );
						// @ts-ignore
						this.cache.push( [ loc, path ] );
						// @ts-ignore
						this.counter++;
						// TODO check if another logger call in same block or children which doesn't go though function declarations
						// TODO try to mark the outputed code so that it won't be instrumented 2 times
						path.node.body.body.unshift( makeLoggerExpr( loc, t.spreadElement( t.identifier( 'arguments' ) ) ) );
					},
				} :
				behaviorContext.type === 'browser' ?
					{
						// // @ts-ignore
						// "ArrowFunctionExpression|FunctionDeclaration|FunctionExpression|ObjectMethod|ClassMethod|ClassPrivateMethod"(
						//     path: NodePath<bt.Function>
						//     ) {
						//     const loc = getLocation(path.node, this.file.opts.filename)
						//     console.log(this)
						//     this.counter++
						//     this.cache.push([loc, path]);
						// }
					} : {} ),
		post( state ) {
			console.log( this.counter );
		},
	};
}
exports.default = default_1;
