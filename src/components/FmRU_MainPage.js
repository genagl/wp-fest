import React, {Component, Fragment} from 'react';
import Foo from "../Foo";


import FmRUUser from './FmRUUser';
import FmRUPhase from './FmRUPhase';
import FmRUMemberBox from './FmRUMemberBox';
import FmRUHead from './FmRUHead';
import FmRULoginForm from './FmRULoginForm';
import FmRUPagi from './FmRUPagi';

import Vocabulary from './Vocabulary';
import Voc from './Voc';


import icon1 from "../img/test.svg";
import icon2 from "../img/kabuki.svg";
import icon3 from "../img/tools-and-utensils-1.svg";

export default class FmRU_MainPage extends Component
{
	render()	
	{
		const posts		= Foo.app ? Foo.app.props.data.posts.map(elem => (
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
								onClick={Foo.app.onMemberClick} 
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
		)) : "Foo not exists";
		const crMyPrForm = Foo.app.props.data.is_register ? "--" : <div className="row justify-content-center">
			<div className="col-lg-6 col-md-8 col-sm-12">
				<div className='display-3 text-center'>
					{Foo.app.props.data.title}
				</div>
				<div className="spacer-30" />
				{FmRUPhase.getText()}
				<div className="spacer-10" />
				{Foo.app.props.data.content}
			</div>
		</div>
		const my_projects = Foo.app.props.data.my_members.length ? 
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
						members={Foo.app.props.data.my_members} 
						onItemClick = {Foo.app.onMemberClick.bind(Foo.app)} 
						mtype = {"card"}
					/>	
				</div>
			</section>
		</Fragment> : "";
		return (	
		<Fragment>
			<div className='container colored'>
				< FmRUHead 
					p={Foo.app.props.data} 
					prnt={Foo.app}
					page_type = "page" 
					onItemClick = {Foo.app.onMemberClick.bind(Foo.app)}					
					login = {Foo.app.login.bind(Foo.app)}
					register={Foo.app.onRegister}
					onLogout = {Foo.app.onLogout}
					onUser = {Foo.app.onUser}
				/>		
				<section>
					<div className="carousel-indicators">	
						<div 
							className="indicator classic"
							id='indicator_about'
							data-fmru_type="page"
							data-args="0"
							onClick={Foo.app.onMemberClick}		
						>
							<div className="n1"><Voc text={"About"} /></div>
							<div className="iconnn">
								<img src={ Foo.app.props.data.logo } alt="" />
							</div>
						</div>
						<FmRULoginForm 
							prnt={ Foo.app }
							user = { Foo.app.props.data } 
							onUser = { Foo.app.onUser }
							login = { Foo.app.login.bind(Foo.app) }
							onLogout={Foo.app.onLogout } 
							is_register={Foo.app.props.data.is_register}
						/>
						<div 
							className="indicator classic"
							id='indicator_members'
							data-fmru_type="list"
							data-args="0"
							onClick={Foo.app.onMemberClick}							
						>
							<div className="n1"><Voc text={"Members"} /></div>
							<div className="iconnn">
								<img src={ icon1 } alt="" />
							</div>
						</div>
					</div>	
					{crMyPrForm}
					<div className="row justify-content-center">
						<div className="col-lg-6 col-md-8 col-sm-12 text-center">
							<div className="spacer-30" />
							<div 
								className='btn btn-primary newProjectDoc'
								data-fmru_type="newProjectDoc" 
								data-args="0" 
								onClick={ Foo.app.onMemberClick }
							>
								{Vocabulary.getText("create new Project")}
							</div>
						</div>
					</div>
				</section>
			</div>		
			{my_projects}
			<div className='container colored'>
				<section>
					<div className="row">				
						<FmRUPagi 
							data={ Foo.app.props.data.pagi } 
							onItemClick = {Foo.app.onMemberClick.bind(Foo.app)} 
							colm={Foo.app.props.data.colm} 
							title={Vocabulary.getText("Last posts")}
							prefix={"posts_"}
							fmru_type="page"
						/>
					</div>		
					{posts}
					<div className="row">					
						<div className="spacer-10" />
						<FmRUPagi 
							data={ Foo.app.props.data.pagi } 
							onItemClick = {Foo.app.onMemberClick.bind(Foo.app)} 
							colm={Foo.app.props.data.colm} 
							title={Vocabulary.getText("Last posts")}
							prefix={"posts_"}
							fmru_type="page"
						/>
					</div>	
				</section>
			</div>
		</Fragment>);
	}
}