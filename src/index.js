import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as TYPES from "./components/types";
import FmRUApp from './components/FmRUApp';
import store from "./state/Redusers"
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

export function get_status()
{
	if(window.location.hostname === "localhost")
		return "local";
	else
		return "server";
}
export default function get_url() 
{
	//console.log("%c "+window.location.protocol + "//" + window.location.hostname, "color:red;'font-size:2em;");
	return  get_status() === "local" ? 'http://novgu.metaversitet.ru' : window.location.protocol + "//" + window.location.hostname; 
} 
export function get_auth()
{
	return window.auth;
}
Array.prototype.in_array = function(p_val) 
{
    for(var i = 0, l = this.length; i < l; i++)  
	{
        if(this[i] === p_val) {
            return true;
        }
    }
    return false;
}
ReactDOM.render( <Provider store={store}>
		 <BrowserRouter>
			<Route path="/" component={FmRUApp} />
		 </BrowserRouter>
	</Provider>, document.getElementById('main'));


//store.subscribe(()=> console.log("New store", store.getState()));
store.dispatch({ type: TYPES.STARTED, data:{} });

