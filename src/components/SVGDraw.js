import React, {Component, Fragment} from 'react';
import FluidSvg from "react-fluid-svg";
import $ from "jquery";

export default class SVGDraw extends Component 
{
	constructor(props)
	{
		super(props);
		this.state = {
			isDraw: false,
			path: $.isArray(props.path) ? props.path : [ ],
			current: [],
			x:0,
			y:0
		}
	}
	componentDidMount ()
	{
		this.timer = setInterval(()=>
		{
			if(!this.state.isDraw) return;
			//var pos = $(this).offset();
			var arr = this.state.current;
			arr.push({ x:this.state.x - 500, y:this.state.y - 100});
			this.setState({
				current: arr
			});
		}, 2);
	}
	componentWillUnmount()
	{
		clearInterval(this.timer);
	}
	componentWillReceiveProps (nextProps) 
	{
		this.setState({path:nextProps.path, current:[]});		
	}
	render() 
	{
		const viewBox = "0 0 "+ this.props.width+ " " + this.props.height;
		const _path = this.state.path.map((elem, num) => (
			<path d={elem} stroke={this.props.color} strokeWidth={this.props.think}  fillOpacity="0" fill="none"  key={"path_"+num} />
		));
		var np = this.drawCurrent();
		_path.push( np );
		return (
			<FluidSvg 
				width={this.props.width}
				height={this.props.height}
				onMouseDown = { this.MouseDown }
				onMouseUp = { this.MouseUp }
				onMouseMove = { this.MouseMove }
			>
				<svg version="1.1" viewBox={viewBox} id={this.props.id}>
					{ _path }
				</svg>
			 </FluidSvg>
		);
	}
	MouseDown = () =>
	{
		this.setState({
			isDraw: true,
			current: []
		});
	}
	MouseUp = () =>
	{
		var np = this.drawCurrent();
		var arr = this.state.path;
		arr.push(np.props.d);
		this.setState({
			isDraw:false,
			path: arr
		});
		this.props.onDraw(this.state.path);
	}
	MouseMove = e =>
	{
		this.setState({
			x: e.pageX, 
			y: e.pageY 
		});
	}
	drawCurrent = () =>
	{
		var _curr = "M";
		var c = [];
		if(this.state.current.length)
		{
			this.state.current.forEach(elem => {
				c.push(elem.x + "," + elem.y);
			});
			if(c.length)
				_curr += c.join(" L ");
			return <path d={_curr} stroke={this.props.color} strokeWidth={this.props.think} fillOpacity="0" fill="none" key = {"" + this.state.path.length} />;
		}
		return "";
	}
}