import React, {Component, Fragment} from 'react';
import SVGDraw from './SVGDraw';
import Vocabulary from "./Vocabulary"

export default class DrawingState extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			background:props.background ? props.background : "#FFF",
			width:props.width,
			height:props.height,
			color:props.color ? props.color : "#111",
			think:props.think ? props.think : "3",
			path:props.path ? props.path : []
		};
	}
	
	render()
	{
		let{ width, height, background, think, color, path } = this.state;
		const style={width:width, height:height, backgroundColor:background, position:"relative"};
		return <div style={style}>
			<SVGDraw
				width={width}
				height={height}
				color={color}
				think={think}
				path={path}
				onDraw = {this.draw}
				id={this.props.id}
			/>
			<div className="reload-btn" onClick={this.reload}>
				<i className="fas fa-sync"></i>
			</div>
		</div>;
	}
	
	reload = () =>
	{
		this.setState({ path:[] });
	}
	
	draw = (data) =>
	{
		this.setState({ path:data });
	}
}