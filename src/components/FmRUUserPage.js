import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import Voc from './Voc';
import Vocabulary from './Vocabulary';
import $ from 'jquery';
import FmRUUserExtend from './FmRUUserExtend';
import FmRUUser from './FmRUUser';
import * as AdminData from "./UserAdminData";
import icon1 from "../img/test.svg";

export default class FmRUUserPage extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			isOpen : false,
			currentId:"console"
		}
		this.myConsole();
	}
	componentWillReceiveProps (nextProps) 
	{
		//this.setState({ data: nextProps.data });
	}
	componentDidMount ()
	{
		var w2 = $(window).height() - 20;
		$(".admin_panel").height( $(".admin_panel").height() < w2 &&  $(".admin_content").height() < w2 ? w2 : Math.max($(".admin_panel").height(), $(".admin_content").height()) );
		$(".admin_content").height( w2 );
	}
	render() 
	{ 	
		const pp = this.create_admin_panel();
		return pp;
	}
	create_admin_panel()
	{
		var dd = AdminData.getAdminData().slice(0);
		if(this.props.data.roles.in_array("administrator"))
		{
			dd.splice(1,0, {
				name: "Roles requests",
				slug: "roleReq",
				handler: "getRoleReq",
				args: ["roleReq"],
				icon: "fas fa-user-edit",
				extend: this.props.data.role_requests.length, 
				children:[ ],
				children2:[ ],
			});
			dd.splice(2,0, {
				name: "all Members",
				slug: "allMembers",
				handler: "allMembers",
				args: ["allMembers"],
				icon: "fas fa-book",
				extend2: this.props.data.ext.all, 
				children:[ ],
				children2:[ ],
			});
		}
		var newD = [];		
		for(var num = 0; num < dd.length; num++)
		{
			newD[num] = Object.assign({}, dd[num]);
			newD[num].current =	this.state.currentId == newD[num].slug ? 1 : 0;		
			for(var i = 0; i < this.props.data.projects.length; i++)
			{
				var elem = this.props.data.projects[i];
				var elem_name = elem.roles.split(",").map((e) => Vocabulary.getText(FmRUUser.getSlug(e))).join(" <BR> ");
				var data = {
					parentSlug: "myProjects", 
					path:0, 
					name: elem.post_title + "<br><small>" + elem_name +"</small>",
					name2: elem.post_title,
					slug: elem.ID,
					handler: "getProjectHandler",
					args: [ elem.ID ],
					current:	this.state.currentId == elem.ID ? 1 : 0
				};
			
				if( data.parentSlug === newD[num].slug )
				{
					//var child 		= data.child === 2 ? newD[num].children2 : newD[num].children;
					newD[num].children.push({
						name: 		data.name, 
						name2: 		data.name2, 
						slug: 		data.slug,
						handler:	data.handler,
						icon: 		data.icon,
						args: 		data.args,
						children : 	[],
						children2: 	[],
						current:	this.state.currentId == data.args ? 1 : 0
						
					});
				}
			}
		};		
		const panel = newD.map((e,i)=> 
		{			
			const children = e.children.map((ee, ii) => 
			{
				let classes = ["btn", "btn-link", ee.current ? "active": "" ];
				let icon = ee.icon ? ee.icon : "";
				return <div className="admin_block" key={"my_pr_" + ee.slug}>
					<div 
						className = {classes.join(" ")}
						data-id={ee.args} 
						data-handler={ee.handler}
						onClick={this[ee.handler]}
					>
						<div 
							className="d-none d-sm-none d-md-none d-lg-block d-xl-block panel_txt"
							dangerouslySetInnerHTML={{ __html : Vocabulary.getText(ee.name) }} 
							title={Vocabulary.getText(ee.name2)}
						>
						</div>
						<div 
							className="d-none d-sm-block d-md-block d-lg-none d-xl-none hidden_link hint hint--right" 
							data-hint={ Vocabulary.getText(ee.name2) }
						/>
						<div className="licon">
							<i className={icon}></i>
						</div>
					</div>
				</div>
			});
			const children2 = e.children2.map((ee, ii) => 
			{
				let classes = ["btn", "btn-link", ee.current ? "active": "" ];
				let icon = ee.icon ? ee.icon : "";
				return <div className="admin_block" key={"my_pr_" + ee.slug}>
					<div 
						className = {classes.join(" ")}
						data-id={ee.args} 
						data-handler={ee.handler}
						onClick={this[ee.handler]}
					>
						<div 
							className="d-none d-sm-none d-md-none d-lg-block d-xl-block panel_txt"
							dangerouslySetInnerHTML={{ __html : Vocabulary.getText(ee.name)}} 
						/>
						<div 
							className="d-none d-sm-block d-md-block d-lg-none d-xl-none hidden_link hint hint--right" 
							data-hint={Vocabulary.getText(ee.name2)}
						/>
						<div className="licon">
							<i className={icon}></i>
						</div>
					</div>
				</div>
			});
			let classes = ["btn", "btn-link", "lead", e.current ? "active": "" ];
			let icon = e.icon ? e.icon : "";
			let extend = e.extend ? <div className="extends">{e.extend}</div> : "";
			let extend2 = e.extend2 ? <div className="extends2">{e.extend2}</div> : "";
			return (
				<Fragment key={"ap_" + i}>
					<hr/>	
					<div className="admin_block">
						<div 
							className={classes.join(" ")}
							data-id={ Array.isArray(e.args) ?  e.args.join(",") : e.args } 
							data-handler={e.handler}
							onClick={this[e.handler]}
						>
							<div 
								className="d-none d-sm-none d-md-none d-lg-block d-xl-block panel_txt"
								dangerouslySetInnerHTML={{ __html : Vocabulary.getText(e.name) }} 
							/>
							{extend}
							{extend2}
							<div 
								className="d-none d-sm-block d-md-block d-lg-none d-xl-none hidden_link hint hint--right" 
								data-hint={Vocabulary.getText(e.name)}
							/>
							<div className="licon">
								<i className={icon}></i>
							</div>
						</div>
					</div>
					{children}
					{children2}	 
				</Fragment>
			);			
		});
		return (
			<Fragment>
				<div className='col-xl-2 col-lg-2 col-md-1 col-sm-1 col-1 admin_panel'>
					<Link  to="/">
						<div 
							className="indicator classic   d-none d-sm-none d-md-none d-lg-block d-xl-block "
							data-fmru_type="list" 
							data-args="0"
							onClick = {this.props.onFirst}
						>
							<div className="n1"><Voc text={"To list"} /></div>
							<div className="iconnn">
								<img src={ icon1 } alt={ icon1 }/>
							</div>
						</div>
					</Link>
					<div className="spacer-10" />
					<Link  to="/">
						<div 
							className="d-none d-sm-block d-md-block d-lg-none d-xl-none  hint hint--right" 
							data-hint={Vocabulary.getText("To list")}							
							data-fmru_type="list" 
							data-args="0"
							onClick = {this.props.onFirst}

						>
							<div className="licon" style={{padding:"6px", textAlign:"center",fontSize:"18px"}}>
								<i className="fa fa-home"></i>
							</div>
						</div>
					</Link>
					{panel}
					<div className="spacer-10" />
					<div>
						<div 
							className="fmRU_button light xl admin_open d-none d-sm-block d-md-block d-lg-none d-xl-none" 
							style={{marginLeft:"7px"}}
							title={"open"}
							onClick={this.open}
						>
							<i className="fa fa-caret-right"></i>
						</div>
					</div>
				</div>
				<div className='col-xl-10 col-lg-10 col-md-11 col-sm-11 col-11 admin_content' id="admin_content" >
					<section>
					<FmRUUserExtend 
						data	= {this.props.data} 
						title 	= {this.props.data.ext.title} 
						name	= {this.props.data.ext.name} 
						content = {this.props.data.ext.content ? this.props.data.ext.content : "<p>--</p>"}
						tutor	= {this.props.data.ext.tutor_id} 
						leader	= {this.props.data.ext.leader_id} 
						ganres	= {this.props.data.ext.ganres} 	
						members	= {this.props.data.ext.members}
						avatar	= {this.props.data.avatar}
						display_name = {this.props.data.name}
						media_id= {this.props.data.ext.media_id}
						media_img={this.props.data.ext.media_img}
						id		= {this.props.data.ext.id}
						fb_url	= {this.props.data.ext.fb_url}
						vk_url	= {this.props.data.ext.vk_url}
						instagramm_url = {this.props.data.ext.instagramm_url}
						youtube_url = {this.props.data.ext.youtube_url}	
						parent = {this}
					/>
					</section>
				</div>
			</Fragment>
		);
	}
	myProjects()
	{
		const { projects } = this.props.data;
		const My_Projects = projects.map((elem, num)=> {
			return (
				<div key={"my_pr_" + elem.role + "_" +elem.ID} className="col-md-12 col-12" > 
					<div className="urole selected">
						{elem.post_title}
						<div className="user_iconn">
							<Voc text={"Edit"} />
						</div>
					</div>
					<div className="spacer-5"/>
				</div>
			);
		});
		return (			
				<div className='row'>
					<div className='display-4'>
						<Voc text={"My Projects"} />
					</div>
					<div className="spacer-10"/>
					<div className='w-100'>
						{My_Projects}
						<div key={"my_pr_new"} className="col-md-12 col-12" > 
							<div 
								className="urole"
								onClick={this.createProjectHandler}
							>
								<Voc text={"New project"} />
								<div className="user_iconn">
									<Voc text={"Create"} />
								</div>
							</div>
							<div className="spacer-5"/>
						</div>
					</div>			
				</div>
		);
	}
	admin()
	{
		return this.props.data.roles.in_array('administrator') ?
		(
			<Fragment>
				<div className="admin_block" key={"administrate"}>
					<div className="btn btn-link lead " onClick={this.get_admin}>
						<Voc text={"Administate"} />
					</div>	
					<div className="clearfix" />
					<div className="btn btn-link" onClick={this.get_requests}>
						<Voc text={"User's requests"} />
						<div className="tombCount">17</div>
					</div>	
				</div>
				<hr key={"adminHR"}/>
			</Fragment>
		):("");
	}
	
	
	open = (evt)=>
	{
		if(!this.state.isOpen)
		{
			$(".admin_panel").removeClass("col-sm-1").addClass("col-sm-5");
			$(".admin_content").removeClass("col-sm-11").addClass("col-sm-7");
			$(".panel_txt").removeClass("d-sm-none").addClass("d-sm-block");
			$(".hidden_link").removeClass("d-sm-block").addClass("d-sm-none");
			$(".admin_open > i").removeClass("fa-caret-right").addClass("fa-caret-left").attr("title","close");
		}
		else
		{
			$(".admin_panel").removeClass("col-sm-5").addClass("col-sm-1");
			$(".admin_content").removeClass("col-sm-7").addClass("col-sm-11");
			$(".panel_txt").removeClass("d-sm-block").addClass("d-sm-none");
			$(".hidden_link").removeClass("d-sm-none").addClass("d-sm-block");
			$(".admin_open > i").removeClass("fa-caret-left").addClass("fa-caret-right").attr("title","open");
		}
		this.setState({isOpen: !this.state.isOpen});
	}
	myConsole = evt =>
	{
		if(evt) this.setActive(evt);
		this.props.prnt.fetch(
			"myConsole", 
			""
		);
	}
	createProjectHandler = (evt) => {
		this.setActive(evt);
		this.props.prnt.fetch(
			"create_project", 
			""
		);
	}
	getRoleReq = evt =>
	{
		this.setActive(evt);
		this.props.prnt.fetch(
			"get_rolereq_page", 
			evt.currentTarget.dataset.id
		);
	}
	allMembers = evt =>
	{
		this.setActive(evt);
		this.props.prnt.fetch(
			"all_members", 
			""
		);
	}
	getProjectHandler = (evt) => {
		this.setActive(evt);
		this.props.prnt.fetch(
			"get_my_project", 
			evt.currentTarget.dataset.id
		);
	}
	myRolesHandler = (evt) => {
		this.setActive(evt);
		this.props.prnt.fetch(
			"get_my_roles", 
			""
		);
	}
	myProjectsHandler = (evt) => {
		this.setActive(evt);
		this.props.prnt.fetch(
			"myProjectsList", 
			""
		);
	}
	get_admin = (evt) => {
		this.setActive(evt);
		this.props.prnt.fetch(
			"get_admin", 
			""
		);
	}
	get_requests = (evt) => {
		this.setActive(evt);
		this.props.prnt.fetch(
			"get_requests", 
			""
		);
	}
	setActive=(evt)=> {
		$(".admin_block  .btn.active").removeClass("active");
		$(evt.currentTarget).addClass("active");
		this.setState({
			currentId:evt.currentTarget.dataset.id
		});
	}
}