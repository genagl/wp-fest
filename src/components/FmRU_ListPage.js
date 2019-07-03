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


import icon2 from "../img/kabuki.svg";
import icon3 from "../img/tools-and-utensils-1.svg";

export default class FmRU_ListPage extends Component
{
	render()
	{
		console.log(Foo.app.props.data.members);
		const countChooser = Foo.app.props.data.count_chooser ? 
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
		const user_descr = Foo.app.props.data.roles.map(elem => 
			<div 
				className="role_descr"
				key={"roledescr_"+elem } 
				dangerouslySetInnerHTML={{ __html : Vocabulary.getText(FmRUUser.bySlug(elem)[0].descr) }} 
			/>
		);
		const about = Foo.app.props.data.enabled_rules ? <div 
			className="indicator classic"	
			id="indicator_about"	
			data-fmru_type="page"
			data-args="0"
			onClick={Foo.app.onMemberClick}
		>
			<div className="n1"><Voc text={"About"} /></div>
			<div className="iconnn">
				<img src={ Foo.app.props.data.logo } alt="" />
			</div>
		</div> : "" ;
		if(user_descr.length === 0)
			user_descr.push( 
				<div  
					className="role_descr"
					key={"roledescr_contributor" } 
					dangerouslySetInnerHTML={{ __html : Vocabulary.getText(FmRUUser.bySlug("contributor")[0].descr)}} 
				/> );
		const my_projects = Foo.app.props.data.my_members.length ? <Fragment>
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
						onItemClick = {Foo.app.onMemberClick.bind(this)} 
						mtype = {"card"}
					/>	
				</div>
			</section>		
		</Fragment>: "";
		return (
		<Fragment>
			<div className='container colored'>
				< FmRUHead 
					p={Foo.app.props.data} 
					prnt={this}
					page_type = "page" 
					onItemClick = {Foo.app.onMemberClick.bind(this)}					
					login = {Foo.app.login.bind(this)}
					register={Foo.app.onRegister}
					onLogout = {Foo.app.onLogout}
					onUser = {Foo.app.onUser}
				/>		
				<section>					
					<div className="carousel-indicators">					
					{about}
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
							id="indicator_ganres"													
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
							data={ Foo.app.props.data.pagi } 
							onItemClick = {Foo.app.onMemberClick.bind(Foo.app)} 
							colm={Foo.app.props.data.colm} 
							title={Vocabulary.getText("Members")}
							prefix={"page_"}
							fmru_type="list"
						/>
					</div>			
					< FmRUMemberBox 
						members={Foo.app.props.data.members} 
						onItemClick = {Foo.app.onMemberClick.bind(Foo.app)} 
						mtype = {Foo.app.props.data.mtype}
					/>			
					<div className="row">
						<FmRUPagi 
							data={ Foo.app.props.data.pagi } 
							onItemClick = {Foo.app.onMemberClick.bind(Foo.app)} 
							colm={Foo.app.props.data.colm} 
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
}