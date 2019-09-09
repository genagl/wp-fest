import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import get_url from "../index";

import * as actions from "../actions/actions";
import Foo from "../Foo";
import {base64_encode} from "./FmRUAppExt";

import { AppToaster } from "./utils/blueUtils";
import { 
	Tab, Tabs, 
	Button, 
	Card, 
	Elevation,    
	Icon,
    InputGroup,
    Intent,
	FormGroup
} from "@blueprintjs/core";

import DrawingState from "./DrawingState.js";
import FmRUPhase from './FmRUPhase';
import FmRUHead from './FmRUHead';
import FmRUUser from './FmRUUser';
import FmRUMemberBox from './FmRUMemberBox';
import FmRUMemberPage from './FmRUMemberPage';
import FmRULoginForm from './FmRULoginForm';
import FmRUPagi from './FmRUPagi';
import FmRUUserPage from './FmRUUserPage';
import Vocabulary from './Vocabulary';
import Voc from './Voc';
import Aalert from './Aalert';
import Loader from "./Loader";
import './bootstrap.min.css';
import "react-bootstrap";
import {getCookie, setCookie, deleteCookie,voc} from "./FmRUAppExt";
import {Router, Route, Switch, Redirect, withRouter} from 'react-router';

import icon1 from "../img/test.svg";
import icon2 from "../img/kabuki.svg";
import icon3 from "../img/tools-and-utensils-1.svg";
import icon4 from "../img/festLogo.svg";

Vocabulary.init( voc );

