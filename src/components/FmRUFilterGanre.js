import React, {Component} from 'react';

export default class FmRUFilterGanre extends Component
{	
	constructor(props) 
	{
		super(props);
		this.state = {
		  checked: props.data.check===1 ? "checked" : ""
		};
		this.check = this.check.bind(this);
	}
	componentWillReceiveProps (nextProps) 
	{
		this.setState({
			//checked: nextProps.data.check===1 ? "checked" : ""
		});
	}
	render()
	{ 
		const {data} = this.props;
		const classNames = [this.state.checked, "ganre_checkbox"].join(" ");
		return (
			<div className="col-lg-6 col-md-6 col-sm-12 col-12 " style={{overflow:"hidden"}}>								
				<input 
					type="checkbox" 
					name={"ganre_" + this.props.name + data.id} 
					id={"ganre_" + this.props.name + data.id} 
					className={ classNames }
					onChange={this.check}
					defaultValue={ data.check }
				/>
				<label htmlFor={"ganre_" + this.props.name + data.id}>
					{ data.name }
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
