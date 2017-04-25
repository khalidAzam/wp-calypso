/**
 * External dependencies
 */
import ReactDom from 'react-dom';
import React from 'react';
import qs from 'qs';
import debounce from 'lodash/debounce';
import page from 'page';
import url from 'url';

/**
 * Internal dependencies
 */
import DocsComponent from './main';
import { login } from 'lib/paths';
import SingleDocComponent from './doc';
import DesignAssetsComponent from './design';
import ComponentDetail from './design/component-detail';
import Blocks from './design/blocks';
import DocsSelectors from './docs-selectors';
import Typography from './design/typography';
import DevWelcome from './welcome';
import Sidebar from './sidebar';
import FormStateExamplesComponent from './form-state-examples';
import EmptyContent from 'components/empty-content';
import { renderWithReduxStore } from 'lib/react-helpers';

const devdocs = {

	/*
	 * Documentation is rendered on #primary and doesn't expect a sidebar to exist
	 * so #secondary needs to be cleaned up
	 */
	sidebar: function( context, next ) {
		ReactDom.render(
			React.createElement( Sidebar, {
				path: context.path,
			} ),
			document.getElementById( 'secondary' )
		);

		next();
	},

	/*
	 * Controller for page listing multiple developer docs
	 */
	devdocs: function( context ) {
		function onSearchChange( searchTerm ) {
			const query = context.query;
			let	pathname = context.pathname;

			if ( searchTerm ) {
				query.term = searchTerm;
			} else {
				delete query.term;
			}

			const queryString = qs.stringify( query ).replace( /%20/g, '+' ).trim();

			if ( queryString ) {
				pathname += '?' + queryString;
			}

			page.replace( pathname,
				context.state,
				false,
				false );
		}

		ReactDom.render(
			React.createElement( DocsComponent, {
				term: context.query.term,
				// we debounce with wait time of 0, so that the search doesn’t happen
				// in the same tick as the keyUp event and possibly cause typing lag
				onSearchChange: debounce( onSearchChange, 0 )
			} ),
			document.getElementById( 'primary' )
		);
	},

	/*
	 * Controller for single developer document
	 */
	singleDoc: function( context ) {
		ReactDom.render(
			React.createElement( SingleDocComponent, {
				path: context.params.path,
				term: context.query.term,
				sectionId: Object.keys( context.hash )[ 0 ]
			} ),
			document.getElementById( 'primary' )
		);
	},

	// UI components
	design: function( context ) {
		renderWithReduxStore(
			React.createElement( DesignAssetsComponent ),
			'primary',
			context.store
		);
	},

	componentDetail: function( context ) {
		renderWithReduxStore(
			React.createElement( ComponentDetail, {
				component: context.params.component
			} ),
			'primary',
			context.store
		);
	},

	// App Blocks
	blocks: function( context ) {
		renderWithReduxStore(
			React.createElement( Blocks, {
				component: context.params.component
			} ),
			'primary',
			context.store
		);
	},

	selectors: function( context ) {
		renderWithReduxStore(
			React.createElement( DocsSelectors, {
				selector: context.params.selector,
				search: context.query.search
			} ),
			'primary',
			context.store
		);
	},

	typography: function( context ) {
		ReactDom.render(
			React.createElement( Typography, {
				component: context.params.component
			} ),
			document.getElementById( 'primary' )
		);
	},

	formStateExamples: function( context ) {
		ReactDom.render(
			React.createElement( FormStateExamplesComponent, {
				component: context.params.component
			} ),
			document.getElementById( 'primary' )
		);
	},

	pleaseLogIn: function( context ) { // eslint-disable-line no-unused-vars
		const currentUrl = url.parse( location.href );
		const redirectTo = currentUrl.protocol + '//' + currentUrl.host + '/devdocs/welcome';

		ReactDom.unmountComponentAtNode( document.getElementById( 'secondary' ) );

		ReactDom.render(
			React.createElement( EmptyContent, {
				title: 'Log In to start hacking',
				line: 'Required to access the WordPress.com API',
				action: 'Log In to WordPress.com',
				actionURL: login( { redirectTo } ),
				secondaryAction: 'Register',
				secondaryActionURL: '/start/developer',
				illustration: '/calypso/images/drake/drake-nosites.svg'
			} ),
			document.getElementById( 'primary' )
		);
	},

	// Welcome screen
	welcome: function( context ) { // eslint-disable-line no-unused-vars
		ReactDom.render(
			React.createElement( DevWelcome, {} ),
			document.getElementById( 'primary' )
		);
	}
};

module.exports = devdocs;
