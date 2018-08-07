import React, {Component} from 'react';

export default class FmRUMemDscr extends Component
{
	render() 
	{ 		
		const { txt, auth } = this.props;
		const classes = ['col-md-12','critery_cell3','grey2'];
		return txt==="" ? "" : (
			<div className={classes.join(" ")}>
				<blockquote>
					{txt}
					<footer>{auth}</footer>
				</blockquote>
			</div>
		);
	}
}