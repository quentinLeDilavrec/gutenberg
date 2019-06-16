module.exports = function( api ) {
	api.cache( false );

	return {
		passPerPreset: true,
		presets: [
			'./preset-instrument.js',
			'@wordpress/babel-preset-default',
		],
		plugins: [ 'babel-plugin-inline-json-import' ],
	};
};
