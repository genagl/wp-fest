import React, {Component, Fragment} from 'react';
import Voc from './Voc';
import Vocabulary from './Vocabulary';
import FmRUUser from './FmRUUser';
import TextArea from './TextArea';
import Foo from '../Foo';

export default class FmRUExpertDescrList extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			text: ""
		}
	}	
	render() 
	{ 	
		const{data, member_id, denabled} = this.props;
		const articleElements = data.length ? 
			data.map((article, index) =>{
				const classes = index===0 ? ['col-md-12','critery_cell3','grey2','first_row'] : ['col-md-12','critery_cell3','grey2'];
				return !article.txt || article.txt===" " ? "" : (
					<div className={classes.join(" ")} key={"exp_descr_" + member_id + "_" + index}>
					<blockquote>
						{article.txt}
						<footer>{article.auth}</footer>
					</blockquote>
				</div>
				)
			}) : 
			<div className={['col-md-12','critery_cell3','grey2','first_row'].join(" ")} >
				<Voc text={"No descriptions"} />
			</div>;
		
		const _textarea = denabled === 0 ? 
			<Fragment>
				<TextArea
					className="col-md-6 col-sm-12" 
					rows="10" 
					placeholder={Vocabulary.getText("Start write")}
					style={{marginBottom:10}}
					value={this.state.text}
					onChange={this.getComment}
				/>
				<div className="col-md-6 col-sm-12" >
					<div className='btn btn-lg btn-primary' onClick={this.send}>
						<Voc text={"Send descriptions"} />
					</div>
					<div className="spacer-30" />
					<div>
						<small>
							Вы можете оставить текстовые комментарии и рекомендации для проектной команды.
							<p>Участникам Фестиваля важно получить обратную связь по вопросам:</p>
							<ul>
								<li>Какие задачи для развития замысла могут быть рекомендованы?</li>
								<li>Какие задачи развития Вы рекомендуете для самих авторов – чему важно дальше учиться?</li>
							</ul>
						</small>
					</div>
				</div>
			</Fragment> : 
			< Voc text={"You are already send description"} />;
		
		const form = FmRUUser.is_role("Expert") ? 
		<section>
			<div className='row'>
				<div className='col-md-1'>
				
				</div>
				<div className='col-md-10'>
					<div className='display-4'>
						<Voc text={"Your parting words for the authors of Project"} />
					</div>
				</div>
				<div className='col-md-1'>
				
				</div>
			</div>				
			<div className="spacer-10"/>
			<div className='row '>
				<div className='col-md-12'>
					{_textarea}					
				</div>
			</div>
		</section> : "";
		return (
		<Fragment>
			<section>
				<div className='row'>
					<div className='col-md-1'>
					
					</div>
					<div className='col-md-10'>
						<div className='display-4'>
							<Voc text={"Expert/'s descriptions"} />
						</div>
					</div>
					<div className='col-md-1'>
					
					</div>
				</div>				
				<div className="spacer-10"/>
				<div className='row '>
					<div className='col-md-12'>
						<div className='w-100 first_row'>
							{articleElements}
						</div>			
					</div>			
				</div>			
			</section>
			{form}
		</Fragment>
		);
		
	}
	changeComment = evt => {
		var val = evt.currentTarget.value;
		this.getComment(val);
	}
	getComment = (text) => {
		console.log(text);
		this.setState({
			text: text
		})
	}
	send = (text) => {
		if(this.state.text=="")
		{
			Foo.app.a_alert({content:Vocabulary.getText("You must insert text"),okHandler:Foo.app.alert_hide})
			return;
		}
		Foo.app.fetch(
			"send_member_descr", 
			{
				text 		: this.state.text, 
				member_id 	: this.props.member_id
			}
		);
	}
}