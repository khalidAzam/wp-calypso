/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Button from 'components/button';

const SetupFooter = ( { primaryLabel, secondaryLabel, onPrimaryClick, onSecondaryClick } ) => {
	return (
		<div className="dashboard__setup-footer">
			<Button onClick={ onPrimaryClick }>{ primaryLabel }</Button>
			{
				secondaryLabel
				? <a className="dashboard__setup-footer-secondary" onClick={ onSecondaryClick }>{ secondaryLabel }</a>
				: null
			}
		</div>
	);
};

SetupFooter.propTypes = {
	primaryLabel: React.PropTypes.string.isRequired,
	secondaryLabel: React.PropTypes.string,
	onPrimaryClick: React.PropTypes.func.isRequired,
	onSecondaryClick: React.PropTypes.func,
};

export default SetupFooter;
