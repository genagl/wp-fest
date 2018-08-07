import React, {Component} from 'react';
import Voc from './Voc';

export default class FmRULoginWindow extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			log : "",
			psw : "",
			
		};
	}
	changeLogin(evt)
	{
		var log = evt.currentTarget.value;
		this.setState({
			log : log,
		});
	}
	changePsw(evt)
	{
		var psw = evt.currentTarget.value;
		this.setState({
			psw : psw,
		});
	}
	onSet(evt)
	{
		this.props.login(this.state);
		if(window.loggedIn)
			window.loggedIn(this.state);
	}
	render()
	{ 
		return (
			<div className='modal fade' id='loginModal' tabIndex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
				<div className='modal-dialog' role='document'>
					<div className='modal-content'>
							<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
								<span aria-hidden='true'>&times;</span>
							</button>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalLabel'>
								<Voc text={"Log in please"} />
							</h5>
						</div>
						<div className='modal-body'>
							<div className="login-username">							
								<div className="input-group">
									<div className="input-group-prepend">
										<div className="input-group-text">
											<span className="dashicons dashicons-admin-users"></span>
										</div>
									</div>
									<input type="text" 
										className="form-control" 
										id="user_login" 
										name="log" 
										placeholder="Имя пользователя" 
										size="20" 
										value={this.state.log}
										onChange={evt =>this.changeLogin(evt)}
									/>
								</div>
							</div>
							<div className="spacer-10" />
							<div className="login-username">
								<div className="input-group">
									<div className="input-group-prepend">
										<div className="input-group-text">
											<span className="dashicons dashicons-hidden"></span>
										</div>
									</div>
									<input 
										type="password" 
										className="form-control" 
										id="user_pass" 
										name="pwd" 
										placeholder="пароль" 
										size="20" 
										
										value={this.state.psw}
										onChange={evt =>this.changePsw(evt)}
									/>
								</div>							
							</div>
						</div>						
						<div className='modal-footer' style={{display:"block"}}>	
							<div className="pull-right">
								<div className="fmRU_button " 
									id="user_login_btn"
									data-dismiss='modal' 
									onClick = {evt => this.onSet(evt)}
								>
									<i className="fa fa-caret-right"></i>
								</div>
							</div>		
							<div className="login-remember pull-left">								
								<input type="checkbox" name="rememberme" id="rememberme" value="forever" className="checkbox"/>
								<label htmlFor="rememberme">
									<Voc text={" Запомнить меня"} />
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
