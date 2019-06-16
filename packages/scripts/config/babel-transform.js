/**
 * External dependencies
 */
const babelJest = require( 'babel-jest' );

module.exports = babelJest.createTransformer( {
	passPerPreset: true,
	presets: [
		'/home/quentin/gutenberg/preset-instrument.js',
		'@wordpress/babel-preset-default' ],
} );
