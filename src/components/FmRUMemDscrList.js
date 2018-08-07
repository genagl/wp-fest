import React, {Component} from 'react';
import FmRUMemDscr from './FmRUMemDscr';
import Voc from './Voc';

export default class FmRUMemDscrList extends Component
{
	render() 
	{ 	
		const {data} = this.props;
		const articleElements =data.map((article, index) =>
		{     
			return <FmRUMemDscr 
				txt={article.txt} 
				auth={article.auth} 
				key={"m_descr_"+article.id + index}
				index={index}
			/>
		})
		return ( 
			data.length ? 
			(<div className="w-100">
				<div className='col-md-12 critery_cell2 grey first' >
					<Voc text={"Expert/'s commentaries:"} />									
				</div>
				<div className='w-100 first_row'>
					{articleElements}
				</div>
			</div>) : 
			""
		);
	}
}
		