export const BLOG_API = 'http://wp-fest.genagl.ru'; //window.location.href;
class FmRUApp extends Component
{	
    constructor(props) 
	{
        super(props);
		var lass = getCookie("l");
		var l = lass ? lass.split("&") : [] ;
		var log ="";
		var psw = "";
		if(l.length)
		{
			log = l[0];
			psw = l[1];
		}
        this.state = 
		{
            code: "",
            args: "",
			token: "",
			log: log,
			psw: psw,
			data:{},
			gfilter:[],
			mpp:props.mpp,
			mtype:props.mtype
        };
		this.alert = React.createRef();
		this.loader = React.createRef();
		
    }
	componentDidMount ()
	{
			Foo.app 		= this;
			Foo.is_comment	= true;
			Foo.alert		= <Aalert 
					title={""} 
					content={"!!"}
					textarea=""
					okTitle={"ok"}
					escTitle={"cancel"}
					okHandler={function(){}} 
					escHandler={function(){}}
					checkTitle={""}
					ref = {this.alert}
				/>;
	}
	componentDidUpdate()
	{
		if(this.props.data.prompt)
		{
			var data = this.props.data.prompt;
			this.a_alert( typeof data === "string" ? {content:data} : data ); 
		}
		if(this.props.data.msg)
		{
			AppToaster.show({  
				intent: Intent.SUCCESS,
				icon: "person", 
				timeout:10000,
				className: "px-4 py-4",
				message: this.props.data.msg				
			});
		}
	}
	render()
	{ 	
		const loader = <Loader ref={this.loader} />;
		FmRUPhase.setPhase(this.props.data.status);
		Foo.is_expert = this.props.data.is_expert; 		
		FmRUUser.instance = <FmRUUser 
			name = {this.props.data.name }
			user_id = {this.props.data.user_id }
			is_expert = {this.props.data.is_expert }
			roles = {this.props.data.roles }
		/>
		FmRUApp.user = Foo.app;
		var cont;
		switch( this.props.code )
		{
			case "user":
				cont = this.user();
				break;	
			case "fmru_player":
				cont = this.fmru_player();
				break;				
			case "page":
				cont = this.page();	
				break;						
			case "list":
				cont = this.list();	
				break;				
			case "invalid_username":
			case "incorrect_password":
				deleteCookie("l");
				//this.state.log = "";
				//this.state.psw = "";
				//this.fetch( "invalid_username", 0);
				cont = this.get404("invalide_username", "invalid username");
				break;		
			case "newProjectDoc":
				cont = this.newProjectDoc();
				break;
			case "rest_no_route":
				cont = this.get404(this.props.data.data.status, this.props.data.message);
				break;				
			default:
				cont = <section>
					<div className="row">
						<div className="col-12 text-right">
							<Switch>
								<Route exact path='/fmru_member/:id' render = {
								() => {
									this.fmru_player();
								}} />
							</Switch>
						</div>
					</div>
				</section>;
		}	
		return <Fragment>
			{Foo.alert}
			{cont}
			
			
			{loader}
		</Fragment>;
	}
	user()
	{
		return (
			<div className='container colored not'>
				< FmRUHead 
					p={this.props.data}  
					prnt={this}
					page_type = "page" 
					onItemClick = {this.onMemberClick.bind(this)}					
					login = {this.login.bind(this)}
					register={this.onRegister}
					onSocial={this.onSocial}
					onLogout = {this.onLogout}
					onUser = {this.onUser}
				/>		
				<FmRUUserPage data={this.props.data} prnt={this} onFirst={ this.onMemberClick.bind(this) }  />
			</div>
		);
				
	}
	newProjectDoc()
	{
		return (
			<div className='container colored not'>
				< FmRUHead 
					p={this.props.data}  
					prnt={this}
					page_type = "page" 
					onItemClick = {this.onMemberClick.bind(this)}					
					login = {this.login.bind(this)}
					register={this.onRegister}
					onSocial={this.onSocial}
					onLogout = {this.onLogout}
					onUser = {this.onUser}
				/>		
				
					<div className="row justify-content-center">
						<div className="col-lg-6 col-md-8 col-sm-12">
							<DrawingState
								width = {600}
								height = {200}
								id="Drawing"
							/>	
							<div 
								className="btn btn-link"
							>
								{ Vocabulary.getText("send") }
							</div>
						</div>
					</div>
			</div>
		);
				
	}
	page()
	{
		//console.log( this.props.data );
		const posts		= this.props.data.posts.map(elem => (
			<div className="row" key={elem.id}>
				<div className="col-12">
					<div className="diary_post mt-2">
						<div className="diary_title">
							{elem.post_title}
						</div>
						<div className="diary_body"
							dangerouslySetInnerHTML={{ __html : elem.post_content }}
						/>
						<div className="diary_footer">
							<span> <i className="fas fa-clock" 	style={{opacity:0.5}}></i> {elem.post_date} </span>
							<span> <i className="fas fa-user"	style={{opacity:0.5}}></i> {elem.post_author} </span>
							<a 
								onClick={this.onMemberClick} 
								data-fmru_type="fmru_player"
								data-args={elem.prid}
							> 
								<i className="fas fa-folder"	style={{opacity:0.5}}></i> {elem.diary} 
							</a>
						</div>
					</div>
				</div>
				<div className="spacer-30"/>
			</div>
		))
		const crMyPrForm = <div className="row justify-content-center">
			<div className="col-lg-6 col-md-8 col-sm-12 mt-5">
				<div className='lead font-weight-bold text-center'>
					{this.props.data.title}
				</div>
				<div className="spacer-30" />
				{FmRUPhase.getText()}
				<div className="spacer-10" />
				<div 
					id="main_content"
					dangerouslySetInnerHTML={{ __html : this.props.data.content}}
				/>
			</div>
		</div>
		const my_projects = this.props.data.my_members.length ? 
		<Fragment>
			<section style={{background:"rgba(0,0,0,0.2)"}}>	
				<div className='colored  not'>
					<div className="row">
						<div className="col-md-12">
							<ul className="pagination justify-content-center">
								<li className="page-item">
									<a className="page-link"><strong>
										{Vocabulary.getText("My projects")}
									</strong></a>
								</li>
							</ul>
						</div>
					</div>
					<div className="spacer-10"/>					
					< FmRUMemberBox 
						members={this.props.data.my_members} 
						onItemClick = {this.onMemberClick } 
						mtype = {"card"}
					/>	
				</div>
			</section>
		</Fragment> : null;
		return (	
		<Fragment>
			<div className='container colored'>
				< FmRUHead 
					p={this.props.data} 
					prnt={this}
					page_type = "page" 
					onItemClick = {this.onMemberClick}					
					login = {this.login}
					register={this.onRegister}
					onSocial={this.onSocial}
					onLogout = {this.onLogout}
					onUser = {this.onUser}
				/>		
				<section>
					<div className="carousel-indicators">	
						<div 
							className="indicator classic"
							id='indicator_about'
							data-fmru_type="page"
							data-args="0"
							onClick={this.onMemberClick}		
						>
							<div className="n1"><Voc text={"About"} /></div>
							<div className="iconnn">
								<img src={ this.props.data.logo } alt="" />
							</div>
						</div>
						<FmRULoginForm 
							prnt={ this }
							user = { this.props.data } 
							onUser = { this.onUser }
							login = { this.login }
							onSocial={this.onSocial}
							onLogout={this.onLogout } 
							is_register={this.props.data.is_register}
						/>
						<div 
							className="indicator classic"
							id='indicator_members'
							data-fmru_type="list"
							data-args="0"
							onClick={this.onMemberClick}							
						>
							<div className="n1"><Voc text={"Members"} /></div>
							<div className="iconnn">
								<img src={ icon1 } alt="" />
							</div>
						</div>
					</div>	
					{this.getCurrUserRoles()}
					{crMyPrForm}
					{
						 this.props.data.user_id < 1 ? null : 
							<div className="row justify-content-center">
								<div className="col-lg-6 col-md-8 col-sm-12 text-center">
									<div className="spacer-30" />
									<div 
										className='btn btn-primary newProjectDoc'
										data-fmru_type="newProjectDoc" 
										data-args="0" 
										onClick={ this.onMemberClick }
									>
										{Vocabulary.getText("create new Project")}
									</div>
								</div>
							</div>
					}
				</section>
			</div>		
			{my_projects}
			<div className='container colored'>
			{
				this.props.data.posts.length > 0 ? 
					<section className="dark">
						<div className="row">				
							<FmRUPagi 
								data={ this.props.data.pagi } 
								onItemClick = {this.onMemberClick.bind(this)} 
								colm={this.props.data.colm} 
								title={Vocabulary.getText("Last posts")}
								prefix={"posts_"}
								fmru_type="page"
							/>
						</div>		
						{posts}
						<div className="row">					
							<div className="spacer-10" />
							<FmRUPagi 
								data={ this.props.data.pagi } 
								onItemClick = {this.onMemberClick.bind(this)} 
								colm={this.props.data.colm} 
								title={Vocabulary.getText("Last posts")}
								prefix={"posts_"}
								fmru_type="page"
							/>
						</div>	
					</section> : null
			}
			</div>
		</Fragment>);
	}
	list()
	{	
		const countChooser = this.props.data.count_chooser ? 
			<div 
				className="indicator classic"
				id='indicator_count'
				data-toggle='modal'
				data-target='#countModal' 
			>
				<div className="n1"><Voc text={"Count"} /></div>
				<div className="iconnn">
					<img src={ icon3 } alt=''/>
				</div>
			</div>: "";
		const user_descr = this.props.data.roles.map(elem => {
			return <div 
				className="role_descr"
				key={"roledescr_"+elem } 
				dangerouslySetInnerHTML={{ __html : Vocabulary.getText(FmRUUser.bySlug(elem)[0].descr) }} 
			/>
		});
		const about = this.props.data.enabled_rules ? <div 
			className="indicator classic"	
			id="indicator_about"	
			data-fmru_type="page"
			data-args="0"
			onClick={this.onMemberClick}
		>
			<div className="n1"><Voc text={"About"} /></div>
			<div className="iconnn">
				<img src={ this.props.data.logo } alt="" />
			</div>
		</div> : "" ;
		if(user_descr.length === 0)
			user_descr.push( 
				<div  
					className="role_descr"
					key={"roledescr_contributor" } 
					dangerouslySetInnerHTML={{ __html : Vocabulary.getText(FmRUUser.bySlug("contributor")[0].descr)}} 
				/> );
		const my_projects = this.props.data.my_members.length ? <Fragment>
			<section style={{background:"rgba(0,0,0,0.2)"}}>	
				<div className='colored  not'>
					<div className="row">
						<div className="col-md-12">
							<ul className="pagination justify-content-center">
								<li className="page-item">
									<a className="page-link"><strong>
										{Vocabulary.getText("My projects")}
									</strong></a>
								</li>
							</ul>
						</div>
					</div>
					<div className="spacer-10"/>					
					< FmRUMemberBox 
						members={this.props.data.my_members} 
						onItemClick = {this.onMemberClick.bind(this)} 
						mtype = {"card"}
					/>	
				</div>
			</section>		
		</Fragment>: "";
		const ganre_button = !this.props.data.is_ganres ? null :		
			<div 
				className="indicator classic"													
				id="indicator_ganres"													
				data-toggle='modal'
				data-target='#filterModal' 
			>
				<div className="n1"><Voc text={"Ganres"} /></div>
				<div className="iconnn">
					<img src={ icon2 } alt="" />
				</div>
			</div>;
		return (
		<Fragment>
			<div className='container colored _header'>
				< FmRUHead 
					p={this.props.data} 
					prnt={this}
					page_type = "page" 
					onItemClick = {this.onMemberClick.bind(this)}					
					login = {this.login }
					register={this.onRegister}
					onSocial={this.onSocial}
					onLogout = {this.onLogout}
					onUser = {this.onUser}
				/>		
				<section>					
					<div className="carousel-indicators">					
						{about}
						<FmRULoginForm 
							prnt={ this }
							user = { this.props.data } 
							onUser = { this.onUser }
							login = { this.login }
							onSocial={this.onSocial}
							onLogout={this.onLogout } 
							is_register={this.props.data.is_register}
						/>
						{ganre_button}
						{countChooser}
					</div>
					{this.getCurrUserRoles()}					
					<div className="row">
						<div className="col-12 text-center">
							<div className="spacer-10" />
							{FmRUPhase.getText()}
						</div>
					</div>
				</section>
			</div>
			{my_projects}
			<div className='container colored _main'>
				<section>	
					<div className="row">
						<FmRUPagi 
							data={ this.props.data.pagi } 
							onItemClick = {this.onMemberClick.bind(this)} 
							colm={this.props.data.colm} 
							title={Vocabulary.getText("Members")}
							prefix={"page_"}
							fmru_type="list"
						/>
					</div>			
					< FmRUMemberBox 
						members={this.props.data.members} 
						onItemClick = {this.onMemberClick.bind(this)} 
						mtype = {this.props.data.mtype}
					/>			
					<div className="row">
						<FmRUPagi 
							data={ this.props.data.pagi } 
							onItemClick = {this.onMemberClick.bind(this)} 
							colm={this.props.data.colm} 
							title={Vocabulary.getText("Members")}
							prefix={"page_"}
							fmru_type="list"
						/>
					</div>					
				</section>
			</div>			
			<div className='container colored _footer'>	
				<section style={{backgroundColor:"rgba(0,0,0,0.75)", color:"#FFF"}}>	
					<div className="row justify-content-start">
						<div className="col-lg-6 col-xm-6 col-md-6 col-sm-12 col-12 align-self-center">
						{user_descr}
						</div>
					</div>
				</section>	
			</div>
		</Fragment>);
	}
	fmru_player()
	{
		const about = this.props.data.enabled_rules ? <div 
			className="indicator classic"	
			id="indicator_about"	
			data-fmru_type="page"
			data-args="0"
			onClick={this.onMemberClick}
		>
			<div className="n1"><Voc text={"About"} /></div>
			<div className="iconnn">
				<img src={ this.props.data.logo } alt="" />
			</div>
		</div> : "" ;
		return (
			<div className='container colored'>				
				< FmRUHead 
					p={this.props.data}  
					prnt={this}
					page_type = "page" 
					onItemClick = {this.onMemberClick.bind(this)}					
					login = {this.login }
					register={this.onRegister}
					onSocial={this.onSocial}
					onLogout = {this.onLogout}
					onUser = {this.onUser}
				/>		
				<section>
					<div className="carousel-indicators">				
						{about}
						<FmRULoginForm 
							prnt={ this }
							user = { this.props.data } 
							onUser = { this.onUser }
							login = { this.login }
							onSocial={this.onSocial}
							onLogout={this.onLogout } 
							is_register={this.props.data.is_register}
						/>	
						<Link to="/">
							<div 
								className="indicator classic"
								id="indicator_to_list"
								data-fmru_type="list" 
								data-args="0"
								onClick = { this.onMemberClick.bind(this) }
							>
								<div className="n1"><Voc text={"To list"} /></div>
								<div className="iconnn">
									<img src={ icon1 } alt=''/>
								</div>
							</div>
						</Link>
					</div>
					{this.getCurrUserRoles()}
					<div className="row">
						<div className="col-12 text-center">
							<div className="spacer-10" />							
							{FmRUPhase.getText()}
						</div>
					</div>
					<FmRUMemberPage 
						mdata={this.props.data} 
						onItemClick = {this.onMemberClick.bind(this)}	
					/>
				</section>
			</div>
		
		);
	}
	get404(code, message)
	{
		switch(code)
		{
			case 404:
				return (
					<div className="container text-center">
						<div className="jumbotron align-items-center">
							<div className="row  justify-content-md-center  justify-content-sm-center">
								<div className="display-1 col-md-12">
									{code}
								</div>
								<div className="col-md-12">
									{message}
								</div>
								<div className="spacer-30" />
								<div 
									className="btn btn-primary " 
									data-fmru_type="page" 
									data-args="1" 
									onClick={(evt)=>this.onMemberClick(evt)}
								>
									{"Вернуться на первую"}
								</div>
							</div>
						</div>
					</div>

				);
			case "invalide_username":
				return (
					<div className="container text-center">
						<div className="jumbotron align-items-center">
							<div className="row  justify-content-md-center  justify-content-sm-center">
								<div className="col-md-12 display-4">
									<Voc text={message} />
								</div>
								<div className="spacer-30" />
								<div 
									className="btn btn-primary " 
									onClick={(evt)=>this.resetHandler(evt)}
								>
									{"Вернуться на первую"}
								</div>
							</div>
						</div>
					</div>
				);
			default:
				return (
					<div className="container colored text-center">
						<section>
							<div className="row">
								<div className="display-1 col-md-12">
									{code}
								</div>
								<div className="col-md-12">
									{message}
								</div>
								<div className="spacer-30" />
								<div 
									className="btn btn-primary " 
									data-fmru_type="page" 
									data-args="1" 
									onClick={(evt)=>this.onMemberClick(evt)}
								>
									{"Вернуться на первую"}
								</div>
							</div>
						</section>
					</div>
				);
				
		}
	}
	getCurrUserRoles()
	{
		return <div className="row">
			<div className="col-12 text-center mt-1">
				{ FmRUUser.rolesBlock() }
			</div>
		</div>
	}
	fetchFile( code, data )
	{
		return fetch(get_url() + '/wp-json/get_main/' + code,
		{
			method	: 'POST',
			headers :
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization":'Basic ' +  base64_encode( "genagl:zaq12ws")
			},
			body	:JSON.stringify({
				code: code,
				args: data,
			})
		}).then(r => r.json())
			.then( _data => {
				console.log(_data)
			});
	}
	fetch(fmru_type, args)
	{
		this.on_fetch( fmru_type, args, this.state.log, this.state.psw );
	}
	on_fetch( code, args, log, psw )
	{
		//console.log( code, args, log, psw );
		//this.loader.current.style.opacity = 1;
		window.is_loader=1;
		code = !code ? "page" : code;
		this.props.onPropClick( code, this.state, args, log, psw );
	}
	onUser = (evt)=> {
		this.fetch("user", "");
	}
	login = obj =>
	{
		this.on_fetch( 'login', obj );
		//this.fetchFile( 'login', obj );	
		return;
		
		this.setState({
			log: obj.log,
			psw: obj.psw
		});
		setCookie("l", obj.log +"&"+obj.psw, {expires:4*3600});
		//this.on_fetch( this.state.code, this.state.args, obj.log, obj.psw );		
	}
	onSocial = resp =>
	{		
		this.setState({
			log: resp.href,
			psw: resp.id
		});
		setCookie( "l", resp.href + "&" + resp.id, { expires : 4 * 3600 } );
		this.on_fetch( "social_login", resp );		
	}
	onRegister = obj =>
	{
		this.on_fetch( "register_user", obj );		
	}
	onLogout = ( ) =>
	{
		console.log(getCookie("token"));
		deleteCookie("token");
		console.log(getCookie("token"));
		deleteCookie("l");
		this.setState({
			log: "",
			psw: ""
		});
		this.on_fetch( this.state.code, this.state.args, "", "" );	
	}
	onOzenka(code, args)
	{
		this.fetch(code, args);
	}
	onMemberClick = (evt) => {
		var fmru_type = evt.currentTarget.dataset.fmru_type;
		var args = evt.currentTarget.dataset.args;
		//console.log(fmru_type);
		this.on_fetch( fmru_type, args, this.state.log, this.state.psw);
	}
	resetHandler =  evt => {
		this.setState({
			log:"",
			psw:""
		});
		this.on_fetch( "page", 0, "", "");
	}
	onGfilter = ( ganres, gfilter ) =>
	{
		//this.props.onGfilter( this.props.data.ganres, this.state.gfilter );
	}
	
	a_alert(data)
	{
		this.alert.current.show(data);
	}
	alert_hide=()=>
	{
		this.alert.current.hide();
	}
};

const mapStateToProps = state => ({
	...state
});
const mapDispatchToProps = dispatch => ({
	onPropLogin : ( code, data, args, log, psw ) => 
		dispatch(
			actions.onPropLogin( code, data )
		),
	onPropClick : ( code, data, args, log, psw ) => 
		dispatch(
			actions.onPropClick( code, data, args, log, psw )
		),
	//onGfilter: (ganres, gfilter) => dispatch(actions.onGfilter( ganres, gfilter )),
})

export default connect( mapStateToProps, mapDispatchToProps )(FmRUApp);