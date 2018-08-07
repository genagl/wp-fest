import React, {Component} from 'react';
import './bootstrap.min.css';
import $ from "jquery";
import Voc from './Voc';

export default class MediaChooser extends Component
{	
	constructor(props)
	{
		super(props);
		this.state = {
			id: props.id,
			name: props.name,
			media_id: props.media_id,
			prefix: props.prefix,
			url:props.url
		};
	}
	componentWillReceiveProps (nextProps) 
	{
		this.setState({
			id: nextProps.id,
			name: nextProps.name,
			media_id: nextProps.media_id,
			prefix: nextProps.prefix,
			url:nextProps.url
		});
	}
	componentDidUpdate()
	{
		$( "#"+this.props.prefix + "imagex" ).attr("src",this.state.url);
	}
	render()
	{
		return this.form1();	
	}
	form1()
	{
		const {id, prefix, url} = this.state;
		const bstyle 	= { height:"120px",  margin:"3px 3px 3px 0", minWidth:"120px" };
		const istyle 	= { position:"relative", display:"inline-block", minWidth:"100px", height:"100px", overflow:"hidden"};
		return (
			<div className=" " style={{float:"left"}}>
				<div className='media_button my_image_upload' style={bstyle} image_id={id}  prefix={prefix}>
					<div className='pictogramm ' id={prefix+id} style={istyle}>
						<img height="100" id={this.props.prefix + "imagex"} src={url} alt="" style={{height:"100px"}}/>
						<input type="file" 
							name="image_input_name" 
							style={{opacity:0, width:"100%", height:"100%", position:"absolute", top:0, left:0}}
							onChange={this.onImageChange}
						/>
					</div>					
				</div>
			</div>
		);
	}
	onImageChange = (evt) =>
	{
		var file	= evt.target.files[0];
		if(!file)	return;
		if( $("#" + this.props.prefix + "imagex").length )
			$("#" + this.props.prefix + "imagex").detach();
		var img 	= document.createElement("img");
		//img.classList.add("obj");
		img.height	= 100;
		img.id 		= this.props.prefix + 'imagex';
		img.style	= "height:100px";
		img.alt 	= '';
		img.file 	= file;
		img.files	= evt.target.files;
		evt.target.parentElement.appendChild(img);
		var reader = new FileReader();
		reader.g = this;
		reader.onload = (function(aImg) 
		{ 
			return function(e) 
			{ 
				aImg.src = e.target.result; 
				reader.g.setState({url:aImg.src});
				reader.g.props.onChange( aImg.src, aImg.file,  );
			}; 
		})(img);
		reader.readAsDataURL(file);
		
		//
	}
	
	
	form2()
	{
		return (
			<div className="imageupload panel panel-default">
				<div className="panel-heading hidden  ">
					<h3 className="panel-title pull-left">
						<Voc text={"Upload Image"} />
					</h3>
					<div className="btn-group pull-right">
						<button type="button" className="btn btn-default active">
							<Voc text={"File"} />
						</button>
						<button type="button" className="btn btn-default">
							URL
						</button>
					</div>
				</div>
				<div className="file-tab panel-body">
					<label className="btn btn-link btn-file">
						<span><Voc text={"Browse"} /></span>
						<input type="file" name="$image_input_name" style={{opacity:0}}/>
					</label>
					<button type="button" className="btn btn-link"><Voc text={"Remove"} /></button>
					<button type="button" className="btn btn-link"><Voc text={"Insert"} /></button>
				</div>
				<div className="url-tab panel-body hidden">
					<div className="input-group">
						<input type="text" className="form-control hasclear" placeholder="Image URL" />
						<div className="input-group-btn">
							<button type="button" className="btn btn-default">
								<Voc text={"Submit"} />
							</button>
						</div>
					</div>
					<button type="button" className="btn btn-default ">
						<Voc text={"Remove"} />
					</button>
					<input type="hidden" name="image-url" />
				</div>
				<div className="panel-heading clearfix  hidden">
					<div className="btn-group pull-right">
						<button type="button" className="btn btn-default">
							<Voc text={"Submit"} />
						</button>
					</div>
				</div>
			</div>
			
		);
	}
}