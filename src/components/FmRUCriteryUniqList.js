import React, {Component, Fragment} from 'react';
import FmRUCriteryBox from './FmRUCriteryBox';
import Voc from './Voc';
import Foo from '../Foo';
import Vocabulary from './Vocabulary';
import TextArea from './TextArea';

export default class FmRUCriteryUniqList extends Component
{
	state = {
		chooseNewCrit : -1,
		text : ""
	}
	render() 
	{ 	
		const {data, categories, onItemClick, member_id, is_expert, aut_criteries} = this.props;
		const articleElements = data.map((article, index) =>
		{     
			return <FmRUCriteryBox 
				data={article} 
				onItemClick={onItemClick} 
				key={"critery_"+article.id}
				member_id={member_id}
			/>
		});
		const choose_form = categories.map(elem => 
			<div className='col-md-12' key={ "newCrit" + elem.id }>
				<input 
					type='radio' 
					id={'choose_' + elem.id }
					data-id={elem.id}
					className='radio_full' 
					name='choose_cat'
					onChange={this.chooseNewCrit}
					checked={this.state.chooseNewCrit == elem.id }
				/> 
				<label htmlFor={'choose_' + elem.id } data-hint={ elem.name }>
					<div className='cat_color_label' style={{backgroundColor:elem.color}}></div>
				</label>				
			</div>
		)
		const insert = is_expert && aut_criteries.length < 3 ? 
		<section>
			<div className="row">
				<div className='col-md-12' >
					<div className='col-md-1'></div>
					<div className='col-md-10'>
						<div className='display-4'><Voc text="Create new"/></div>	
					</div>
					<div className='col-md-1'></div>
				</div>
				<div className='col-md-12'>
					<div className='col-md-4'>
						<div className='small'>
							<p>
								Не более трех критериев! Сейчас - { aut_criteries.length }
							</p>
							<ul>
								<li>В текстовое поле добавьте значимый для вас критерий, не учтенный в базовом списке.</li> 
								<li>Выберите категорию, к которой относится Ваш критерий</li>
								<li>Поздравляем! Теперь вы сможете оценить любую работу на этом Фестивале по созданному Вами критерию</li>
							</ul>
						</div>
					</div>
					<div className='col-md-4'>
						<small className={ this.state.text === "" ? "" : "opacity_none"}>
							<Voc text="Put title of your critery" />
						</small>
						<TextArea 
							id='new_critery_text'
							rows='8'
							className='col-md-12'
							value={this.state.text}
							onChange={this.onTextarea} 
						/>	
					</div>
							
					<div className='col-md-4'>
						<small className={ this.state.chooseNewCrit === -1 ? "" : "opacity_none"}>
							<Voc text="Without fail choose parent category" />
						</small>
						<div className='row'>
							{choose_form}
						</div>
						<div className='col-md-12'>
							<button id='insert_expert_critery' onClick={this.create}><Voc text="Create" /></button>
						</div>
					</div>
				</div>
			</div> 
		</section>: "";
		
		return (
		<Fragment>
			<section>
				<div className='row'>
					<div className='col-md-1'>
					
					</div>
					<div className='col-md-10'>
						<div className='display-4'>
							<Voc text={"Unique Criteries from Experts"} />
						</div>
					</div>
					<div className='col-md-1'>
					
					</div>
				</div>
				<div className="spacer-10"/>
				<div className='row'>
					<div className='col-md-12' style={{color:"#f8f9fa"}}>
						{articleElements}
					</div>			
				</div>	
			</section>
			{insert}		
		</Fragment>);
	}
	chooseNewCrit = evt =>
	{
		this.setState({
			chooseNewCrit:evt.currentTarget.dataset.id
		});
	}
	create = evt =>
	{
		if(this.state.text === "")
		{
			Foo.app.a_alert({content:Vocabulary.getText("You must choose Title"),okHandler:Foo.app.alert_hide});
			return;
		}
		if(this.state.chooseNewCrit === -1)
		{
			Foo.app.a_alert({content:Vocabulary.getText("You must choose someone Category"),okHandler:Foo.app.alert_hide});
			return;
		}
		const dt = {
			text:	this.state.text,
			cr: 	this.state.chooseNewCrit,
			id:		this.props.member_id
		};
		Foo.app.fetch(
			"create_critery", 
			dt
		)
		
	}
	onTextarea = text =>
	{
		this.setState({
			text:text
		});
	}
	
}