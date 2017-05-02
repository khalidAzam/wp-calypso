/**
 * Internal dependencies
 */
import { READER_TEAMS_REQUEST, READER_TEAMS_RECEIVE } from 'state/action-types';
import { combineReducersWithPersistence } from 'state/utils';
import { itemsSchema } from './schema';
import { createReducer } from 'state/utils';

export const items = createReducer(
	[],
	{
		[ READER_TEAMS_RECEIVE ]: ( state, action ) => action.payload.teams,
	},
	itemsSchema
);

export const isRequesting = createReducer( false, {
	[ READER_TEAMS_REQUEST ]: () => true,
	[ READER_TEAMS_RECEIVE ]: () => false,
} );

export default combineReducersWithPersistence( {
	items,
	isRequesting,
} );
