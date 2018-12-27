import React, {Component, Fragment} from 'react';
import {PieChart, LineChart } from 'react-easy-chart'; //https://github.com/rma-consulting/react-easy-chart
import _BarChart from './BarChart'
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Voc from './Voc';
import Vocabulary from './Vocabulary';
import Foo from '../Foo';
import FmRUUser from './FmRUUser';
import FmRUFilterGanreList from './FmRUFilterGanreList';
import UserSelect from './UserSelect';
import TextEditor from './TextEditor';
import Aalert from './Aalert';
import MediaChooser from './MediaChooser';
import get_url from "../index"
import {getGanreBy, arrayIntersect} from "./FmRUAppExt.js";

import icon from "../img/kabuki.svg";
import icon2 from "../img/015-team-1.svg";
import icon3 from "../img/044-puzzle.svg";
import icon4 from "../img/podium.svg";
import icon5 from "../img/save-file.svg";


export default class FmRUUserExtend extends Component
{
	constructor(props)
	{
		super(props);
		const swList = [true, true, true, true, true, true, true, true, true];
		this.state = {
			data: 		props.data,
			title:		props.title,
			content:	props.content,
			name:		props.name,
			tutor:		props.tutor,
			leader:		props.leader,
			ganres:		props.ganres,
			members: 	props.members,
			media_id: 	props.media_id,
			avatar:		get_url() + props.avatar,
			save_avatar: false,
			display_name: props.display_name,
			media_img:	props.media_img,
			media_img2:	props.media_img2,
			fb_url:		props.fb_url,
			vk_url:		props.vk_url,
			instagramm_url:		props.instagramm_url,
			youtube_url:		props.youtube_url,
			media_name: "",
			lineWidth: ( $(window).width() * (100-16.6666) ) / 200 - 60,
			swList: 	swList
			
		}
		$(window).resize( () => {
			this.setState({
				lineWidth: $("#line").width() - 20
			});
		});
	}
	componentDidUpdate()
	{
		
	}
	componentWillReceiveProps (nextProps) 
	{	
		this.setState({
			data: 		nextProps.data,
			title:		nextProps.title,
			content:	nextProps.content,
			name:		nextProps.name,
			tutor:		nextProps.tutor,
			leader:		nextProps.leader,
			ganres:		nextProps.ganres,
			members: 	nextProps.members,
			media_id: 	nextProps.media_id,
			media_img: 	nextProps.media_img,
			media_img2: nextProps.media_img2,
			media_name: nextProps.media_name,
			fb_url: 	nextProps.fb_url,
			vk_url: 	nextProps.vk_url,
			instagramm_url: nextProps.instagramm_url,
			youtube_url: nextProps.youtube_url,
		});
	}
	componentDidMount ()
	{
		$(".carousel-indicators .indicator").click = evt => {
			$(".carousel-indicators .indicator.active").removeClass("active");
			$(this).addClass("active");
		};
	}
	render() 
	{ 	
		const {data, ganres, name} = this.props;
		switch(data.ext.type)
		{
			case "myProject":
			case "update_my_project":
			case "newProject":
				return this.myProject(data, ganres, this.state.name);
			case "myConsole":
				return this.myConsole(data);
			case "myProjectsList":
				return this.myProjectsList(data);
			case "get_my_roles":
				return this.myStatus(data);
			case "get_rolereq_page":
				return this.get_rolereq_page(data);
			case "all_members":
				return this.all_members(data);
			default:
				return "";
				
		}
		
	}
	myConsole(data)
	{
		const ldata = data.ext.ganres.map((elem, num) => {
			var r = {};
			r.key	= num;
			r.value = elem.count;
			r.color = elem.color;
			r.icon	= elem.icon;
			return r;
		});
		const legend = data.ext.ganres.map((elem, num) => 
		<li 
			key={"leg_"+elem.id} 
			className={this.state.dataId == num ? "active" : ""}
		>
			<span style={{background:elem.color, float:"left", marginRight:4 }} className="clr" ></span>
			<span className="">
				<span>{elem.name}</span>
				<span className="secondary"> | <Voc text={"count projects"}/>: <strong>{elem.count }</strong></span> 
			</span>
		</li>);
		const data3 = data.ext.data2.map((elem, num) => {
			return { x: elem.id, y: elem.avg, color:elem.color, img: elem.icon, name:elem.name}
		});
		const cats = data.ext.data.categories.map((elem, num) =>
			<li
				key={"cat_"+elem.id}
			>
			
				<input 
					type='checkbox' 
					id={'choose_' + elem.id }
					data-id={num}
					className='radio_full' 
					name='choose_cat'
					onChange={this.swList}
					checked={this.state.swList[num] }
				/> 
				<label htmlFor={'choose_' + elem.id } data-hint={ elem.name + " | " + Vocabulary.getText("count valuations") + ": " + elem.count}>
					<div className='cat_color_label' style={{backgroundColor:elem.color}}></div>
				</label>	
			
				
			</li>
		);
		return <Fragment>
			<div className="row display-4">
				<Voc text={data.ext.title}/>
			</div>
			<div className="row">
				<div className="col-md-6 col-sm-12 mama-right">
					<PieChart						
						padding={20}
						size={400}
						innerHoleSize={270}
						data={ldata}
						styles={{
							".pie-chart-label":
							{
								fontSize: "20px",
							},							
							'.chart_text': {
								fontSize: '2em',
								fill: '#fffffff',
								background:"#888888"
							},
							 '.chart_lines': {
								strokeWidth: 12
							},
						}}
						clickHandler={this.onChart}
					/>
					<div style={{position:"absolute", top:115, right:130, width:170, height:170, borderRadius:170, overflow:"hidden"}}>
						<div className="" style={{position:"absolute", top:120, left:0, width:170, textSize:18, textAlign:"center", lineHeight:"12px"}} >
							{this.state.dataName ? this.state.dataName : Vocabulary.getText("Count of members") }
						</div>
						<div className="" style={{position:"absolute", top:140, width:170, textSize:18, textAlign:"center", fontSize:20, fontWeight:500}} >
							{this.state.dataValue ? this.state.dataValue : data.ext.all}
						</div>
						<div style={{position:"absolute", top:50, left:55, width:60, height:60, marginLeft:"auto", marginRight:"auto", backgroundImage: "url("+ this.state.dataIcon + ")", backgroundSize:"cover" }} />
					</div>
				</div>
				<div className="col-md-6 col-sm-12">
					<div className="w-100">
						<div className="display-4">
							<Voc text={"Statistics per ganres"} />
						</div>
					</div>
					<div className="spacer-10" />
					<div className="w-100">
						<strong><Voc text={"Ganres"} /></strong>
						<div className="spacer-10" />
						<ul className="ull">
							{legend}
						</ul>
					</div>
				</div>
				<div className="col-md-12 text-center">
					<hr/>
				</div>
				<div id="line" className="col-md-6">
					 <LineChart
						axes
						grid
						verticalGrid
						dataPoints1	
						interpolate={'cardinal'}
						lineColors={ this.getLineColor() }
						xDomainRange={ data.ext.data.xDomainRange }
						yDomainRange={ data.ext.data.yDomainRange }
						margin={{top: 10, right: 10, bottom: 50, left: 50}}
						width={ this.state.lineWidth }
						height={ 300 }
						clickHandler ={this.lineChartHandler}
						data={ this.getLineData() }
					  />
				</div>
				<div id="line" className="col-md-6">
					<div className="display-4 w-100" >
						<Voc text={"Statistics for experts/'s works"} /> 
					</div>
					<div className=" w-100" >
						<strong><Voc text={"Categories"} /></strong>
						<div className="spacer-10" />
						<ul className="ull">
							{cats}
						</ul>
					</div>
				</div>
				<div className="col-md-12 text-center">
					<hr/>
				</div>
				<div id="line" className="col-md-6">
					<_BarChart
						axes
						axisLabels={{x: '', y: 'My y Axis'}}
						yAxisOrientRight
						height={250}
						width={this.state.lineWidth}
						data={data3}
					  />
				</div>
				<div id="line" className="col-md-6">
					<div className="display-4 w-100" >
						<Voc text={"Average rating per ganres"} /> 
					</div>
					<div className=" w-100" >
						
					</div>
				</div>
				<div className="col-md-12 text-center">
					<hr/>
					<div className="btn btn-primary" onClick={this.createProjectHandler} >
						<Voc text={"Create own project"} /> <i className="fas fa-magic"></i>
					</div>
					<hr/>
				</div>
			</div>
		</Fragment>;
	}
	myProjectsList(data)
	{
		const prs = data.ext.projects.length === 0 ? 
			<div className="row"><div className="col-md-12 text-center"><Voc text={"No projects present"} /></div></div> : 
			data.ext.projects.map(elem => <Fragment key={elem.ID}>
				<div className="row">
					<div className="col-12 btn btn-link" data-id={elem.ID} onClick={(evt) => {
						Foo.app.fetch(
							"get_my_project", 
							evt.currentTarget.dataset.id
						);
					}}
				>
						<div className="">
							{elem.post_title}
						</div>
					</div>	
				</div>
			</Fragment>);
		return <Fragment>	
			<div className="row">					
				<div className="col-md-12 text-center">
					<div className="display-4">
						<Voc text={"My projects"} />
					</div>
				</div>
				<div className="spacer-30"/>
			</div>
				{prs}
			<div className="row">		
				<div className="col-md-12 text-center">
					<hr/>
					<div className="btn btn-primary" onClick={this.createProjectHandler} >
						<Voc text={"Create own project"} /> <i className="fas fa-magic"></i>
					</div>
					<hr/>
				</div>
			</div>
		</Fragment>;
	}
	myProject(data, ganres, name)
	{
		let btn0 = 	<div data-target="#carouselExampleIndicators" data-slide-to="0" className="indicator iii active">
						<div className="n1"><Voc text={"Settings"} /></div>
						<div className="iconnn">
							<img src={ icon3 } alt={ icon3 }/>
						</div>
					</div>;
		let btn1 =	<div data-target="#carouselExampleIndicators" data-slide-to="1" className="indicator iii ">
						<div className="n1"><Voc text={"Ganres"} /></div>
						<div className="iconnn">
							<img src={ icon } alt={ icon }/>
						</div>
					</div>;	
		let btn2 =	<div data-target="#carouselExampleIndicators" data-slide-to="2" className="indicator iii ">
						<div className="n1"><Voc text={"Criteries"} /></div>
						<div className="iconnn">
							<img src={ icon4 } alt={ icon4 }/>
						</div>
					</div>;	
		let btn3 =	<div data-target="#carouselExampleIndicators" data-slide-to="2" className="indicator iii">
						<div className="n1"><Voc text={"Team"} /></div>
						<div className="iconnn">
							<img src={ icon2 } alt={ icon2 }/>
						</div>
					</div>;	
		let btn4 =	<div data-target="#carouselExampleIndicators" data-slide-to="3" className="indicator iii">
						<div className="n1"><Voc text={"Save"} /></div>
						<div className="iconnn">
							<img src={ icon5 } alt={ icon5 }/>
						</div>
					</div>;	
		let con0 =	<div className="carousel-item active">
						{this.baseProject(data, ganres, name, 1)}
					</div>;
		let con1 =	<div className="carousel-item">
						{this.baseGanres(data, ganres, name, 2)}
					</div>;
		let con2 =	<div className="carousel-item">
						{this.baseCriteries(data, 3)}
					</div>;
		let con3 =	<div className="carousel-item">
						{this.baseUserCheck(data, 3)}
					</div>;
		return (
			<div className='row' style={{paddingLeft:"10px"}}>			
				<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
					<div className="carousel-indicators">
						{btn0}
						{btn1}
						
						{btn3}
						{btn4}
					</div>
					<div className="carousel-inner">
						{con0}
						{con1}
						{con3}					
						<div className="carousel-item">
							<section>
								<div className="row">
									<div className="col-lg-4 col-md-12  col-sm-12 col-12 ">
										
									</div>
									<div className="col-lg-8 col-md-12 col-sm-12 col-12 ">							
											<div className='btn btn-primary' onClick={this.updateProject} >
												<Voc text={data.code_old==="create_project" ? "Create" : "Edit"} />
												<i className="far fa-save"></i>
											</div>
									</div>
									<div className="spacer-15" />
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
		);
	}
	baseProject(data, ganres, name, slide_id=1)
	{		
		return (
		<Fragment>
			<div className="spacer-10"/>
			<div className='w-100'>				
				<div className="col-lg-2 col-md-4  col-sm-12 col-12 up_title">
					<div className={ [
							"leader footer-widget ", 
							!name ? " select-text " : " check-text "
						].join(" ") }
					>
						<Voc text={data.code_old==="create_project" ? "Title of new project" : "Title of project" } />
					</div>
				</div>
				<div className="col-lg-10 col-md-8 col-sm-12 col-12 ">
					<input 
						className="form-control display-4"
						onChange={this.get_title} 
						placeholder={"Не более 40 символов"}
						size={40}
						value={ name }
						key = {"title_" + this.props.id ? this.props.id : -1}
					/>
					<div className="spacer-10" />
				</div>
				<div className="col-12"/>
				
				<div className="col-lg-2 col-md-4  col-sm-12 col-12 up_title">
					<Voc text={"Content"} />
				</div>
				<div className="col-lg-10 col-md-8 col-sm-12 col-12 ">
					<TextEditor 
						getText = {this.setContent} 
						text={ this.state.content } 
						key = {"te_" + this.props.id ? this.props.id : -1}/> 
				
				</div>	
				<div className="col-12"/>
				
				<div className="col-lg-2 col-md-4  col-sm-12 col-12 up_title">
					<Voc text={"Main thrumbnail"} />
				</div>
				<div className="col-lg-10 col-md-8 col-sm-12 col-12 ">
					<MediaChooser 
						id={ "trumb" + this.state.media_id }
						name={"thrumbnail"}
						media_id={ this.state.media_id }
						prefix={"project"}
						url={ this.state.media_img }
						onChange={this.changeThrumbnail}
					/>
					<div className="spacer-10" />	
					<div className="spacer-10" />
				</div>
				<div className="col-12"/>
				
				
				<div className="col-lg-2 col-md-4  col-sm-12 col-12 up_title">
					<Voc text={"Socials"} />
					<hr/>
					<descr className="hidden">
						<Voc text={"all post in Socials you select are send in your Project diary."}/>
					</descr>
				</div>
				<div className="col-lg-10 col-md-8 col-sm-12 col-12 ">
					<div className="input-group">
						<div className="input-group-prepend">
							<span className="input-group-text input-holder" id="basic-fb">
								<i className="fab fa-facebook-f" />
							</span>
						</div>
						<input 
							className="form-control" 
							value={this.state.fb_url}
							placeholder={Vocabulary.getText("Project/'s page in Facebook")}
							key = {"fb_" + this.props.id ? this.props.id : -1}
							aria-label="Fb" 
							aria-describedby="basic-fb"
							onChange={this.onSocials}
							data-social="fb_url"
						/>
					</div>
					<div className="input-group">
						<div className="input-group-prepend">
							<span className="input-group-text input-holder" id="basic-vk">
								<i className="fab fa-vk" />
							</span>
						</div>
						<input 
							className="form-control" 
							value={this.state.vk_url}
							placeholder={Vocabulary.getText("Project/'s page in Vkontakte")}
							key = {"vk_" + this.props.id ? this.props.id : -1}
							aria-label="vk" 
							aria-describedby="basic-vk"
							onChange={this.onSocials}
							data-social="vk_url"
						/>
					</div>
					<div className="input-group">
						<div className="input-group-prepend">
							<span className="input-group-text input-holder" id="basic-youtube">
								<i className="fab fa-youtube" />
							</span>
						</div>
						<input 
							className="form-control" 
							value={this.state.youtube_url}
							placeholder={Vocabulary.getText("Project/'s page in Youtube")}
							key = {"youtube_" + this.props.id ? this.props.id : -1}
							aria-label="youtube" 
							aria-describedby="basic-youtube"
							onChange={this.onSocials}
							data-social="youtube_url"
						/>
					</div>
					<div className="input-group">
						<div className="input-group-prepend">
							<span className="input-group-text input-holder" id="basic-instagram">
								<i className="fab fa-instagram" />
							</span>
						</div>
						<input 
							className="form-control" 
							value={this.state.instagramm_url}
							placeholder={Vocabulary.getText("Project/'s page in Instagram")}
							key = {"instagram_" + this.props.id ? this.props.id : -1}
							aria-label="instagram" 
							aria-describedby="basic-instagram"
							onChange={this.onSocials}
							data-social="instagramm_url"
						/>
					</div>
					<div className="spacer-10" />
				</div>
				<div className="col-12"/>
				
				
				<div className="col-12 text-center">
					<div 
						data-target="#carouselExampleIndicators" 
						data-slide-to={name ? slide_id : -100} 
						className="btn btn-primary "
					>
						<Voc text={"Next"} />
						<i className="fas fa-angle-double-right"></i> 
					</div>
				</div>
				<div className="col-12 text-center">
					<small>
						{name ? "" : Vocabulary.getText("You must put title") }
					</small>
				</div>
			</div>
		</Fragment>);
	}
	baseGanres(data, ganres, name, slide_id=2)
	{		
		const gg = ganres.filter((elem)=> elem.check ? true : false);
		return (
		<Fragment>
			
			<div className='w-100'>				
				
				<div className="col-lg-2 col-md-4  col-sm-12 col-12 up_title">
					<div className={ [
							"leader footer-widget ", 
							gg.length === 0 ? " select-text " : " check-text "
						].join(" ") }
					>
						<Voc text={"Select Ganres"} />
					</div>
					<descr>
						<Voc text={"No more " } />  {this.props.data.ext.maxGanres}
					</descr>
				</div>
				<div className="col-lg-10 col-md-8 col-sm-12 col-12  ">
					<div className="spacer-10" />
					<div className="col-12">
							<FmRUFilterGanreList 
								data={ganres} 
								onClick={this.newPrGanres} 
								name="newPrGanre_"
								ignore={[-1]}
								defaultValue={false}
								key = {"uganres_" + this.props.id ? this.props.id : -1}
							/>
							<div className="spacer-10" />
					</div>
					<div className="spacer-10" />
				</div>	
				<div className="col-12"/>
				<div className="col-12 text-center">
					<div 
						data-target="#carouselExampleIndicators" 
						data-slide-to={gg.length !== 0 ? slide_id : -100} 
						className="btn btn-primary "
					>
						<Voc text={"Next"} />
						<i className="fas fa-angle-double-right"></i> 
					</div>
				</div>
				<div className="col-12 text-center">
					<small>
						{gg.length !== 0 ? "" : Vocabulary.getText("You must choose no less one ganres") }
					</small>
				</div>
			</div>
			
		</Fragment>);
	}
	baseUserCheck(data, slide_id = 3) 
	{
		//console.log(data.fmru_evlbl_roles); //"Project_member"
		let evlbl_roles = $.isArray( data.fmru_evlbl_roles ) ? data.fmru_evlbl_roles : [];
		const is_admin = data.roles.in_array("administrator");
		const TutorSelect = evlbl_roles.in_array("Tutor")	? 
		<Fragment>
			<div className="col-lg-2 col-md-4 col-sm-12 col-12 up_title">
					<Voc text={"Tutor"} />
				</div>
				<div className="col-lg-10 col-md-8 col-sm-12 col-12 ">				
					<UserSelect 
						users={data.users} 
						onChoose={this.set_tutor} 
						frole={"Tutor"}
						id={"tutor_id"}
						key={"tutor_id"}
						select={this.state.tutor}
						user_id={data.user_id}
						is_locked={ this.state.tutor == data.user_id  ? 1: 0 }
						is_blocked={ 
							this.props.leader == data.user_id 
							 || this.state.tutor == data.user_id 
								|| is_admin
							? 1: 0 
						}
					/>
					<div className="spacer-2" />
					<small  style={{color:"#6c757d"}}>
						Наставник курирует проект, помогает лидеру советами. Может редактировать свойства проетка. Может сменить Лидера.
					</small>
					<div className="spacer-15" />
				</div>	
				<div className="col-12"/>
			</ Fragment>
			: "";
		const memberSelects = this.state.members.map((elem, index)=>{
			return  evlbl_roles.in_array("Project_member")  ? 
			<Fragment>
				<div className="col-lg-2 col-md-4 col-sm-12 col-12 up_title">
					<Voc text={"Project Members"} />
				</div>
				<div className="col-lg-10 col-md-8 col-sm-12 col-12 ">		
					<div className="row">
						<div className="col-lg-6 col-md-12  col-sm-12 col-12" key={"newGnrPr__" +index}>				
							<UserSelect 
								users={data.users} 
								onChoose={this.set_member} 
								frole={"Project_member"}
								id={"member_" + index}
								key={"member_"  + index}
								select={elem}
								i={index}
								is_locked= { this.state.members[index] == data.user_id ? 1: 0 }
								is_blocked={ 
									this.props.leader == data.user_id
									 || this.state.members[index] == data.user_id 
										|| is_admin
									? 1: 0 
								}
							/>
							<div className="spacer-10" />
						</div>								
					</div>
				</div>
			</Fragment> : "";
		});
		const leaderBlock =  (
			<UserSelect 
				users={data.users} 
				onChoose={this.set_author} 
				frole={"Project_author"}
				id={"leader_id"}
				key={"leader_id"}
				select={this.state.leader}
				user_id={data.user_id}
				is_locked= { this.state.leader == data.user_id  ? 1: 0 }
				is_blocked={ 
					this.props.leader == data.user_id 
					 || this.state.tutor == data.user_id 
						|| is_admin 
					? 1: 0 
				}
			/>);
		return (
		<Fragment>
			<div className='display-4'>
				<Voc text={"Team"}/>
			</div>
			<div className="spacer-10"/>
			<div className='w-100'>				
				{TutorSelect}
				
				<div className="col-lg-2 col-md-4  col-sm-12 col-12 up_title">
					<Voc text={"Project Author"} />
				</div>
				<div className="col-lg-10 col-md-8 col-sm-12 col-12 ">				
					{leaderBlock}
					<div className="spacer-2" />
					<small  style={{color:"#6c757d"}}>
						Лидер проета ведет журнал Проекта. Набирает  команду, подбирает Наставника. Может редактировать свойства Проекта. Выбирает сетку критериев, по которым Эксперты будут оценивать Проект.
					</small>
					<div className="spacer-15" />
				</div>	
				<div className="col-12"/>
				{memberSelects}		
				
				<div className="spacer-15" />
				<div className="col-12 text-center">
					<div data-target="#carouselExampleIndicators" data-slide-to={slide_id} className="btn btn-primary ">
						<Voc text={"Next"} />
						<i className="fas fa-angle-double-right"></i> 
					</div>
				</div>
			</div>
		</Fragment>)
	}
	baseCriteries(data, slide_id=3)
	{
		var myGanres = this.state.ganres.map((elem, num)=> {
			return elem.check ? elem.id : -20;
		});
		const criteries = data.criteries.map((elem, num)=>
		{
			var ai = arrayIntersect( myGanres, elem.ganres.map((e)=>e.term_id) ).length;
			//console.log( ai );
			const ganres = elem.ganres.map((e, i) =>
			{
				var g = getGanreBy("id", e.term_id, data.ganres);
				return <div 
					key={ "icon_" + num + "_" + i } 
					data-hint={g.name}
					className="hint hint--top"
					style={{
						padding:"5px", 
						backgroundColor: ai ? g.color : "#FFF", 
						float:"right", 
						margin:"1px 1px 5px 1px"
					}}
				>
					<img src={g.icon} style={{height:"40px", width:"auto", opacity:ai ? 1 : .25}} alt="" />
				</div>
			});
			var classes = ["row grey2", !ai ? "grayscale  half-opacity" : ""];
			return ai ? (
				<div 
					key={"cr_"+elem.id} 
					className={classes.join(" ")}
				>
					<div className="col-md-3">
						<div className=" padding-5">
							{ganres}
						</div>
					</div>
					<div className="col-md-9">	
						<div className=" padding-5">
							<input type="checkbox" id={"cr_"+elem.id} className="checkbox" />
							<label htmlFor={"cr_"+elem.id}>
								{elem.name}
							</label>
						</div>
					</div>
				</div> 
			) : (
				<div 
					key={"cr_"+elem.id} 
					className={classes.join(" ")}					
				>
					<div className="col-md-3">
						<div className=" padding-5">
							{ganres}
						</div>
					</div>
					<div className="col-md-9">	
						<div className=" padding-5">						
							<div style={{paddingLeft:"60px"}}>
								{elem.name}
							</div>
						</div>
					</div>
				</div> 
			)
		});
		return (
			<Fragment>
				<div className='display-4'>
					<Voc text={"choose the criteries by which you want to be evaluated"} />
				</div>
				<div className="spacer-10"/>
				<div className='w-100'>
					{criteries}					
				</div>
				<div className="col-12 text-center">
					<div data-target="#carouselExampleIndicators" data-slide-to={slide_id} className="btn btn-primary ">
						<Voc text={"Next"} />
						<i className="fas fa-angle-double-right"></i> 
					</div>
				</div>
			</Fragment>
		);
	}
	
	
	
