import React, {Component, Fragment} from 'react';
import Voc from './Voc';
import Vocabulary from './Vocabulary';
import { Link } from 'react-router-dom';
import get_url from "../index"
import icon1 from "../img/022-video-call-1.svg";
import icon2 from "../img/employee.svg";
import icon3 from "../img/login1.svg";

export default class FmRULoginForm extends Component
{
	render() 
	{ 
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
			/*
			< div style={{float: "left"}} >
				<span 
					className={"login-name"}
					onClick = { onUser }
					data-fmru_type="logout" 
					data-args="0"
				> 
					{user.name} 
				</span>
				<div 
					className="fmRU_button light xl" 
					onClick = { onLogout }
					data-fmru_type="logout" 
					data-args="0"
					title="Log out"
				>
					<i className="fas fa-sign-out-alt"></i>
				</div>
			</div>;
			*/
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
					{register}
				</Fragment>
			);
	}
	onLogout = (evt)=>
	{
		console.log(this.props);
		this.props.onLogout();
	}
}