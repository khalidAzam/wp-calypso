/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Main from 'components/main';
import PageViewTracker from 'lib/analytics/page-view-tracker';
import DocumentHead from 'components/data/document-head';
import CommentList from './comment-list';
import CommentNavigation from './comment-navigation';

export class CommentsManagement extends Component {

	static propTypes = {
		basePath: PropTypes.string,
		siteSlug: PropTypes.string,
		status: PropTypes.string,
		translate: PropTypes.func,
	};

	render() {
		const {
			basePath,
			siteSlug,
			status,
			translate,
		} = this.props;
		return (
			<Main className="comments" wideLayout>
				<PageViewTracker path={ basePath } title="Manage Comments" />
				<DocumentHead title={ translate( 'Manage Comments' ) } />
				<div className="comments__primary">
					<CommentNavigation siteSlug={ siteSlug } status={ status } />
					<CommentList />
				</div>
			</Main>
		);
	}
}

export default localize( CommentsManagement );
