import React, {Component} from 'react';
import FmRUFilterGanreList from './FmRUFilterGanreList';
import FmRUApp from './FmRUApp';
import Voc from './Voc';

export default class FmRUFilterWindow extends Component
{
	constructor(props)
	{
		super(props);
		this.timer;
	}
	render()
	{ 
		const {data} = this.props;
		return (
			<div className='modal fade' id='filterModal' tabIndex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
				<div className='modal-dialog' role='document'>
					<div className='modal-content'>
						<div className='modal-body'>							
							<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
								<span aria-hidden='true'>&times;</span>
							</button>
							<div className="w-100">								
								<div className="lead">
									<Voc text={"Show Members by Ganres"} />
								</div>
							</div>
							<div className="spacer-10" />
							<FmRUFilterGanreList 
								data={data.ganres} 
								onClick={this.onFilterGanres} 
								name="header"
								defaultValue={true}
							/>
						</div>		
						<div className='spacer-30'/>
					</div>
				</div>
			</div>
		);
	}
	
	onSet(evt)
	{
		this.props.prnt.fetch( "list", 0 );
	}
	onFilterGanres = (data) =>
	{
		this.props.prnt.state.gfilter = data;
		var app = this.props.prnt;
		clearTimeout(this.timer);
		this.timer = setTimeout(function()
		{
			app.fetch( "list", 0 );
		}, 500);
	}
}
