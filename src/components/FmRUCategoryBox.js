import React, {Component} from 'react';
import FmRUCriteryBoxList from './FmRUCriteryBoxList';
import Voc from './Voc';

export default class FmRUCategoryBox extends Component
{
	constructor(props)
	{	
		super(props);
		this.state={
			data:props.data,
			onItemClick:props.onItemClick
		};
	}
	render() 
	{ 
		const { data, onItemClick, member_id } = this.props;
		const style = {backgroundColor: data.color, color:"#f8f9fa"}; 
		return (
			<div className="col-md-12" key={ data.id}>
				<div className='col-md-9 col-sm-12 critery_cell first' style={style}>
					<div className="fmRuTitle">
						<small><Voc text={"Category"} /></small> { data.name}
					</div>
				</div>
				<div className='col-md-3  col-sm-12 critery_cell' style={style}>
					<h4 data-cat_id={ data.id} > {  data.rating } </h4>
				</div>
				<div className="col-md-12" key={ data.id}>
					<div className="row">
						<FmRUCriteryBoxList 
							data={ data.criteries } 
							descrs={data.d}
							id={ data.id } 
							color={data.color}
							member_id={member_id}
							onItemClick = {onItemClick}
						/>
					</div>
				</div>
			</div>
		);
	}
}