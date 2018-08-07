import {Component} from 'react';
import Vocabulary from './Vocabulary';

export default class Voc extends Component
{
	static getText(text)
	{
		return Vocabulary.getText( text );
	}
	returnText()
	{
		 return Vocabulary.getText(this.props.text);
	}
	render()
	{
		return this.returnText();
	}
}