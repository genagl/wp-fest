import React, {Component, Fragment} from 'react';
import FmRUPagi from './FmRUPagi';
import FmRUPhase from './FmRUPhase';
import FmRUCategoryBoxList from './FmRUCategoryBoxList';
import FmRUCriteryUniqList  from './FmRUCriteryUniqList';
import FmRUExpertDescrList  from './FmRUExpertDescrList';
import FmRUGanreIcon from './FmRUGanreIcon';
import Voc from './Voc';
import Vocabulary from './Vocabulary';
import TextEditor from './TextEditor';
import Foo from '../Foo';
import $ from "jquery";
import {socialLikes} from "social-likes"; // http://social-likes.js.org/ru/
import get_url from "../index";

export default class FmRUMemberPage extends Component
{	
	constructor(props)
	{
		super(props);
		window.scrollTo(0, 0);
		this.state = {
			contents_id : props.mdata.status != 2 || !props.mdata.is_diaries ? "1" : props.mdata.member.slide_id,
			newPost : "",
			newTitle : "",
			new_post_private: false
		}
	}
	componentDidMount ()
	{
		$('#share').socialLikes();
	}
	render()
	{
		return this.standart();
	}	
	card()
	{
		const {mdata, onItemClick} = this.props;
		
		const articleElements = this.props.mdata.experts.map(( expert ) => expert.display_name );
		const experts = articleElements.length> 0 ? (
			<li className="list-group-item">
				<div className="row margin0">
					<div className="col-md-12 critery_cell2">
						<Voc text={"Experts, who put raiting:"} />
					</div>
					<div className="col-md-12 critery_cell2">
						<strong>{ articleElements.join(", ") }</strong>
					</div>
				</div>
			</li> )  : "";
		
		if( mdata.status == 2 && mdata.is_expert )
			return <div>
				<div className="display-4 text-center font-weight-bold">
					{mdata.member.title}
				</div>
				<div className="text-center">
					<Voc text={"Experts, who put raiting:"} /> <strong>{ articleElements.join(", ") }</strong>
				</div>
				<div className="text-center">
					<Voc text={"Valuations:"} /> <strong className="lead font-weight-bold">{mdata.rait}</strong>
				</div>
			</div>;
			
		let socials = [];
		[	{i:"fab fa-facebook-f",	n:"fb_url"}, 
			{i:"fab fa-vk",			n:"vk_url"}, 
			{i:"fab fa-instagram",	n:"instagramm_url"}, 
			{i:"fab fa-youtube",	n:"youtube_url"}
		].forEach(elem => {
			if(mdata.member[elem.n] !== "")	
			{
				console.log("hfer=" , mdata.member[elem.n]);
				socials.push(
					<a 
						href={mdata.member[elem.n]} 
						_target="blank"
						className="socials fa-stack"
						key={elem.n}
					>
						 <i className="fas fa-square fa-stack-2x"></i>
						<i className={elem.i + " fa-stack-1x fa-inverse"}></i>
					</a>
				);
			}
		})
		const raiting_vis = " list-group-item " + " hidden ";
		const cardIcons = mdata.member.ganres.map((ganre, index) => 
		{
			return <FmRUGanreIcon ganre={ganre} key={ganre.id} />
		});
		const ganres = mdata.member.ganres.map((ganre, index) =>  <span className='ganre_title' style={{backgroundColor: ganre.color}} key={"mg_"+ganre.id}>{ganre.name}</span> );
		const my_ganres = this.props.mdata.is_ganres ?
			<li className="list-group-item">
				<div className="row margin0">
					<div className="col-md-7 col-sm-7  critery_cell2">
						<Voc text={'Ganres:'} />   
						{ ganres }
					</div>
					<div className="col-md-5 col-sm-5 critery_cell2 lead">
						{ cardIcons }
					</div>
				</div>
			</li> : null;
		return <Fragment>
			<section id="card">
				<div className="row">
					<div className='col-lg-12' key={mdata.id}>
						<div className="" data-class={mdata.cl} >
						  
							<div className="row">
								<div className="col-lg-5 col-md-6 col-sm-12">
									<div className="card-trumb" style={{backgroundImage:"url(" +mdata.member.img + ")"}}>
										<div className="card-id">{mdata.member.o}</div>
									</div>									
									<div 
										className="social-likes" 
										data-url={get_url() + "/fmru_player/" + mdata.member.name}
										data-title={mdata.member.name}
										id="share"										
									>
										<div className="facebook" title="Поделиться ссылкой на Фейсбуке">Facebook</div>
										<div className="twitter" data-via="@Metaversitet" title="Поделиться ссылкой в Твиттере">Twitter</div>
										<div className="mailru" title="Поделиться ссылкой в Моём мире">Мой мир</div>
										<div className="vkontakte" title="Поделиться ссылкой во Вконтакте">Вконтакте</div>
										<div className="odnoklassniki" title="Поделиться ссылкой в Одноклассниках">Одноклассники</div>
										<div className="plusone" title="Поделиться ссылкой в Гугл-плюсе">Google+</div>
										<div className="pinterest" title="Поделиться картинкой на Пинтересте" data-media={mdata.member.img}>Pinterest</div>
									</div>	
									<div className="critery_cell2">
										<div className="display-4">
											{mdata.member.title}
										</div>
									</div>
									
									
								</div>
								<div className="col-lg-7 col-md-6 col-sm-12" >
									<ul className="list-group list-group-flush">
										{my_ganres}
										<li className="list-group-item">
											<div className="row margin0">
												<div className="col-md-7 col-sm-7  critery_cell2">
													<Voc text={"Socials:"} />
												</div>
												<div className="col-md-5 col-sm-5 critery_cell2">
													{socials}
												</div>
											</div>
										</li>
										<li className="list-group-item">
											<div className="row margin0">
												<div className="col-md-7 col-sm-7  critery_cell2">
													<Voc text={"Valuations:"} />
												</div>
												<div className="col-md-5 col-sm-5 critery_cell2 lead">
													<strong>{mdata.rait}</strong>
												</div>
											</div>
										</li>
										<li className={raiting_vis}>
											<div className="row margin0">
												<div className="col-md-7 col-sm-7 critery_cell2">
													<Voc text={ "Raiting:"} />
												</div>
												<div className="col-md-5 col-sm-5 critery_cell2 lead">
													<strong>{mdata.r2}</strong>
												</div>
											</div>
										</li>
										{ experts }
									</ul>
								</div>
								<div 
									className="col-lg-12 col-md-12 col-sm-12 mcontent" 
									dangerouslySetInnerHTML={{ __html : mdata.member.content }}
								/>
							</div>
						</div>
						<div className='spacer-30'/>
					</div>
				</div>
			</section>
		</Fragment>;
	}
	standart()
	{
		const {mdata, onItemClick} = this.props;
		console.log( mdata, this.state.contents_id );
		let contents = "";
		switch(this.state.contents_id)
		{
			case "0":
				contents = this.diary();
				break;
			case "1":
				contents = this.edited();
				break;
			case "2":
				contents = "";
				break;
				
		}
		const switcher = this.props.mdata.is_diaries 
			? 
			<div className="btn-group" role="group" aria-label="Basic example">
				<div 
					className={["btn", this.state.contents_id === "0" ? "active" : "btn-link" ].join(" ")}
					data-val = {"0"}
					onClick={this.switchContents}
				>
					<Voc text="Project Diary"/>
				</div>
				<div 
					className={["btn", this.state.contents_id === "1" ? "active" : "btn-link" ].join(" ")}
					data-val = {"1"}
					onClick={this.switchContents}
				>
					<Voc text="Evaluations and appreciations"/>
				</div>
			</div> 
			: 
			null;
		return (
		<Fragment>
			{this.card()}
			{switcher}
			{contents}
		</Fragment>
		);
	}
	edited()
	{
		const {mdata, onItemClick} = this.props;
		return (
		<Fragment>
			<FmRUCategoryBoxList 
				data={this.props.mdata.categories} 
				is_expert={mdata.is_expert} 
				onItemClick={onItemClick}
				member_id={mdata.member.id}
				max_raiting={parseInt(mdata.max_raiting)}
			/>	
			{
				mdata.is_experts_criteries == 1 ? <FmRUCriteryUniqList 
					categories={mdata.categories}
					data={mdata.uniqs}
					member_id={mdata.member.id}
					is_expert={mdata.is_expert} 
					aut_criteries={mdata.aut_criteries} 
					max_raiting={mdata.max_raiting} 
				/> : null
			}
			<FmRUExpertDescrList 
				data={mdata.expert_descr}
				member_id={mdata.member.id}
				denabled={mdata.denabled}
			/>
		</Fragment>
		);
	}
	diary()
	{
		const {mdata} = this.props;
		const yes = mdata.owners.in_array(mdata.user_id ? mdata.user_id.toString() : -100) && [ 1, 2, "1", "2" ].in_array(FmRUPhase.phase);
		console.log(mdata.owners.in_array(mdata.user_id ? mdata.user_id.toString() : -100), mdata.user_id);
		console.log([ 1, 2, "1", "2" ].in_array(FmRUPhase.phase), FmRUPhase.phase);
		const te = yes ? 
			<div className="row">
				<div className="col-12">
					<div className="diary_post newpost" >
						<div className="diary_title">
							<Voc text={"New post"} />
						</div>
						<input 
							className="form-control" 
							value={this.state.newTitle}
							placeholder={Vocabulary.getText("New post title")}
							onChange={this.setTitle}
						/>
						<TextEditor 
							getText = {this.setContent} 
							text={ this.state.newPost } 
						/> 
						<div className="diary_footer">
							<div 
								className={"btn"}
								onClick={this.setPost}
							>
								<Voc text="Insert"/>
							</div>
							<input
								type="checkbox"
								className="checkbox"
								id="is_private"
								value={this.state.new_post_private}
								onChange={this.changePrivate}
							/>
							<label htmlFor="is_private" style={{float:"right"}} >
								<Voc text={"is private"} />
							</label>
						</div>
					</div>
				</div>
			</div> : "";
		const diary = mdata.member.diary.length ?  mdata.member.diary.map(elem => {
			const status = elem.post_status == "private" ? 
				<div className="post_private_label">
					<Voc text={"Private"} />
				</div> : "";
			return <div className="row" key={elem.id}>
				<div className="col-12">
					<div className="diary_post">
						<div className="diary_title">
							{elem.post_title}
						</div>
						<div className="diary_body"
							dangerouslySetInnerHTML={{ __html : elem.post_content }}
						/>
						<div className="diary_footer">
							<span> <i className="fas fa-clock" style={{opacity:0.5}}></i> {elem.post_date} </span>
							<span> <i className="fas fa-user"  style={{opacity:0.5}}></i> {elem.post_author} </span>
						</div>
						{status}
					</div>
				</div>
				<div className="spacer-30"/>
			</div>
		}) : <div className="display-4"><Voc text={"No satch posts now"} /></div>
		
		return <Fragment>
			{te}	
			<div className="row">
				<FmRUPagi
					data={ this.props.mdata.member.pagi } 
					onItemClick = {this.onPagi} 
					colm={this.props.mdata.member.cdiary} 
					title={Vocabulary.getText("posts")}
					prefix={"/posts_"}
				/>
			</div>
			{diary}	
			<div className="row">
				<FmRUPagi
					data={ this.props.mdata.member.pagi } 
					onItemClick = {this.onPagi} 
					colm={this.props.mdata.member.cdiary} 
					title={Vocabulary.getText("posts")}
					prefix={"fmru_member_" + this.props.mdata.member.id + "/posts_"}
				/>
			</div>
		</Fragment>
	}
	changePrivate = evt =>
	{
		this.setState({
			new_post_private: !this.state.new_post_private
		});
	}
	onPagi = (evt) =>
	{
		const dt = {
			id:this.props.mdata.member.id,
			offset: evt.currentTarget.dataset.args,
		};
		Foo.app.fetch(
			"fmru_player", 
			dt
		)
	}
	switchContents = (evt) =>
	{
		const id = evt.currentTarget.dataset.val;
		this.setState({
			contents_id: id
		});
	}	
	
	setContent = (text) =>
	{
		this.setState({
			newPost:text
		})
	}
	setTitle = (evt) =>
	{
		this.setState({
			newTitle:evt.target.value
		})
	}
	setPost = () =>
	{
		if(this.state.newTitle === "")
		{
			Foo.app.a_alert({content:Vocabulary.getText("You must insert Title"),okHandler:Foo.app.alert_hide})
			return;
		}
		if(this.state.newPost === "")
		{
			Foo.app.a_alert({content:Vocabulary.getText("You must insert Content of Post"),okHandler:Foo.app.alert_hide})
			return;
		}
		const dt = {
			mid:this.props.mdata.member.id,
			title:this.state.newTitle,
			content:this.state.newPost,
			is_private:this.state.new_post_private
		};
		Foo.app.fetch(
			"insert_diary", 
			dt
		)
		this.setState({
			newTitle:"",
			newPost:""
		})
	}
}