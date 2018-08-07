import React, {Component, Fragment} from 'react';
import Vocabulary from './Vocabulary';
import Voc from './Voc';
import Foo from '../Foo';
import FmRUPhase from './FmRUPhase';
import FmRUUser from './FmRUUser';
import FmRUCheckList from './FmRUCheckList';

export default class FmRUCriteryBox extends Component
{
	render() 
	{
		const { data } = this.props;
		const style= {padding:0};
		const descr = data && FmRUUser.is_role("Expert") && this.props.data.rating > 0 && ["1", "2"].in_array(FmRUPhase.phase) ? 
		<div className="">
			<span className="description"><Voc text={"Your description:"} /> </span>
			<strong>{data.descr}</strong> 
			<div 
				className="fmRU_button xl" 
				style={{ display:"inline-block", verticalAlign:"middle", float:"inherit",  border:0, background: "none" }}
				title={Vocabulary.getText("Edit")}
				onClick={this.onEdit}
			>
				<i>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="14" height="14" y="-3"><path fill="#333333" d="M136.6 138.79a64.003 64.003 0 0 0-43.31 41.35L0 460l14.69 14.69L164.8 324.58c-2.99-6.26-4.8-13.18-4.8-20.58 0-26.51 21.49-48 48-48s48 21.49 48 48-21.49 48-48 48c-7.4 0-14.32-1.81-20.58-4.8L37.31 497.31 52 512l279.86-93.29a64.003 64.003 0 0 0 41.35-43.31L416 224 288 96l-151.4 42.79zm361.34-64.62l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.75 18.75-49.15 0-67.91z"/></svg>
				</i>
			</div>
		</div> : "";
		if(data.color)
		{
			style.backgroundColor = data.color;
		}
		return (
			<div className="col-md-12 equal" style={style}>
				<div className='col-md-9 col-sm-12 critery_cell grey first' >
					<div className="footer-widget ">
						{ data.title }
						{ descr }
					</div>
				</div>
				<div className='col-md-3 col-sm-12 critery_cell grey' >					
						{ FmRUUser.is_role("Expert") && FmRUPhase.phase == 2 ? this.expert_box() : this.viewer_box() }					
				</div>
			</div>
		);
	}
	expert_box()
	{
		return (
			<FmRUCheckList 
				data={this.props.data} 
				onItemClick={this.props.onItemClick} 
				onEdit={this.onEdit} 
				member_id={this.props.member_id}
			/>
		)
	}
	viewer_box()
	{
		return  <div className="footer-widget ">{this.props.data.rating}</div> ;
	}
	onEdit = () => {
		Foo.app.a_alert({
			title:		Vocabulary.getText("Edit you description"), 
			textarea:	" " + this.props.data.descr,
			content: 	this.props.data.title,
			checkTitle: Vocabulary.getText("Do comments automaticaly"), 
			check:		"expert_comments",
			is_check:	true,
			okTitle:	<Fragment> <i className="fa fa-caret-right"></i></Fragment>,
			okHandler:	this.editDescr.bind(Foo.alert, "descr")
		});
	}
	editDescr = (evt) =>
	{
		console.log(Foo.alert.ref.current.state.textarea);
		Foo.app.onOzenka(
			"ozenka",{
				mid:this.props.member_id, 
				crid:this.props.data.id, 
				c:this.props.data.rating, 
				d:Foo.alert.ref.current.state.textarea, 
				is_comment:false
			});
		Foo.alert.ref.current.hide();
	}
}