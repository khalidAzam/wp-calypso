/**
 * External dependencies
 */
import React from 'react';

const SetupHeader = ( { imageSource, imageWidth, subtitle, title } ) => {
	return (
		<div className="dashboard__setup-header">
			{ imageSource ? <img src={ imageSource } width={ imageWidth } className="dashboard__setup-header-image" /> : null }
			{ <h2 className="dashboard__setup-header-title">{ title }</h2> }
			{ subtitle ? <h3 className="dashboard__setup-header-subtitle">{ subtitle }</h3> : null }
		</div>
	);
};

SetupHeader.propTypes = {
	imageSource: React.PropTypes.string,
	imageWidth: React.PropTypes.number,
	title: React.PropTypes.string.isRequired,
	subtitle: React.PropTypes.string,
};

export default SetupHeader;