	myStatus(data)
	{
		console.log(data.fmru_evlbl_roles); //"Project_member"
		const { roles, reqRoles } = this.props.data;
		const MyRoles = FmRUUser.roles.map( ( elem, num ) => {
			const cl = roles.in_array(elem) ? 
				"urole selected" :
				"urole";
			let icon =  roles.in_array(elem) ? 
				<Fragment>
					<span><Voc text={ "" } /></span> <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512' fill='#06474c' width='32' height='33'><path d='M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4zm323-128.4l-27.8-28.1c-4.6-4.7-12.1-4.7-16.8-.1l-104.8 104-45.5-45.8c-4.6-4.7-12.1-4.7-16.8-.1l-28.1 27.9c-4.7 4.6-4.7 12.1-.1 16.8l81.7 82.3c4.6 4.7 12.1 4.7 16.8.1l141.3-140.2c4.6-4.7 4.7-12.2.1-16.8z'/></svg>
				</Fragment>
			 : 
				<Fragment>
					<span><Voc text={ "Apply" } /></span> <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512' fill='#06474c' width='32' height='33'><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm0-224c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96zm406.6 204.1l-34.7-34.7c-6.3-6.3-14.5-9.4-22.8-9.4-8.2 0-16.5 3.1-22.8 9.4L327.8 424l-7.6 68.2c-1.2 10.7 7.2 19.8 17.7 19.8.7 0 1.3 0 2-.1l68.2-7.6 222.5-222.5c12.5-12.7 12.5-33.1 0-45.7zM393.3 473.7l-39.4 4.5 4.4-39.5 156.9-156.9 35 35-156.9 156.9zm179.5-179.5l-35-35L573 224h.1l.2.1 34.7 35-35.2 35.1zM134.4 320c19.6 0 39.1 16 89.6 16 50.4 0 70-16 89.6-16 20.7 0 39.9 6.3 56 16.9l22.8-22.8c-22.2-16.2-49.3-26-78.8-26-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h243.5c-2.8-7.4-4.1-15.4-3.2-23.4l1-8.6H48c-8.8 0-16-7.2-16-16v-41.6C32 365.9 77.9 320 134.4 320z"/></svg>
				</Fragment>;
			icon = reqRoles.in_array(elem) ? 
				<Fragment>
					<span><Voc text={"For request"} /></span> <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512' fill='#06474c' width='32' height='33'><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm0-224c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96zm272 192c-79.6 0-144 64.4-144 144s64.4 144 144 144 144-64.4 144-144-64.4-144-144-144zm0 256c-61.8 0-112-50.2-112-112s50.2-112 112-112 112 50.2 112 112-50.2 112-112 112zm-135.8 0H48c-8.8 0-16-7.2-16-16v-41.6C32 365.9 77.9 320 134.4 320c19.6 0 39.1 16 89.6 16 50.4 0 70-16 89.6-16 4.4 0 8.6.8 12.9 1.3 2.9-10.7 6.9-21 11.7-30.8-8-1.5-16.1-2.5-24.5-2.5-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h346.9c-12.9-9.1-24.7-19.8-34.7-32zm190.1-128H512v-54.3c0-5.3-4.4-9.7-9.7-9.7h-12.6c-5.3 0-9.7 4.4-9.7 9.7v76.6c0 5.3 4.4 9.7 9.7 9.7h60.6c5.3 0 9.7-4.4 9.7-9.7v-12.6c0-5.3-4.4-9.7-9.7-9.7z"/></svg>
				</Fragment>: icon;
			return  data.fmru_evlbl_roles.in_array(elem) || elem === "administrator" ? 
				<div key={"role_" + num} className="col-md-12 col-12" onClick={this.getRoleReq} data-role={elem}>
					<div className={cl}>
						<Voc text={ elem } />
						<div className="user_iconn">
							{icon}
						</div>
					</div>
					<div className="spacer-5"/>
				</div>
			: "";
		});
		return (	
			<Fragment>
				<div className='row'>
					<div className='display-4'>
						<Voc text={"It/'s me"} />
					</div>
					<div className="spacer-10"/>
					<div className='w-100'>
						<div className="col-lg-6 col-md-6 col-sm-12 col-12 ">
							<div className="col-12 lead">
								<Voc text={"Display name"} />
							</div>
							<input 
								className="form-control "
								onChange={this.getUserName} 
								onBlur={this.saveName}
								placeholder={"Не более 40 символов"}
								size={40}
								value={ this.state.display_name }
							/>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-12 col-12 ">
							<div className="col-12 lead">
								<Voc text={"Avatar"} />
							</div>
							<MediaChooser 
								id={ "avatar" + this.state.avatar }
								name={"avatar"}
								media_id={ -1 }
								prefix={"avatar"}
								url={ this.state.avatar }
								onChange={this.changeAvatar}
							/>
							<div className={this.state.save_avatar ? "" : "hidden"}>
								<input type="checkbox" id="saveAvatar" className="checkbox" onChange={this.saveAvatar}/> 
								<label htmlFor="saveAvatar">{Vocabulary.getText("Save avatar")}</label>
							</div>
							<div className="spacer-10" />	
							<div className="spacer-10" />
						</div>
						<div className="col-12"/>
					</div>			
				</div>		
				<div className='row'>
					<div className='display-4'>
						<Voc text={"My Roles"} />
					</div>
					<div className="spacer-10"/>
					<div className='w-100'>
						{MyRoles}	
					</div>			
				</div>
			</Fragment>
		);
	}
	getRoleReq = evt =>
	{
		console.log(evt.currentTarget.dataset.role);
		Foo.app.fetch(
			"req_role", 
			evt.currentTarget.dataset.role
		);
	}
	get_rolereq_page()
	{		
		const req = this.props.data.ext.requests.length === 0 ?  
		<tr><td><Voc text={"No requests present"} /></td></tr>
		: this.props.data.ext.requests.map(elem =>
		{
			var cstyle;
			switch(elem.role)
			{
				case "administrator":
					cstyle = { color:"red", fontWeight:500 };
					break;
				case "Project_author":
				case "Project_member":
					cstyle = { color:"grey", fontWeight:500 };
					break;
				case "Expert":
					cstyle = { color:"green", fontWeight:500 };
					break;
				default:					
					cstyle = { color:"black", fontWeight:500 };
					break;
			}
			return <tr key={"req_" + elem.id + elem.role}>
				<td>
					{elem.name}
				</td>
				<td style={cstyle}>
					<Voc text={elem.role} />
				</td>
				<td style={{minWidth:'150px'}}>
					<input
						type="radio"
						className="radio_full"
						name={'ee'+elem.id + elem.role}
						id={"yes_" + elem.id + elem.role}
						data-id={elem.id}
						data-role={elem.role}
						onChange={this.allowRoleReq}
					/>
					<label htmlFor={"yes_" + elem.id + elem.role} data-hint={ Vocabulary.getText("allow") }>
						<div className='cat_color_label' style={{backgroundColor:"green"}}></div>
					</label>
				</td>
				<td style={{minWidth:'150px'}}>
					<input
						type="radio"
						className="radio_full"
						name={'ee'+elem.id + elem.role}
						id={"no_" + elem.id + elem.role}
						data-id={elem.id}
						data-role={elem.role}
						onChange={this.vetoRoleReq}
					/>
					<label htmlFor={"no_" + elem.id + elem.role} data-hint={ Vocabulary.getText("veto") }>
						<div className='cat_color_label' style={{backgroundColor:"red"}}></div>
					</label>
				</td>
			</tr>
		});
		return (			
				<div className='row'>
					<div className='display-4'>
						<Voc text={"User's requests"} />
					</div>
					<div className="spacer-10"/>
					<div className='w-100'>
						<table className="table table-striped">
							<tbody>
								{req}
							</tbody>
						</table>
					</div>			
				</div>
		);
	}
	all_members(data)
	{
		
		const mems = this.props.data.ext.members.length===0 ? <Voc text={"No projects present"} /> : this.props.data.ext.members.map(elem => {
			const ganres = elem.ganres.map(ganre =>  
				<span className='ganre_title' style={{backgroundColor: ganre.color, color:"#FFF"}} key={"mg_"+ganre.id}>{ganre.name}</span> 
			);
			return <div className="row critery_cell3 grey2" key={elem.id}>
				<div className="col-md-3 col-sm-12">
					{ganres}
				</div>
				<div className="col-md-4 col-sm-6">
					{elem.title}
				</div>
				<div className="col-3 col-sm-3">
					<Voc text="oreder" />: {elem.o}
				</div>
				<div className="col-md-2 col-sm-3">
					<div className="btn btn-link" data-id={elem.id} onClick={this.props.parent.getProjectHandler}>
						<Voc text={"Edit"} />
					</div>
				</div>
			</div> 
		});
		return  <Fragment>
				{mems}
			</Fragment>;
	}
	allowRoleReq = evt =>
	{
		Foo.app.fetch(
			"allow_role_req",
			{
				id :	evt.currentTarget.dataset.id,
				role:	evt.currentTarget.dataset.role
			}
		);
	}
	vetoRoleReq = evt =>
	{
		Foo.app.fetch(
			"veto_role_req",
			{
				id :	evt.currentTarget.dataset.id,
				role:	evt.currentTarget.dataset.role
			}
		);
	}
	onSocials = evt =>
	{
		var soc = evt.currentTarget.dataset.social;
		var val = evt.currentTarget.value;
		var st 	= {};
		st[soc]	= val;
		this.setState( st );
	}	
	swList = evt =>
	{
		let id = evt.currentTarget.dataset.id;
		let sw = this.state.swList.slice(0);
		sw[id] = !sw[id];
		this.setState({swList:sw});
	}
	alertState = (evt) => { 
		//console.log( this.state )
	}
	setContent = (text) =>
	{
		this.setState({
			content:text
		})
	}
	updateProject = (evt) => 
	{
		var data = {};//this.state;
		data.id = this.props.data.ext.id ? this.props.data.ext.id : -1;
		data.name = this.state.name;
		if(!data.name)
		{
			Aalert.instance.show({
				title:<Voc text={""} />, 
				content:<Voc text={"No Title present"} />,
				okHandler:this.aalert
			});
			return;
		}
		data.ganres = this.state.ganres
			.map((elem)=> elem.check ? Number(elem.id) : -1)
				.filter((elem) => elem > 1 ? true : false);
				
		if(!data.ganres.length)
		{
			Aalert.instance.show({
				title:<Voc text={"No Genres selected"} />, 
				content:<Voc text={"You must select at least one genre. The more accurately the genres of the Project are selected, the more support you will receive from the Experts and Tutors"} />,
				okHandler:this.aalert
			});
			return;
		}
		
		data.tutor = Number(this.state.tutor);
		data.leader = Number(this.state.leader);
		data.members = this.state.members;
		data.media_id = this.state.media_id ? Number(this.state.media_id): -1;
		data.media_img = this.state.media_img;
		data.media_img2 = this.state.media_img2;
		data.media_name = this.state.media_name;
		data.content 	= this.state.content;
		data.fb_url 		= this.state.fb_url;
		data.vk_url 		= this.state.vk_url;
		data.instagramm_url	= this.state.instagramm_url;
		data.youtube_url	= this.state.youtube_url;
		Foo.app.fetch(
			"update_my_project", //"test", 
			data
		);
		$("#carouselExampleIndicators").carousel(0);
		//$("#carouselExampleIndicators").carousel('dispose');
	}
	getUserName = evt => 
	{
		this.setState({
			display_name:  evt.currentTarget.value
		}, this.alertState);
	}	
	saveName = evt =>
	{
		Foo.app.fetch(
			"save_user_name", 
			evt.currentTarget.value
		);
	}	
	get_title = evt => 
	{
		this.setState({
			title: evt.currentTarget.value,
			name:  evt.currentTarget.value
		}, this.alertState);
	}
	set_tutor = (value) => 
	{
		this.setState({
			tutor: value
		}, this.alertState)
	}
	set_author = (value) => 
	{
		this.setState({
			leader: value
		}, this.alertState)
	}
	set_member = (value, selector) => 
	{
		var members = this.state.members;
		members[selector.props.i] = Number(value);
		this.setState({
			members: members
		}, this.alertState)
	}
	newPrGanres = (data, event, list) =>
	{
		if(data.length > this.props.data.ext.maxGanres)
		{
			data.length = this.props.data.ext.maxGanres;
			Aalert.instance.show({
				title:<Voc text={"Too more ganres"} />, 
				content: Voc.getText("Choose no more than ") + this.props.data.ext.maxGanres,
				okHandler:this.aalert
			});
		}	
		var ganres 		= this.state.ganres.slice(0);
		ganres.map((elem, num)=>{
			elem.check	= data.in_array(elem.id) ? 1 : 0;
			return elem;
		});
		this.setState({
			ganres: ganres
		}, this.alertState);
	}
	changeThrumbnail = (url, files)=>
	{
		//console.log(files);
		this.setState({
			media_img:		url,
			media_name:		files.name,
			media_id: 		-1
		});
	}
	changeAvatar = (url, files)=>
	{
		console.log(url);
		this.setState({
			avatar:	url,
			avatar_name:files.name,
			save_avatar:true
		});
	}	
	saveAvatar = evt =>
	{
		Foo.app.fetch(
			"save_avatar", 
			{media_img:this.state.avatar, media_name:this.state.avatar_name}
		);
		this.setState({
			save_avatar:false
		});
		
	}
	changeThrumbnail2 = (url, files)=>
	{
		this.setState({
			media_img2:		url,
		});
	}
	aalert = evt =>
	{
		Aalert.instance.hide();
	}
	onChart = d => {
		this.setState({
			dataDisplay: "The value of "+d.data.key+" is "+this.props.data.ext.ganres[d.data.key].icon,
			dataIcon: this.props.data.ext.ganres[d.data.key].icon,
			dataName: this.props.data.ext.ganres[d.data.key].name,
			dataColor: this.props.data.ext.ganres[d.data.key].color,
			dataValue: d.data.value,
			dataId: d.data.key
		});
	}
	lineChartHandler = (d, evt) =>
	{
		this.setState({
						
		});
	}
	getLineColor()
	{
		return this.props.data.ext.data.lineColors.filter((elem, num) => this.state.swList[num]);
	}
	getLineData()
	{
		return this.props.data.ext.data.data.filter((elem, num) => this.state.swList[num]);
	}
	createProjectHandler = evt => {
		Foo.app.fetch(
			"create_project", 
			""
		);
	}				
}


