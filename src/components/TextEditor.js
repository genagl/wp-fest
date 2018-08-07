import React, { Component, Fragment } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import bold from '../img/demo/bold.gif';
import italic from '../img/demo/italic.gif';
import underline from '../img/demo/underline.gif';
import strikethrough from '../img/demo/strikethrough.gif';
import subscript from '../img/demo/subscript.gif';
import superscript from '../img/demo/superscript.gif';
import eraser from '../img/demo/erase.gif';
import left from '../img/demo/left-align.gif';
import right from '../img/demo/right-align.gif';
import center from '../img/demo/center-align.gif';
import justify from '../img/demo/justify.gif';
import ordered from '../img/demo/ordered.gif';
import unordered from '../img/demo/unordered.gif';
import indent from '../img/demo/indent.gif';
import outdent from '../img/demo/outdent.gif';
import link from '../img/demo/link.gif';
import unlink from '../img/demo/unlink.gif';
import image from '../img/demo/image.gif';
import undo from '../img/demo/undo.gif';
import redo from '../img/demo/redo.gif';


export default class TextEditor extends Component 
{
	constructor(props) 
	{
		super(props);
		const html = this.props.text;
		console.log(html);
		const contentBlock = htmlToDraft(html);
		if (contentBlock) {
		  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
		  const editorState = EditorState.createWithContent(contentState);
		  this.state = {
			editorState,
			text:contentBlock
		  };
		}
	}
	componentWillReceiveProps (nextProps) 
	{	
		console.log(nextProps.text);
		/*
		const contentBlock = htmlToDraft( nextProps.text );
		if ( contentBlock ) 
		{
			const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
			const editorState = EditorState.createWithContent(contentState);
			this.setState({
				editorState,
				text: contentBlock
			});
		}
		*/
	}
  onEditorStateChange: Function = (editorState) => 
  {
    this.setState({
		editorState,	
		contentBlock: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
	this.props.getText( draftToHtml(convertToRaw(editorState.getCurrentContent()))  );
  };

  render() {
    const { editorState } = this.state;
    return (
		<Fragment>
		  <Editor
			editorState={editorState}
			wrapperClassName="demo-wrapper"
			editorClassName="demo-editor"
			onEditorStateChange={this.onEditorStateChange}		
			toolbar={{
				inline: {
					inDropdown: true,
					options: ['italic', "bold", "underline", "superscript", "subscript"],
					bold: { icon: bold, className: 'demo-option-custom' },
					italic: { icon: italic, className: 'demo-option-custom' },
					underline: { icon: underline, className: 'demo-option-custom' },
					strikethrough: { icon: strikethrough, className: 'demo-option-custom' },
					monospace: { className: 'demo-option-custom' },
					superscript: { icon: superscript, className: 'demo-option-custom' },
					subscript: { icon: subscript, className: 'demo-option-custom' },
				},
				blockType: { className: 'demo-option-custom-wide', dropdownClassName: 'demo-dropdown-custom' },
				fontSize: { className: 'demo-option-custom-medium' },
				list: {
					unordered: { icon: unordered, className: 'demo-option-custom' },
					ordered: { icon: ordered, className: 'demo-option-custom' },
					indent: { icon: indent, className: 'demo-option-custom' },
					outdent: { icon: outdent, className: 'demo-option-custom' },
				},
				textAlign: {
					left: { icon: left, className: 'demo-option-custom' },
					center: { icon: center, className: 'demo-option-custom' },
					right: { icon: right, className: 'demo-option-custom' },
					justify: { icon: justify, className: 'demo-option-custom' },
				},
				fontFamily: { className: 'demo-option-custom-wide', dropdownClassName: 'demo-dropdown-custom' },
				colorPicker: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom',
					colors: ['rgba(0,0,0,0)', 'rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
      'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
      'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
      'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
      'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
      'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
				},
				link: {
					popupClassName: 'demo-popup-custom',
					link: { icon: link, className: 'demo-option-custom' },
					unlink: { icon: unlink, className: 'demo-option-custom' },
				},
				emoji: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
				embedded: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
				image: { icon: image, className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
				remove: { icon: eraser, className: 'demo-option-custom' },
				history: {
					undo: { icon: undo, className: 'demo-option-custom' },
					redo: { icon: redo, className: 'demo-option-custom' },
				},
			}}
			
		  />
      </Fragment>
    )
  }
}




/*

import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export default class TextEditor extends Component 
{
	constructor(props)
	{
		super(props);
		this.state ={
			contentState: EditorState.createEmpty(),
		};
	}
	render()
	{
		return this.form1();	
	}
	form1()
	{
		return (
			<Editor
				initialContentState={this.state.contentState}
				toolbarClassName="toolbarClassName"
				wrapperClassName="wrapperClassName"
				editorClassName="editorClassName"
				onEditorStateChange={this.onEditorStateChange}
				toolbar={{
				  options: ['inline', 'blockType', 'fontSize'],
				  inline: {
					inDropdown: true,
					options: ['bold', 'italic'],
				  },
				  blockType: {
					inDropdown: true,
					options: ['Normal', 'H2', 'H3', 'H2', 'H3', 'H4', 'H5'],
				  },
				  fontSize: {
					//className: 'bordered-option-classname',
				  },
				}}
			/>
		);
	}
	onEditorStateChange: Function = (editorState) => 
	{
		console.log(contentState);
		this.setState({
		  contentState,
		});
	};
}
*/