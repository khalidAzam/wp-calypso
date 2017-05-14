/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import management from './management/reducer';
import suggestions from './suggestions/reducer';

export default combineReducers( {
	management
	suggestions
} );
