import React, {Component} from 'react';
import FmRUCriteryBox from './FmRUCriteryBox';
import FmRUMemDscrList from './FmRUMemDscrList';
import FmRUUser from './FmRUUser';
import FmRUPhase from './FmRUPhase';
import './bootstrap.min.css';

export default class FmRUCriteryBoxList extends Component
{
	render() 
	{ 		
		const{ data, id, onItemClick, descrs, member_id } = this.props;
		const ids = { id:"collapse" + id, _id: "#collapse" + id, acc: "acc" + id, head: "head" + id, _head: "#head" + id};
		const criteries = data.map((article, index) =>
		{     
			return <FmRUCriteryBox 
				data={article} 
				onItemClick={onItemClick} 
				key={"critery_"+article.id}
				member_id={member_id}
			/>
		});
		const isExp = FmRUUser.is_role("Expert")&& ["1", "2"].in_array(FmRUPhase.phase);
		const openClasses = ["panel-collapse", isExp ? "collapse show" : "collapse", ""];
		const expanded = isExp ? "true" : "false";
		const descrList = <FmRUMemDscrList  data={ descrs } denabled={data.denabled}/>;
		return (
			<div className='col-md-12'  style={{padding:0}}>  
				<div className='clearfix'></div>
				<div className='panel-group' id={ids.acc} role='tablist' aria-multiselectable='true'>
					<div className='panel panel-default'>
						<div className='panel-heading' role='tab' id={ids.head}>
							<div className='panel-title all_crits' >
								<div role='button' data-toggle='collapse' data-parent='#accordion' href={ids._id} aria-expanded={expanded} aria-controls={ids.id}>																
									<div className="fmRU_button">
										<i className="fa fa-caret-right" style={{color:"#f8f9fa"}}></i>
									</div>
								</div>
							</div>
						</div>
						<div id={ids.id} className={openClasses.join(" ")} role='tabpanel' aria-labelledby={ids.head}>
							<div className='panel-body' >
								{criteries}	
								{descrList}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}