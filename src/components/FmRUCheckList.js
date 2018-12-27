import React, {Component} from 'react';
import FmRUCheck from './FmRUCheck';
import Foo from '../Foo';
import Vocabulary from './Vocabulary';

export default class FmRUCheckList extends Component
{
	render() 
	{ 
		const{ data, member_id} = this.props;
		const articleElements = [];
		const classrs = ["fmRU_button hint hint--left"];
		if(Foo.is_comment) 
			classrs.push("hidden");
		for(var i=0; i<4;i++)
		{
			articleElements[i] = <FmRUCheck 
				id={data.id} 
				name={data.title} 
				val={data.rating}
				index={i} 
				member_id={member_id} 
				key={data.id +"_"+ i}
				old={ parseInt(data.rating, 10) }
			/>;
		}
		return (
			<div className="w-100">
				{articleElements}
				<div 
					className={classrs.join(" ")} 
					data-hint={Vocabulary.getText("Comment this")}
					style={{float: "right"}} 
					onClick={this.props.onEdit}
				>
					<i className="fas fa-microphone-alt"></i>					
				</div>
			</div>
		)
	}
	onMicrophone = (evt)=>
	{
		console.log(evt);
	}
}