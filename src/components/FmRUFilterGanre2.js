import React, {Component} from 'react';

export default class FmRUFilterGanre2 extends Component
{	
	constructor(props) 
	{
		super(props);
		this.state = {
		  checked: props.data.check ? "checked" : ""
		};
		this.check = this.check.bind(this);
	}
	render()
	{ 
		const {data} = this.props;
		const classNames = [this.state.checked, "ganre_checkbox"].join(" ");
		return (
			<div className="col-lg-4 col-md-6 col-sm-6 col-12 " style={{overflow:"hidden"}}>								
				<input 
					type="checkbox" 
					name={"ganre_" + data.id} 
					id={"ganre_" + data.id} 
					value={data.id}
					className={ classNames }
					onChange={this.check}
				/>
				<label htmlFor={"ganre_" + data.id}>
					{data.name}
					<img src={data.icon} alt={data.name} />
				</label>	
			</div>
		);
	}
	check = (event)=>
	{
		const target = event.currentTarget;
		const value = target.classList.contains("checked") ? "" : "checked";
		this.setState({
			checked: value
		});
		this.props.onClick(this.props.data.id, value==="checked" ? 1:0);
	}
}
