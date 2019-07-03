import React, {Component} from 'react';
import FmRUCategoryBox from './FmRUCategoryBox';
import Voc from './Voc';

export default class FmRUCategoryBoxList extends Component
{
	render() 
	{ 	
		const{data, onItemClick, member_id, max_raiting} = this.props
		const articleElements = data.map((article, index) =>
            <FmRUCategoryBox data={article} key={article.id} onItemClick={onItemClick} member_id={member_id} max_raiting={max_raiting}/>
		);
		return (
			<section>
				<div className='row'>
					<div className='col-md-1'>
					
					</div>
					<div className='col-md-10'>
						<div className='display-4'>
							<Voc text={"Basic Criteries"} />
						</div>
					</div>
					<div className='col-md-1'>
					
					</div>
				</div>				
				<div className="spacer-10"/>
				<div className='row'>
					{articleElements}
				</div>			
			</section>
		);
		/*return this.props.data.length;*/
	}
}