import React, {Component, Fragment} from 'react';
import Voc from './Voc';
import Vocabulary from './Vocabulary';
import { Link } from 'react-router-dom';
import get_url from "../index"
import icon1 from "../img/022-video-call-1.svg";
import icon2 from "../img/employee.svg";
import icon3 from "../img/login1.svg";
import VKLogin from './VKLogin';

export default class FmRULoginForm extends Component
{
	state = {
		visibled 	: false,
		width		: document.body.clientWidth,
		right		: 0
	}
	
	componentDidMount() 
	{
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
		document.body.addEventListener('click', this.onMouseLeaveHandler);
	}
    componentWillUnmount() 
	{
		window.removeEventListener('resize', this.updateWindowDimensions);
		document.body.removeEventListener('click', this.onMouseLeaveHandler);
	}
	onMouseLeaveHandler = e =>
	{	
		this.setState({
			visibled:false
		});
	}
	updateWindowDimensions = () =>
	{		
		const enteringing = document.getElementById("enteringing");
		if(enteringing)
			this.setState({ 
				width 	: document.body.clientWidth,
				right	: enteringing.offsetLeft,
			});
	}
	render() 
	{ 
		const less	= this.state.width - this.state.right > 220;
		const w		= less ? "auto" : this.state.width;
		const r		= less ? -5 : this.state.right - 240;
		const { onLogout, onUser, user, is_register } = this.props;
		const style ={width:50};
		const register = is_register == 1 ? (		
			<div className="indicator classic" data-toggle='modal' data-target='#registerModal'>
				<div className="n1">
					{Vocabulary.getText("Register")}
				</div>
				<div className="iconnn">
					<img src={ icon2 } alt='' style={style} />
				</div>
			</div>) : "";
		const soc =  <div style={{position:"relative", width:35, marginRight:-30, zIndex:2 }}>
			<VKLogin
				apiId={process.env.REACT_APP_VK_API}
				value={"vk"}
				text = {Vocabulary.getText("Login with VK")}
				fields="name,email,picture"
				onClick={this.onVK}
				callback={this.responseVk} 
			/>
			<VKLogin
				apiId={process.env.REACT_APP_GOOGLE_API}
				value={"google"}
				style={{backgroundColor:"#AA0000"}}
				text = {Vocabulary.getText("Login with Google")}
				fields="name,email,picture"
				onClick={this.onGoogle}
				callback={this.responseGoogle} 
			/>
		</div>;
		const soc2 =  <div style={{position:"relative", width:35, marginLeft:-30 }} id="enteringing">
			<VKLogin
				apiId={process.env.REACT_APP_VK_API}
				value={"vk"}
				text = {Vocabulary.getText("Login with VK")}
				fields="name,email,picture"
				onClick={this.onVK}
				callback={this.responseVk} 
			/>
			<div className="soc" onClick={()=> this.setState({visibled : !this.state.visibled}) }>
				<i className="fas fa-angle-double-down" />				
			</div>
			<div className="login-popup" style={{ 
				height: !this.state.visibled ? 0 : 200, 
				opacity: !this.state.visibled ? 0 : 1,
				right : r
			}}>
				<VKLogin
					apiId={process.env.REACT_APP_VK_API}
					value={"vk"}
					fill={1}
					text = {Vocabulary.getText("Login with VK")}
					fields="name,email,picture"
					onClick={this.onVK}
					callback={this.responseVk} 
				/>	
				<VKLogin
					apiId = {process.env.REACT_APP_GOOGLE_API}
					value = {"google"}
					fill={1}
					style = {{ backgroundColor:"#AA0000" }}
					text  = { Vocabulary.getText("Login with Google") }
					fields="name,email,picture"
					onClick={this.onGoogle}
					callback={this.responseGoogle} 
				/>
				<VKLogin
					apiId = {process.env.REACR_APP_LEADER_ID_API}
					value = {"leader-id"}
					fill={1}
					style = {{ backgroundColor:"#FFFFFF60" }}
					text  = ""
					onClick={this.onGoogle}
					callback={this.onGoogle} 
				/>
				<VKLogin
					apiId = {process.env.REACT_APP_FB_API}
					value = {"facebook"}
					fill={1}
					style = {{ backgroundColor:"#000055" }}
					text  = { Vocabulary.getText("Login with Facebook") }
					onClick={this.onGoogle}
					callback={this.onGoogle} 
				/>
			</div>
			
			
		</div>;
		if(user.user_id > 0)
			return (
			<div style={{position:"relative"}}>				
				<Link to="myConsole">
					<div 
						className="indicator classic" 
						onClick = { onUser }
						data-fmru_type="logout" 
						data-args="0"
					>
						<div className="n1">
							{user.name} 
						</div>
						<div className={"iconnn"}>
							<img src={ user.avatar ? get_url() + user.avatar : icon1 } alt="" width={55} />
						</div>
					</div>
				</Link>
				<Link to="/">
					<div 
						className="logoutIcon hint hint--right" 
						data-hint={ Vocabulary.getText("Log out") }
						onClick = { this.onLogout }
						data-fmru_type="logout" 
						data-args="0"
					>
						<i className="fas fa-times"></i>
					</div>
				</Link>
			</div>
			);		
		else
			return (	
				<Fragment>
					<div className="indicator classic" data-toggle='modal' data-target='#loginModal'>
						<div className="n1">
							{Vocabulary.getText("Log in")}
						</div>
						<div className="iconnn">
							<img src={ icon3 } alt=''  style={style} />
						</div>
					</div>
					{soc2}
					{register}
				</Fragment>
			);
	}
	onVK = evt =>
	{
		this.setState({visibled : false});
	}
	onGoogle = evt =>
	{
		this.setState({visibled : false});
	}
	onLogout = (evt)=>
	{
		this.props.onLogout();
	}
	responseVk = response =>	
	{
		this.setState({visibled : false});
		this.props.onSocial( response );
	}
	responseGoogle = response =>	
	{
		this.setState({visibled : false});
		this.props.onSocial( response );
	}
}