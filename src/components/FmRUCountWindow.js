import React, {Component} from 'react';
import FmRUApp from './FmRUApp';
import Voc from './Voc';

export default class FmRUCountWindow extends Component
{
	
	render()
	{ 
		const {data} = this.props;
		return (
			<div className='modal fade' id='countModal' tabIndex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
				<div className='modal-dialog' role='document'>
					<div className='modal-content'>
						<div className='modal-body'>
							<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
								<span aria-hidden='true'>&times;</span>
							</button>
							<div className='row'>
								<div className="col-lg-12 col-md-12 col-sm-12 col-12 lead">	
									<label>	
										<Voc text={"Members per page"}/>
									</label>	-	<strong><output id="mppvalue">{data.mpp}</output></strong>
									<div className="sliderbox">
									
										<input 
											type="range" 
											id="mpp"
											className="bar rangeinput" 
											min="4" max="180" step="4" defaultValue={data.mpp} 
											onMouseUp={
												(evt)=>{
													this.props.prnt.state.mpp = evt.target.value;
													document.getElementById('mppvalue').value = evt.target.value;
													this.props.prnt.fetch( "list", 0 );
												}
											}
											onChange={
												(evt)=>{
													this.props.prnt.state.mpp = evt.target.value;
													document.getElementById('mppvalue').value = evt.target.value;
												}
											}
										/>
									</div>
								</div>
							</div>
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
	}
}
