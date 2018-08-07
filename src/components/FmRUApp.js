import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';

import * as actions from "../actions/actions";
import Foo from "../Foo";

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
import './bootstrap.min.css';
import "react-bootstrap";
import {getCookie, setCookie, deleteCookie,voc} from "./FmRUAppExt";

import icon1 from "../img/test.svg";
import icon2 from "../img/kabuki.svg";
import icon3 from "../img/tools-and-utensils-1.svg";
import icon4 from "../img/festLogo.svg";

Vocabulary.init( voc );

export const BLOG_API = 'http://fest3.metaversitet.ru'; //window.location.href;
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
	componentWillReceiveProps (nextProps) 
	{
		//console.log("componentWillReceiveProps=" + this.state.code);		
	}
	componentWillUpdate  (nextProps) 
	{
		//console.log("---", this.state.code);
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
	componentWillUnmount()
	{
		//clearInterval(this.timer);
	}
	componentDidUpdate()
	{
		if(this.props.data.prompt)
		{
			var data = this.props.data.prompt;
			this.a_alert( typeof data === "string" ? {content:data} : data ); 
		}
		//if($(".container.colored:not(.not)").height() < $(window).height())
		//	$(".container.colored:not(.not)").height($(window).height());
		//else
		//	$(".container.colored:not(.not)").css({height:"auto"});
	}
	render()
	{ 	
		const loader = <svg 
			width='100' 
			height='100' 
			xmlns="http://www.w3.org/2000/svg" 
			viewBox="0 0 140 140" 
			preserveAspectRatio="xMidYMid"
			className={["uil-ring-alt", window.is_loader ? "visible" : "hidden"].join(" ")}
			ref={this.loader}
		>
			<rect x="0" y="0" width="140" height="140" fill="none" className="bk"></rect>
			<circle cx="70" cy="70" r="30" stroke="#888888" fill="none" strokeWidth="14" strokeLinecap="round">
			</circle>
			<circle cx="70" cy="70" r="30" stroke="#CCCCCC" fill="none" strokeWidth="10" strokeLinecap="round">
			</circle>
			<circle cx="70" cy="70" r="30" stroke="#34543f" fill="none" strokeWidth="9" strokeLinecap="round">
				<animate attributeName="stroke-dashoffset" dur="6s" repeatCount="indefinite" from="0" to="502">
				</animate>
				<animate attributeName="stroke-dasharray" dur="6s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4">
				</animate>
			</circle>
		</svg>;
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
			case "rest_no_route":
				cont = this.get404(this.props.data.data.status, this.props.data.message);
				break;				
			default:
				cont = <section>
					<div className="row">
						<div className="col-12 text-right">
							
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
					onLogout = {this.onLogout}
					onUser = {this.onUser}
				/>		
				<FmRUUserPage data={this.props.data} prnt={this} onFirst={ this.onMemberClick.bind(this) }  />
			</div>
		);
				
	}
	page()
	{
		const posts		= this.props.data.posts.map(elem => (
			<div className="row" key={elem.id}>
				<div className="col-12">
					<div className="diary_post">
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
						onItemClick = {this.onMemberClick.bind(this)} 
						mtype = {"card"}
					/>	
				</div>
			</section>
		</Fragment> : "";
		return (	
		<Fragment>
			<div className='container colored'>
				< FmRUHead 
					p={this.props.data} 
					prnt={this}
					page_type = "page" 
					onItemClick = {this.onMemberClick.bind(this)}					
					login = {this.login.bind(this)}
					register={this.onRegister}
					onLogout = {this.onLogout}
					onUser = {this.onUser}
				/>		
				<section>
					<div className="carousel-indicators">				
						<div 
							className="indicator classic"
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
							login = { this.login.bind(this) }
							onLogout={this.onLogout } 
							is_register={this.props.data.is_register}
						/>
						<div 
							className="indicator classic"
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
					<div className="row justify-content-center">
						<div className="col-lg-6 col-md-8 col-sm-12">
							<div className='display-3 text-center'>
								{this.props.data.title}
							</div>
							<div className="spacer-30" />
							{FmRUPhase.getText()}
							<div className="spacer-10" />
							{this.props.data.content}
						</div>
					</div>
				</section>
			</div>
			{my_projects}
			<div className='container colored'>
				<section>
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
				</section>
			</div>
		</Fragment>);
	}
	list()
	{	
		const countChooser = this.props.data.count_chooser ? 
			<div 
				className="indicator classic"												
				data-toggle='modal'
				data-target='#countModal' 
			>
				<div className="n1"><Voc text={"Count"} /></div>
				<div className="iconnn">
					<img src={ icon3 } alt=''/>
				</div>
			</div>: "";
		const user_descr = this.props.data.roles.map(elem => 
			<div 
				className="role_descr"
				key={"roledescr_"+elem } 
				dangerouslySetInnerHTML={{ __html : Vocabulary.getText(FmRUUser.bySlug(elem)[0].descr) }} 
			/>
		);
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
		return (
		<Fragment>
			<div className='container colored'>
				< FmRUHead 
					p={this.props.data} 
					prnt={this}
					page_type = "page" 
					onItemClick = {this.onMemberClick.bind(this)}					
					login = {this.login.bind(this)}
					register={this.onRegister}
					onLogout = {this.onLogout}
					onUser = {this.onUser}
				/>		
				<section>					
					<div className="carousel-indicators">					
						<div 
							className="indicator classic"	
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
							login = { this.login.bind(this) }
							onLogout={this.onLogout } 
							is_register={this.props.data.is_register}
						/>
						<div 
							className="indicator classic"													
							data-toggle='modal'
							data-target='#filterModal' 
						>
							<div className="n1"><Voc text={"Ganres"} /></div>
							<div className="iconnn">
								<img src={ icon2 } alt="" />
							</div>
						</div>
						{countChooser}
					</div>					
					<div className="row">
						<div className="col-12 text-center">
							<div className="spacer-10" />
							{FmRUPhase.getText()}
						</div>
					</div>
				</section>
			</div>
			{my_projects}
			<div className='container colored'>
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
			<div className='container colored'>	
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
		
		return (
			<div className='container colored'>				
				< FmRUHead 
					p={this.props.data}  
					prnt={this}
					page_type = "page" 
					onItemClick = {this.onMemberClick.bind(this)}					
					login = {this.login.bind(this)}
					register={this.onRegister}
					onLogout = {this.onLogout}
					onUser = {this.onUser}
				/>		
				<section>
					<div className="carousel-indicators">				
						<div 
							className="indicator classic"	
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
							login = { this.login.bind(this) }
							onLogout={this.onLogout } 
							is_register={this.props.data.is_register}
						/>	
						<Link to="/">
							<div 
								className="indicator classic"
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
	
	fetchFile(code, data, type)
	{
		return fetch(BLOG_API + '/wp-json/get_main/' + code,
		{
			method: 'POST',
				headers: {
				  'Accept': type,
				  'Content-Type': type
				},
				body:{
					data:data,
					username: this.state.log, 
					password: this.state.psw 
				}
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
		this.loader.current.style.opacity = 1;
		window.is_loader=1;
		code = !code ? "page" : code;
		this.props.onPropClick( code, this.state, args, log, psw );
	}
	onUser = (evt)=> {
		this.fetch("user", "");
	}
	login(obj)
	{
		this.setState({
			log: obj.log,
			psw: obj.psw
		});
		setCookie("l", obj.log +"&"+obj.psw, {expires:4*3600});
		this.on_fetch( this.state.code, this.state.args, obj.log, obj.psw );		
	}
	onRegister = obj =>
	{
		this.on_fetch( "register_user", obj );		
	}
	onLogout = ( ) =>
	{
		console.log("onLogout");
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
		console.log(fmru_type);
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
	onPropClick : ( code, data, args, log, psw ) => 
		dispatch(
			actions.onPropClick( code, data, args, log, psw )
		),
	//onGfilter: (ganres, gfilter) => dispatch(actions.onGfilter( ganres, gfilter )),
})

export default connect( mapStateToProps, mapDispatchToProps )(FmRUApp);