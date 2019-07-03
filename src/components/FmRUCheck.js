import React, {Component, Fragment} from 'react';
import Foo from '../Foo';
import Vocabulary from './Vocabulary';

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
					onChange={ this.onItemClick }
					data-fmru_type='fmru_player' 
					data-args={id} 
				/>
			<label htmlFor={ chid }  data-hint={index===0 ? "-" : index}></label>
		</span>);
	}
	onItemClick = (evt) =>
	{
		var oz = evt.currentTarget.value;
		const {id, member_id, old} = this.props;
		this.setState({
			val: oz
		});
		console.log({mid:member_id, crid:id, old_c:old, c:oz, d:"", is_comment:Foo.is_comment});
		Foo.app.onOzenka("ozenka",{mid:member_id, crid:id, old_c:old, c:oz, d:"", is_comment:Foo.is_comment});
	}
}