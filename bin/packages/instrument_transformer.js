function transformerContainer( URL ) {
	return function( Babel ) {
		let i = 0;
		const btypes = Babel.types;
		function param2exp( param ) {
			if ( param.type === 'Identifier' ) {
				return param;
			} else if ( param.type === 'ObjectPattern' ) {
				return btypes.stringLiteral( 'TODO: ObjectPattern' );
				// return btypes.objectExpression( ( param as btypes.ObjectPattern ).properties.map( toObjectE ) )
			} else if ( param.type === 'ArrayPattern' ) {
				return btypes.stringLiteral( 'TODO: ArrayPattern' );
			}
			// return btypes.stringLiteral( param.type )
			return btypes.stringLiteral( 'TODO: ' + param.type );
		}
		function makeLoggerExpr(
			currFile,
			fnVal,
			...params ) {
			return btypes.expressionStatement(
				btypes.callExpression(
					btypes.identifier( '(global.logger = global.logger || []).push' ),
					[ btypes.arrayExpression(
						[ btypes.stringLiteral( currFile || URL ), fnVal, ...params ] ) ] ) );
		}
		return {
			name: 'log-functions-usage',
			visitor: {
				FunctionDeclaration( path ) {
					path.node.body.body.unshift(
						makeLoggerExpr(
							this.file.opts.filename,
							path.node.id,
							btypes.spreadElement(
								btypes.identifier( 'arguments' ) ) ) );
				},
				FunctionExpression( path ) {
					const name = ( path.node.loc ) ?
						`anonymous_${ i++ }:` + path.node.loc.start.line + ':' + path.node.loc.start.column :
						path.getPathLocation() + `:anonymous_${ i++ }`;
					path.node.body.body.unshift(
						makeLoggerExpr(
							this.file.opts.filename,
							btypes.stringLiteral(
								name ),
							btypes.spreadElement( btypes.identifier( 'arguments' ) ) ) );
				},
				ArrowFunctionExpression( path ) {
					const name = ( path.node.loc ) ?
						`anonymous_${ i++ }:` + path.node.loc.start.line + ':' + path.node.loc.start.column :
						path.getPathLocation() + `:anonymous_${ i++ }`;
					const v = makeLoggerExpr(
						this.file.opts.filename,
						btypes.stringLiteral( name ),
						...path.node.params.map( param2exp ) );
					if ( path.node.body.type === 'BlockStatement' ) {
						path.node.body.body.unshift( v );
					} else {
						path.node.body =
					btypes.blockStatement( [ v, btypes.returnStatement( path.node.body ) ] );
					}
				},
			},
		};
	};
}

module.exports = transformerContainer( 'wp' );
