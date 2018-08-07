import React, {Component} from 'react';
import './bootstrap.min.css';


export default class FmRUGanreIcon extends Component
{
	render() 
	{ 
		const ganre = this.props.ganre;
		return  (
			<div 
				className='card-icon' 
				style={{ backgroundImage:"url(" + ganre['icon'] + ")", backgroundColor:ganre['color']}} title={ganre['name']} 
				key={this.props.id} 
			>
			</div>
		);
	}
}