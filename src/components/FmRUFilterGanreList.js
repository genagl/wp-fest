import React, {Component} from 'react';
import FmRUFilterGanre from './FmRUFilterGanre';

export default class FmRUFilterGanreList extends Component
{
	constructor(props) 
	{
		super(props);	
		const ganres = [];
		this.props.data.forEach((elem, num, arr)=> {
			if(elem.check) ganres.push(elem.id);
		});
		this.state = 
		{
			ganres: ganres
		};
		//this.props.onClick( this.state.ganres );
	}
	componentWillReceiveProps (nextProps) 
	{
		/*
		const ganres = [];
		this.props.data.forEach((elem, num, arr)=> {
			if(elem.check) ganres.push(elem.id);
		});
		this.setState({
			data: 	nextProps.data,
			ganres: ganres
		});	*/	
	}
	render() 
	{ 
		const articleElements = this.props.data.map((article, index) => {
			if(this.props.ignore)
				if( this.props.ignore.in_array( article.id ))
					return "";
			return <FmRUFilterGanre 
				data={article} 
				onClick={this.onClick} 
				name={this.props.name}
				key={this.props.name + article.id}
			/>
		});
		return (
				<div className='row'>
					{articleElements}
				</div>	
		);
	}
	onClick=(id, checked) =>
	{ 
		if(checked)
		{
			if(!this.state.ganres.in_array(id))	
				this.state.ganres.push(id);
		}
		else
		{
			for(var i = 0; i < this.state.ganres.length; i++)
			{
				if(this.state.ganres[i] === id)
				{					
					this.state.ganres.splice(i, 1);
					break;
				}
			}
		}		
		this.props.onClick( this.state.ganres, id, this );
	}
}