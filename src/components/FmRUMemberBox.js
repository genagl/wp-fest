import React, {Component} from 'react';
import Voc from './Voc';
import empty from '../img/empty.png';
import FmRUGanreIcon from './FmRUGanreIcon';
import { Link } from 'react-router-dom';
import {socialLikes} from "social-likes";
import get_url from "../index";
import $ from "jquery";

export default class FmRUMemberBox extends Component
{	
	
	componentDidMount ()
	{
		$( '.share' ).socialLikes();
	}
	componentDidUpdate  (nextProps) 
	{
		$( '.share' ).socialLikes();
	}
	render()
	{
		const {members, mtype, onItemClick} = this.props;
		var stationComponents = members.map(
			function(dat, i) 
			{
				switch(mtype)
				{
					case "box":
						return FmMBBox( dat, onItemClick );
					case "stroke":
						return FmMBstroke( dat, onItemClick, dat.id );
					case "card":
					default:
						return FmMBstandart( dat, onItemClick, dat.id );
				}
			}					
		);
		return <div className='row  justify-content-center'>{stationComponents}</div>;
	}
	
};
	function FmMBstandart(  dat, onItemClick, key) 
	{
		const cardIcons = dat.ganres.map((ganre, index) => 
		{
			return <FmRUGanreIcon ganre={ganre} key={ganre.id} />
		});
		const ganres = dat.ganres.map((ganre, index) => 
		{
			return "<strong style='color:"+ganre.color+"'>"+ganre.name+"</strong>";
		});
		const ganre = dat.ganres[0];
		const gcolor = ganre ? ganre.color : "#111111";
		return (
			<div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12' key = { key } >
				<div className="card" data-class={dat.cl} >
				  
				  <div className="card-img" style={{backgroundImage:"url(" +dat.img + ")", borderColor:gcolor}} data-mid={dat.id} data-fmru_type='fmru_player' data-args={dat.id} onClick={onItemClick}>
					<div className="card-id">{dat.o}</div>
				  </div>
				  <div className='card-icons'>{ cardIcons }</div>
					<div className="card-header" title={dat.title} style={{height:"61px", overflow:"hidden", padding:"0 1.25em", position: "relative", display:"table"}} >
						<h5 className="card-title" style={{ display:"table-cell", verticalAlign:"middle"}} >
							{dat.title}
						</h5>
					</div>
					<ul className="list-group list-group-flush">
						<li className='list-group-item'  style={{height:"42px", overflow:"hidden", padding:"0 1.25em", position: "relative", display:"table"}}>
							<span className='data w-100' style={{ padding:"0 20px", display:"table-cell", verticalAlign:"middle", textAlign:"center" }}>
								<span className='hideColor'>.</span>
								<span dangerouslySetInnerHTML={{ __html : ganres.join(", ") }} />
							</span>
						</li>
						<li className="list-group-item" style={{height:64, overflow: "hidden", texOverflow: "ellipsis"}}>
							<span className="discr">								
								{dat.content}
							</span>
						</li>
						<li className="list-group-item">
							<span className="discr">
								<Voc text={ "Raiting:"} />
							</span>
							<span className="data ">{ dat.r }</span>
						</li>
						<li className="list-group-item">
							<span className="discr">
								<Voc text={ "Expert count:"} />
							</span>
							<span className="data selected">{ dat.e === 0 ? "-" : dat.e }</span>
						</li>
						<li className="list-group-item">
							<div 
							className="social-likes share" 
							data-url={get_url()}
							data-title={dat.title}
							style={{padding:"11px 20px"}}
							>
								<div className="facebook" title="Поделиться ссылкой на Фейсбуке"/>
								<div className="twitter" data-via="@Metaversitet" title="Поделиться ссылкой в Твиттере"/>
								<div className="mailru" title="Поделиться ссылкой в Моём мире"/>
								<div className="vkontakte" title="Поделиться ссылкой во Вконтакте"/>
								<div className="odnoklassniki" title="Поделиться ссылкой в Одноклассниках"/>
								<div className="plusone" title="Поделиться ссылкой в Гугл-плюсе"/>
								<div className="pinterest" title="Поделиться картинкой на Пинтересте" data-media={dat.img}/>
							</div>
						</li>
					</ul>
					
						
						
					
					<div className="card-body align-self-center">
						<div className="fmRU_button " data-mid={dat.id} data-fmru_type='fmru_player' data-args={dat.id} onClick={onItemClick}>
							<i className="fa fa-caret-right"></i>
						</div>
					</div>
				</div>
				<div className='spacer-30'></div>
			</div>
		);
	}
	function FmMBBox( dat, onItemClick )
	{
		return(
			<div className='col-xl-1_8 col-lg-2 col-md-3 col-sm-4 col-6' key={dat.id}>
				<Link to={"fmru_member/" + dat.id}>
					<div className='member' data-class={dat.cl} data-mid={dat.id} data-fmru_type='fmru_player' data-args={dat.id} onClick={onItemClick}>
						<img src={empty} className='ssfr' alt=""/>
						<div className='member_title'>
							{dat.o}
						</div>
						<div className='xperts ' data-cl={ dat.e===0 ? 'hidden' : ''}>
							{dat.e}
						</div>
					</div>
				</Link>
			</div>
		);
	}
	function FmMBstroke( dat, onItemClick, key )
	{
		const ganres = dat.ganres.map((ganre, index) => 
		{
			return <FmRUGanreIcon ganre={ganre} key={ganre.id} />;
		});
		const table = {height:"105px", overflow:"hidden",position:"relative",display:"table", padding:"5px 30px"};
		const cell = { display:"table-cell", verticalAlign:"middle"};
		return (
			<div 
				className="w-100 grey2" 
				key = { key } 
			>
				<div className="row">
					<div className='col-lg-3 col-md-5 col-sm-6 col-12' >
						<div 
							className="card-img" 
							style={{
								backgroundImage:"url(" +dat.img + ")",
								backgroundColor:"transparent", 
								border:"0",	
								height:"100%"
							}} 
							data-mid={dat.id} 
						>
							<div className="card-id">{dat.o}</div>
							<div className='card-icons'>{ ganres }</div>
						</div>							
					</div>
					<div 
						className='col-lg-4 col-md-3 col-sm-6 col-12' 
						style={table}
					>
						<h5 
							className="card-title" 
							style={cell} 
							data-fmru_type='fmru_player' 
							data-args={dat.id} 
							onClick={onItemClick}
						>
							{dat.title}
						</h5>			
					</div>	
					<div className='col-lg-5 col-md-4 col-sm-12 col-12' style={table}>
						<div style={cell} dangerouslySetInnerHTML={{ __html :dat.content }} />
					</div>
				</div>
			</div>
		);
	}
