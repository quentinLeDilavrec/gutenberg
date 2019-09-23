/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const Meter = require( 'performancemeter' );

Meter.measure( 'Uncached', function() {
	fn( 'ffzfzefezfaefzefzfzefzfzef ezf zef zf zefze fz  fzef ezf zefzef ze fze f' );
}, function() {
	function fn( x ) {
		return x.split( / (.*)/ );
	}
} );

Meter.measure( 'Cached', function() {
	fn( 'ffzfzefezfaefzefzfzefzfzef ezf zef zf zefze fz  fzef ezf zefzef ze fze f' );
}, function() {
	function fn( x ) {
		return [ x.substr( 0, x.indexOf( ' ' ) ), x.substr( x.indexOf( ' ' ) + 1 ) ];
	}
} );

