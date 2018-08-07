import React, {Component} from 'react';
import Voc from './Voc';

export default class UserSelect extends Component
{	
	constructor(props) 
	{
		super(props);
		this.state = {
			select:props.select,
			now_lock:false
		};
		
	}
	componentWillReceiveProps (nextProps) 
	{
		this.setState({
			select:nextProps.select,
			now_lock:nextProps.now_lock
		});
	}
	render()
	{ 
		const { users, frole, id} = this.props;
		var i = 0;
		var block_name = "--";
		const options = users.map((user, index) => {
			if(!user.roles.in_array(frole))	return "";
			i++;
			if(user.id === this.state.select) block_name = user.name;
			return (
			<option 
				value={user.id} 
				key={id + "_" + user.id}  
				data-frole={ user.roles.toString() }				
			>
				{user.name}
			</option>);
		});
		if(i === 0)
			return (
			<div style={{ width:"100%", padding:"3px 15px", fontStyle:"italic" }}>
				<Voc text={"No users presents"} />
			</div>);
		const lockClass = !this.state.now_lock ? ["lock"] : ["lock", "unlock"];
		switch(true)
		{
			case this.props.is_blocked === 0:
				return <div className="form-block">{block_name}</div>;
			case this.props.is_locked === 1:
				return <div className="form-lock">
					<select 
						onChange={this.check}
						className="form-control" 
						value={this.state.select}
						
					>
						<option value="-1"  key={id + "_-1"} data-frole="" >--</option>
						{options}
					</select>
					<div className={lockClass.join(" ")} onClick={this.unlock} >
						
					</div>
				</div>
			default:
				return <select onChange={this.check} className="form-control" value={this.state.select} >
					<option value="-1"  key={id + "_-1"} data-frole="" > -- </option>
					{options}
				</select>
		}
	}
	check = (event)=>
	{
		var id 	= event.currentTarget.value;
		this.setState({
			select: id
		});
		this.props.onChoose(id, this);
	}
	unlock = (event) =>
	{
		this.setState({
			now_lock:!this.state.now_lock
		});
	}
}
