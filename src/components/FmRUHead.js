import React, {Component, Fragment} from 'react';
import Voc from './Voc';
import FmRULoginForm from './FmRULoginForm';
import FmRULoginWindow from './FmRULoginWindow';
import FmRURegisterWindow from './FmRURegisterWindow';
import FmRUFilterWindow from './FmRUFilterWindow';
import FmRUCountWindow from './FmRUCountWindow';

export default class FmRUHead extends Component
{
	render()
	{ 
		switch(this.props.page_type)	
		{
			case "fmru_player":
				return this.onlyForm();//this.fmru_player();
			case "page":
			default:
				return this.onlyForm();//this.main( this.props.p.logo );
		}
	}
	onlyForm( logo )
	{
		return <Fragment>
			<FmRULoginWindow  login = {this.props.login} prnt={this.props.prnt}/>
			<FmRURegisterWindow  register = {this.props.register} prnt={this.props.prnt}/>
			<FmRUFilterWindow data={this.props.p} prnt={this.props.prnt} onClick = {this.props.onItemClick}/>
			<FmRUCountWindow data={this.props.p} prnt={this.props.prnt} onClick = {this.props.onItemClick}/>
		</Fragment>;
	}
	main( logo )
	{
		var Filters = <Voc text={'Filters'} />;
		var thrumb = logo ? 
			<img src={ logo } alt=""/> : 
			<div>
				<i className="fas fa-backward"></i> <i className="fa fa-coffee"></i>
			</div>;
		const cont = (
			<nav className="navbar navbar-expand-lg navbar-xl navbar-dark ">
				
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarTogglerDemo01">
					<span className="navbar-brand"  onClick = {this.props.onItemClick} data-fmru_type="page" data-args="0">
						{thrumb}
					</span>
				
					<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
						<li> 
							
						</li>
					</ul>
				
					
					
					<div className="navbar-right">
						
						<FmRULoginForm 
							prnt={this.props.prnt}
							user = {this.props.p} 
							onLogout={this.props.onLogout } 
							onUser={this.props.onUser } 
						/>
						<div className="fmRU_button light xl"
							title={ Filters.props.text}							
							data-toggle='modal'
							data-target='#filterModal' 
						>
							<i className="fas fa-filter"></i>
						</div>
					</div>
				</div>
			</nav>
		);
		
		return cont;
	}
	
	
	fmru_player()
	{
		return this.main( this.props.p.logo );
	}
};