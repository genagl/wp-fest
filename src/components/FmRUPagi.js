import React, {Component} from 'react';
import FmRUPagiItem from './FmRUPagiItem';
import { Link } from 'react-router-dom';

export default class FmRUPagi extends Component
{	
	render()
	{
		const {data, colm, title, onItemClick} = this.props;
		const articleElements = data ? this.get_items(data[1], data[0], onItemClick) : "";
		const prev = this.get_prev(data[1], data[0], onItemClick);
		const next = this.get_next(data[1], data[0], onItemClick);
		return colm === 0 ? "" : (
			<nav className="col-md-12">
			  <ul className="pagination justify-content-center">
				<li className="page-item">
					<a className="page-link"><strong>
						{title + " (" + colm + ")"}
					</strong></a>
				</li>
				{ prev }
				{ data[1] === 1 ? "" : articleElements }
				{next}
			  </ul>
			</nav>
		);
	}
	get_prev(count, active, onItemClick)
	{
		//return active + " " + 1;
		if(active === 0)
		{
			return (
				<li className="page-item upvisibles">
					<span className="page-link" >
						<span aria-hidden="true">
							<i className='fa fa-caret-left'></i>
						</span>
					</span>
				</li>
			);
		}
		else
		{
			return (
				
				<li className="page-item">
					<Link to={this.props.prefix + (active - 0)} >
						<span 
							className="page-link" 
							aria-label="Next"  
							data-fmru_type={this.props.fmru_type} 
							data-args={active - 1} 
							onClick={onItemClick}
						>
							<span aria-hidden="true">
								<i className='fa fa-caret-left'></i>
							</span>
						</span>
					</Link>
				</li>
			);
		}
	}
	get_next(count, active, onItemClick)
	{
		//return count + " " + (active+1);
		if(count === active + 1)
		{
			return (
				<li className="page-item upvisibles">
					<span className="page-link" >
						<span aria-hidden="true">
							<i className='fa fa-caret-right'></i>
						</span>
					</span>
				</li>
			);
		}
		else
		{
			return (
				<li className="page-item">
					<Link to={this.props.prefix + (active + 2) } >
						<span
							className="page-link" 
							aria-label="Next"  
							data-fmru_type={this.props.fmru_type} 
							data-args={active + 1} 
							onClick={onItemClick}
						>
							<span aria-hidden="true">
								<i className='fa fa-caret-right'></i>
							</span>
						</span>
					</Link>
				</li>
			);
		}
	}
	get_items(count, active, onItemClick)
	{
		var pages = [];
		if( active > 4 )
		{
			pages.push(
				<li className="page-item">
					<Link to={this.props.prefix + (active + 2) } >
						<span
							className="page-link" 
							aria-label="Next"  
							data-fmru_type={this.props.fmru_type}
							data-args={active - 4} 
							onClick={onItemClick}
						>
							<span aria-hidden="true">
								<i className='fas fa-ellipsis-h'></i>
							</span>
						</span>
					</Link>
				</li>
			);
		}
		for(var i = 0; i < active; i++)
		{
			var classes = ["page-item", i===active ? "active" : ""].join(" ");
			var pid = this.props.prefix + i;
			if( active - i <= 3)
			{
				pages.push(
					<li className={classes} key={ pid } >
						<Link to={this.props.prefix + (i + 1)} >
							< FmRUPagiItem 
								id={i} 
								onItemClick={onItemClick} 
								is_active={i===active} 
								fmru_type={this.props.fmru_type}
							/>
						</Link>
					</li>
				);
				continue;
			}
			else
				continue;			
		}
		
		
		
		var classes = "page-item active";
		var pid = this.props.prefix + active;
		pages.push(
			<li className={classes} key={ pid } >
				<Link to={this.props.prefix + (active + 1)} >
					< FmRUPagiItem 
						id={active} 
						onItemClick={onItemClick} 
						is_active={true}
						fmru_type={this.props.fmru_type} 
					/>
				</Link>
			</li>
		);
		
		for(var i = active + 1; i < count; i++)
		{
			var classes = ["page-item", i===active ? "active" : ""].join(" ");
			var pid = this.props.prefix + i;
			if( i - active <= 3)
			{
				pages.push(
					<li className={classes} key={ pid } >
						<Link to={this.props.prefix + (i + 1)} >
							< FmRUPagiItem 
								id={i} 
								onItemClick={onItemClick} 
								is_active={i===active}
								fmru_type={this.props.fmru_type} 
							/>
						</Link>
					</li>
				);
				continue;
			}
			else
				continue;
		}
		if( count > active + 4)
		{
			pages.push(
				<li className="page-item">
					<Link to={this.props.prefix + (active + 2) } >
						<span
							className="page-link" 
							aria-label="Next"  
							data-fmru_type={this.props.fmru_type} 
							data-args={active + 4} 
							onClick={onItemClick}
						>
							<span aria-hidden="true">
								<i className='fas fa-ellipsis-h'></i>
							</span>
						</span>
					</Link>
				</li>
			);
		}
		return pages;
	}
}