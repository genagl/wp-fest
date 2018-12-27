import React, {Component} from 'react';
import Foo from '../Foo';
import Vocabulary from './Vocabulary';

export default class TextArea extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			value: this.props.value,
			is_mic:false,
			length:0
		}
	}
	componentWillReceiveProps  (nextProps) 
	{
		console.log( nextProps.value);
		this.state = {
			value: nextProps.value,
			is_mic:false,
			length:0
		};
	}
	componentWillUnmount()
	{
		this.stopMic();
	}
	render()
	{
		return <div 
			style={{position:"relative", overflow:"hidden", padding:0 }}
			className={this.props.className}
		>
			<textarea 
				className='w-100' 
				placeholder={this.props.placeholder}
				rows={this.props.rows || '6'} 
				onChange={this.onTextarea} 
				value={this.state.value }
				style={{minHeight:70, }}
			/>
			{ 
				this.audioJungle() 
			}
		</div>
	}
	audioJungle()
	{
		return "";
		const classes = this.state.is_mic ? ["mta", "open"] : ["mta"];
		const mclasses = this.state.is_mic ? ["fmRU_button xl mcph hint hint--top"] : ["fmRU_button xl mcph hint hint--left"];
		const st = window.mayMic ? {color:"red"} : {};
		return <div className={classes.join(" ")} >
				<div className="fone" />
				<div 
					className={mclasses} 
					data-hint={Vocabulary.getText("Record with microphone")} 
					onClick={this.changeMic}
				>
					<i className="fas fa-microphone-alt"></i>	
				</div>
				<div className="molto">
					<div 
						className={[ "fmRU_button xl pl hint hint--top", window.mayMic ? "hidden" : "" ].join(" ")}
						data-hint={Vocabulary.getText("Record")}
						onClick={this.startMic}
					>
						<i className="fas fa-circle" style={st}></i>	
					</div>
					<div 
						className={[ "fmRU_button xl ps  hint hint--top", !window.mayMic ? "hidden" : "" ].join(" ")} 
						data-hint={Vocabulary.getText("Get text")}
						onClick={this.stopMic}
					>
						<i className="fas fa-pause"></i>	
					</div>
				</div>
				<div className="moltoSlider" >
					<div className="moltoIn" 
						style={{width: this.state.length * 100 +  "%"}}
					/>
				</div>
			</div>;
	}
	onTextarea = (evt) =>
	{
		var val = evt.currentTarget.value;
		this.props.onChange(val);
		this.setState({
			value: val,
		});
	}
	changeMic = () =>
	{
		this.setState({
			is_mic: !this.state.is_mic
		});
		this.stopMic();
	}
	startMic = () =>
	{		
		window.mayMic = true;
		window.micLength = 0;
		window.handleSuccess(window.mstream);
		clearInterval(this.timer);
		this.timer = setInterval(
			( ) =>
			{
				var len = window.micLength / window.micMax;
				window.micLength = len >= 1 ? 0 : window.micLength;
				this.setState({ length : len });
				//console.log(  window.micLength, window.micMax );
			}, 10
		)
	}
	stopMic = () =>
	{
		clearInterval(this.timer);
		window.micLength = 0;
		this.setState({ length : 0});
		window.mayMic = false;
	}
}