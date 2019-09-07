import React, {Component} from 'react';
import Voc from './Voc';
import Vocabulary from './Vocabulary';
import Foo from '../Foo';

export default class FmRURegisterWindow extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			log : "",
			psw : "",
			psw2 : "",
			eml : "",
			showLogin : false,
			showPsw1 : false,
			showPsw2 : false,
			showEmail : false,
			la:true
		};
	}
	changeLogin(evt)
	{
		var log = evt.currentTarget.value;
		log 	= log.replace(/[^a-z0-9_]/g, '');
		this.setState({
			log : log,
			showLogin:false
		});
	}
	changePsw(evt)
	{
		var psw = evt.currentTarget.value;
		psw 	= psw.replace(/[^a-z0-9_]/g, '');
		this.setState({
			psw : psw,
			showPsw1:false
		});
	}
	repeatePsw(evt)
	{
		var psw2 = evt.currentTarget.value;
		psw2 	= psw2.replace(/[^a-z0-9_]/g, '');
		this.setState({
			psw2 : psw2,
			showPsw2:false
		});
	}
	changeEml(evt)
	{
		var eml = evt.currentTarget.value;
		this.setState({
			eml : eml,
			showEmail:false
		});
	}
	loginAuto = evt =>
	{
		this.setState({
			la : !this.state.la,
		});
	}
	onSet(evt)
	{
		var en = false;
		if(this.state.log === "")
		{
			this.setState({showLogin:true});
			en = true;
		}
		if(this.state.psw === "")
		{
			this.setState({showPsw1:true});
			en = true;
		}
		if(this.state.psw2 !== this.state.psw)
		{
			this.setState({showPsw2:true});
			en = true;
		}
		if(this.state.eml === "")
		{
			this.setState({showEmail:true});
			en = true;
		}
		if(en) return;
		this.props.register(this.state);
		
	}
	responseVk = response =>
	{
		this.props.registrVK(response);
	}
	render()
	{ 
		return (
			<div className='modal fade' id='registerModal' tabIndex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
				<div className='modal-dialog' role='document'>
					<div className='modal-content'>
							<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
								<span aria-hidden='true'>&times;</span>
							</button>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalLabel'>
								<Voc text={"Register new User"} />
							</h5>
						</div>
						<div className='modal-body'>
							<div className="login-username">
								<small style={{color:"#6c757d"}}>{Vocabulary.getText("Set name by latin")}</small>
								<div className={this.state.showLogin ? "input-group _alert2" : "input-group" } >
									<div className="input-group-prepend">
										<div className="input-group-text">
											<i className="fas fa-user-tie"></i>
										</div>
									</div>
									<input type="text" 
										className={ "form-control" } 
										id="user_login1" 
										name="log1" 
										placeholder="Имя пользователя" 
										size="20" 
										value={this.state.log}
										onChange={evt =>this.changeLogin(evt)}
									/>
								</div>
							</div>
							<div className="spacer-10" />
							<div className="login-username">
								<small style={{color:"#6c757d"}}>{Vocabulary.getText("Set password")}</small>
								<div className={this.state.showPsw1 ? "input-group _alert2" : "input-group" } >
									<div className="input-group-prepend">
										<div className="input-group-text">
											<i className="fas fa-unlock-alt"></i>
										</div>
									</div>
									<input 
										type="password" 
										className={ "form-control" }
										id="user_pass1" 
										name="pwd1" 
										placeholder="пароль" 
										size="20" 
										
										value={this.state.psw}
										onChange={evt =>this.changePsw(evt)}
									/>
								</div>							
							</div>
							<div className="spacer-10" />
							<div className="login-username">
								<small style={{color:"#6c757d"}}>{Vocabulary.getText("Repeate password")}</small>
								<div className={this.state.showPsw2 ? "input-group _alert2" : "input-group" } >
									<div className="input-group-prepend">
										<div className="input-group-text">
											<i className="fas fa-unlock-alt"></i>
										</div>
									</div>
									<input 
										type="password" 
										className={ "form-control" }
										id="user_pass2" 
										name="pwd2" 
										placeholder="повторить пароль" 
										size="20" 
										
										value={this.state.psw2}
										onChange={evt =>this.repeatePsw(evt)}
									/>
								</div>							
							</div>
							<div className="spacer-10" />
							<div className="login-username">							
								<small style={{color:"#6c757d"}}>{Vocabulary.getText("Set your email")}</small>
								<div className={this.state.showEmail ? "input-group _alert2" : "input-group" } >
									<div className="input-group-prepend">
										<div className="input-group-text">
											<i className="fas fa-at"></i>
										</div>
									</div>
									<input 
										type="email" 
										className= "form-control"
										id="user_eml" 
										name="eml" 
										placeholder="e-mail" 
										size="20" 										
										value={this.state.eml}
										onChange={evt =>this.changeEml(evt)}
									/>
								</div>							
							</div>
						</div>						
						<div className='modal-footer' style={{display:"block"}}>	
							<div className="pull-right">
								<div className="fmRU_button " 
									onClick = {evt => this.onSet(evt)}
								>
									<i className="fa fa-caret-right"></i>
								</div>
							</div>		
							<div className="login-remember pull-left">								
								<input 
									type="checkbox"  
									id="la"
									className="checkbox" 
									onChange={this.loginAuto} 
									checked={this.state.la}
								/>
								<label htmlFor="la">
									<Voc text={"Log in automaticaly"} />
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
