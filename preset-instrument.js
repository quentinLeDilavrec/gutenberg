module.exports = function() {
	return {
		plugins: [
			// './instrument_transformer.js',
			'./test_instru/tests/nodejs.js',
		],
	};
};
