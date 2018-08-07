import React, {Component} from 'react';
import Foo from '../Foo';

export default class FmRUCheck extends Component
{
	constructor(props) 
	{
        super(props);
        this.state = 
		{
			val:props.val
        };
    }
	render() 
	{ 
		//console.log(parseInt(this.props.val, 10), parseInt(this.state.val, 10),this.props.id );
		const {id, index} = this.props;
		const chid = 'c_'+id + '_' + index;
		const chname = id;
		return (
		<span >
			<input 
					type='radio' 
					name={ chname }
					id={ chid } 
					value={index}
					className='radio srait'
					defaultChecked={index === parseInt(this.state.val, 10)}
					onChange={this.onItemClick.bind(this)}
					data-fmru_type='fmru_player' 
					data-args={id} 
				/>
			<label htmlFor={ chid }  data-hint={index===0 ? "-" : index}></label>
		</span>);
	}
	onItemClick= (evt)=>{
		const {id, member_id} = this.props;
		this.setState({
			val: evt.currentTarget.value
		});
		Foo.app.onOzenka("ozenka",{mid:member_id, crid:id, c:evt.currentTarget.value, d:"", is_comment:Foo.is_comment});
	}
}