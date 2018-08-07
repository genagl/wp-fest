import React, {Component} from 'react';
import Foo from '../Foo';
import Vocabulary from './Vocabulary';
import TextArea from './TextArea';
import { Modal, Button } from "react-bootstrap";

export default class Aalert extends Component
{	
	constructor(props) 
	{
		super(props);
		this.state = {
		  title:props.title, //заголовок окна
		  textarea:props.textarea, //заголовок окна
		  content:props.content, // енкст окна
		  okTitle:props.okTitle, // надпись кнопки ОК
		  escTitle:props.escTitle, // надпись кнопки CANCEL
		  okHandler:"hide",// название статического метода FmRUApp, запускающееся по ОК
		  escHandler:props.escHandler || this.hide,// название статического метода FmRUApp, запускающееся по CANCEL
		  args:props.args, // аргументы
		  is_esc:false,// показывать кнопу CFNCEL
		  is_check:true, // Показывать чекбокс
		  check:props.check, //название статического свойства FmRUApp, которое дёргает переклюатель (?)
		  checkTitle:props.checkTitle,// лейбл чекбокса
		  show: false, //показвать окно
		  checkBoxChecked:Foo.is_comment, // состояние чекбокса
		};		
		Aalert.instance = this;
	}
	render()
	{
		return this.byBootstrap();
	}
	byReactB()
	{
		return (			
		  <div className="modal-container" style={{ height: 200 }}>
			<Button
			  bsStyle="primary"
			  bsSize="large"
			  onClick={() => this.setState({ show: true })}
			>
			  Launch contained modal
			</Button>

			<Modal
			  show={this.state.show}
			  onHide={this.handleHide}
			  container={this}
			  aria-labelledby="contained-modal-title"
			>
			  <Modal.Header closeButton>
				<Modal.Title id="contained-modal-title">
				  Contained Modal
				</Modal.Title>
			  </Modal.Header>
			  <Modal.Body>
				Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id
				ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
			  </Modal.Body>
			  <Modal.Footer>
				<Button onClick={this.handleHide}>Close</Button>
			  </Modal.Footer>
			</Modal>
		  </div>
		);
	}
	byBootstrap()
	{ 		
		const {title, content, textarea, okTitle, escTitle, okHandler, escHandler, is_esc, is_check, check, checkTitle, checkBoxChecked} = this.state;
		const _title = !title ? "" : <div className="modal-header">
				<h5 className="modal-title">{title}</h5>
			</div>;
		const style = this.state.show ? {display: "block", paddingRight: "5px", background:"rgba(0,0,0,0.5)"} : {};
		const classes = this.state.show ? ["modal", "fade", "in", "show"] : ["modal", "fade", "in"];
		const esc = is_esc ? (
			<button 
				type="button" 
				className="btn btn-primary" 
				onClick={ escHandler }
			>
				{escTitle}
			</button>) : "";
		const ok = (
			<div 
				className="btn btn-primary" 
				data-dismiss="modal"
				onClick={ typeof okHandler === "string" ? this[okHandler] : okHandler }
			>
				{okTitle}
			</div>);
		const checkbox = is_check ? (
			<div style={{position: "absolute", left: "20px"}}>
				<input type="checkbox" name={check} defaultChecked={checkBoxChecked} className="checkbox" id="checkbx" onChange={this.switchCheck.bind(this)}/>
				<label htmlFor="checkbx">{checkTitle}</label>
			</div>) : "";
		const _content = content? (
			<div>
				{content}
				<div className='spacer-10'></div> 
				
			</div>) : "";
		const _textarea = textarea ? 
			<TextArea 
				onChange={this.onTextarea} 
				value={textarea} 
			/>  : "";
		return (
			<div className={ classes.join(" ")} tabIndex="-1" role="dialog" id="aalert" aria-labelledby="aalertLabel"  aria-hidden={this.state.show}  style={style} >
				 <div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="close" onClick={this.hide.bind(this)}>
							<span aria-hidden="true">&times;</span>
						</div>
						{_title}
						<div className="modal-body" >
							{_content}
							{_textarea}
						</div>
						<div className="modal-footer">
							{checkbox}
							{esc}
							{ok}
						</div>
					</div>
				</div>
			</div>
		);
	}
	show = (data) =>
	{
		data = typeof data ==='string' ?{content:data} :data;
		this.setState(
			{
				title:data.title ? data.title : this.props.title,
				content: data.content,
				textarea: data.textarea,
				args:data.args,
				okTitle:data.okTitle ? data.okTitle : this.props.okTitle,
				escTitle:data.escTitle ? data.escTitle : this.props.escTitle,
				okHandler:data.okHandler ? data.okHandler : this.props.okHandler,
				escHandler:data.escHandler ? data.escHandler : this.props.escHandler,
				is_esc: data.escTitle, 
				is_check:  data.is_check,
				check:data.check ? data.check : this.props.check,
				checkTitle:data.checkTitle ? data.checkTitle : this.props.checkTitle,
				show:true				
			}
		);
	}
	hidded = (okHandler)=> 
	{
		console.log( okHandler );
		//typeof okHandler === "string" ? this[okHandler]() : okHandler();
	}
	hide = ( )=>
	{
		this.setState({show:false});
	}
	switchCheck()
	{
		Foo.is_comment = !Foo.is_comment;
		this.setState({
			checkBoxChecked: Foo.is_comment
		});
	}
	onTextarea = (val) => 
	{
		this.setState({
			textarea:val
		});
	}
	set_exp_descr = (evt) => {
		Foo.app.fetch( 
			"set_exp_descr", 
			{ mid:this.state.args.mid, crid:this.state.args.crid, discr:this.state.textarea } 
		);
		this.hide();
	}
}
