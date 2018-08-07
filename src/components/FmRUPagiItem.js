import React, {Component} from 'react';

export default class FmRUPagiItem extends Component
{	
	render()
	{
		const {id, onItemClick, is_active, fmru_type} = this.props;
		
		return (!is_active ? 
					<span className="page-link" data-fmru_type={fmru_type} data-args={id} onClick={onItemClick}>
						{id + 1}
					</span>
				:
				<span className="page-link disabled" >
					{id + 1}
				</span>	
		);
	}
}