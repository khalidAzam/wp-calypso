scroll-to
=========

A utility module to scroll to a window position.

## Usage

You can perform a smooth scrolling with:

```es6
import scrollTo from 'lib/scroll-to'; 

scrollTo( {
	x: 400,
	y: 500,
	duration: 500,
	onComplete: function() {
		console.log( 'done!' );
	}
} );
```

You can also scroll directly to the top of the page with this handy function:

```es6
import { scrollToTop } from 'lib/scroll-to'; 

scrollToTop();
```
