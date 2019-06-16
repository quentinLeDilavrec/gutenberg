/**
 * External dependencies
 */
const glob = require( 'glob' ).sync;

// Finds all packages which are transpiled with Babel to force Jest to use their source code.
const transpiledPackageNames = glob( 'packages/*/src/index.js' )
	.map( ( fileName ) => fileName.split( '/' )[ 1 ] );

module.exports = {
	rootDir: '../../',
	moduleNameMapper: {
		[ `@wordpress\\/(${ transpiledPackageNames.join( '|' ) })$` ]: 'packages/$1/src',
	},
	preset: '@wordpress/jest-preset-default',
	setupFiles: [
		// '<rootDir>/packages/scripts/config/global1-setup.js',
		'<rootDir>/test/unit/config/gutenberg-phase.js',
	],
	// setupFilesAfterEnv: [
	// 	'<rootDir>/packages/scripts/config/global-setup.js',
	// ],
	testURL: 'http://localhost',
	testPathIgnorePatterns: [
		'/\.git/',
		'/node_modules/',
		'/packages/e2e-tests',
		'<rootDir>/.*/build/',
		'<rootDir>/.*/build-module/',
		'<rootDir>/.+\.native\.js$',
	],
	// globalSetup: '<rootDir>/packages/scripts/config/setup.js',
	// globalTeardown: '<rootDir>/packages/scripts/config/teardown.js',
	testEnvironment: '<rootDir>/packages/scripts/config/behavior_environment.js',
	// transform: {
	// 	'^.+/packages/.+\\.[jt]sx?$': '/home/quentin/gutenberg/packages/scripts/config/babel-transform.js',
	// },
	// globals: {
	// 	window: false,
	// },
};
